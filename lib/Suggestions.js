var React = require('react');

var Suggestions = React.createClass({
    propTypes: {
        query: React.PropTypes.string.isRequired,
        selectedIndex: React.PropTypes.number.isRequired,
        suggestions: React.PropTypes.array.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        handleHover: React.PropTypes.func.isRequired,
        minQueryLength: React.PropTypes.number
    },
    markIt: function(input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
          __html: input.replace(r, "<mark>$&</mark>")
        }
    },
    render: function() {
        var props = this.props;
        var suggestions = this.props.suggestions.map(function(item, i) {
            return (
                <li key={i}
                    onClick={props.handleClick.bind(null, i)}
                    onMouseOver={props.handleHover.bind(null, i)}
                    className={i == props.selectedIndex ? "active" : ""}>
                    <span dangerouslySetInnerHTML={this.markIt(item, props.query)} />
                 </li>
            )
        }.bind(this));

        var minQueryLength = props.minQueryLength || 2;
        if (suggestions.length === 0 || props.query.length < minQueryLength) {
            return <div className="ReactTags__suggestions"> </div>
        }

        return (
            <div className="ReactTags__suggestions">
                <ul> { suggestions } </ul>
            </div>
        )
    }
});

module.exports = Suggestions;
