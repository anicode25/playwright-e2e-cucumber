@locked_out_user @smoke
Feature: Login Functionality

  @positive
  Scenario: Login with valid credentials for locked out user
    Given I am standing on login page
    When I enter valid credentials for a locked out user and click login
    Then I should see an error message indicating the account is locked