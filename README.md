### React-Tags

React tags is a simple tagging component ready to drop in your React projects. The component is inspired by GMail's *To* field in the compose window. 

### Features
- Autocomplete based on a suggestion list
- keyboard friendly and mouse support
- Reorder tags using drag and drop


### Why
Because I was looking for an excuse to build a standalone component and publish it in the wild? To be honest, I needed a tagging component that provided the above features for my [React-Surveyman](http://github.com/prakhar1989/react-surveyman) project. Since I was unable to find one which met my requirements (and the fact that I generally enjoy re-inventing the wheel) this is what I came up with.


### Demo

![img](demo.gif)

Check it out [here](http://prakhar.me/react-tags/example)


### Installation
The preferred way of using the component is via NPM

```
npm install --save react-tag-input
```
It is, however, also available to be used separately (`dist/ReactTags.min.js`). If you prefer this method remember to include [ReactDND](https://github.com/gaearon/react-dnd) as a dependancy. Refer to the [demo](http://prakhar.me/react-tags/example) to see how this works.

### Usage

```javascript
// define initial tags (if any)
var tags = [{text: "Apples", id: 1}];

// set a suggestions list
var suggestions = ["Banana", "Mango", "Pear", "Apricot"];

var ReactTags = require('react-tags');

React.render(
    <ReactTags tags={tags} suggestions={suggestions} />,
    document.getElementById('app')
);
```

### Thanks
The autocomplete dropdown is inspired by Lea Verou's [awesomeplete](https://github.com/LeaVerou/awesomplete) library. The Drag and drop functionality is provided by Dan Abramov's insanely useful [ReactDND](https://github.com/gaearon/react-dnd) library.
