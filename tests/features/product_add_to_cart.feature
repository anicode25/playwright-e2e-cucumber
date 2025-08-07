@smoke
Feature: Add to Cart

  @positive
  Scenario: Add a product to the cart
    Given I am logged in as a standard user
    When I add the Sauce Labs Backpack to the cart
    Then the cart count should be 1
    And the cart should contain Sauce Labs Backpack
