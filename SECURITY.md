# Security Policy

## Self-Contained & Local-First

The Konductor AI Framework is strictly built on **self-contained, self-host practices**. We believe that your enterprise workflow, coding constraints, and architecture decisions should be tightly governed by you.

- **Data Stays Local:** All framework-generated data—including your project roadmap, memory files, `secondbrain.db`, and handoff scratchpads—are stored exclusively on your local machine.
- **No Telemetry:** You hold the keys. The framework does NOT send any of your proprietary data, logs, or metrics to a central server.
- **Bring Your Own Model:** The only time data leaves your machine is during direct interaction with an LLM of your choosing. Since the framework is model-agnostic, you can route it specifically to your private cloud or keep it 100% air-gapped using local models (like Ollama).

## Encryption at Rest

At this time, data stored via the framework (like `secondbrain.db` and the Markdown logs) resides as plain text on your local drive to ensure ease of reading for IDE assistants. 

**We have not yet implemented encryption-at-rest, but this is a planned minor update for future releases.** In the meantime, we strongly recommend using OS-level full-disk encryption (e.g., macOS FileVault, Windows BitLocker, or Linux LUKS) to secure your physical data.

## Suggesting Security Improvements

Security is an evolving standard. If you discover a vulnerability or have a suggestion for better security practices, please open a GitHub Issue in the repository so we can address it as a community.
