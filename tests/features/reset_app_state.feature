@smoke @regession
Feature: Reset App State

    Scenario: Reset the app state
        Given I open the homepage first
        And Add Sauce Labs Backpack to the cart 
        And Cart count should be 1
        When I reset the app state from menu
        Then The app should be in its initial state
        And The title should be 'Swag Labs'