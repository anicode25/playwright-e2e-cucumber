@smoke
Feature: Login Functionality

  @positive
  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid credentials and click login
    Then I should be redirected to the products page
    And I should see the products displayed