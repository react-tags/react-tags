var React = require('react');

var Suggestions = React.createClass({
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
    markIt: function (input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
            __html: input.replace(r, "<mark>$&</mark>")
        }
    },
    shouldRenderSuggestions: function (query) {
        var props = this.props;
        var minQueryLength = props.minQueryLength || 2;
        return (props.query.length >= minQueryLength);
    },
    render: function () {
        var props = this.props;
        var suggestions = this.props.suggestions.map(function (item, i) {
            return (
                <li key={i}
                    onClick={props.handleClick.bind(null, i) }
                    onMouseOver={props.handleHover.bind(null, i) }
                    className={i == props.selectedIndex ? "active" : ""}>
                    <span dangerouslySetInnerHTML={this.markIt(item, props.query) } />
                </li>
            )
        }.bind(this));

        // use the override, if provided
        let shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
        if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
          return null;
        }

        return (
            <div className={this.props.classNames.suggestions}>
                <ul> { suggestions } </ul>
            </div>
        )
    }
});

module.exports = Suggestions;
