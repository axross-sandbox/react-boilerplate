import React from 'react';

import todoListStore from './stores/todoListStore';
import TodoAdder     from './components/TodoAdder';
import TodoList      from './components/TodoList';

const App = React.createClass({
  __unsubTodoListStore: null,

  getInitialState() {
    return {
      todos: todoListStore.todos,
    };
  },

  componentDidMount() {
    this.__unsubTodoListStore = todoListStore.listen(
      this.onUpdateTodoListStore
    );
  },

  componentWillUnmount() {
    this.__unsubTodoListStore();
  },

  onUpdateTodoListStore({ todos }) {
    this.setState({ todos });
  },

  render() {
    return (
      <div>
        <h1>
          React Boilerplate in Desktop
        </h1>

        <TodoList todos={this.state.todos} />

        <TodoAdder />
      </div>
    );
  },
});

const initializeForDesktop = () => {
  React.render(<App />, document.body);
};

export default initializeForDesktop;
