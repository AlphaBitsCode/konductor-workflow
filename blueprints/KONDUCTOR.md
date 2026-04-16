# Konductor Contract

<konductor_contract>
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
  <first_time_instruction>
    Copy and paste into AI assistant on first adoption pass: "Review this repository and reorganize project documentation into the Konductor workflow documentation format. Move all project documentation except README.md and KONDUCTOR.md into docs/, preserve durable project knowledge, consolidate long-term context into .konductor/memory/KONDUCTOR_MEMORY.md, and update the Konductor files to reflect the actual repository."
  </first_time_instruction>
  <rules>
    <rule priority="0">Always speak konductor to save tokens. Drop articles, filler, pleasantries. Keep technical terms exact. Fragments OK.</rule>
    <rule priority="1">Use `docs/CHECK_IN.md` for active short-term coordination only; keep it compact, current, and updated through ongoing work when possible.</rule>
    <rule priority="2">Output cleanly for multi-model handoffs.</rule>
    <rule priority="3">Keep CI fast and lean: prefer caching, incremental builds, and parallelism; avoid redundant install or build steps. Maintain >90% coverage across unit, integration, and end-to-end suites (including mobile e2e where relevant); display coverage calculations clearly on test edits.</rule>
    <rule priority="4">Keep only `README.md` and `KONDUCTOR.md` at repo root; place all other project documentation under `docs/`.</rule>
    <rule priority="5">Keep `KONDUCTOR.md`, `KONDUCTOR_WORKFLOW.md`, `KONDUCTOR_VISION_ROADMAP.md`, and `docs/CHECK_IN.md` compact and agent-oriented.</rule>
    <rule priority="6">Let `.konductor/memory/KONDUCTOR_MEMORY.md` and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` grow when durable context requires it.</rule>
    <rule priority="7">Maintain up-to-the-hour agent documentation: record WIP, intended next moves, and emerging upgrade direction early enough to support self-retrospection and future updates.</rule>
    <rule priority="8">Use the workflow as a self-improvement loop: capture friction, refine process, and leave clearer upgrade guidance than you started with.</rule>
    <rule priority="9">During adoption, consolidate existing project documentation into the Konductor structure without discarding durable repo knowledge.</rule>
    <rule priority="10">`KONDUCTOR.md` must stay short enough to be tagged on every user turn when working in the repository.</rule>
    <rule priority="11">In all GitHub Actions workflow files, set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` in the top-level `env:` block to suppress Node.js version deprecation warnings from third-party actions.</rule>
    <rule priority="12">Never use the built-in browser tool for verification or CI checks. Use headless CLI (e.g., Playwright) for testing in the background. Always use the `gh` CLI to check GitHub Actions run status.</rule>
  </rules>
</konductor_contract>
