---
sidebar_position: 10
---

# handleFilterSuggestions

To assert control over the suggestions filter, you may contribute a function that is executed whenever a filtered set
of suggestions is expected. By default, the text input value will be matched against each suggestion, and [those that
**start with** the entered text][default-suggestions-filter-logic] will be included in the filters suggestions list. If you do contribute a custom filter
function, you must return an array of suggestions. Please do not mutate the passed suggestions array.

For example, if you prefer to override the default filter behavior and instead match any suggestions that contain
the entered text _anywhere_ in the suggestion, your `handleFilterSuggestions` property may look like this:

```js
function(textInputValue, possibleSuggestionsArray) {
    var lowerCaseQuery = textInputValue.toLowerCase()

    return possibleSuggestionsArray.filter(function(suggestion)  {
        return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
}
```

Note: The above custom filter uses `String.prototype.includes`, which was added to JavaScript as part of the ECMAScript 7
specification. If you need to support a browser that does not yet include support for this method, you will need to
either refactor the above filter based on the capabilities of your supported browsers, or import a [polyfill for
`String.prototype.includes`][includes-polyfill].