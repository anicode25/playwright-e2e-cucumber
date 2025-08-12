@reg
Feature: Price Sorting

    @positive
    Scenario: Sort products by price in ascending order
        Given I am on the product listing page
        When I select 'Price: Low to High' from the sorting options
        Then The products should be sorted by price in ascending order
    
    @positive
    Scenario: Sort products by price in descending order
        Given I am on the product listing page
        When I select 'Price: High to Low' from the sorting options
        Then The products should be sorted by the price in descending order