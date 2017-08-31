# ember-cli-autocomplete-input

[![Build Status](https://travis-ci.org/timjcook/ember-cli-autocomplete-input.svg?branch=master)](https://travis-ci.org/timjcook/ember-cli-autocomplete-input)

An autocomplete text input for Ember.
* It provides a hook for updating a list of results based on a change to the current term in the input field.
* It also provides some basic keyboard navigation for quickly accessing items in the results list, including:
  * Enter key - select the currently highlighted result
  * Esc key - clear the search term and the current results
  * Up key - move the highlight to the result above the currently highlighted results
  * Down key - move the highlight to the result below the currently highlighted results

## Installation

* `ember install ember-cli-autocomplete-input`

## Using the component

You can include the component in any of your templates:

```
{{autocomplete-input name=name results=results updateTerm="updateTerm" selectResult="selectResult"}}
```

## Arguments

The `autocomplete-input` component takes the following arguments

### name - String

The name variable will be set on the input tag as both the name attribute as well as the id attribute, allowing focus to be triggered by clicking a label tag.

### results (required) - Array

The results array contains the current list of results objects.

### resultName (optional, default 'name') - String

The attribute on an object in the `results` array that will be used as the display in the results list.

### resultValue (optional, default 'value') - String

The attribute on an object in the `results` array that will be used to check a result to the currently highlighted result in the results list.

## Handling interactions

The `autocomplete-input` component exposes the following actions which respond to user interaction:

### selectResult(result)

This is fired when a result item is clicked or the `enter` key is pressed while a result is highlighted.
The selected result is passed as the only argument.

### updateTerm(term)

This is fired when the term is updated by typing into the bound input field.
Use this action to update your `results` array.

### clearSearch()

This is fired when the `esc` key is pressed.
Use this action handle a clear of the search, ie clear results array and search term.
