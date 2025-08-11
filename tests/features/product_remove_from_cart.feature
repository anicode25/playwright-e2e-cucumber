@smoke @regression
Feature: Remove the product from Cart

    Scenario: Remove a product from the cart
        Given I am on the homepage
        And I add 'Sauce Labs Onesie' to the cart
        When I view the cart
        Then I should see 'Sauce Labs Onesie' in the cart
        When I remove 'Sauce Labs Onesie' from the cart
        Then 'Sauce Labs Onesie' should not be in the cart