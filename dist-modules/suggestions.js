"use strict";

var React = require('react');

var Suggestions = React.createClass({
    displayName: "Suggestions",

    propTypes: {
        query: React.PropTypes.string.isRequired,
        selectedIndex: React.PropTypes.number.isRequired,
        suggestions: React.PropTypes.array.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        handleHover: React.PropTypes.func.isRequired,
        minQueryLength: React.PropTypes.number,
        shouldRenderSuggestions: React.PropTypes.func,
        classNames: React.PropTypes.object
    },
    markIt: function markIt(input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
            __html: input.replace(r, "<mark>$&</mark>")
        };
    },
    shouldRenderSuggestions: function shouldRenderSuggestions(query) {
        var props = this.props;
        var minQueryLength = props.minQueryLength || 2;
        return props.query.length >= minQueryLength;
    },
    render: function render() {
        var props = this.props;
        var suggestions = this.props.suggestions.map(function (item, i) {
            return React.createElement(
                "li",
                { key: i,
                    onClick: props.handleClick.bind(null, i),
                    onMouseOver: props.handleHover.bind(null, i),
                    className: i == props.selectedIndex ? "active" : "" },
                React.createElement("span", { dangerouslySetInnerHTML: this.markIt(item, props.query) })
            );
        }.bind(this));

        if (suggestions.length === 0 || this.props.shouldRenderSuggestions != null && !this.props.shouldRenderSuggestions(props.query) || this.props.shouldRenderSuggestions == null && !this.shouldRenderSuggestions(props.query)) {
            return null;
        }

        return React.createElement(
            "div",
            { className: this.props.classNames.suggestions },
            React.createElement(
                "ul",
                null,
                " ",
                suggestions,
                " "
            )
        );
    }
});

module.exports = Suggestions;