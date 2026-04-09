# Chat Communication Test Suite

**Prerequisite:** No Mira AI published.

## Test Files

### basic-chat.spec.ts

- Visitor sends message via Test Conversation
- Operator receives message in inbox

### operator-response.spec.ts

- Visitor sends message
- Operator responds
- Visitor receives response

### file-upload.spec.ts

- Visitor uploads file attachment
- Operator receives file in conversation

### E2Echat.spec.ts (E2E - 120s timeout)

- Multiple message exchanges
- File upload and delivery
- Operator resolves conversation
- Visitor rates conversation (negative)
- Rating confirmation

### backofficeOptions.spec.ts

- Click search input in inbox filters

## Run Tests

```bash
npx playwright test tests/task02
npx playwright test tests/task02 --headed
```
