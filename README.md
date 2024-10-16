# React tags

[![MIT](https://img.shields.io/npm/l/react-tag-input.svg?style=flat-square)](https://github.com/react-tags/react-tags/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![npm downloads](https://img.shields.io/npm/dm/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Support on Github Sponsors](https://img.shields.io/badge/GitHub-❤️-99e9f2.svg?logo=github&label=Sponsor)](https://github.com/sponsors/ad1992)


React-tags is a simple tagging component ready to drop in your projects. The component is inspired by GMail's *To* field in the compose window.

## Features
- Autocomplete based on a suggestion list
- Keyboard friendly and mouse support
- Reorder tags using drag and drop
- Edit tag support
- Optional clear all button

## Why
Started by [Prakhar Srivastav](https://github.com/prakhar1989) and later maintained by [Aakansha Doshi](https://github.com/ad1992).

In Prakhar's words here is why he started it👇🏻

Because I was looking for an excuse to build a standalone component and publish it in the wild? To be honest, I needed a tagging component that provided the above features for my [React-Surveyman](http://github.com/prakhar1989/react-surveyman) project. Since I was unable to find one which met my requirements (and the fact that I generally enjoy re-inventing the wheel) this is what I came up with.


## Demo
![img](demo.gif)

Check it out [here](https://codesandbox.io/p/sandbox/react-tags-l65545)


## Installation
You can use npm

```
npm install --save react-tag-input
```

or via Yarn

```js
yarn add react-tag-input
```
make sure you have installed the **peer dependencies** as well with :point_down: versions

```
 "react": "^18.2.0",
 "react-dnd": "^14.0.2",
 "react-dnd-html5-backend": "^14.0.0",
 "react-dom": "^18.2.0"
```

## Usage
    
Here's a sample implementation that initializes the component with a list of initial `tags` and `suggestions` list. Apart from this, there are multiple events, handlers for which need to be set. For more details, go through the [API](#Options).


```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import GitHubCorner from './GithubCorner';
import type { Tag } from '../src/components/SingleTag';
import { WithContext as ReactTags, SEPARATORS } from '../src/index';
;

const suggestions = COUNTRIES.map((country) => {
  return {
    id: country,
    text: country,
    className: '',
  };
});

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};


const App = () => {
  const [tags, setTags] = React.useState<Array<Tag>>([
    { id: 'Thailand', text: 'Thailand', className: '' },
    { id: 'India', text: 'India', className: '' },
    { id: 'Vietnam', text: 'Vietnam', className: '' },
    { id: 'Turkey', text: 'Turkey', className: '' },
  ]);

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index: number, newTag: Tag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag: Tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const onClearAll = () => {
    setTags([]);
  };

  return (
    <div className="app">
      <GitHubCorner />

      <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition="bottom"
          editable
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
        />
      </div>
    </div>
  );
};
const domNode = document.getElementById('app')!;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


```

**A note about `Contexts`**
One of the dependencies of this component is the [react-dnd](https://github.com/gaearon/react-dnd) library. Since the 1.0 version, the original author has changed the API and requires the application using any draggable components to have a top-level [backend](http://gaearon.github.io/react-dnd/docs-html5-backend.html) context. So if you're using this component in an existing Application that uses React-DND you will already have a backend defined, in which case, you should `require` the component *without* the context.

```javascript
const ReactTags = require('react-tag-input').WithOutContext;
```
Otherwise, you can simply import along with the backend itself (as shown above). If you have ideas to make this API better, I'd [love to hear](https://github.com/react-tags/react-tags/issues/new).

<a name="Options"></a>
## Options

Option | Type | Default | Description
--- | --- | --- | ---
|[`tags`](#tags) | `Array` | `[]` | An array of tags that are displayed as pre-selected.|
|[`suggestions`](#suggestions) | `Array` | `[]` | An array of suggestions that are used as basis for showing suggestions.
|[`delimiters`](#delimiters) | `Array` | `[13, 9]` | Specifies which characters keycode should terminate tags input. `[Deprecated]`, use [`separators`](#separators) instead.
|[`separators`](#separators) | `Array` | `["Enter", "Tab"]` | Specifies which characters should terminate tags input |
|[`placeholder`](#placeholder) | `String` | `Add new tag` | The placeholder shown for the input.
|[`labelField`](#labelField) | `String` | `text` | Provide an alternative `label` property for the tags.
|[`handleAddition`](#handleAddition) | `Function` | `undefined` | Function called when the user wants to add a tag (required).
|[`handleDelete`](#handleDelete) | `Function` | `undefined` | Function called when the user wants to delete a tag (required).
|[`handleDrag`](#handleDrag) | `Function` | `undefined` | Function called when the user drags a tag.
|[`handleFilterSuggestions`](#handleFilterSuggestions) | `Function` | `undefined` | Function called when filtering suggestions.
|[`handleTagClick`](#handleTagClick) | `Function` | `undefined` | Function called when the user wants to know which tag was clicked.
|[`autofocus`](#autofocus) | `Boolean` | `true` | Boolean value to control whether the text-input should be autofocused on mount. `[Deprecated]`, use [`autoFocus`](#autoFocus) instead.
|[`autoFocus`](#autoFocus) | `Boolean` | `true` | Boolean value to control whether the text-input should be autofocused on mount.
|[`allowDeleteFromEmptyInput`](#allowDeleteFromEmptyInput) | `Boolean` | `true` | Boolean value to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box.
|[`handleInputChange`](#handleInputChange) | `Function` | `undefined` | Event handler for input onChange.
|[`handleInputFocus`](#handleInputFocus) | `Function` | `undefined` | Event handler for input onFocus.
|[`handleInputBlur`](#handleInputBlur) | `Function` | `undefined` | Event handler for input onBlur.
|[`minQueryLength`](#minQueryLength) | `Number` | `2` | How many characters are needed for suggestions to appear.
|[`removeComponent`](#removeComponent) | `Function` |  | Function to render custom remove component for the tags.
|[`autocomplete`](#autocomplete) | `Boolean`/`Number` | `false` | Ensure the first matching suggestion is automatically converted to a tag when a [separator](#separator) key is pressed.`[Deprecated]` and will be removed in v7.x.x, more info in [#949](https://github.com/react-tags/react-tags/issues/949)
|[`readOnly`](#readOnly) | `Boolean` | `false` | Read-only mode without the input box and `removeComponent` and drag-n-drop features disabled.
|[`name`](#name) | `String` | `undefined` | The `name` attribute added to the input.
|[`id`](#id) | `String` | `undefined` | The `id` attribute added to the input.
|[`maxLength`](#maxLength) | `Number` | `Infinity` | The `maxLength` attribute added to the input.
|[`inline`](#inline) | `Boolean` | `true` | Render input field and selected tags in-line. `[Deprecated]`, use [`inputFieldPosition`](#inputFieldPosition) instead.
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
| [`maxTags`](#maxTags) | `number` | | The maximum count of tags to be added
| [`ariaAttrs`](#ariaAttrs) | Object |`{clearAllLabel: "clear all tags"}` | An object containing custom ARIA attributes to enhance screen reader support and improve accessibility

## Styling
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
## Preparing for Migration to v7.x.x

Below are the list of `deprecated` props so please stop using it and migrate to the new props as these will be removed in `v7.x.x`.
You will see a warning for the migration as well in the console.

- `delimiters` - Please use [`separators`](#separators) instead, more info in [this issue](https://github.com/react-tags/react-tags/issues/960).
- `inline` - Please use [`inputFieldPosition`](#inputFieldPosition) instead.
- `autofocus` - Please use [`autoFocus`](#autoFocus) instead.

Additionally the prop `autocomplete` is deprecated and will be removed in `v7.x.x`. If you have any concerns regarding this, please share your thoughts in [this issue](https://github.com/react-tags/react-tags/issues/949).


## Support
If you like this library, please support it to contribute to its development :)

[![Github-sponsors](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/ad1992)


## Dev
The component is written in ES6 and uses [Webpack](http://webpack.github.io/) as its build tool.

## Set up instructions

Install yarn
```
npm install -g yarn
```

```
git clone git@github.com:react-tags/react-tags.git
cd react-tags
yarn
yarn precommit
yarn start
```
open [http://localhost:8090](http://localhost:8090)


## Contributing
Got ideas on how to make this better? Open an issue!


## Thanks
The autocomplete dropdown is inspired by Lea Verou's [awesomeplete](https://github.com/LeaVerou/awesomplete) library. The Drag and drop functionality is provided by Dan Abramov's insanely useful [ReactDND](https://github.com/gaearon/react-dnd) library.

Also thanks to the awesome contributors who've made the library far better!


[default-suggestions-filter-logic]: https://github.com/react-tags/react-tags/blob/v4.0.1/lib/ReactTags.js#L83
[includes-polyfill]: https://github.com/mathiasbynens/String.prototype.includes


### tags 
An array of tags that are displayed as pre-selected. Each tag should have an `id` property, property for the label, which is specified by the [`labelField`](#labelFieldOption) and class for label, which is specified by `className`.

```js
// With default labelField
const tags =  [ { id: "1", text: "Apples" } ]

// With labelField of `name`
const tags =  [ { id: "1", name: "Apples" } ]

// With className
const tags = [ { id: "1", text: "Apples", className: 'red'} ]
```
### suggestions
An array of suggestions that are used as basis for showing suggestions. These objects should follow the same structure as the `tags`. So if the `labelField` is `name`, the following would work:

```js
// With labelField of `name`
const suggestions = [
    { id: "1", name: "mango" },
    { id: "2", name: "pineapple"},
    { id: "3", name: "orange" },
    { id: "4", name: "pear" }
];

```

### delimiters
This prop is deprecated and will be removed in 7.x.x. Please use [`separators`](#separators) instead.
Specifies which characters should terminate tags input. An array of character codes. We export the constant `KEYS` for convenience. 


```js
import { WithContext as ReactTags, KEYS } from 'react-tag-input';

<ReactTags
    delimiters={[KEYS.TAB, KEYS.SPACE, KEYS.COMMA]}
 />
```

### separators
Specifies which characters should separate tags. An array of strings. We support the below separators :point_down:

- `Enter`
- `Tab`
- `Space`
- `Comma`
- `Semicolon`

And we export the constant `SEPERATORS` for convenience. 


```js
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
<ReactTags
    separators={[SEPARATORS.TAB, SEPARATORS.SPACE, SEPARATORS.COMMA]}
 />
```

### placeholder
The placeholder shown for the input.

```js
let placeholder = "Add new country"
```
### labelField
Provide an alternative `label` property for the tags.

```jsx
<ReactTags
    tags={tags}
    suggestions={}
    labelField={'name'}
    handleDrag={}
 />
```

This is useful if your data uses the `text` property for something else.

### handleAddition
Function called when the user wants to add a tag (either a click, a tab press or carriage return)

```js
function(tag) {
    // add the tag to the tag list
}
```
### handleDelete
Function called when the user wants to delete a tag

```js
function(i) {
    // delete the tag at index i
}
```
### handleDrag
If you want tags to be draggable, you need to provide this function.
Function called when the user drags a tag.

```js
function(tag, currPos, newPos) {
    // remove tag from currPos and add in newPos
}
```

### handleFilterSuggestions
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


### handleTagClick
Function called when the user wants to know which tag was clicked

```js
function(i) {
    // use the tag details at index i
}
```

### autofocus
Optional boolean param to control whether the text-input should be autofocused on mount.
This prop is `deprecated` and will be removed in 7.x.x, please use `autoFocus` instead.

```jsx
<ReactTags
    autofocus={false}
    ...>
```

### autoFocus
Optional boolean param to control whether the text-input should be autofocused on mount.

```jsx
<ReactTags
    autoFocus={false}
    ...>
```

### allowDeleteFromEmptyInput
Optional boolean param to control whether tags should be deleted when the `Backspace` key is pressed in an empty Input Box. By default this prop is `false`. 

However when input field position is `inline`, you will be able to delete the tags by pressing `Backspace` irrespective of the value of this prop.

This prop will likely be removed in future versions.

```js
<ReactTags
    allowDeleteFromEmptyInput={true}
    ...>
```
### handleInputChange
Optional event handler for input onChange

**Signature**

```js
(value, event) => void
```
The value denotes the target input value to be added and the event is the original event for `onChange`.

```js
<ReactTags
    handleInputChange={this.handleInputChange}
    ...>
```


### handleInputFocus
Optional event handler for input onFocus

```js
<ReactTags
    handleInputFocus={this.handleInputFocus}
    ...>
```

**Signature**

```js
(value, event) => void
```
The value denotes the target input value to be added and the event is the original event for `onFocus`.

### handleInputBlur
Optional event handler for input onBlur

**Signature**

```js
(value, event) => void
```
The value denotes the target input value to be added and the event is the original event for `onBlur`.

```js
<ReactTags
    handleInputBlur={this.handleInputBlur}
    ...>
```

### minQueryLength
Minimum number of characters needed for suggestions to appear. Defaults to `2`.

### removeComponent
If you'd like to supply your own tag delete/remove element, create a React component and pass it as a property to ReactTags using the `removeComponent` option. By default, a simple anchor link with an "x" text node as its only child is rendered, but if you'd like to, say, replace this with a `<button>` element that uses an image instead of text, your markup may look something like this:

```javascript
import {WithContext as ReactTags} from 'react-tag-input'

class Foo extends React.Component {
   render() {
      return <ReactTags removeComponent={RemoveComponent}/>
   }
}

class RemoveComponent extends React.Component {
   render() {
     const { className, onRemove } = this.props;
      return (
         <button onClick={onRemove} className={className}>
            <img src="my-icon.png" />
         </button>
      )
   }
}
```
The below props will be passed to the `removeComponent`. You will need to forward the relevant props to your custom remove component to make it work.

| Name | Type  | Description |
| --- | ---  | --- |
| `className` | `string`  | The prop `classNames.remove` passed to the `ReactTags` component gets forwarded to the remove component. Defaults to `ReactTags__remove` |
| `onRemove` | `Function` | The callback to be  triggered when tag is removed, you will need to pass this to the `onClick` handler of the remove component |
|`onKeyDown` | `Function` | The callback to be triggered when keydown event occurs. You will need to pass this to `onKeyDown` handler of the remove component|
| `aria-label` | string | The `aria-label` to be announced when the tag at an index is deleted |
| `tag` | <pre>{ id?: string, className: string, key: string }</pre> | The `tag` to be deleted.
| `index` | number | the `index` of the tag to be deleted.


### autocomplete
This prop is deprecated and will be removed in 7.x.x to simplify the integration and make it more intutive. If you have any concerns regarding this, please share your thoughts in https://github.com/react-tags/react-tags/issues/949.

Useful for enhancing data entry workflows for your users by ensuring the first matching suggestion is automatically converted to a tag when a [separator](#separators) key is pressed (such as the enter key). This option has three possible values:

- `true` - when separator key (such as enter) is pressed, first matching suggestion is used.
- `1` - when separator key (such as enter) is pressed, matching suggestion is used only if there is a single matching suggestion
- `false` (default) - tags are not autocompleted on enter/separator key press.

This option has no effect if there are no [`suggestions`](#suggestionsOption).

### readOnly
Renders the component in read-only mode without the input box and `removeComponent`. This also disables the drag-n-drop feature.

### name
The name attribute added to the input.

```
<ReactTags
    name = "inputName"
    ...>
```
### id
The id attribute added to the input.

```
<ReactTags
    id = "inputId"
    ...>
```

### maxLength
The maxLength attribute added to the input. Specifies the maximum number of characters allowed in the input field.

```
<ReactTags
    maxLength = "42"
    ...>
```

### inline
The inline attributes decides whether the input fields and selected tags will be rendered in-line.

```
<ReactTags
    inline
    ...>
```

![img](docs/inline-true.png)

```
<ReactTags
    inline={false}
    ...>
```

![img](docs/inline-false.png)

_This attribute is deprecated and will be removed in v7.x.x, see [inputFieldPosition](#inputFieldPosition)._

### inputFieldPosition
The inputFieldPosition attribute decides the positioning of the input field relative to the tags. Can be one of `inline`, `top` or `bottom`.

```
<ReactTags
    inputFieldPosition="inline"
    ...>
```

![img](docs/input-field-position-inline.png)

```
<ReactTags
    inputFieldPosition="top"
    ...>
```

![img](docs/input-field-position-top.png)

```
<ReactTags
    inputFieldPosition="bottom"
    ...>
```

![img](docs/input-field-position-bottom.png)


### allowUnique 
This prop controls whether tags should be unique.

### allowDragDrop
This prop controls whether tags should have the drag-n-drop feature enabled.


### renderSuggestion
This props allows to provide your own suggestion renderer and override the default one. It receives the suggestion and the query string as parameters. For example:

```
<ReactTags
    renderSuggestion = {({ text }, query) => <div style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>{text} ({ query })</div>}
    ...>
```

### inputProps

When you want to pass additional attributes to the input element (for example autocomplete, disabled etc) you can use this prop. 

```js
<ReactTags
  inputProps = {{
    disabled: true,
    autocomplete: "off"
  }}
/>
```

### allowAdditionFromPaste

This prop implies whether to allow paste action for adding tags. Defaults to `true`.


### editable

This prop implies whether the tags should be editable. Defaults to `false`.


### onTagUpdate

```js
onTagUpdate(editIndex, tag) => void;
```
This callback is if present is triggered when tag is updated. The edit index and the tag are passed in the callback. You can update the [`tags`](#tags) prop in this callback.

### clearAll

This props implies whether 'clear all' button should be shown. Defaults to `false`.


### onClearAll
This callback is if present is triggered when "clear all" button is clicked. You can set the [`tags`](#tags) prop to empty in this callback.

### maxTags
This prop specifies the maximum count of tags to be added. Incase the tags exceed, error will show up to convey the maximum tag limit has reached.

### ariaAttrs

An object containing custom ARIA attributes to enhance screen reader support and improve accessibility. 
It accepts the below attributes
```js
{
  clearAllLabel?: string // Optional accessible label for a "clear all tags" button improving accessibility by providing a clear, descriptive action label.
}


