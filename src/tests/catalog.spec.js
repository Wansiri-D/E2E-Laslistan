import { test, expect } from "@playwright/test";

test.describe("Catalog View", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });

    // User Story: As a user, I want to see available books in the catalog
    test("should display available books in catalog", async ({ page }) => {
        
        // Verify catalog section is visible
        const catalogSection = page.locator(".catalog");
        await expect(catalogSection)
            .toBeVisible(); // Catalog container should be displayed
        
        // Verify at least one book is shown
        const bookStar = page.getByTestId("star-Min katt är min chef");
        await expect(bookStar)
            .toBeVisible(); // Book should be displayed in catalog
    });

    // User Story: As a user, I want to add books from catalog to my reading list
    test("should add book to my reading list from catalog", async ({ page }) => {
        
        // Locate the book star button in catalog
        const bookStar = page.getByTestId("star-Min katt är min chef");
        
        // Verify book is not selected initially
        await expect(bookStar)
            .not.toHaveClass(/selected/); // Star should not be highlighted initially
        
        // Add book to favorites by clicking the star
        await bookStar.click(); // Click star to add to reading list
        
        // Verify book is now selected
        await expect(bookStar)
            .toHaveClass(/selected/); // Star should be highlighted after selection
        
        // Navigate to My Books to verify book was added
        await page.getByTestId("favorites").click(); // Go to My Books view
        
        // Verify book appears in My Books list
        await expect(page.getByTestId("fav-Min katt är min chef"))
            .toBeVisible(); // Book should now appear in My Books list
    });

    // User Story: As a user, I want to remove books from my reading list
    test("should remove book from reading list", async ({ page }) => {
        
        // First add a book to favorites
        const bookStar = page.getByTestId("star-Min katt är min chef");
        await bookStar.click(); // Add book to reading list
        
        // Verify book is selected
        await expect(bookStar)
            .toHaveClass(/selected/); // Confirm book is added
        
        // Remove book by clicking star again
        await bookStar.click(); // Click star again to remove from reading list
        
        // Verify book is no longer selected
        await expect(bookStar)
            .not.toHaveClass(/selected/); // Star should not be highlighted
        
        // Navigate to My Books to verify book was removed
        await page.getByTestId("favorites").click(); // Go to My Books view
        
        // Verify book is no longer in My Books list
        await expect(page.getByTestId("fav-Min katt är min chef"))
            .not.toBeVisible(); // Book should not appear in My Books list
    });
});