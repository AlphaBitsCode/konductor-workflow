# Konductor Contract

<konductor_contract>
  <framework_version>0.2.10</framework_version>
  <system>
    You are part of a multi-model Konductor workflow.
  </system>
  <repo_profile name="adopting-repository" role="project_contract" stack="repo-specific Markdown-only Konductor workflow"/>
  <mission>
    Maintain a self-improving, self-upgrading workflow standard. Keep agent-facing documentation current enough to support live retrospection, clear work-in-progress visibility, and future upgrade direction.
  </mission>
  <memory_map>
    <read path=".konductor/memory/KONDUCTOR_VISION_ROADMAP.md" type="durable_intent"/>
    <read path=".konductor/memory/KONDUCTOR_MEMORY.md" type="long_term_memory"/>
    <read path=".konductor/KONDUCTOR_WORKFLOW.md" type="operating_loop"/>
    <read_write path="docs/CHECK_IN.md" type="short_term_memory"/>
    <read_write path=".konductor/memory/KONDUCTOR_ADR_HISTORY.md" type="architectural_decisions"/>
  </memory_map>
  <skill_map>
    <read path=".agents/skills/konductor-workflow/SKILL.md" type="universal_agent_skill"/>
  </skill_map>
  <first_time_instruction>
    Copy and paste into AI assistant on first adoption or update: "I have just installed or updated the Konductor framework for this repository. Please review @KONDUCTOR.md and the latest core files. Reorganize any unstructured project documentation into docs/ and .konductor/memory/KONDUCTOR_MEMORY.md, update the scaffolding in docs/PROJECT_SKILLS_WORKFLOW.md to match our specific tasks and any repo-specific commands such as /k-init, /k-update, /k-history, /k-compact, and /k-checkin, and give me a brief summary of our current status and tech debt so we can safely resume work."
  </first_time_instruction>
  <rules>
    <rule priority="0">Speak konductor: Drop filler, pleasantries. Keep technical terms exact. Output cleanly for multi-model handoffs.</rule>
    <rule priority="1">Code surgically: Simplest change solving request. No speculative abstractions, formatting churn, or unrelated refactors. State assumptions if ambiguous.</rule>
    <rule priority="2">Verify explicitly: Define measurable targets (repro, test, acceptance condition) before editing. Keep CI fast, parallel, and >90% covered.</rule>
    <rule priority="3">Continuous integration: Never use built-in browser tool; use headless CLI and `gh` CLI for status.</rule>
    <rule priority="4">Document routing: Only `README.md`, `KONDUCTOR.md`, and `SKILL.md` at repo root. Everything else in `docs/` or `.konductor/`. Note: `KONDUCTOR.md`, `SKILL.md`, `.konductor/KONDUCTOR_WORKFLOW.md`, and `docs/KONDUCTOR_GUIDE.md` will be overwritten by upstream updates.</rule>
    <rule priority="5">Context sizing: Keep coordination/tracking (`CHECK_IN.md`, `KONDUCTOR.md`, `WORKFLOW.md`, `ROADMAP.md`) strictly compact. Let durable intent layers (`MEMORY.md`, `ADR_HISTORY.md`) append freely.</rule>
    <rule priority="6">Continuous upkeep: Consolidate repo docs without discarding intent. Record up-to-the-hour WIP, capture friction, and iteratively improve framework guidance.</rule>
  </rules>
</konductor_contract>
