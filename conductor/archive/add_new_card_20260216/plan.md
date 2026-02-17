# Implementation Plan: Add New Card to Existing Bank

## Phase 1: Backend - Extend Domain and Application Layers

- [ ] Task: Conductor - User Manual Verification 'Backend - Extend Domain and Application Layers' (Protocol in workflow.md)

### Card Entity and Repository
- [x] Task: Write Tests for Card Entity to include new fields (type, style/color). [c910a12]
- [x] Task: Update Card Entity in `gasty-app-be/src/domain/entities/Card.ts` to include `type` and `style` fields. [47185bb]
- [x] Task: Update `ICardRepository.ts` if new methods are needed. [47185bb]
- [x] Task: Update `MongoCardRepository.ts` and `InMemoryCardRepository.ts` to support the new fields. [48de283]

### Use Cases (Application Layer)
- [x] Task: Write Tests for `CreateCard` use case with new fields. [d585c42]
- [x] Task: Update `CreateCard` use case to handle `type` and `style`. [d585c42]

## Phase 2: Backend - API Endpoints

- [ ] Task: Conductor - User Manual Verification 'Backend - API Endpoints' (Protocol in workflow.md)

### Create Card Endpoint
- [x] Task: Write Tests for the `POST /api/cards` endpoint to validate the new fields. [34efcaf]
- [x] Task: Update the `CardController.ts` to handle the new `type` and `style` fields in the request body. [34efcaf]

## Phase 3: Frontend - UI Components

- [ ] Task: Conductor - User Manual Verification 'Frontend - UI Components' (Protocol in workflow.md)

### Add Card Form
- [x] Task: Create/Update `AddCardForm.tsx` component to include fields for `type` (Visa, Master, Amex) and `style` (color/theme). [0197ca2]
- [x] Task: Implement form validation for the new fields. [6f431f2]

### Card Visual Component
- [x] Task: Create a new `Card.tsx` component that visually represents a card, displaying its name, type, and color/style. [c175900]
- [x] Task: Write tests for the `Card.tsx` component. [c175900]

## Phase 4: Frontend - Integration and State Management

- [ ] Task: Conductor - User Manual Verification 'Frontend - Integration and State Management' (Protocol in workflow.md)

### API Integration
- [x] Task: Update the `expenseApiService.ts` or a new `cardApiService.ts` to include a function for creating a card. [2635701]
- [x] Task: Integrate the `AddCardForm.tsx` with the API service to create a new card. [84085a9]

### State Management
- [x] Task: Update the application's state management (e.g., React Context, Zustand) to include the new card in the list of available cards upon creation. [f18140f]

### Component Integration
- [x] Task: Integrate the new `Card.tsx` component into the "Bank & Card Management" page. [f18140f]
- [x] Task: Update the "Add Expense" form to allow adding a new card on-the-fly. [14d1b48] [a5a80ae]
- [x] Task: Ensure the new card is available as a text option in all relevant dropdowns and tables. [a5a80ae]
