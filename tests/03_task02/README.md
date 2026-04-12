# 03_task02 — Live Chat Tests

End-to-end tests for **Operator ↔ Visitor** chat communication in [Smartsupp](https://app.smartsupp.com).

Tests are prefixed with a number indicating the intended run order.

| File                              | Description                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| `00_chat-visitor-message.spec.ts` | Visitor sends a text message via the chat widget and operator receives it in the inbox     |
| `01_chat-file-upload.spec.ts`     | Visitor sends a file attachment and operator verifies it appears in the conversation       |
| `02_chat-operator-reply.spec.ts`  | Operator replies to a visitor message and visitor receives the response in the chat widget |

## Tags

| Tag            | Meaning                             |
| -------------- | ----------------------------------- |
| `@scenario`    | Full user-facing scenario test      |
| `@chat`        | Targets Live Chat functionality     |
| `@smoke`       | Basic sanity check                  |
| `@file-upload` | Covers file attachment sending      |
| `@e2e`         | End-to-end flow spanning both sides |

## Prerequisites

- Valid Smartsupp credentials in `.env` (`SMARTSUPP_USERNAME`, `SMARTSUPP_PASSWORD`)
- No Mira AI agent published — chat must be handled by a human operator
- Each test uses two browser contexts: one for the operator dashboard, one for the visitor chat widget

## See Also

- [`testCases/visitor-test-cases.md`](testCases/visitor-test-cases.md) — Manual test cases for visitor-side actions
- [`testCases/operator-test-cases.md`](testCases/operator-test-cases.md) — Manual test cases for operator-side actions
