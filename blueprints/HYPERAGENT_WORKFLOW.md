# Hyperagent Self-Improvement Workflow

This document defines a reusable Darwin Godel Machine with Hyperagents (DGM-H) workflow for a software repository. It is intentionally generic and should be adapted to the stack, evaluation loop, and safety requirements of the adopting project.

## 1. Core Concept

A hyperagent combines:

1. A task agent that performs repository work such as fixing bugs, improving tests, or maintaining documentation.
2. A meta agent that analyzes outcomes and modifies the overall agent behavior, including its own prompts, memory, and maintenance loop.
3. An archive that preserves evaluated variants so future iterations can branch from more than one historical path.

The key difference from a fixed meta-agent design is that the improvement mechanism is itself editable. This enables metacognitive self-modification instead of only task-level optimization.

## 2. Reference Loop

```python
def dgm_h_loop():
    archive = load_archive("blueprints/agents.db")
    memory = load_memory("blueprints/AGENT_MEMORY.md")
    history = load_history("blueprints/AGENT_HISTORY.md")

    while budget_remaining():
        parent = select_parent(archive)
        child, decision = parent.self_modify(
            repository_state=get_latest_repo_state(),
            evaluation_results=run_evaluations(),
            constraints=memory,
        )

        score, is_valid = evaluate(child)

        if is_valid:
            archive.add(child, score)
            append_history(history, child, decision, score)

            if decision.requires_adr:
                write_adr("blueprints/decisions/", decision)

            if score > archive.best_score():
                deploy_as_primary(child)
                update_memory_from_decision(memory, decision)
```

## 3. Recommended Components

### Working memory

`blueprints/AGENT_MEMORY.md` should capture:

- hard stack constraints
- known anti-patterns
- runtime assumptions
- safety boundaries
- lessons that should persist across iterations

### History log

`blueprints/AGENT_HISTORY.md` should capture:

- major iterations
- changes to the maintenance loop
- evaluation results
- important regressions and recoveries

### ADRs

Use `blueprints/decisions/` for durable architectural and metacognitive decisions. Good candidates include:

- changes to evaluation strategy
- new memory or tracking mechanisms
- safety policy changes
- major self-modification rules

### Housekeeping loop

`blueprints/scripts/housekeeping.ts` is the executable starter loop. It should remain small, auditable, and easy to customize.

## 4. Evaluation Design

A framework loop is only as good as its evaluation signals. Customize the loop around checks that reflect the actual quality bar of the adopting repository, such as:

- build success
- unit and integration tests
- linting or static analysis
- end-to-end validation
- security checks

Do not treat raw metric optimization as sufficient proof of progress. Include human review or held-out verification when the target behavior is subjective or easy to game.

## 5. Suggested Parent Selection

The research paper uses a score-plus-novelty parent selection approach where strong agents are sampled more often and agents that have already produced many descendants are down-weighted. A practical implementation can approximate this by weighting parent selection by:

- recent performance
- validation score
- lineage novelty
- number of successful children already explored

If your implementation starts with fixed parent selection, document that explicitly so later modifications are deliberate and reviewable.

## 6. Safety Notes

Two risks should be assumed from the start:

1. Benchmark bias: the loop will optimize the evaluation targets you provide, including their blind spots.
2. Evaluation gaming: a system can raise measured scores without improving the underlying objective.

Mitigations should include:

- held-out evaluation tasks
- periodic human review
- explicit constraints in `AGENT_MEMORY.md`
- ADRs for major policy changes

## 7. Adopter Checklist

Before running the loop in a real repository:

1. replace placeholder evaluation commands
2. define what counts as a valid child variant
3. define archive retention and scoring policy
4. document stack constraints and anti-patterns
5. decide when human approval is required
