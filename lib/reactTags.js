var React = require('react');
var Tag = require('./Tag');
var Suggestions = require('./Suggestions');

// Constants
const Keys = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ESCAPE: 27
};

var ReactTags = React.createClass({
    propTypes: {
        tags: React.PropTypes.array,
        placeholder: React.PropTypes.string,
        labelField: React.PropTypes.string,
        suggestions: React.PropTypes.array,
        handleDelete: React.PropTypes.func.isRequired,
        handleAddition: React.PropTypes.func.isRequired,
        handleDrag: React.PropTypes.func.isRequired
    },
    getDefaultProps: function() {
        return {
            placeholder: 'Add new tag',
            tags: [],
            suggestions: []
        }
    },
    componentDidMount: function() {
        this.refs.input.getDOMNode().focus();
    },
    getInitialState: function() {
        return {
            suggestions: this.props.suggestions,
            query: "",
            selectedIndex: -1,
            selectionMode: false
        }
    },
    handleDelete: function(i, e) {
        this.props.handleDelete(i);
        this.setState({ query: "" });
    },
    handleChange: function(e) {
        var query = e.target.value.trim();
        var suggestions = this.props.suggestions.filter(function(item) {
            return (item.toLowerCase()).search(query.toLowerCase()) === 0;
        });

        this.setState({
            query: query,
            suggestions: suggestions,
        });
    },
    handleKeyDown: function(e) {
        var { query, selectedIndex, suggestions } = this.state;

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
        if (e.keyCode === Keys.BACKSPACE && query == "") { //
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
    addTag: function(tag) {
        var input = this.refs.input.getDOMNode();

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
    handleSuggestionClick: function(i, e) {
        this.addTag(this.state.suggestions[i]);
    },
    handleSuggestionHover: function(i, e) {
        this.setState({
            selectedIndex: i,
            selectionMode: true
        });
    },
    moveTag: function(id, afterId) {
        var tags = this.props.tags;

        // locate tags
        var tag = tags.filter(t => t.id === id)[0];
        var afterTag = tags.filter(t => t.id === afterId)[0];

        // find their position in the array
        var tagIndex = tags.indexOf(tag);
        var afterTagIndex = tags.indexOf(afterTag);

        // call handler with current position and after position
        this.props.handleDrag(tag, tagIndex, afterTagIndex);
    },
    render: function() {
        var tagItems = this.props.tags.map(function(tag, i) {
            return <Tag key={i}
                        tag={tag} 
                        labelField={this.props.labelField}
                        onDelete={this.handleDelete.bind(this, i)}
                        moveTag={this.moveTag}/>
        }.bind(this));

        // get the suggestions for the given query
        var query = this.state.query.trim(),
            selectedIndex = this.state.selectedIndex,
            suggestions = this.state.suggestions,
            placeholder = this.props.placeholder;

        return ( 
            <div className="ReactTags__tags"> 
              <div className="ReactTags__selected">{tagItems}</div>
                <div className="ReactTags__tagInput">
                    <input ref="input" 
                        type="text" 
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}/>
                    <Suggestions query={query}
                        suggestions={suggestions}
                        selectedIndex={selectedIndex}
                        handleClick={this.handleSuggestionClick}
                        handleHover={this.handleSuggestionHover} />
                </div>
            </div>
        )
    }
});


module.exports = ReactTags;
