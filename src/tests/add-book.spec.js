import { test, expect } from "@playwright/test";

test.describe("Add Book View", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
        await page.getByTestId("add-book").click();
    });

    // User Story: As a user, I want to see input fields when I go to Add Book page
    test("should display input fields on Add Book page", async ({ page }) => {
        
        // Verify title input field is visible
        await expect(page.getByTestId("add-input-title"))
            .toBeVisible(); // Title input should be displayed
        
        // Check if there are other input fields (adjust based on actual website)
        // We'll be conservative and only test what we know exists
        
        // Optional: Check if there's a submit button (might have different ID)
        // First let's just verify the basic title input works
    });

    // User Story: As a user, I want to type in the title field 
    test("should allow typing in title field", async ({ page }) => {
        
        // Type in title field
        await page.getByTestId("add-input-title")
            .fill("My Test Book"); // Enter book title
        
        // Verify title was entered correctly
        await expect(page.getByTestId("add-input-title"))
            .toHaveValue("My Test Book"); // Input should contain the text we typed
    });

    // User Story: As a user, I want to see clear input fields initially
    test("should have empty title field initially", async ({ page }) => {
        
        // Verify title field is empty
        await expect(page.getByTestId("add-input-title"))
            .toHaveValue(""); // Title input should be empty initially
    });

    // Simple test to verify Add Book page is working
    test("should be on Add Book page", async ({ page }) => {
        
        // Verify we're on Add Book page by checking navigation state
        await expect(page.getByTestId("add-book"))
            .toBeDisabled(); // Add Book button should be disabled (current page)
        
        // Verify title input is present
        await expect(page.getByTestId("add-input-title"))
            .toBeVisible(); // Title input should be visible
    });
});