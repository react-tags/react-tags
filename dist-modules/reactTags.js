'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Tag = require('./Tag');
var Suggestions = require('./Suggestions');

var _require = require('react-dnd');

var DragDropContext = _require.DragDropContext;

var HTML5Backend = require('react-dnd-html5-backend');

// Constants
var Keys = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ESCAPE: 27
};

var ReactTags = React.createClass({
    displayName: 'ReactTags',

    propTypes: {
        tags: React.PropTypes.array,
        placeholder: React.PropTypes.string,
        labelField: React.PropTypes.string,
        suggestions: React.PropTypes.array,
        delimeters: React.PropTypes.array,
        autofocus: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        handleDelete: React.PropTypes.func.isRequired,
        handleAddition: React.PropTypes.func.isRequired,
        handleDrag: React.PropTypes.func.isRequired,
        allowDeleteFromEmptyInput: React.PropTypes.bool,
        handleInputChange: React.PropTypes.func,
        minQueryLength: React.PropTypes.number,
        removeComponent: React.PropTypes.func,
        autocomplete: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number])
    },
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: 'Add new tag',
            tags: [],
            suggestions: [],
            delimeters: [Keys.ENTER, Keys.TAB],
            autofocus: true,
            inline: true,
            allowDeleteFromEmptyInput: true,
            minQueryLength: 2,
            autocomplete: false
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.props.autofocus) {
            this.refs.input.focus();
        }
    },
    getInitialState: function getInitialState() {
        return {
            suggestions: this.props.suggestions,
            query: "",
            selectedIndex: -1,
            selectionMode: false
        };
    },
    filteredSuggestions: function filteredSuggestions(query, suggestions) {
        return suggestions.filter(function (item) {
            return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
        this.setState({
            suggestions: suggestions
        });
    },

    handleDelete: function handleDelete(i, e) {
        this.props.handleDelete(i);
        this.setState({ query: "" });
    },
    handleChange: function handleChange(e) {
        if (this.props.handleInputChange) {
            this.props.handleInputChange(e.target.value.trim());
        }

        var query = e.target.value.trim();
        var suggestions = this.filteredSuggestions(query, this.props.suggestions);

        this.setState({
            query: query,
            suggestions: suggestions
        });
    },
    handleKeyDown: function handleKeyDown(e) {
        var _state = this.state;
        var query = _state.query;
        var selectedIndex = _state.selectedIndex;
        var suggestions = _state.suggestions;

        // hide suggestions menu on escape
        if (e.keyCode === Keys.ESCAPE) {
            e.preventDefault();
            this.setState({
                selectedIndex: -1,
                selectionMode: false,
                suggestions: []
            });
        }

        // When one of the terminating keys is pressed, add current query to the tags.
        // If no text is typed in so far, ignore the action - so we don't end up with a terminating
        // character typed in.
        if (this.props.delimeters.indexOf(e.keyCode) !== -1) {
            e.preventDefault();
            if (query !== "") {
                if (this.state.selectionMode) {
                    query = this.state.suggestions[this.state.selectedIndex];
                }
                this.addTag(query);
            }
        }

        // when backspace key is pressed and query is blank, delete tag
        if (e.keyCode === Keys.BACKSPACE && query == "" && this.props.allowDeleteFromEmptyInput) {
            this.handleDelete(this.props.tags.length - 1);
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
        var input = this.refs.input;

        if (this.props.autocomplete) {
            var possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

            if (this.props.autocomplete === 1 && possibleMatches.length === 1 || this.props.autocomplete === true) {
                tag = possibleMatches[0];
            }
        }

        // call method to add
        this.props.handleAddition(tag);

        // reset the state
        this.setState({
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
        var tags = this.props.tags;

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

        // call handler with current position and after position
        this.props.handleDrag(tag, tagIndex, afterTagIndex);
    },
    render: function render() {
        var tagItems = this.props.tags.map((function (tag, i) {
            return React.createElement(Tag, { key: tag.id,
                tag: tag,
                labelField: this.props.labelField,
                onDelete: this.handleDelete.bind(this, i),
                moveTag: this.moveTag,
                removeComponent: this.props.removeComponent });
        }).bind(this));

        // get the suggestions for the given query
        var query = this.state.query.trim(),
            selectedIndex = this.state.selectedIndex,
            suggestions = this.state.suggestions,
            placeholder = this.props.placeholder;

        var tagInput = React.createElement(
            'div',
            { className: 'ReactTags__tagInput' },
            React.createElement('input', { ref: 'input',
                type: 'text',
                placeholder: placeholder,
                'aria-label': placeholder,
                onChange: this.handleChange,
                onKeyDown: this.handleKeyDown }),
            React.createElement(Suggestions, { query: query,
                suggestions: suggestions,
                selectedIndex: selectedIndex,
                handleClick: this.handleSuggestionClick,
                handleHover: this.handleSuggestionHover,
                minQueryLength: this.props.minQueryLength })
        );

        return React.createElement(
            'div',
            { className: 'ReactTags__tags' },
            React.createElement(
                'div',
                { className: 'ReactTags__selected' },
                tagItems,
                this.props.inline && tagInput
            ),
            !this.props.inline && tagInput
        );
    }
});

module.exports = {
    WithContext: DragDropContext(HTML5Backend)(ReactTags),
    WithOutContext: ReactTags,
    Keys: Keys
};