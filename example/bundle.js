(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

module.exports = Countries;

},{}],2:[function(require,module,exports){
'use strict';

var Tags = require('../lib/reactTags'),
    Countries = require('./data');

// Set up test data
var tags = [{ id: 1, text: 'Thailand' }, { id: 2, text: 'India' }, { id: 3, text: 'Malaysia' }];
var TagsComponent = React.createFactory(Tags);

React.render(TagsComponent({ tags: tags, suggestions: Countries }), document.getElementById('app'));

},{"../lib/reactTags":3,"./data":1}],3:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Constants
var Keys = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ESCAPE: 27
};

var ItemTypes = { TAG: "tag" };

// Components
var Tag = React.createClass({
    displayName: "Tag",

    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveCard: React.PropTypes.func.isRequired
    },
    statics: {
        configureDragDrop: function configureDragDrop(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function beginDrag(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        };
                    }
                },
                dropTarget: {
                    over: function over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function render() {
        var isDragging = this.getDragState(ItemTypes.TAG).isDragging;
        return React.createElement(
            "span",
            _extends({ className: "tag"
            }, this.dragSourceFor(ItemTypes.TAG), this.dropTargetFor(ItemTypes.TAG)),
            this.props.tag.text,
            React.createElement(
                "a",
                { className: "remove", onClick: this.props.onDelete },
                "x"
            )
        );
    }
});

var Tags = React.createClass({
    displayName: "Tags",

    componentDidMount: function componentDidMount() {
        this.refs.input.getDOMNode().focus();
    },
    getInitialState: function getInitialState() {
        return {
            tags: this.props.tags,
            suggestions: this.props.suggestions,
            query: "",
            selectedIndex: -1,
            selectionMode: false
        };
    },
    handleDelete: function handleDelete(i, e) {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({
            tags: tags,
            query: ""
        });
    },
    markIt: function markIt(input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
            __html: input.replace(r, "<mark>$&</mark>")
        };
    },
    handleChange: function handleChange(e) {
        var query = e.target.value.trim();
        var suggestions = this.props.suggestions.filter(function (item) {
            return item.toLowerCase().search(query.toLowerCase()) === 0;
        });

        this.setState({
            query: query,
            suggestions: suggestions });
    },
    handleKeyDown: function handleKeyDown(e) {
        var tags = this.state.tags;
        var input = this.refs.input.getDOMNode();
        var query = this.state.query;
        var selectedIndex = this.state.selectedIndex;
        var suggestions = this.state.suggestions;

        // hide suggestions menu on escape
        if (e.keyCode === Keys.ESCAPE) {
            e.preventDefault();
            this.setState({
                selectedIndex: -1,
                selectionMode: false,
                suggestions: []
            });
        }

        // when enter or tab is pressed add query to tags
        if ((e.keyCode === Keys.ENTER || e.keyCode === Keys.TAB) && query != "") {
            e.preventDefault();
            if (this.state.selectionMode) {
                query = this.state.suggestions[this.state.selectedIndex];
            }
            this.addTag(query);
        }

        // when backspace key is pressed and query is blank, delete tag
        if (e.keyCode === Keys.BACKSPACE && query == "") {
            //
            this.handleDelete(tags.length - 1);
        }

        // up arrow
        if (e.keyCode === Keys.UP_ARROW) {
            e.preventDefault();
            var selectedIndex = this.state.selectedIndex;
            // last item, cycle to the top
            if (selectedIndex <= 0) {
                this.setState({
                    selectedIndex: this.state.suggestions.length - 1,
                    selectionMode: true
                });
            } else {
                this.setState({
                    selectedIndex: selectedIndex - 1,
                    selectionMode: true
                });
            }
        }

        // down arrow
        if (e.keyCode === Keys.DOWN_ARROW) {
            e.preventDefault();
            this.setState({
                selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
                selectionMode: true
            });
        }
    },
    addTag: function addTag(tag) {
        var tags = this.state.tags;
        var input = this.refs.input.getDOMNode();

        // add the tag in the list
        tags.push({
            id: tags.length + 1,
            text: tag
        });

        // reset the state
        this.setState({
            tags: tags,
            query: "",
            selectionMode: false,
            selectedIndex: -1
        });

        // focus back on the input box
        input.value = "";
        input.focus();
    },
    handleSuggestionClick: function handleSuggestionClick(i, e) {
        this.addTag(this.state.suggestions[i]);
    },
    handleSuggestionHover: function handleSuggestionHover(i, e) {
        this.setState({
            selectedIndex: i,
            selectionMode: true
        });
    },
    moveTag: function moveTag(id, afterId) {
        var tags = this.state.tags;

        // locate tags
        var tag = tags.filter(function (t) {
            return t.id === id;
        })[0];
        var afterTag = tags.filter(function (t) {
            return t.id === afterId;
        })[0];

        // find their position in the array
        var tagIndex = tags.indexOf(tag);
        var afterTagIndex = tags.indexOf(afterTag);

        // mutate array
        tags.splice(tagIndex, 1);
        tags.splice(afterTagIndex, 0, tag);

        // re-render
        this.setState({ tags: tags });
    },
    render: function render() {
        var tagItems = this.state.tags.map((function (tag, i) {
            return React.createElement(Tag, { tag: tag,
                onDelete: this.handleDelete.bind(this, i),
                moveTag: this.moveTag });
        }).bind(this));

        // get the suggestions for the given query
        var query = this.state.query.trim(),
            selectedIndex = this.state.selectedIndex,
            suggestions = [];

        // min-length of search query that is required - 2
        if (query.length > 1) {
            suggestions = this.state.suggestions.map((function (item, i) {
                return React.createElement(
                    "li",
                    { key: i, onClick: this.handleSuggestionClick.bind(this, i),
                        onMouseOver: this.handleSuggestionHover.bind(this, i),
                        className: i == selectedIndex ? "active" : "" },
                    React.createElement("span", { dangerouslySetInnerHTML: this.markIt(item, query) })
                );
            }).bind(this));
        }

        return React.createElement(
            "div",
            { className: "tags" },
            React.createElement(
                "div",
                { className: "selected-tags" },
                tagItems
            ),
            React.createElement(
                "div",
                { className: "tagInput" },
                React.createElement("input", { ref: "input",
                    type: "text",
                    placeholder: "Add new country",
                    onChange: this.handleChange,
                    onKeyDown: this.handleKeyDown }),
                React.createElement(
                    "div",
                    { className: "suggestions" },
                    suggestions.length > 0 ? React.createElement(
                        "ul",
                        null,
                        " ",
                        suggestions,
                        " "
                    ) : ""
                )
            ),
            React.createElement(
                "pre",
                null,
                " ",
                React.createElement(
                    "code",
                    null,
                    " ",
                    JSON.stringify(this.state.tags, null, 2),
                    " "
                ),
                " "
            )
        );
    }
});

module.exports = Tags;

/*
React.render(
    React.createElement(Tags, {tags: tags, suggestions: suggestions}), 
    document.getElementById("app")
);
*/

},{}]},{},[2]);
