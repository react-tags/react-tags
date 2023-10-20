---
sidebar_position: 32
---

# onTagUpdate

```js
onTagUpdate(editIndex, tag) => void;
```
This callback is if present is triggered when tag is updated. The edit index and the tag are passed in the callback. You can update the [`tags`](#tags) prop in this callback.

## clearAll

This props implies whether 'clear all' button should be shown. Defaults to `false`.


## onClearAll

This callback is if present is triggered when "clear all" button is clicked. You can set the [`tags`](#tags) prop to empty in this callback.