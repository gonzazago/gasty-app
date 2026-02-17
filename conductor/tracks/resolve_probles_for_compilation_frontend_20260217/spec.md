# Spec: Resolve Frontend Compilation Problems

## Overview
The frontend application is currently failing to build due to linter errors. Specifically, the linter is flagging the use of the `any` type in the codebase, which indicates that there are parts of the application that are not properly typed. This track aims to resolve these typing issues to ensure a successful build and improve the overall code quality.

## Functional Requirements
- Identify all instances of the `any` type in the frontend codebase (`gasty-app-fe`).
- Replace the `any` type with the correct, specific types.
- Ensure that the frontend application builds successfully without any linting errors related to "unexpected any".

## Acceptance Criteria
- The command `npm run build` (or the equivalent for the frontend application) completes without errors.
- The linter does not report any "unexpected any" errors.
- The application's functionality remains unchanged after the type corrections.
