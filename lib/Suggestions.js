var React = require('react');

var Suggestions = React.createClass({
    propTypes: {

    },
    render: function() {
        var suggestions = "";

        // handle case for blank suggestions
        if (suggestions.length === 0) {
            return <div className="suggestions"> </div>
        }

        return (
            <div className="suggestions">
                <ul>{ suggestions } </ul>
            </div>
        )
    }
});

module.exports = Suggestions;
