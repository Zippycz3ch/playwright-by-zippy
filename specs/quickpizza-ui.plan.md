# QuickPizza UI Test Plan

## Overview

Test suite for QuickPizza web application covering pizza recommendation generation, advanced filtering options, and user authentication flows.

## Test Suites

### 1. Pizza Recommendation Generation

**Seed:** `tests/ui/seed.spec.ts`

#### 1.1 Generate Basic Pizza Recommendation

**Steps:**

1. Navigate to QuickPizza homepage
2. Click on the "Pizza, Please!" button
3. Verify pizza recommendation is displayed

**Expected Results:**

- Pizza recommendation should appear with name, dough type, ingredients, tool, and calories
- "No thanks" and "Love it!" buttons should be visible

#### 1.2 Generate Multiple Recommendations

**Steps:**

1. Navigate to QuickPizza homepage
2. Click "Pizza, Please!" button
3. Click "No thanks" button
4. Verify a new recommendation appears

**Expected Results:**

- A different pizza recommendation should be generated
- Recommendation should contain all required fields

### 2. Advanced Pizza Filtering

**Seed:** `tests/api/seed.spec.ts`

#### 2.1 Enable Advanced Options

**Steps:**

1. Navigate to QuickPizza homepage
2. Click on the Advanced toggle
3. Verify advanced options are displayed

**Expected Results:**

- Max Calories per Slice input should be visible (default: 1000)
- Min Number of Toppings input should be visible (default: 2)
- Max Number of Toppings input should be visible (default: 5)
- Excluded tools listbox should be visible
- "Must be vegetarian" checkbox should be visible
- Custom Pizza Name textbox should be visible

#### 2.2 Customize Pizza with Advanced Options

**Steps:**

1. Navigate to QuickPizza homepage
2. Enable Advanced toggle
3. Set Max Calories to 300
4. Set Min Toppings to 3
5. Set Max Toppings to 4
6. Check "Must be vegetarian" checkbox
7. Enter "My Custom Pizza" in Custom Pizza Name field
8. Click "Pizza, Please!" button

**Expected Results:**

- Generated pizza should meet all specified criteria
- Pizza name should be "My Custom Pizza" or similar

### 3. User Authentication

**Seed:** `tests/api/seed.spec.ts`

#### 3.1 Navigate to Login Page

**Steps:**

1. Navigate to QuickPizza homepage
2. Click on "Login/Profile" link
3. Verify login page is displayed

**Expected Results:**

- Login form should be visible
- Username field should show hint "default"
- Password field should show hint "12345678"
- "Sign in" button should be visible

#### 3.2 Login with Valid Credentials

**Steps:**

1. Navigate to login page
2. Enter username "default"
3. Enter password "12345678"
4. Click "Sign in" button

**Expected Results:**

- User should be logged in successfully
- Should be redirected to homepage or profile page

#### 3.3 Save Favorite Pizza After Login

**Steps:**

1. Login with valid credentials
2. Navigate to homepage
3. Click "Pizza, Please!" button
4. Click "Love it!" button

**Expected Results:**

- Pizza should be saved to favorites
- Success message should be displayed

### 4. Navigation and Footer

**Seed:** `tests/api/seed.spec.ts`

#### 4.1 Verify Footer Links

**Steps:**

1. Navigate to QuickPizza homepage
2. Verify footer elements are present

**Expected Results:**

- "Made with ❤️ by QuickPizza Labs" text should be visible
- WebSocket visitor ID should be displayed
- "Click here" admin link should be visible
- GitHub link should be visible

#### 4.2 Navigate to Admin Page

**Steps:**

1. Navigate to QuickPizza homepage
2. Click on "Click here" admin link in footer

**Expected Results:**

- Should navigate to admin page
- Admin interface should be displayed
