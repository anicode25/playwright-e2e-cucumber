@smoke
Feature: Logout Functionality

    @positive
    Scenario: Logout from the application
      Given I am logged in as standard user
      When I click on the menu button
      And I select the logout option
      Then I should be redirected to the login page
      And I should see the login form displayed