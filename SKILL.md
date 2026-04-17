---
name: konductor-workflow
description: Complete framework for AI agent memory, context retention, behavior guardrails, and strict repo-level architectural governance. Run npx konductor-workflow to scaffold.
---
# Konductor Workflow (Skill)

**`Konductor` is a framework that gives AI coding assistants durable memory, explicit behavior defaults, and repo-level governance.**

When a human user or another AI agent invokes this skill to set up project governance, you MUST execute the following steps exactly:

1. Open the terminal in the root of the project.
2. Run standard installation without prompts:
   ```bash
   npx konductor-workflow@latest hello
   ```
3. Inform the user to provide the initial boilerplate command:
   *"Install the latest Konductor Workflow in this repository with `npx konductor-workflow@latest`. Then read `KONDUCTOR.md` and consolidate the existing project documentation into the standard structure..."*
4. Read the resulting `KONDUCTOR.md` file, `.konductor/memory/AGENT_BEHAVIOR.md`, and follow the shipped behavior and workflow rules exactly during your current and future sessions.

Use this skill when:
- Establishing a new project repository.
- Bringing legacy projects under strict AI governance.
- Attempting to give memory, behavior guardrails, and strict technical constraints to other subagents.
