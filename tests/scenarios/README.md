# AI Bot Management Test Scenario

## Overview

This test scenario covers the complete lifecycle of an AI Bot in Smartsupp:

1. **Creation** - Creating an AI bot through onboarding flow
2. **Configuration** - Editing bot parameters and enabling knowledge sources
3. **Deletion** - Removing the AI bot

## Test: `task01.spec.ts`

### Test Flow

#### Step 1: Create AI Bot via Onboarding

- Navigate to AI Automations onboarding page
- Select business category: **"Nabízím služby"** (left option)
- Enter website URL: **example.com**
- Complete onboarding wizard
- Verify bot was successfully created

#### Step 2: Edit 5 AI Bot Parameters

The test modifies the following parameters (adjust based on actual UI):

1. **Bot Name** - Updates the AI bot's display name
2. **Greeting** - Sets initial greeting message
3. **Language** - Sets bot language (cs = Czech)
4. **Response Style** - Configures conversation style
5. **Fallback Message** - Message when bot doesn't understand

**Publishing:**

- Navigate to **"Znalosti"** (Knowledge) section
- Enable the webscrape source (required for publishing)
- Publish the AI bot
- Verify successful publication

#### Step 3: Delete AI Bot

- Navigate to AI Automations list
- Delete the created bot
- Confirm deletion
- Verify bot no longer exists

## Running the Test

```bash
# Run all scenario tests
npm run test -- --project=Scenarios

# Run only this test
npm run test -- tests/scenarios/task01.spec.ts

# Run with specific tag
npm run test -- --grep @AI
npm run test -- --grep @SCENARIO
```

## Tags

- `@scenario` - Marks this as an end-to-end scenario test
- `@ai-bot` - Identifies AI bot functionality
- `@AI` - Category tag
- `@SCENARIO` - Test type tag

## Prerequisites

- Valid Smartsupp account credentials in `.env`
- User must have permissions to:
  - Create AI bots
  - Edit AI bot settings
  - Access Knowledge/Znalosti section
  - Delete AI bots

## Page Objects Used

- **LoginPage** - Handles authentication
- **DashboardPage** - Verifies dashboard state
- **AIAutomationsPage** - Manages AI bot operations
  - Onboarding flow
  - Bot editing
  - Knowledge source management
  - Publishing
  - Deletion

## Notes

### Dynamic Elements

The test uses flexible locators to handle:

- Czech/English UI language variants
- Different button text variations
- Dynamic form field names

### Customization

To adapt this test to actual Smartsupp UI:

1. **Inspect actual elements** in the AI bot creation/edit UI
2. **Update locators** in `aiAutomationsPage.ts`:
   ```typescript
   get botNameInput() {
       return this.page.locator('[data-testid="actual-id"]');
   }
   ```
3. **Adjust parameters** being edited based on available fields
4. **Update wait times** if UI requires longer load times

### Known Limitations

- Parameter names (`botName`, `greeting`, etc.) are **placeholders**
- Exact UI flow may differ from test expectations
- Some steps may need additional waits or interactions
- Locators need to be updated based on actual Smartsupp implementation

## Troubleshooting

If the test fails:

1. **Run with headed mode** to see UI interactions:

   ```bash
   npm run test -- tests/scenarios/task01.spec.ts --headed
   ```

2. **Check Allure report** for detailed step-by-step results:

   ```bash
   allure serve allure-results
   ```

3. **Inspect element locators** - Use browser DevTools to verify:
   - Button text matches
   - Input field names/IDs
   - Tab/section names

4. **Update timeouts** if operations are slow:
   ```typescript
   await this.page.waitForTimeout(2000); // Increase if needed
   ```

## Future Enhancements

- [ ] Parameterize bot configuration options
- [ ] Add verification for each edited parameter
- [ ] Test multiple bot creation/deletion cycles
- [ ] Add negative test scenarios (invalid inputs, etc.)
- [ ] Verify knowledge source sync status before publishing
