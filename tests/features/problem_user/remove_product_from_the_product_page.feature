@problem_user @smoke
Feature: Remove product from the product page

    @problem_user
    Scenario: Problem user cannot remove a product from the product page
        Given I log in with username and password
        And I add 'Sauce Labs Onesie' to the cart from the product page
        When I click the 'Remove' button for 'Sauce Labs Onesie' on the product page
        Then The 'Remove' button for 'Sauce Labs Onesie' should still be visible on the product page
        And The cart badge count should remain the same
