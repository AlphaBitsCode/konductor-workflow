# The Human's Guide to Konductor 

Welcome to the Konductor Framework! If you're a developer starting out with an AI-driven codebase, you'll be using Konductor like a "boss persona" that governs your AI agents (Claude, Cursor, GitHub Copilot, Antigravity, etc.). 

This guide teaches you how to **command** the AI instead of just endlessly chatting with it.

---

## 1. The Magic of `@KONDUCTOR.md`

In regular AI chats, the AI forgets the project's rules, architecture, and current goals as the chat gets longer. 
By putting `@KONDUCTOR.md` at the end of your prompt, you instantly inject the AI with the project's critical "Memory Map," rules, and context.

**How to use it:**
_Always_ tag `@KONDUCTOR.md` in your main requests. It's tiny, costs ~100 tokens, and forces architectural alignment.

> ❌ **Bad:** "Add a new endpoint for user login."
> *(The AI guesses your DB provider, invents generic logic, breaks your architecture.)*

> ✅ **Good:** "Add a new endpoint for user login. @KONDUCTOR.md"
> *(The AI reads the memory map, realizes you use Turso and JWT, and writes code that perfectly fits the existing codebase.)*

---

## 2. Power Tips & Cheat Codes

Here is the master list of commands and workflows you should use natively in your day-to-day work:

### 1. Starting a New Day (Or Changing Tasks)
When you sit down to code or start a fresh AI chat window, re-sync the AI's short-term memory immediately:
> *"Where are we? What should we do next? Read `@KONDUCTOR.md` and `@docs/CHECK_IN.md`"*

### 2. Multi-Step Execution (Boss Mode)
Don't micromanage the AI. Tell it what you want, point it to the contract, and let it execute step-by-step.
> *"Investigate this database timeout error, apply a minimal fix, update the test suite, and check-in your work to `@docs/CHECK_IN.md`. Ensure you read `@KONDUCTOR.md` before starting."*

### 3. Teaching the AI a Permanent Lesson
Instead of correcting the AI over and over across multiple chats, write the correction into its permanent memory.
> *"You used the wrong padding class. We use standard CSS, not Tailwind. Add a strict rule against using Tailwind anti-patterns to `.konductor/memory/KONDUCTOR_MEMORY.md` so you never repeat this error."*

### 4. Handling Big Architectural Shifts
Decided to switch from Zustand to Redux? Don't let the AI guess.
> *"We are switching our state manager. Write a quick Architecture Decision Record in `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` explaining why."*

### 5. Initial Setup / Onboarding a Repo
If you just installed Konductor into an existing project, run this prompt to let the AI organize your repository:
> *"Read `@KONDUCTOR.md` and refactor, compact all existing documentation to match the current progress and decisions made before. Tell me where we are at and what our critical tech debts are."*

### 6. Markdown-Driven Execution
Force the AI to plan and record its roadmap to disk **before** touching application code.
> *"Write down an execution plan for the auth feature into `docs/CHECK_IN.md`. Wait for my approval before you write any code."*

### 7. The `/compact` Command (Keep Context Lean)
To keep the AI context lean and make sessions run significantly faster without losing historical knowledge, you should regularly compress the project's documentation. This is the preferred way to "clean up" your AI's token usage every now and then after a long sprint.
> *"/compact - Read `@KONDUCTOR.md`, then review `@docs/CHECK_IN.md`. Archive all completed tasks into `.konductor/memory/KONDUCTOR_MEMORY.md`, delete stale notes, and summarize the current active goals to be as short and lean as possible."*

### 8. Creating & Updating Custom Skills
Over time, your project will develop highly repetitive tasks (like scaffolding a specific component architecture, or deploying a database change). Rather than re-typing these complex instructions, have the AI encode them as "Project Skills."
> *"We create new React components constantly. Create a new custom skill in `@docs/PROJECT_SKILLS_WORKFLOW.md` detailing the exact 4 steps needed to generate, style, and test a component following our strict design system, so you can do it automatically next time I ask."*

---

## 3. Demystifying The Memory Files

Wondering what all these files the AI creates do? It's simply a brain divided into files:

- **`KONDUCTOR.md`**: The basic rules. The compact rulebook the AI reads every time to know who it is.
- **`docs/CHECK_IN.md`**: The sticky note on your monitor. Very short-term tasks and WIP. *Keep it compact.*
- **`.konductor/memory/KONDUCTOR_MEMORY.md`**: The Long-term Memory. Shared knowledge, tech stack details, and ongoing conventions.
- **`.konductor/memory/KONDUCTOR_ADR_HISTORY.md`**: The Ledger. A history of *why* major tech decisions were made.
- **`.konductor/memory/AGENT_BEHAVIOR.md`**: The anti-patterns guide to stop the AI from writing sloppy code loops.
- **`.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`**: The True North. The overall non-technical business or project roadmap. 

If this is your first time using an Orchestrated AI Workflow, welcome to the future! You are now working with a tech Konductor, or you could be the Konductor yourself, and the AI Agents are the eager interns ready to follow your lead.
