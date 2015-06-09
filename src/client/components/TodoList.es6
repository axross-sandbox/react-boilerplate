import React from 'react';

import todoListAction from '../actions/todoListAction';

const TodoList = React.createClass({
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => <__Item todo={todo} key={todo.id} />)}
      </ul>
    );
  },
});

export const __Item = React.createClass({
  onToggleIsFinishedClick() {
    todoListAction.setIsFinishedById(
      this.props.todo.id,
      !this.props.todo.isFinished
    );
  },

  onRemoveClick() {
    todoListAction.removeById(this.props.todo.id);
  },

  render() {
    return (
      <li>
        <span>
          {this.props.todo.title}
        </span>

        <a href="#" onClick={this.onToggleIsFinishedClick} ref="toggleIsFinished">
          {this.props.todo.isFinished ? '未完了' : '完了'}にする
        </a>

        <a onClick={this.onRemoveClick} ref="remove">
          削除する
        </a>

        <span>
          {this.props.todo.createdAt.format('YYYY-MM-DD HH:mm:ss')}
        </span>

        <span>
          {this.props.todo.lastModifiedAt.format('YYYY-MM-DD HH:mm:ss')}
        </span>
      </li>
    );
  },
});

export default TodoList;
