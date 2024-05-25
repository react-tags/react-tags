---
sidebar_position: 4
---

# Usage
    
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