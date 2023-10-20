---
sidebar_position: 3
---

# Suggestions

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