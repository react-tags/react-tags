---
sidebar_position: 18
---

# removeComponent

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
