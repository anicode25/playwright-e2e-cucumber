@smoke
Feature: Product Checkout Functionality

    @positive
    Scenario: Checkout a product successfully
        Given I am logged by standard user
        When I add a product to the cart
        And I proceed to checkout
        And I fill in the checkout information
        And I complete the checkout process
        Then I should see the order confirmation page
        And Order status should be displayed correctly