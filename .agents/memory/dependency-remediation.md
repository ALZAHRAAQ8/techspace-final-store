---
name: Dependency remediation
description: Handling transitive vulnerabilities when upstream packages have no patched release.
---

Prefer compatible package updates, but replace a small dependency with a supported Node built-in when its latest release still introduces an unpatched vulnerability. Avoid disguising an unpatched package with an alias or suppressing its audit finding.

**Why:** The globbing dependency had no patched release for its brace parser; keeping the latest version would not resolve the security finding.

**How to apply:** Check the latest upstream release and preserve file-discovery behavior with regression tests before replacing the dependency. For upstreams that pin a vulnerable dependency, use a narrowly scoped override and verify their integration with the patched version.
