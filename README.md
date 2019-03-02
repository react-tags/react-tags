React-Tags
===

[![MIT](https://img.shields.io/npm/l/react-tag-input.svg?style=flat-square)](https://github.com/prakhar1989/react-tags/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![Dependency Status](https://david-dm.org/yahoo/react-dnd-touch-backend.svg)](https://david-dm.org/yahoo/react-dnd-touch-backend)
[![devDependency Status](https://david-dm.org/yahoo/react-dnd-touch-backend/dev-status.svg)](https://david-dm.org/yahoo/react-dnd-touch-backend#info=devDependencies)
[![npm downloads](https://img.shields.io/npm/dm/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![build status](https://img.shields.io/travis/prakhar1989/react-tags.svg?style=flat-square)](https://travis-ci.org/prakhar1989/react-tags)
[![Greenkeeper badge](https://badges.greenkeeper.io/prakhar1989/react-tags.svg)](https://greenkeeper.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<a href="https://codeclimate.com/github/prakhar1989/react-tags/maintainability"><img src="https://api.codeclimate.com/v1/badges/b9edb2810b02bb845d20/maintainability" /></a>
<a href="https://codeclimate.com/github/prakhar1989/react-tags/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b9edb2810b02bb845d20/test_coverage" /></a>

React-tags is a simple tagging component ready to drop in your React projects. The component is inspired by GMail's *To* field in the compose window.

### Features
- Autocomplete based on a suggestion list
- Keyboard friendly and mouse support
- Reorder tags using drag and drop

### Why
Because I was looking for an excuse to build a standalone component and publish it in the wild? To be honest, I needed a tagging component that provided the above features for my [React-Surveyman](http://github.com/prakhar1989/react-surveyman) project. Since I was unable to find one which met my requirements (and the fact that I generally enjoy re-inventing the wheel) this is what I came up with.


### Demo
![img](demo.gif)

Check it out [here](https://stackblitz.com/edit/react-tag-input-1nelrc)

### Installation
The preferred way of using the component is via NPM

```
npm install --save react-tag-input
```
make sure you have installed the **peer dependencies** as well with below versions
```
react: ^16.3.1,
react-dnd: ^5.0.0
react-dnd-html5-backend: ^3.0.2
react-dom": ^16.3.1

```
It is, however, also available to be used separately (`dist/ReactTags.min.js`). If you prefer this method remember to include [ReactDND](https://github.com/gaearon/react-dnd) as a dependancy. Refer to the [example](https://stackblitz.com/edit/react-tag-input) to see how this works.

### Usage

Here's a sample implementation that initializes the component with a list of initial `tags` and `suggestions` list. Apart from this, there are multiple events, handlers for which need to be set. For more details, go through the [API](#Options).


```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
                { id: "Thailand", text: "Thailand" },
                { id: "India", text: "India" }
             ],
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
```

**A note about `Contexts`**
One of the dependencies of this component is the [react-dnd](https://github.com/gaearon/react-dnd) library. Since the 1.0 version, the original author has changed the API and requires the application using any draggable components to have a top-level [backend](http://gaearon.github.io/react-dnd/docs-html5-backend.html) context. So if you're using this component in an existing Application that uses React-DND you will already have a backend defined, in which case, you should `require` the component *without* the context.

```javascript
const ReactTags = require('react-tag-input').WithOutContext;
```
Otherwise, you can simply import along with the backend itself (as shown above). If you have ideas to make this API better, I'd [love to hear](https://github.com/prakhar1989/react-tags/issues/new).

<a name="Options"></a>
### Options

Option | Type | Default | Description
--- | --- | --- | ---
|[`tags`](#tagsOption) | `Array` | `[]` | An array of tags that are displayed as pre-selected
|[`suggestions`](#suggestionsOption) | `Array` | `[]` | An array of suggestions that are used as basis for showing suggestions
|[`delimiters`](#delimiters) | `Array` | `[ENTER, TAB]` | Specifies which characters should terminate tags input
|[`placeholder`](#placeholderOption) | `String` | `Add new tag` | The placeholder shown for the input
|[`labelField`](#labelFieldOption) | `String` | `text` | Provide an alternative `label` property for the tags
|[`handleAddition`](#handleAdditionOption) | `Function` | `undefined` | Function called when the user wants to add a tag (required)
|[`handleDelete`](#handleDeleteOption) | `Function` | `undefined` | Function called when the user wants to delete a tag (required)
|[`handleDrag`](#handleDragOption) | `Function` | `undefined` | Function called when the user drags a tag
|[`handleFilterSuggestions`](#handleFilterSuggestions) | `Function` | `undefined` | Function called when filtering suggestions
|[`handleTagClick`](#handleTagClickOption) | `Function` | `undefined` | Function called when the user wants to know which tag was clicked
|[`autofocus`](#autofocus) | `Boolean` | `true` | Boolean value to control whether the text-input should be autofocused on mount
|[`allowDeleteFromEmptyInput`](#allowDeleteFromEmptyInput) | `Boolean` | `true` | Boolean value to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box
|[`handleInputChange`](#handleInputChange) | `Function` | `undefined` | Event handler for input onChange
|[`handleInputFocus`](#handleInputFocus) | `Function` | `undefined` | Event handler for input onFocus
|[`handleInputBlur`](#handleInputBlur) | `Function` | `undefined` | Event handler for input onBlur
|[`minQueryLength`](#minQueryLength) | `Number` | `2` | How many characters are needed for suggestions to appear
|[`removeComponent`](#removeComponent) | `Boolean` | `false` | Custom delete/remove tag element
|[`autocomplete`](#autocomplete) | `Boolean`/`Number` | `false` | Ensure the first matching suggestion is automatically converted to a tag when a [delimiter](#delimiters) key is pressed
|[`readOnly`](#readOnly) | `Boolean` | `false` | Read-only mode without the input box and `removeComponent` and drag-n-drop features disabled
|[`name`](#nameOption) | `String` | `undefined` | The `name` attribute added to the input
|[`id`](#idOption) | `String` | `undefined` | The `id` attribute added to the input
|[`maxLength`](#maxLength) | `Number` | `Infinity` | The `maxLength` attribute added to the input
|[`inline`](#inline) | `Boolean` | `true` | Render input field and selected tags in-line
|[`inputFieldPosition`](#inputFieldPosition) | `String` | `inline` | Specify position of input field relative to tags
|[`allowUnique`](#allowUnique) | `Boolean` | `true` | Boolean value to control whether tags should be unqiue
|[`allowDragDrop`](#allowDragDrop) | `Boolean` | `true` | Boolean value to control whether tags should have drag-n-drop features enabled
|[`renderSuggestion`](#renderSuggestion) | `Function` | `undefined` | Render prop for rendering your own suggestions

<a name="tagsOption"></a>
##### tags (optional, defaults to `[]`)
An array of tags that are displayed as pre-selected. Each tag should have an `id` property, property for the label, which is specified by the [`labelField`](#labelFieldOption) and class for label, which is specified by `className`.

```js
// With default labelField
const tags =  [ { id: "1", text: "Apples" } ]

// With labelField of `name`
const tags =  [ { id: "1", name: "Apples" } ]

// With className
const tags = [ { id: "1", text: "Apples", className: 'red'} ]
```

<a name="suggestionsOption"></a>
##### suggestions (optional, defaults to `[]`)
An array of suggestions that are used as basis for showing suggestions. These objects should follow the same structure as the `tags`. So if the `labelField` is `name`, the following would work:

```js
// With labelField of `name`
const suggestions = [
    { id: "1", name: "mango" },
    { id: "2", name: "pineapple"},
    { id: "3", name: "orange" },
    { id: "4", name: "pear" }
];

<a name="delimiters"></a>
##### delimiters (optional, defaults to `[ENTER, TAB]`)
Specifies which characters should terminate tags input. An array of character codes.

```js
const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
};
<ReactTags
    delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA]}
 />
```


<a name="placeholderOption"></a>
##### placeholder (optional, defaults to `Add new tag`)
The placeholder shown for the input.

```js
let placeholder = "Add new country"
```

<a name="labelFieldOption"></a>
##### labelField (optional, defaults to `text`)
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


<a name="handleAdditionOption"></a>
##### handleAddition (required)
Function called when the user wants to add a tag (either a click, a tab press or carriage return)

```js
function(tag) {
    // add the tag to the tag list
}
```

<a name="handleDeleteOption"></a>
##### handleDelete (required)
Function called when the user wants to delete a tag

```js
function(i) {
    // delete the tag at index i
}
```

<a name="handleDragOption"></a>
##### handleDrag (optional)
If you want tags to be draggable, you need to provide this function.
Function called when the user drags a tag.

```js
function(tag, currPos, newPos) {
    // remove tag from currPos and add in newPos
}
```

<a name="handleFilterSuggestions"></a>
##### handleFilterSuggestions (optional)
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

<a name="handleTagClickOption"></a>
##### handleTagClick (optional)
Function called when the user wants to know which tag was clicked

```js
function(i) {
    // use the tag details at index i
}
```

<a name="autofocus"></a>
##### autofocus (optional, defaults to `true`)
Optional boolean param to control whether the text-input should be autofocused on mount.

```jsx
<ReactTags
    autofocus={false}
    ...>
```

<a name="allowDeleteFromEmptyInput"></a>
##### allowDeleteFromEmptyInput (optional, defaults to `true`)
Optional boolean param to control whether tags should be deleted when the 'Delete' key is pressed in an empty Input Box.

```js
<ReactTags
    allowDeleteFromEmptyInput={false}
    ...>
```

<a name="handleInputChange"></a>
##### handleInputChange (optional)
Optional event handler for input onChange

```js
<ReactTags
    handleInputChange={this.handleInputChange}
    ...>
```
<a name="handleInputFocus"></a>
##### handleInputFocus (optional)
Optional event handler for input onFocus

```js
<ReactTags
    handleInputFocus={this.handleInputFocus}
    ...>
```

<a name="handleInputBlur"></a>
##### handleInputBlur (optional)
Optional event handler for input onBlur

```js
<ReactTags
    handleInputBlur={this.handleInputBlur}
    ...>
```

<a name="minQueryLength"></a>
##### minQueryLength (optional, defaults to `2`)
How many characters are needed for suggestions to appear.

<a name="removeComponent"></a>
##### removeComponent (optional)
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
      return (
         <button {...this.props}>
            <img src="my-icon.png" />
         </button>
      )
   }
}
```

The "ReactTags__remove" className and `onClick` handler properties can be automatically included on the `<button>` by using the [JSX spread attribute](https://facebook.github.io/react/docs/jsx-spread.html), as illustrated above.

<a name="autocomplete"></a>
##### autocomplete (optional, defaults to `false`)
Useful for enhancing data entry workflows for your users by ensuring the first matching suggestion is automatically converted to a tag when a [delimiter](#delimiters) key is pressed (such as the enter key). This option has three possible values:

- `true` - when delimeter key (such as enter) is pressed, first matching suggestion is used.
- `1` - when delimeter key (such as enter) is pressed, matching suggestion is used only if there is a single matching suggestion
- `false` (default) - tags are not autocompleted on enter/delimiter

This option has no effect if there are no [`suggestions`](#suggestionsOption).

<a name="readOnly"></a>
##### readOnly (optional, defaults to `false`)
Renders the component in read-only mode without the input box and `removeComponent`. This also disables the drag-n-drop feature.

<a name="nameOption"></a>
##### name (optional)
The name attribute added to the input.

```
<ReactTags
    name = "inputName"
    ...>
```

<a name="idOption"></a>
##### id (optional)
The id attribute added to the input.

```
<ReactTags
    id = "inputId"
    ...>
```

<a name="maxLength"></a>
##### maxLength (optional)
The maxLength attribute added to the input. Specifies the maximum number of characters allowed in the input field.

```
<ReactTags
    maxLength = "42"
    ...>
```

<a name="inline"></a>
##### inline (optional, defaults to `true`)
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

<a name="inputFieldPosition"></a>
##### inputFieldPosition (optional, defaults to `inline`)
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

<a name="allowUnique"></a>
#### allowUnique (optional, defaults to `true`)
This prop controls whether tags should be unique.

<a name="allowDragDrop"></a>
#### allowDragDrop (optional, defaults to `true`)
This prop controls whether tags should have the drag-n-drop feature enabled.

<a name="renderSuggestion"></a>
#### renderSuggestion (optional)
This props allows to provide your own suggestion renderer and override the default one. It receives the suggestion and the query string as parameters. For example:

```
<ReactTags
    renderSuggestion = {({ text }, query) => <div style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>{text} ({ query })</div>}
    ...>
```

### Styling
`<ReactTags>` does not come up with any styles. However, it is very easy to customize the look of the component the way you want it. By default, the component provides the following classes with which you can style -

- `ReactTags__tags`
- `ReactTags__tagInput`
- `ReactTags__tagInputField`
- `ReactTags__selected`
- `ReactTags__selected ReactTags__tag`
- `ReactTags__selected ReactTags__remove`
- `ReactTags__suggestions`
- `ReactTags__activeSuggestion`

An example can be found in `/example/reactTags.css`.

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
      activeSuggestion: 'activeSuggestionClass'
    }}
    ...>
```


### Dev
The component is written in ES6 and uses [Webpack](http://webpack.github.io/) as its build tool.

#### Set up instructions

```
git clone git@github.com:prakhar1989/react-tags.git
cd react-tags
npm install
npm run precommit
npm run start
```
open [http://localhost:8090/example](http://localhost:8090/example)


### Contributing
Got ideas on how to make this better? Open an issue!


### Thanks
The autocomplete dropdown is inspired by Lea Verou's [awesomeplete](https://github.com/LeaVerou/awesomplete) library. The Drag and drop functionality is provided by Dan Abramov's insanely useful [ReactDND](https://github.com/gaearon/react-dnd) library.

Also thanks to the awesome contributors who've made the library far better!


[default-suggestions-filter-logic]: https://github.com/prakhar1989/react-tags/blob/v4.0.1/lib/ReactTags.js#L83
[includes-polyfill]: https://github.com/mathiasbynens/String.prototype.includes
