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
        
        // Verify Catalog content is visible
        await expect(page.locator(".catalog"))
            .toBeVisible(); // Catalog section should be displayed
        
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
        
        // Test 4: Navigate back to Catalog view
        await page.getByTestId("catalog").click(); // Click the Catalog navigation button
        
        // Verify Catalog view is active again
        await expect(page.getByTestId("catalog"))
            .toBeDisabled(); // Catalog button should be disabled when view is active
        
        // Verify Catalog content is visible again
        await expect(page.locator(".catalog"))
            .toBeVisible(); // Catalog section should be displayed again
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
        
        // Switch to My Books view and verify navigation states
        await page.getByTestId("favorites").click();
        
        await expect(page.getByTestId("catalog"))
            .toBeEnabled(); // Catalog button should be clickable
        await expect(page.getByTestId("add-book"))
            .toBeEnabled(); // Add book button should be clickable
        await expect(page.getByTestId("favorites"))
            .toBeDisabled(); // Favorites button should be disabled (active)
        
        // Switch back to Catalog view and verify navigation states
        await page.getByTestId("catalog").click();
        
        await expect(page.getByTestId("catalog"))
            .toBeDisabled(); // Catalog should be disabled (active) again
        await expect(page.getByTestId("add-book"))
            .toBeEnabled(); // Other buttons should be enabled again
        await expect(page.getByTestId("favorites"))
            .toBeEnabled();
    });

    // User Story: As a user, I want to verify that each view displays appropriate content
    test("should display correct content for each view", async ({ page }) => {
        
        // Test 1: Verify Catalog view content
        await expect(page.locator(".catalog"))
            .toBeVisible(); // Catalog section should be visible initially
        
        // Test 2: Navigate to My Books view and verify content
        await page.getByTestId("favorites").click(); // Navigate to My Books
        
        await expect(page.getByTestId("book-list"))
            .toBeEmpty(); // Book list should be empty for new users
        
        // Test 3: Navigate to Add Book view and verify content
        await page.getByTestId("add-book").click();
        
        await expect(page.getByTestId("add-input-title"))
            .toBeVisible(); // Title input should be present in Add Book view
        
        // Test 4: Navigate back to Catalog and verify content again
        await page.getByTestId("catalog").click();
        
        await expect(page.locator(".catalog"))
            .toBeVisible(); // Catalog section should be visible again
    });
});