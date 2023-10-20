---
sidebar_position: 1
---

# Options

Option | Type | Default | Description
--- | --- | --- | ---
|[`tags`](#tags) | `Array` | `[]` | An array of tags that are displayed as pre-selected.|
|[`suggestions`](#suggestions) | `Array` | `[]` | An array of suggestions that are used as basis for showing suggestions.
|[`delimiters`](#delimiters) | `Array` | `[ENTER, TAB]` | Specifies which characters should terminate tags input.
|[`placeholder`](#placeholder) | `String` | `Add new tag` | The placeholder shown for the input.
|[`labelField`](#labelField) | `String` | `text` | Provide an alternative `label` property for the tags.
|[`handleAddition`](#handleAddition) | `Function` | `undefined` | Function called when the user wants to add a tag (required).
|[`handleDelete`](#handleDelete) | `Function` | `undefined` | Function called when the user wants to delete a tag (required).
|[`handleDrag`](#handleDrag) | `Function` | `undefined` | Function called when the user drags a tag.
|[`handleFilterSuggestions`](#handleFilterSuggestions) | `Function` | `undefined` | Function called when filtering suggestions.
|[`handleTagClick`](#handleTagClick) | `Function` | `undefined` | Function called when the user wants to know which tag was clicked.
|[`autofocus`](#autofocus) | `Boolean` | `true` | Boolean value to control whether the text-input should be autofocused on mount.
|[`allowDeleteFromEmptyInput`](#allowDeleteFromEmptyInput) | `Boolean` | `true` | Boolean value to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box.
|[`handleInputChange`](#handleInputChange) | `Function` | `undefined` | Event handler for input onChange.
|[`handleInputFocus`](#handleInputFocus) | `Function` | `undefined` | Event handler for input onFocus.
|[`handleInputBlur`](#handleInputBlur) | `Function` | `undefined` | Event handler for input onBlur.
|[`minQueryLength`](#minQueryLength) | `Number` | `2` | How many characters are needed for suggestions to appear.
|[`removeComponent`](#removeComponent) | `Function` |  | Function to render custom remove component for the tags.
|[`autocomplete`](#autocomplete) | `Boolean`/`Number` | `false` | Ensure the first matching suggestion is automatically converted to a tag when a [delimiter](#delimiters) key is pressed.
|[`readOnly`](#readOnly) | `Boolean` | `false` | Read-only mode without the input box and `removeComponent` and drag-n-drop features disabled.
|[`name`](#name) | `String` | `undefined` | The `name` attribute added to the input.
|[`id`](#id) | `String` | `undefined` | The `id` attribute added to the input.
|[`maxLength`](#maxLength) | `Number` | `Infinity` | The `maxLength` attribute added to the input.
|[`inline`](#inline) | `Boolean` | `true` | Render input field and selected tags in-line.
|[`inputFieldPosition`](#inputFieldPosition) | `String` | `inline` | Specify position of input field relative to tags
|[`allowUnique`](#allowUnique) | `Boolean` | `true` | Boolean value to control whether tags should be unqiue.
|[`allowDragDrop`](#allowDragDrop) | `Boolean` | `true` | Implies whether tags should have drag-n-drop features enabled.
|[`renderSuggestion`](#renderSuggestion) | `Function` | `undefined` | Render prop for rendering your own suggestions.
| [`inputProps`](#inputProps) | Object |`{}` | The extra attributes which are passed to the input field. 
| [`allowAdditionFromPaste`](#allowAdditionFromPaste) | `boolean` | `true` | Implies whether to allow paste action when adding tags.|
| [`editable`](#editable) | `boolean` | `false`| Implies whether the tags should be editable.|
| [`onTagUpdate`](#onTagUpdate) | `Function` | | This callback if present is triggered when tag is edited.|
|[`clearAll`](#clearAll) | `boolean` | `false` | Implies whether 'clear all' button should be shown.
|[`onClearAll`](#onClearAll) | `Function` |  | This callback if present is triggered when clear all button is clicked.
