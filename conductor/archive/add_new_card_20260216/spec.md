# Specification: Add New Card to Existing Bank

## 1. Overview
This feature will allow users to add a new credit or debit card to an existing bank within the Gasty App. The new card should be visible and selectable in all relevant components of the application, such as expense details, the "add expense" form, and in tables displaying card/bank information.

## 2. Functional Requirements

### 2.1. Card Creation
- Users must be able to add a new card from two locations:
    1.  A central "Bank & Card Management" page.
    2.  Directly within the "Add Expense" form for on-the-fly creation.
- The form for adding a new card must capture the following information:
    - **Card Name:** A user-defined name for the card (e.g., "Personal Visa").
    - **Associated Bank:** A selection from the user's existing banks.
    - **Card Type:** A selection from "Visa", "Mastercard", or "American Express".
    - **Card Style/Color:** A selection from predefined styles like "Black", "Platinum", "Gold", "Basic", or an option to use the associated bank's default color.

### 2.2. Card Visualization
- **Visual Component:** In dashboards or card management screens, the card will be displayed as a visual component that mimics a real card. This component will show the card name, type (e.g., Visa logo), and the chosen color/style.
- **Text Entry:** In dropdown menus, forms (like "Add Expense"), and table columns, the card will be displayed as a simple text entry (e.g., "Personal Visa (Visa)").

### 2.3. Integration
- Once a card is created, it must be immediately available for selection in:
    - The "Add Expense" form's payment method dropdown.
    - Filters or sorting options related to payment methods.
- The card information (name, type) should be displayed correctly in all tables or lists that show transaction details under a "Card/Bank" column.

## 3. Non-Functional Requirements
- **Usability:** The process of adding and selecting a card should be intuitive and require minimal steps.
- **Consistency:** The card's visual representation and textual information must be consistent across the entire application.

## 4. Out of Scope
- Capturing the last four digits of the card number is **not** required for this feature.
- The full credit card number, expiration date, and CVV will **not** be stored.
- This feature does not include any real payment processing or validation with financial institutions. It is for tracking purposes only.

## 5. Acceptance Criteria
- A user can successfully add a new card to an existing bank from the management page.
- A user can successfully add a new card while creating a new expense.
- The newly created card appears correctly as a visual component on the dashboard.
- The newly created card appears as a text option in the "Add Expense" dropdown.
- The card information is correctly displayed in the expense details and transaction tables.
