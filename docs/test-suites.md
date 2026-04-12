# Test Suites

## Overview

The test suite is organized into logical groups that cover different aspects of the Smartsupp platform functionality.

## 02_task01 — Mira AI Agent Tests

**Location:** [`tests/02_task01/`](../tests/02_task01/README.md)

### Test Scenarios

#### Agent Creation & Onboarding

- **File:** `00_mira-ai-onboarding.spec.ts`
- **Purpose:** Creates a Mira AI agent via the onboarding wizard
- **Steps:**
  1. Navigate to AI Automations onboarding
  2. Select business category and website URL
  3. Configure agent identity and avatar
  4. Complete setup wizard
  5. Publish the new agent

#### Behavior Configuration

- **File:** `01_mira-ai-behavior.spec.ts`
- **Purpose:** Configures agent behavior sliders and settings
- **Steps:**
  1. Open existing agent editor
  2. Adjust behavior sliders (tone, talkativeness, confidence, emoji)
  3. Save and publish changes
  4. Verify settings persist

#### Handover Settings

- **File:** `02_mira-ai-handover.spec.ts`
- **Purpose:** Tests handover-to-operator functionality
- **Steps:**
  1. Navigate to agent handover settings
  2. Toggle between "Never handover" and "Handover when convenient"
  3. Save and verify changes persist
  4. Test both handover modes

#### Language Configuration

- **File:** `03_mira-ai-language.spec.ts`
- **Purpose:** Changes agent welcome message language
- **Steps:**
  1. Access welcome message settings
  2. Change language from dropdown
  3. Verify language selection persists
  4. Test multiple language options

#### Agent Cleanup

- **File:** `04_mira-ai-delete.spec.ts`
- **Purpose:** Deletes the agent and verifies removal
- **Steps:**
  1. Open agent options menu
  2. Select delete option
  3. Confirm deletion
  4. Verify agent no longer appears in list

### Tags Used

- `@scenario` - Complete end-to-end scenarios
- `@mira-ai` - Mira AI specific functionality
- `@onboarding` - Onboarding flow tests
- `@settings` - Configuration tests
- `@behavior` - Behavior modification tests
- `@handover` - Handover functionality tests
- `@cleanup` - Cleanup and deletion tests

## 03_task02 — Live Chat Tests

**Location:** [`tests/03_task02/`](../tests/03_task02/README.md)

### Test Scenarios

#### Message Exchange

- **Purpose:** Test basic message communication
- **Flow:**
  1. Visitor sends text message via chat widget
  2. Operator receives message in inbox
  3. Operator replies to visitor
  4. Visitor receives response in chat widget

#### File Attachments

- **Purpose:** Test file sharing functionality
- **Flow:**
  1. Visitor uploads file attachment
  2. Operator receives file in conversation
  3. Operator can view/download attachment
  4. File integrity verification

#### Multi-Channel Communication

- **Purpose:** Test various communication channels
- **Scenarios:**
  - Web chat widget integration
  - Mobile responsive chat interface
  - Operator dashboard integration

### Manual Test Cases

Additional manual testing scenarios documented in:

- [`visitor-test-cases.md`](../tests/03_task02/testCases/visitor-test-cases.md) - Visitor perspective tests
- [`operator-test-cases.md`](../tests/03_task02/testCases/operator-test-cases.md) - Operator perspective tests

## 01_smoke — Smoke Tests

**Location:** [`tests/01_smoke/`](../tests/01_smoke/)

### Core Functionality Tests

#### Authentication

- **File:** `smartsupp-login.spec.ts`
- **Purpose:** Validates login functionality
- **Tests:**
  - Successful login with valid credentials
  - Error handling for invalid credentials
  - Session persistence validation

#### Dashboard Navigation

- **File:** `smartsupp-dashboard.spec.ts`
- **Purpose:** Tests core dashboard functionality
- **Tests:**
  - Dashboard loads after login
  - Navigation to settings section
  - Navigation to customers section
  - Menu accessibility and responsiveness

### Tags Used

- `@smoke` - Critical path validation tests
- `@login` - Authentication related tests
- `@dashboard` - Dashboard functionality tests

## Test Data Management

### Seed Data

- **File:** `seed.spec.ts`
- **Purpose:** Sets up required test data
- **Function:** Ensures consistent test environment

### Environment-Specific Data

- Configuration through `.env` file
- Dynamic data generation for unique test runs
- Cleanup procedures for test isolation

## Running Specific Test Suites

```bash
# Run all Mira AI tests
npx playwright test tests/02_task01/ --headed

# Run specific test file
npx playwright test tests/02_task01/00_mira-ai-onboarding.spec.ts --headed

# Run by tag
npx playwright test --grep "@smoke" --headed

# Run smoke tests only
npx playwright test tests/01_smoke/ --headed
```

## Test Reports

Each test suite generates detailed reports with:

- Step-by-step execution details
- Screenshots on failures
- Video recordings of test runs
- Performance metrics and timing
- Historical trend analysis

For more information on reports, see [Test Reports](reports.md).
