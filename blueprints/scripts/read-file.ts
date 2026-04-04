import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: konductor read <file>");
    process.exit(1);
  }

  // 1. Resolve Keys
  const groqApiKey = process.env.GROQ_API_KEY || process.env.AI_LLM_API_KEY;
  if (!groqApiKey) {
    console.error("❌ Missing GROQ_API_KEY in your environment or .env file.");
    console.error("Please sign up at https://console.groq.com/keys, create an API key,");
    console.error("and add it to your .env file as GROQ_API_KEY=<your-key> to use the read command.");
    process.exit(1);
  }

  // 2. Setup Short Term Memory Directory
  // Determine if we're in the dev repo (blueprints) or target repo (.konductor)
  const isDev = fs.existsSync(path.join(process.cwd(), "blueprints"));
  const konductorDir = isDev ? "blueprints" : ".konductor";
  const shortTermDir = path.join(process.cwd(), konductorDir, "memory", "short-term");

  if (!fs.existsSync(shortTermDir)) {
    fs.mkdirSync(shortTermDir, { recursive: true });
  }

  const parsedOutputFile = path.join(shortTermDir, `parsed_${Date.now()}.txt`);

  // 3. Parse File using LiteParse
  console.log(`\n🔍 Parsing file: ${filePath}...`);
  try {
    execSync(`npx --yes @llamaindex/liteparse@latest parse "${filePath}" --format text -o "${parsedOutputFile}"`, {
      stdio: "inherit",
    });
  } catch (err: any) {
    console.error(`\n❌ Failed to parse file: ${err.message}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(parsedOutputFile, "utf-8");
  if (!fileContent.trim()) {
    console.error("\n❌ Parsed file is empty. Could not extract text.");
    process.exit(1);
  }

  console.log("✅ File successfully parsed. Asking LLM for analysis...\n");

  // 4. Call Groq API
  try {
    const analysis = await callGroqAPI(fileContent, groqApiKey);
    console.log("=========================================");
    console.log("🤖 LLM ANALYSIS:");
    console.log("=========================================\n");
    console.log(analysis);
    console.log("\n=========================================");
  } catch (err: any) {
    console.error(`\n❌ Failed to call Groq API: ${err.message}`);
    process.exit(1);
  }
}

export async function callGroqAPI(content: string, apiKey: string): Promise<string> {
  const models = ["meta-llama/llama-4-scout-17b-16e-instruct", "llama-3.3-70b-versatile"];
  
  for (const model of models) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: "You are an expert analyst. Read the provided document text and provide a highly concise but comprehensive summary or extraction of core meaning."
            },
            {
              role: "user",
              content: content
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err: any) {
      console.warn(`⚠️ Warning: Failed to use model ${model}: ${err.message}`);
      if (model === models[models.length - 1]) {
         throw new Error("All Groq models failed.");
      }
      console.log(`🔄 Falling back to the next model...`);
    }
  }
  /* v8 ignore next */
  return "";
}

/* v8 ignore start */
const isMainModule = typeof require !== 'undefined' && require.main === module;
const isMainTsx = typeof process.argv[1] === 'string' && process.argv[1].endsWith('read-file.ts');

if (isMainModule || isMainTsx) {
  main().catch(err => {
    console.error("Runtime error:", err);
    process.exit(1);
  });
}
/* v8 ignore stop */
