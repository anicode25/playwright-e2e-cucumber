@problem_user @smoke
Feature: Verify product image for problem user

    Scenario: Verify product image is displayed incorrectly
        Given I am logged in as a problem user
        When I navigate to the product page
        Then I should see the product image displayed
        And The product image should not match the expected image and all products have the same image