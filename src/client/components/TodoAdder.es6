import React    from 'react';

import todoListAction from '../actions/todoListAction';

const TodoAdder = React.createClass({
  getInitialState() {
    return {
      inputedText: '',
    };
  },

  onChange(e) {
    this.setState({ inputedText: e.target.value });
  },

  onClick(e) {
    todoListAction.add(this.state.inputedText.trim());

    this.setState({ inputedText: '' });
  },

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.inputedText}
          placeholder="New task..."
          ref="input"
        />

        <input type="button" onClick={this.onClick} value="追加" ref="click"/>
      </div>
    );
  },
});

export default TodoAdder;
