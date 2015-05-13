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
    getDefaultProps: function() {
        return {
            tags: [],
            suggestions: []
        }
    },
    componentDidMount: function() {
        this.refs.input.getDOMNode().focus();
    },
    getInitialState: function() {
        return {
            tags: this.props.tags,
            suggestions: this.props.suggestions,
            query: "",
            selectedIndex: -1,
            selectionMode: false
        }
    },
    handleDelete: function(i, e) {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({
            tags: tags,
            query: ""
        });
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
        var tags = this.state.tags;
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
        if (e.keyCode === Keys.BACKSPACE && query == "") { //
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
    addTag: function(tag) {
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
        var tags = this.state.tags;

        // locate tags
        var tag = tags.filter(function(t) { return t.id === id })[0];
        var afterTag = tags.filter(function(t) { return t.id === afterId })[0];
        
        // find their position in the array
        var tagIndex = tags.indexOf(tag);
        var afterTagIndex = tags.indexOf(afterTag);

        // mutate array
        tags.splice(tagIndex, 1);
        tags.splice(afterTagIndex, 0, tag);

        // re-render
        this.setState({ tags: tags });
    },
    render: function() {
        var tagItems = this.state.tags.map(function(tag, i) {
            return <Tag tag={tag} 
                        onDelete={this.handleDelete.bind(this, i)}
                        moveTag={this.moveTag}/>
        }.bind(this));

        // get the suggestions for the given query
        var query = this.state.query.trim(),
            selectedIndex = this.state.selectedIndex,
            suggestions = this.state.suggestions;

        return ( 
            <div className="tags"> 
              <div className="selected-tags">{tagItems}</div>
                <div className="tagInput">
                    <input ref="input" 
                        type="text" 
                        placeholder="Add new country"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}/>
                    <Suggestions query={query}
                        suggestions={suggestions}
                        selectedIndex={selectedIndex}
                        handleClick={this.handleSuggestionClick}
                        handleHover={this.handleSuggestionHover} />
                </div>
                  <pre> <code> {JSON.stringify(this.state.tags, null, 2)} </code> </pre>
            </div>
        )
    }
});


module.exports = ReactTags;
