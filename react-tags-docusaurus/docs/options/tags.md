---
sidebar_position: 2
---

# Tags 

An array of tags that are displayed as pre-selected. Each tag should have an `id` property, property for the label, which is specified by the [`labelField`](#labelFieldOption) and class for label, which is specified by `className`.

```js
// With default labelField
const tags =  [ { id: "1", text: "Apples" } ]

// With labelField of `name`
const tags =  [ { id: "1", name: "Apples" } ]

// With className
const tags = [ { id: "1", text: "Apples", className: 'red'} ]
```