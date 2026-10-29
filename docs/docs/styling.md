---
sidebar_position: 6
---

# Styling

`<ReactTags>` does not come up with any styles. However, it is very easy to customize the look of the component the way you want it. By default, the component provides the following classes with which you can style -

- `ReactTags__tags`
- `ReactTags__tagInput`
- `ReactTags__tagInputField`
- `ReactTags__selected`
- `ReactTags__selected ReactTags__tag`
- `ReactTags__selected ReactTags__remove`
- `ReactTags__suggestions`
- `ReactTags__activeSuggestion`
- `ReactTags__editTagInput`
- `ReactTags__editTagInputField`
- `ReactTags__clearAll`

An example can be found in [`/example/reactTags.css`](https://github.com/react-tags/react-tags/blob/master/example/reactTags.css).

If you need to set your own class names on the component, you may pass in
a `classNames` prop.

```js
  <ReactTags
    classNames={{
      tags: 'tagsClass',
      tagInput: 'tagInputClass',
      tagInputField: 'tagInputFieldClass',
      selected: 'selectedClass',
      tag: 'tagClass',
      remove: 'removeClass',
      suggestions: 'suggestionsClass',
      activeSuggestion: 'activeSuggestionClass',
      editTagInput: 'editTagInputClass',
      editTagInputField: 'editTagInputField',
      clearAll: 'clearAllClass',
    }}
    ...>
```