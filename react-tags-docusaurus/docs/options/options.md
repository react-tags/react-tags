---
sidebar_position: 1
slug: /options
---

# Options

Option | Type | Default | Description
--- | --- | --- | ---
|[`tags`](/options/tags) | `Array` | `[]` | An array of tags that are displayed as pre-selected.|
|[`suggestions`](/options/suggestions) | `Array` | `[]` | An array of suggestions that are used as basis for showing suggestions.
|[`delimiters`](/options/delimiters) | `Array` | `[ENTER, TAB]` | Specifies which characters should terminate tags input.
|[`placeholder`](/options/placeholder) | `String` | `Add new tag` | The placeholder shown for the input.
|[`labelField`](/options/labelField) | `String` | `text` | Provide an alternative `label` property for the tags.
|[`handleAddition`](/options/handleAddition) | `Function` | `undefined` | Function called when the user wants to add a tag (required).
|[`handleDelete`](/options/handleDelete) | `Function` | `undefined` | Function called when the user wants to delete a tag (required).
|[`handleDrag`](/options/handleDrag) | `Function` | `undefined` | Function called when the user drags a tag.
|[`handleFilterSuggestions`](/options/handleFilterSuggestions) | `Function` | `undefined` | Function called when filtering suggestions.
|[`handleTagClick`](/options/handleTagClick) | `Function` | `undefined` | Function called when the user wants to know which tag was clicked.
|[`autofocus`](/options/autofocus) | `Boolean` | `true` | Boolean value to control whether the text-input should be autofocused on mount.
|[`allowDeleteFromEmptyInput`](/options/allowDeleteFromEmptyInput) | `Boolean` | `true` | Boolean value to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box.
|[`handleInputChange`](/options/handleInputChange) | `Function` | `undefined` | Event handler for input onChange.
|[`handleInputFocus`](/options/handleInputFocus) | `Function` | `undefined` | Event handler for input onFocus.
|[`handleInputBlur`](/options/handleInputBlur) | `Function` | `undefined` | Event handler for input onBlur.
|[`minQueryLength`](/options/minQueryLength) | `Number` | `2` | How many characters are needed for suggestions to appear.
|[`removeComponent`](/options/removeComponent) | `Function` |  | Function to render custom remove component for the tags.
|[`autocomplete`](/options/autocomplete) | `Boolean`/`Number` | `false` | Ensure the first matching suggestion is automatically converted to a tag when a [delimiter](/options/delimiters) key is pressed.
|[`readOnly`](/options/readOnly) | `Boolean` | `false` | Read-only mode without the input box and `removeComponent` and drag-n-drop features disabled.
|[`name`](/options/name) | `String` | `undefined` | The `name` attribute added to the input.
|[`id`](/options/id) | `String` | `undefined` | The `id` attribute added to the input.
|[`maxLength`](/options/maxLength) | `Number` | `Infinity` | The `maxLength` attribute added to the input.
|[`inline`](/options/inline) | `Boolean` | `true` | Render input field and selected tags in-line.
|[`inputFieldPosition`](/options/inputFieldPosition) | `String` | `inline` | Specify position of input field relative to tags
|[`allowUnique`](/options/allowUnique) | `Boolean` | `true` | Boolean value to control whether tags should be unqiue.
|[`allowDragDrop`](/options/allowDragDrop) | `Boolean` | `true` | Implies whether tags should have drag-n-drop features enabled.
|[`renderSuggestion`](/options/renderSuggestion) | `Function` | `undefined` | Render prop for rendering your own suggestions.
| [`inputProps`](/options/inputProps) | Object |`{}` | The extra attributes which are passed to the input field. 
| [`allowAdditionFromPaste`](/options/allowAdditionFromPaste) | `boolean` | `true` | Implies whether to allow paste action when adding tags.|
| [`editable`](/options/editable) | `boolean` | `false`| Implies whether the tags should be editable.|
| [`onTagUpdate`](/options/onTagUpdate) | `Function` | | This callback if present is triggered when tag is edited.|
|[`clearAll`](/options/clearAll) | `boolean` | `false` | Implies whether 'clear all' button should be shown.
|[`onClearAll`](/options/onClearAll) | `Function` |  | This callback if present is triggered when clear all button is clicked.
