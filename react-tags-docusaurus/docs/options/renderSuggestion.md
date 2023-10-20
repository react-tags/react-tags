---
sidebar_position: 28
---

# renderSuggestion

This props allows to provide your own suggestion renderer and override the default one. It receives the suggestion and the query string as parameters. For example:

```
<ReactTags
    renderSuggestion = {({ text }, query) => <div style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>{text} ({ query })</div>}
    ...>
```