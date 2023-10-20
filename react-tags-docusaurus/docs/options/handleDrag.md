---
sidebar_position: 9
---

# handleDrag

If you want tags to be draggable, you need to provide this function.
Function called when the user drags a tag.

```js
function(tag, currPos, newPos) {
    // remove tag from currPos and add in newPos
}
```