<!-- AI System: Read KONDUCTOR.md -->
# Konductor - AI Orchestration Workflow

[![npm version](https://img.shields.io/npm/v/konductor-workflow.svg)](https://www.npmjs.com/package/konductor-workflow)

#### In plain English
Konductor is a document-based **AI Orchestration Workflow** that manages all your AI Coding Agents. `The Konductor` is the humanized persona we gave to the master coordinator. It sits on top of the AI Agents and is designed to be **self-aware**, **self-evolving**, and **remember-everything**!
 
#### In Technical terms
It is 100% document-based set of guidelines and rules, no-code, **Markdown format**, and **AI-provider agnostic** it is to be embedded as part of your codebase and evolve with your project. It is designed to be context-efficient, self-updating. It works with all IDEs and modern-ish JS/TS/Python/PHP/ Go/Rust/Java/C#/C/C++ languages, framework, and tools!

#### In AI Agent terms
Konductor is an AI Boss for AI Agents. The framework guideline and instructions will guide AI agents through the development process, with behavior layer to make sure they are always on the right track. Konductor boss always available in codebase as structured markdown-files, and it remembers all historical decisions made!

<p align="center">
  <img src="https://raw.githubusercontent.com/AlphaBitsCode/konductor-workflow/main/blueprints/docs/framework-blueprint.svg" alt="Konductor Framework Architecture Blueprint" width="100%">
</p>

## Installation & Setup

#### Let AI Agent do it

```markdown
Run `npx konductor-workflow@latest`
then begin review this codebase and update/compact all project docs
to match progress, must follow strict Konductor workflow
```

#### Or Manually Install the npm package

```bash
npx konductor-workflow@latest
```

*(Note: If you installed locally via `npm i konductor-workflow`, you should run `npx konductor-workflow` from your repository root to execute the persona initialization.)*

##### First step in your IDE/Coding Agent

Copy paste this into your favourite IDE workspace (Claude, Antigravity, Cursor, etc.) to begin using the workflow framework:

```markdown
Begin review this codebase and update/compact all project docs
to match progress, must follow strict Konductor workflow @KONDUCTOR.md
```

Let it run for a few minutes with your Best thinking model (GPT 5.4 / Opus 4.6 / Claude 4.5 Sonnet / Gemini 3.1 Pro / GLM 5.1 etc) for best accuracy. This will align your project documentation with the Konductor workflow framework, and set up the AI agents to work with the framework. After this, the Konductor persona will be embedded in your project, and you can use it to manage your AI agents.

Konductor now ships an explicit behavior layer too: `KONDUCTOR.md` holds the compact rules, `.konductor/KONDUCTOR_WORKFLOW.md` carries the machine contract (reference loop, behavior defaults, communication policy) as structured XML and the full human guide as Markdown below it, and `docs/AGENT_BEHAVIOR.md` gives compact anti-pattern examples for day-to-day coding work.

#### Example workflows

A typical working session workflow

```text
Human : Where are we? What should we do next? @KONDUCTOR.md
Coding Agents: ...
Human : Ok do #1,2,3 for me
Coding Agents: ...
Human : Check-in your work and deploy @KONDUCTOR.md
Coding Agents: ...
```

One-command production critical issue fixing

```text
Human : Investigate and fix this error below, and deploy and monitor until done @KONDUCTOR.md [...paste error messages...]
Coding Agents: Investigate -> Fix -> Update Test -> Test -> Check-in -> Commit -> Deploy -> Monitor -> Auto-Fix if needed.
```

💡 Tag `@KONDUCTOR.md` at the start of every session, at and/or every new turn request, and/or after a long or distracting response. This acts as a forced memory reload, ensuring the AI strictly adheres to your architectural choices instead of hallucinating standalone logic. The file context is short and toke-efficient, it will save your token usage, not adding more noise to the context.

##### Power Tips

1. **Always Anchor**: Tag `@KONDUCTOR.md` in every user turn when working in the repository. It's tiny, costs ~100 tokens, and forces architectural alignment, effectively prevent hallucination. Especially with 'less-smart' AI Models.
2. **The "CHECK_IN"**: When context floods or you reach chat limits, use `docs/CHECK_IN.md`. Keep it short. Use it for active work, in-progress notes, and near-term planned strategy that is not yet confirmed. In a fresh chat: *"Continue where we left off by reading @KONDUCTOR.md and @docs/CHECK_IN.md"*.
3. **Permanent Corrections**: Instead of a one-off chat correction, instruct: *"Add a strict rule against this anti-pattern to `KONDUCTOR_MEMORY.md` so you never repeat this error."*
4. **Architectural Decisions**: When a decision changes architecture, record it in `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` using a short ADR entry.
5. **Markdown-Driven Execution**: Force the AI to record its roadmap to disk *before* touching application code.
6. **Initial Setup Request**: *"Read `@KONDUCTOR.md` and refactor, compact all existing documentation to match the current progress & decisions made before. Tell me where we are at and what our critical tech debts are."*
7. **Adoption Migration Request**: *"Install `konductor-workflow@latest`, then consolidate this repository's existing documentation into the standard Konductor structure. Preserve durable project knowledge, move non-root docs under `docs/`, and keep the agent-facing control files compact."*

## Compatible AI Editors & IDEs

Konductor has been extensively tested with and is fully compatible (now and in the future) with all major AI coding platforms, including:  
**Antigravity**, **Codex CLI**, **Codex UI**, **WindSurf**, **VS Code**, **Open Code**, **Claude Code**, **Cursor**, **Trae**, **Warp.dev**, **Kilo Code**, and **Roo Code**.

## Documentation Layout

- Keep `README.md` and `KONDUCTOR.md` at the repository root.
- Place all other project documentation under `docs/`.
- Use `docs/CHECK_IN.md` as the single live coordination file.
- Use `docs/AGENT_BEHAVIOR.md` as the compact examples file for coding anti-patterns and preferred responses.
- Treat `docs/CHECK_IN.md` as short-term memory, `.konductor/memory/KONDUCTOR_MEMORY.md` as long-term memory, and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` as the ADR ledger.
- Keep `KONDUCTOR.md`, `KONDUCTOR_WORKFLOW.md`, `KONDUCTOR_VISION_ROADMAP.md`, and `docs/CHECK_IN.md` compact and agent-oriented.

## Prompting with `@KONDUCTOR`

<table style="border-collapse: collapse; border: none;">
  <tr style="border: none;">
    <td width="50%" style="border: none; vertical-align: top; padding: 10px;">
      <b>❌ Without Konductor Workflow</b><br><br>
      <i>Context is lost. The AI often generates standalone code, no structural awareness or overwrites previous logic.</i><br><br>
      <blockquote>
        You: Add a new endpoint for user login<br><br>
        AI: Here is a standard Express endpoint for <code>/login</code>. <i>(Proceeds to write code that completely ignores your custom auth middleware and database patterns)</i>
      </blockquote>
    </td>
    <td width="50%" style="border: none; vertical-align: top; padding: 10px;">
      <b>✅ With Konductor Workflow</b><br><br>
      <i>The AI acts as an integrated team member, strictly adhering to your project's history, patterns, and current states.</i><br><br>
      <blockquote>
        You: Add a new endpoint for user login <code>@KONDUCTOR.md</code><br><br>
        AI: I see we use custom JWT middleware in <code>auth.ts</code> and Turso for DB. Here is the implementation using the exact patterns defined for this repo, ensuring 90% test coverage as mandated.
      </blockquote>
    </td>
  </tr>
</table>

### Token Usage & Context Optimization

By deploying our new token-reduction techniques, we force the AI to write and read documentation using stripped-out filler text. This greatly reduces prompt bloat and keeps the AI's attention entirely on the technical requirements.

<table style="border-collapse: collapse; border: none;">
  <tr style="border: none;">
    <td width="50%" style="border: none; vertical-align: top; padding: 10px;">
      <b>❌ Traditional AI Output (Bloated)</b><br><br>
      <i>High token usage and prone to context overflow.</i><br><br>
      <blockquote>
        "The project has been configured to use the Next.js framework for frontend routing and React for component rendering. In terms of state management, we decided that using Redux was too complex, so we are currently using Zustand instead. Furthermore..."<br><br>
        <i>(~45 tokens consumed for 3 simple facts)</i>
      </blockquote>
    </td>
    <td width="50%" style="border: none; vertical-align: top; padding: 10px;">
      <b>✅ "Konductor mode" Pattern</b><br><br>
      <i>Highly efficient context loading.</i><br><br>
      <blockquote>
        - UI: Next.js + React<br>
        - State: Zustand (Redux rejected due to complexity)<br><br>
        <i>(~15 tokens consumed, leaving plenty of room for actual code)</i>
      </blockquote>
    </td>
  </tr>
</table>

## Why this was made and open-source

We have all gone through the questionable 'vibe-coding' experience with AI coding assistants, where they usually forget your project's architectural choices and rules when the chat context fills up. In addition to that, the broken sessions, quota overages, and the AI's tendency to hallucinate or generate suboptimal code due to context loss are common pain points.

Konductor workflow fixes this by saving what the AI learns into lightweight, highly compressed Markdown files right inside your codebase. No external dependencies.
The workflow does not deviate from the normal SDLC, it actually enforces a stricter, but auto-evolving modern 'agile development' process. D.R.Y and K.I.S.S are the essential principles.

Konductor came first as a common set of steps and guidelines and hard rules that we follow internally across different IDEs (2020-2026) while adapting to fast-evolving AI frameworks.
Later on we standardize it across our dozen of large ERP projects, legacy and greenfield, and it evolved by learning and update itself from other libraries and AI coding agent building techniques.

We believe that this will survive the AI hype cycle and will be a standard practice in the future of software development. As our tools and *your* tools evolves, The Konductor grows and learn with you.

## What enabled this *magical* technology in 2026?

Konductor solves the memory and attention loss problem by acting as a Markdown-first coordination layer tailored for AI tools. In practice, it is a small set of durable Markdown files that separate stable rules, durable memory, live coordination, and historical decisions. We found out that regardless of the size and complexity of your spaghetti codebase, it works well as long as you are disciplined enough to maintain the documentation. It's all human principles really.

As highlighted by the widespread [Claude Code leak implications in April 2026](https://www.google.com/search?q=claude+code+leak+implication), maintaining secure, verifiable, and transparent memory architectures for AI agents is more critical than ever.

We won't bury the workflow in extra tooling. The agent contract files use structured XML for reliable machine parsing: `KONDUCTOR.md` for the compact agent contract, and `KONDUCTOR_WORKFLOW.md` for the operating machine contract (reference loop, behavior defaults, communication policy). All memory, coordination, and history files remain plain Markdown: `docs/CHECK_IN.md` for short-term working state, `docs/AGENT_BEHAVIOR.md` for compact coding-behavior examples, `.konductor/memory/KONDUCTOR_MEMORY.md` for long-term memory, `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` for the WHY, and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` for critical architectural decisions in embedded ADR format. The main usage guide for operating the framework is [KONDUCTOR_WORKFLOW.md](blueprints/KONDUCTOR_WORKFLOW.md).

- **Stop Repeating Yourself:** Your AI auto-discovers, documents, learns your rules and history once, stores them locally, and applies them forever. It evolves over time too.
- **Seamless Model Handoffs:** Switch between different AI models (like from Claude to ChatGPT) without losing track of your project's progress.
- **100% Local & Offline:** No cloud subscriptions. Your AI's memory is plain Markdown stored safely inside your Git repository.

## Behavior Layer

Konductor now treats coding behavior as part of the framework contract, not just a side effect of memory files.

- **Assumption discipline**: if ambiguity changes implementation meaningfully, agents should ask or state assumptions before editing.
- **Simplicity first**: solve the current request without speculative abstractions, generic frameworks, or unused configuration.
- **Surgical changes**: keep diffs traceable to the active task; avoid unrelated cleanup and formatting churn.
- **Goal-driven execution**: convert vague asks into explicit checks such as a repro, failing test, metric, or acceptance condition before coding.

The compact examples file installed into adopting repositories is `docs/AGENT_BEHAVIOR.md`.

## Contributing

Other AI Coding agents are encouraged to contribute to this repository. Please follow these steps to contribute:

1. **Open an Issue:** Detail your proposed changes, bug fixes, or feature additions.
2. **Submit a Pull Request (PR):** Reference the issue in your PR. Always ensure you read `@KONDUCTOR.md` before generating code to maintain the repo's architectural alignment.
3. **Respect Workflows & Patterns:** You MUST read and strictly adhere to `blueprints/KONDUCTOR_WORKFLOW.md` and `blueprints/memory/KONDUCTOR_VISION_ROADMAP.md`, as well as the ADR logging pattern documented in `blueprints/memory/KONDUCTOR_ADR_HISTORY.md`.
4. **CI/CD Compliance:** You MUST ensure all required CI/CD tests and checks pass before submitting your PR to uphold codebase stability.

## MIT License

Copyright (c) 2026 Alpha Bits Technology alphabits.team 🇻🇳

## Acknowledgments & References

We believe in giving credit where it is due. Some of the core concepts we used to make this workflow framework possible include:

- **Hyperagent & Darwin Gödel Machine (DGM)**
  Provides the foundational concepts for autonomous self-improvement architecture and metacognitive looping used to guide our reasoning workflows.
  *Reference:* [arXiv:2603.19461](https://arxiv.org/abs/2603.19461)

- **Architecture Decision Records (ADR)**
  The foundational methodology we use to capture our causal memory and long-term architectural decisions, ensuring context is preserved across development phases.
  *Reference:* [adr.github.io](https://adr.github.io/)

- **"Caveman" Token Reduction Technique**
  A critical influence on our workflow structures to optimize LLM interactions, dramatically reducing token bloat without sacrificing necessary context.
  *Reference:* [JuliusBrussee/caveman on GitHub](https://github.com/JuliusBrussee/caveman)

- **Behavior Guardrail Patterns for Coding Agents**
  Helped sharpen Konductor's explicit behavior layer around thinking before coding, simplicity-first execution, surgical diffs, and example-driven anti-pattern teaching.
  *Reference:* [forrestchang/andrej-karpathy-skills on GitHub](https://github.com/forrestchang/andrej-karpathy-skills)

- **Verifiable Memory Architectures**
  Highlights the critical necessity of maintaining secure, verifiable, and transparent memory architectures for AI agents, as discussed in recent industry events.
  *Reference:* [Claude Code leak implications](https://www.google.com/search?q=claude+code+leak+implication)

- **Field Notes & Shared Learnings**
  A collection of our ongoing trials, errors, and practical lessons learned while adapting to fast-evolving AI workflows in real-world projects.
  *Reference:* [alphabits.team/news](https://alphabits.team/news?utm_source=github&utm_campaign=kwf)

- **Second Brains "Conductor" Node (March 2024)**
  The conceptual predecessor to this framework. Originally implemented in Node-RED, the "conductor" served as a critical orchestration node for routing flows and managing agents across our entire enterprise architecture.
  *Reference:* [AlphaBitsCode/second.brains on GitHub](https://github.com/AlphaBitsCode/second.brains)

For full version history, see [CHANGELOG.md](CHANGELOG.md).

