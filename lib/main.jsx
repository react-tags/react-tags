var Keys = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40
};

var Tags = React.createClass({
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
    markIt: function(input, query) {
        var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        var r = RegExp(escapedRegex, "gi");
        return {
          __html: input.replace(r, "<mark>$&</mark>")
        }
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
        var input = this.refs.input.getDOMNode();
        var query = this.state.query;
        var selectedIndex = this.state.selectedIndex;

        // when enter or tab is pressed add query to tags
        if ((e.keyCode === Keys.ENTER || e.keyCode === Keys.TAB) && query != "") {
            e.preventDefault();
            if (this.state.selectionMode) {
                query = this.state.suggestions[this.state.selectedIndex];               
            }
            tags.push(query);
            input.value = "";
            this.setState({ 
              tags: tags, 
              query: "",
              selectionMode: false,
              selectedIndex: -1
            });
        }

        // when backspace key is pressed and query is blank, delete tag
        if (e.keyCode === 8 && query == "") { //
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
            var selectedIndex = this.state.selectedIndex;
            // last item, cycle to the top
            if (selectedIndex === this.state.suggestions.length - 1) {
                this.setState({
                  selectedIndex: 0,
                  selectionMode: true
                });
            } else {
                this.setState({
                  selectedIndex: selectedIndex + 1,
                  selectionMode: true
                });
            }
        }
    },
    render: function() {
        var tagItems = this.state.tags.map(function(item, i) {
            return (
                <span key={i} className="tag">{item}
                   <a className="remove" 
                       onClick={this.handleDelete.bind(this, i)}>x</a>
                </span>
            )
        }.bind(this));

        // get the suggestions for the given query
        var query = this.state.query.trim(),
            selectedIndex = this.state.selectedIndex,
            suggestions = [];

        if (query.length > 1) {
            suggestions = this.state.suggestions.map(function(item, i) {
                return (
                    <li key={i} 
                        className={i == selectedIndex ? "active" : ""}>
                        <span dangerouslySetInnerHTML={this.markIt(item, query)} />
                     </li>
                )
            }.bind(this));
        }

        return ( 
            <div className="tags">
                <div className="tagInput"> {tagItems} 
                    <input ref="input" 
                        type="text" 
                        placeholder="Add new country"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}/>
                </div>
                <div className="suggestions">
                  { suggestions.length > 0 ? <ul> {suggestions} </ul>  : "" }
                </div>
            </div>
        )
    }
});

React.render(
    <Tags tags={tags} suggestions={countries} />, 
    document.getElementById("app")
);
