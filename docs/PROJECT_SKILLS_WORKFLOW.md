# Project Skills & Workflows

> **Note to Adopters:** This file contains custom project-specific workflows, shorthand slash commands, and repeatable AI skills. AI agents read this document to learn how to safely deploy your app, manage routine tasks, and respond to your custom commands. Edit the examples below to fit your repository's stack and tooling.

---

## Custom Skills

Custom skills define repeatable, complex procedures that the AI should know how to execute seamlessly without needing step-by-step instructions from you every time.

### ❖ [Sample Skill] Generate Database Migration
**Trigger phrases:** "Create a migration", "Migrate the database"
**Steps for AI Agent:**
1. **Analyze:** Look at the changes made to the schema files.
2. **Generate:** Run `npm run db:generate --name {migration_name}` to scaffold the SQL files.
3. **Review:** Present the generated SQL code in `supabase/migrations/` to the user and ask for approval.
4. **Apply:** Once approved, instruct the user to run `npm run db:push`, or run it yourself if authorized.

### ❖ [Your Custom Skill Name]
**Trigger phrases:** [...]
**Steps for AI Agent:**
1. [...]
2. [...]

---

## Custom Workflows

Workflows are rigid, multi-step processes (like deployments, database resets, or releases) that require strict adherence to safety protocols and sequential commands.

### 🚀 [Sample Workflow] Deploy to Staging
**Trigger phrases:** "Deploy to staging", "Push to staging"
**Execution strictness:** HIGH - Do not skip validation steps.
**Steps for AI Agent:**
1. **Validate:** Run `npm run lint` and `npm run test`. If either fails, STOP and ask the user to fix the errors.
2. **Build:** Execute `npm run build:staging`.
3. **Deploy:** Execute `npx vercel --target=staging --yes`.
4. **Report:** Read the Vercel CLI output, extract the deployment URL, and present it clearly to the user.

### 🚀 [Your Custom Workflow Name]
**Trigger phrases:** [...]
**Execution strictness:** [HIGH / MEDIUM / LOW]
**Steps for AI Agent:**
1. [...]
2. [...]

---

## Custom Slash Commands

Shorthand slash commands allow the human driving the AI to quickly execute a sequence of actions without typing out a full instruction.

- **`/lint`**: Run `npm run lint -- --fix`. Automatically resolve any auto-fixable formatting issues, and list any remaining manual fixes required.
- **`/pr-ready`**: Run tests, format the code, and summarize the git diff into a comprehensive Pull Request description format based on Conventional Commits.
- **`/restart-dev`**: Kill any running `localhost` ports for the dev server, clear the `.next` cache, and run `npm run dev` again cleanly.
- **`/[your-command]`**: [Describe exactly what the AI should do when the user types this command]