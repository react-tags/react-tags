var Tags = React.createClass({displayName: "Tags",
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
        var query = e.target.value;
        var suggestions = this.props.suggestions.filter(function(item) {
            return (item.toLowerCase()).search(query.trim().toLowerCase()) === 0;
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
        if ((e.keyCode === 13 || e.keyCode === 9) && query != "") {
            e.preventDefault();
            if (this.state.selectionMode) {
                query = this.state.suggestions[this.state.selectedIndex];               
                console.log("Query:", query);
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
        if (e.keyCode === 38) {
            e.preventDefault();
            var selectedIndex = this.state.selectedIndex;
            // last item, cycle to the top
            if (selectedIndex === 0) {
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
        if (e.keyCode === 40) {
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
                React.createElement("span", {key: i, className: "tag"}, item, 
                   React.createElement("a", {className: "remove", 
                       onClick: this.handleDelete.bind(this, i)}, "x")
                )
            )
        }.bind(this));


        // get the suggestions for the given query
        var query = this.state.query;
        var selectedIndex = this.state.selectedIndex;

        if (query.trim().length > 1) {
            var suggestions = this.state.suggestions.map(function(item, i) {
                return (
                    React.createElement("li", {key: i, className: i == selectedIndex ? "active" : ""}, item)
                )
            });
        }

        return ( 
            React.createElement("div", {className: "tags"}, 
                React.createElement("div", {className: "tagInput"}, " ", tagItems, 
                    React.createElement("input", {ref: "input", 
                        type: "text", 
                        placeholder: "Add new country", 
                        onChange: this.handleChange, 
                        onKeyDown: this.handleKeyDown})
                ), 
                React.createElement("div", {className: "suggestions"}, 
                    React.createElement("ul", null, " ", suggestions, " ")
                )
            )
        )
    }
});

React.render(
    React.createElement(Tags, {tags: tags, 
        suggestions: countries}), 
    document.getElementById("app")
);
