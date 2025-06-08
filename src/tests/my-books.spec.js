import { test, expect } from "@playwright/test";

// Test suite for My Books functionality
test.describe("My Books View", () => {
    
    // Set up: Navigate to the application before each test
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });

    // User Story: As a user, I want to see my saved books
    test("should display my saved books", async ({ page }) => {
        
        // First add a book to favorites from catalog
        const bookStar = page.getByTestId("star-Kaffekokaren som visste för mycket");
        await bookStar.click(); // Add book to favorites
        
        // Navigate to My Books page
        await page.getByTestId("favorites").click(); // Go to My Books view
        
        // Verify My Books page is active
        await expect(page.getByTestId("favorites"))
            .toBeDisabled(); // Favorites button should be disabled (current page)
        
        // Verify the saved book appears in My Books list
        await expect(page.getByTestId("fav-Kaffekokaren som visste för mycket"))
            .toBeVisible(); // Saved book should be displayed
        
        // Verify book list container is not empty
        await expect(page.getByTestId("book-list"))
            .not.toBeEmpty(); // Book list should contain books
    });

    // User Story: As a user, I want to remove books from my list
    test("should remove books from my reading list", async ({ page }) => {
        
        // First add a book to favorites
        const bookStar = page.getByTestId("star-Kaffekokaren som visste för mycket");
        await bookStar.click(); // Add book to favorites
        
        // Go to My Books to verify book is there
        await page.getByTestId("favorites").click(); // Navigate to My Books
        
        // Verify book is in the list
        await expect(page.getByTestId("fav-Kaffekokaren som visste för mycket"))
            .toBeVisible(); // Book should be visible
        
        // Go back to catalog to remove the book
        await page.getByTestId("catalog").click(); // Go back to catalog
        
        // Remove book by clicking star again
        await bookStar.click(); // Click star to remove from favorites
        
        // Verify star is no longer selected
        await expect(bookStar)
            .not.toHaveClass(/selected/); // Star should not be highlighted
        
        // Go back to My Books to verify book is removed
        await page.getByTestId("favorites").click(); // Go to My Books again
        
        // Verify book is no longer in My Books list
        await expect(page.getByTestId("fav-Kaffekokaren som visste för mycket"))
            .not.toBeVisible(); // Book should not appear anymore
    });

    // User Story: As a user, I want to add my reading list
    test("should manage my reading list", async ({ page }) => {
        
        // Start with empty My Books list
        await page.getByTestId("favorites").click(); // Go to My Books
        
        // Verify list is initially empty
        await expect(page.getByTestId("book-list"))
            .toBeEmpty(); // List should be empty initially
        
        // Go to catalog to add books
        await page.getByTestId("catalog").click(); // Go to catalog
        
        // Add a book to reading list
        const bookStar = page.getByTestId("star-Kaffekokaren som visste för mycket");
        await bookStar.click(); // Add book to reading list
        
        // Verify book is selected in catalog
        await expect(bookStar)
            .toHaveClass(/selected/); // Star should be highlighted
        
        // Return to My Books to see the addition
        await page.getByTestId("favorites").click(); // Go back to My Books
        
        // Verify book now appears in reading list
        await expect(page.getByTestId("fav-Kaffekokaren som visste för mycket"))
            .toBeVisible(); // Book should appear in My Books
        
        // Verify list is no longer empty
        await expect(page.getByTestId("book-list"))
            .not.toBeEmpty(); // List should now contain books
    });

    // Additional test: Empty state
    test("should show empty list when no books are saved", async ({ page }) => {
        
        // Go directly to My Books
        await page.getByTestId("favorites").click(); // Navigate to My Books
        
        // Verify My Books page is active
        await expect(page.getByTestId("favorites"))
            .toBeDisabled(); // Button should be disabled (current page)
        
        // Verify book list is empty initially
        await expect(page.getByTestId("book-list"))
            .toBeEmpty(); // Should show empty list for new users
    });
});