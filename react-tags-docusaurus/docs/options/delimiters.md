---
sidebar_position: 4
---


# delimiters
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