### React-Tags

React tags is a simple tagging component ready to drop in your React projects. The component is inspired by GMail's *To* field in the compose field. 

It supports 
- Autocomplete based on a suggestion list
- Fully keyboard and mouse support
- Reorder tags using drag and drop


### Why
Because I was looking for an excuse to build a standalone component and publish it in the wild? To be honest, I needed a tagging component that provided the above features for my [React-Surveyman](http://github.com/prakhar1989/react-surveyman) project. Since I was unable to find one which met my requirements (and the fact that I generally enjoy re-inventing the wheel) this is what I came up with.


### Demo

Check it out [here](http://prakhar.me/react-tags/example)


### Installation
The component is available on npm. 

```
npm install --save react-tags
```

### Usage

```javascript
// define initial tags (if any)
var tags = [{text: "Apples", id: 1}];

// set a suggestions list
var suggestions = ["Banana", "Mango", "Pear", "Apricot"];

React.render(
    TagsComponent({tags: tags, suggestions: Countries}), 
    document.getElementById('app')
);
```

### Thanks
The autocomplete dropdown is inspired by Lea Verou's [awesomeplete](https://github.com/LeaVerou/awesomplete) library. The Drag and drop functionality is provided by Dan Abramov's insanely useful [ReactDND](https://github.com/gaearon/react-dnd) library.
