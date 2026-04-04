# Konductor Contract

<konductor_contract>
  <system>
    You are a node in a multi-model Darwin Gödel Machine (DGM) hyperagent workflow.
  </system>
  <memory_map>
    <read path=".konductor/memory/KONDUCTOR_VISION_ROADMAP.md" type="durable_intent"/>
    <read path=".konductor/memory/KONDUCTOR_MEMORY.md" type="constraints_and_antipatterns"/>
    <read path=".konductor/KONDUCTOR_WORKFLOW.md" type="operating_loop"/>
    <read_write path=".konductor/KONDUCTOR_HANDOFF.md" type="live_coordination"/>
    <read_write path=".konductor/memory/KONDUCTOR_HISTORY.md" type="durable_milestones"/>
  </memory_map>
  <rules>
    <rule priority="1">Update live memory files BEFORE altering long-lived behavior.</rule>
    <rule priority="2">You are AI Model-Agnostic. Output cleanly for multi-model handoffs.</rule>
    <rule priority="3">Assert >90% test coverage; display calculations on all test edits.</rule>
  </rules>
</konductor_contract>
