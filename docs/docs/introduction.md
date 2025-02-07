---
sidebar_position: 1
slug: /
---

# React tags

## About Us

[![MIT](https://img.shields.io/npm/l/react-tag-input.svg?style=flat-square)](https://github.com/react-tags/react-tags/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![npm downloads](https://img.shields.io/npm/dm/react-tag-input.svg?style=flat-square)](https://www.npmjs.com/package/react-tag-input)
[![Build Status](https://travis-ci.com/react-tags/react-tags.svg?branch=master)](https://travis-ci.com/react-tags/react-tags)[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React-tags is a simple tagging component ready to drop in your projects. The component is inspired by GMail's *To* field in the compose window.

## Features

- Autocomplete based on a suggestion list
- Keyboard friendly and mouse support
- Reorder tags using drag and drop
- Edit tag support
- Optional clear all button

## Why

Started by [Prakhar Srivastav](https://github.com/prakhar1989) and later maintained by [Aakansha Doshi](https://github.com/ad1992).
In Prakhar's words here is why he started it👇🏻
Because I was looking for an excuse to build a standalone component and publish it in the wild? To be honest, I needed a tagging component that provided the above features for my [React-Surveyman](http://github.com/prakhar1989/react-surveyman) project. Since I was unable to find one which met my requirements (and the fact that I generally enjoy re-inventing the wheel) this is what I came up with.

## Preparing for Migration to v7.x.x

Below are the list of `deprecated` props so please stop using it and migrate to the new props as these will be removed in `v7.x.x`.
You will see a warning for the migration as well in the console.

- `delimiters` - Please use [`separators`](#separators) instead, more info in [this issue](https://github.com/react-tags/react-tags/issues/960).
- `inline` - Please use [`inputFieldPosition`](#inputFieldPosition) instead.
- `autofocus` - Please use [`autoFocus`](#autoFocus) instead.

Additionally the prop `autocomplete` is deprecated and will be removed in `v7.x.x`. If you have any concerns regarding this, please share your thoughts in [this issue](https://github.com/react-tags/react-tags/issues/949).

## Support

If you like this library, you can support to help it improve:)

[![Github-sponsors](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/ad1992)

## Dev

The component is written in ES6 and uses [Webpack](http://webpack.github.io/) as its build tool.

## Set up instructions

``` bash
git clone git@github.com:react-tags/react-tags.git
cd react-tags
npm install
npm run precommit
npm run start
```

open [http://localhost:8090/example](http://localhost:8090/example)

## Contributing

Got ideas on how to make this better? Open an issue!

## Thanks

The autocomplete dropdown is inspired by Lea Verou's [awesomeplete](https://github.com/LeaVerou/awesomplete) library. The Drag and drop functionality is provided by Dan Abramov's insanely useful [ReactDND](https://github.com/gaearon/react-dnd) library.

Also thanks to the awesome contributors who've made the library far better!

[default-suggestions-filter-logic]: https://github.com/react-tags/react-tags/blob/v4.0.1/lib/ReactTags.js#L83
[includes-polyfill]: https://github.com/mathiasbynens/String.prototype.includes
