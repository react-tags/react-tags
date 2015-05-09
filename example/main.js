var Tags = require('../lib/reactTags'),
    Countries = require('./data');

// Set up test data
var tags = [{id: 1, text: "Thailand"}, {id: 2, text: "India"}, {id: 3, text: "Malaysia"}];
var TagsComponent = React.createFactory(Tags);

React.render(TagsComponent({tags: tags, suggestions: Countries}), 
    document.getElementById('app')
);
