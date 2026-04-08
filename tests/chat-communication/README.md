# Chat Communication Test Suite

## Overview

Automated test suite for validating Operator ↔ Visitor communication in the Smartsupp chat system. These tests cover the highest business value scenarios to ensure core chat functionality works correctly.

## Test Files Created

### 1. **visitor-to-operator.spec.ts** (Business Value: HIGH)

Tests basic message sending from visitor to operator.

**Test Cases:**

- ✅ Visitor sends message and operator receives it (SMOKE)
- ✅ Visitor sends multiple messages and all appear in operator dashboard
- ✅ Visitor message delivery within acceptable time frame (PERFORMANCE)
- ✅ Visitor sends message with special characters and emojis

**Priority:** HIGH - Core functionality for customer support

---

### 2. **operator-to-visitor.spec.ts** (Business Value: HIGH)

Tests operator response messages delivered to visitor.

**Test Cases:**

- ✅ Operator sends message and visitor receives it (SMOKE)
- ✅ Operator sends multiple sequential messages to visitor
- ✅ Operator message delivery within acceptable time frame (PERFORMANCE)
- ✅ Operator sends message using Enter key
- ✅ Operator sends message with special characters and formatting
- ✅ Visitor sees operator message while chat is minimized then maximized

**Priority:** HIGH - Essential for customer service workflow

---

### 3. **multi-message-exchange.spec.ts** (Business Value: CRITICAL)

Tests bidirectional communication with multiple message exchanges simulating real conversations.

**Test Cases:**

- ✅ Complete conversation flow - multiple exchanges (SMOKE, E2E)
- ✅ Rapid back-and-forth messaging
- ✅ Long conversation with message history persistence
- ✅ Conversation with mixed message types (text, emojis, special chars)

**Priority:** CRITICAL - Simulates actual customer interactions

---

### 4. **realtime-delivery.spec.ts** (Business Value: CRITICAL)

Tests message delivery speed, real-time updates, and synchronization.

**Test Cases:**

- ✅ Message delivery time - Visitor to Operator (PERFORMANCE, SMOKE)
- ✅ Message delivery time - Operator to Visitor (PERFORMANCE, SMOKE)
- ✅ Simultaneous message sending from both sides
- ✅ Message synchronization across page refresh
- ✅ Real-time updates without page reload
- ✅ Message delivery during high-frequency exchange (STRESS)
- ✅ Network latency simulation - Message queuing
- ✅ Conversation state consistency check

**Priority:** CRITICAL - Ensures instant communication experience

---

## Page Objects Created

### ConversationPage (`interface/ui/conversationPage.ts`)

Handles the operator side of chat communication in the dashboard.

**Key Features:**

- Navigate to inbox/conversations
- Open and manage conversations
- Send and verify messages
- Check typing indicators
- Verify message delivery and order

### ChatWidgetPage (`interface/ui/chatWidgetPage.ts`)

Handles visitor's interaction with the chat widget.

**Key Features:**

- Open and control chat widget
- Send messages from visitor side
- Verify message receipt
- Handle widget state (minimize/maximize)
- Navigate to pages with chat widget

---

## Running the Tests

### Run All Chat Communication Tests

```powershell
npx playwright test tests/chat-communication/
```

### Run Specific Test Suite

```powershell
# Visitor to Operator tests
npx playwright test tests/chat-communication/visitor-to-operator.spec.ts

# Operator to Visitor tests
npx playwright test tests/chat-communication/operator-to-visitor.spec.ts

# Multi-message exchange tests
npx playwright test tests/chat-communication/multi-message-exchange.spec.ts

# Real-time delivery tests
npx playwright test tests/chat-communication/realtime-delivery.spec.ts
```

### Run by Tag

```powershell
# Run only smoke tests
npx playwright test --grep @SMOKE

# Run high-priority tests
npx playwright test --grep @high-priority

# Run performance tests
npx playwright test --grep @PERFORMANCE

# Run business-critical tests
npx playwright test --grep @business-critical
```

### Run with Allure Reporter

```powershell
# Run tests
npx playwright test tests/chat-communication/

# Generate Allure report
allure generate allure-results -o allure-report --clean

# Open report
allure open allure-report
```

---

## Environment Variables Required

Create a `.env` file in the project root with:

```env
# Smartsupp Credentials
SMARTSUPP_USERNAME=your_username
SMARTSUPP_PASSWORD=your_password

# Chat Widget URL (page with Smartsupp widget installed)
CHAT_WIDGET_URL=https://your-test-site.com
```

**Important:** You need a website with Smartsupp chat widget installed for the visitor side tests.

---

## Test Architecture

### Two-Browser Context Setup

Each test uses **two separate browser contexts**:

1. **Operator Context** - Logged into Smartsupp dashboard
2. **Visitor Context** - Accessing website with chat widget

This simulates a real-world scenario where operator and visitor are on different devices/sessions.

### Test Flow Pattern

```
1. Setup:
   - Operator logs into dashboard
   - Visitor opens chat widget

2. Execute:
   - Messages sent between operator and visitor
   - Verifications on both sides

3. Verify:
   - Message delivery
   - Content preservation
   - Timing/performance
   - UI state consistency
```

---

## Performance Benchmarks

**Expected Message Delivery Times:**

- Visitor → Operator: < 3 seconds (without page reload)
- Operator → Visitor: < 3 seconds (real-time)
- With page reload: < 10 seconds (includes network overhead)

**Stress Test Capacity:**

- Handles 10+ messages in rapid succession
- No message loss during high-frequency exchange
- Maintains consistency across page refreshes

---

## Business Value Summary

### Why These Tests Matter

1. **Customer Support Quality**
   - Ensures customers can reach support instantly
   - Validates operator can respond quickly
   - Maintains conversation history

2. **Real-Time Communication**
   - Messages delivered in < 3 seconds
   - No delays during peak usage
   - Handles simultaneous messaging

3. **Data Integrity**
   - Special characters preserved
   - Emojis render correctly
   - Message order maintained
   - History persists across sessions

4. **User Experience**
   - Chat widget responsive
   - Operator dashboard functional
   - Offline message queuing
   - Widget state management works

---

## Test Coverage

**Functional Coverage:**

- ✅ Basic message exchange (both directions)
- ✅ Multi-message conversations
- ✅ Real-time synchronization
- ✅ Message persistence
- ✅ Special character handling
- ✅ Performance under load
- ✅ Network error handling

**Non-Functional Coverage:**

- ✅ Performance (delivery time)
- ✅ Reliability (message queuing)
- ✅ Usability (widget state)
- ✅ Stress testing (rapid exchange)

---

## Known Limitations

1. **45-Second Auto-Messages**: Tests ignore automatic inactivity messages as per requirements
2. **Scope**: Tests focus on Conversation section and Chat window only (not other dashboard sections)
3. **Typing Indicators**: Implementation depends on chat widget version
4. **Read Receipts**: Support varies by configuration

---

## Maintenance Notes

### Updating Selectors

Page objects use multiple selector strategies with fallbacks:

- `data-testid` attributes (preferred)
- Class names (fallback)
- Semantic selectors (fallback)

Update selectors in page objects if UI changes.

### Adding New Tests

1. Create new `.spec.ts` file in `tests/chat-communication/`
2. Import required page objects
3. Follow two-browser context pattern
4. Add appropriate tags for filtering
5. Update this README with new test info

---

## Support

For issues or questions about these tests, refer to:

- Test plan: `tests/chat-communication-test-plan.md`
- Original task: `tests/task02/task02.txt`
- Playwright docs: https://playwright.dev/
