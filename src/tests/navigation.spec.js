import { test, expect } from "@playwright/test";

test.describe("Navigation Between Views", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });

    // User Story: As a user, I want to navigate between different views so I can access all features
    test("should allow navigation to all three views", async ({ page }) => {
        
        // Test 1: Verify initial state - Catalog view should be active by default
        await expect(page.getByTestId("catalog"))
            .toBeDisabled(); // Disabled button indicates current active view
        
        // Test 2: Navigate to Add Book view
        await page.getByTestId("add-book").click(); // Click the Add Book navigation button
        
        // Verify Add Book view is now active
        await expect(page.getByTestId("add-book"))
            .toBeDisabled(); // Button should be disabled when view is active
        
        // Verify Add Book content is visible
        await expect(page.getByTestId("add-input-title"))
            .toBeVisible(); // Title input field should appear in Add Book view
        
        // Test 3: Navigate to My Books (Favorites) view
        await page.getByTestId("favorites").click(); // Click the My Books navigation button
        
        // Verify My Books view is now active
        await expect(page.getByTestId("favorites"))
            .toBeDisabled(); // Button should be disabled when view is active
    });

    // User Story: As a user, I want clear navigation indicators so I know which view I'm currently in
    test("should show correct navigation indicators", async ({ page }) => {
        
        // Test initial navigation state
        await expect(page.getByTestId("catalog"))
            .toBeDisabled(); // Catalog should be disabled (active) initially
        await expect(page.getByTestId("add-book"))
            .toBeEnabled(); // Other buttons should be enabled (clickable)
        await expect(page.getByTestId("favorites"))
            .toBeEnabled();
        
        // Switch to Add Book view and verify navigation states
        await page.getByTestId("add-book").click();
        
        await expect(page.getByTestId("catalog"))
            .toBeEnabled(); // Now catalog button should be clickable
        await expect(page.getByTestId("add-book"))
            .toBeDisabled(); // Add book button should be disabled (active)
        await expect(page.getByTestId("favorites"))
            .toBeEnabled(); // Favorites button should be clickable
    });

    // User Story: As a user, I want to verify that each view displays appropriate content
    test("should display correct content for each view", async ({ page }) => {
        
        // Verify My Books view shows empty list initially
        await page.getByTestId("favorites").click(); // Navigate to My Books
        
        await expect(page.getByTestId("book-list"))
            .toBeEmpty(); // Book list should be empty for new users
        
        // Navigate back to Add Book to verify input fields exist
        await page.getByTestId("add-book").click();
        
        await expect(page.getByTestId("add-input-title"))
            .toBeVisible(); // Title input should be present in Add Book view
    });
});
