import moment from 'moment';
import Reflux from 'reflux';

import Todo           from '../models/Todo';
import todoListAction from '../actions/todoListAction';

const todoListStore = Reflux.createStore({
  listenables: todoListAction,

  todos: [],

  init() {
    const restored = window.localStorage.getItem('todoList') || '[]';

    this.todos = JSON.parse(restored).map(v => Todo.fromJSON(v));
  },

  getLastId() {
    return this.todos.reduce((prev, curr) => {
      return (curr.id > prev) ? curr.id : prev;
    }, 0);
  },

  onAdd(title, isFinished = false) {
    const todo = new Todo({
      id: this.getLastId() + 1,
      title,
      isFinished,
      createdAt: moment(),
      lastModifiedAt: moment(),
    });

    this.__update({ todos: this.todos.concat([todo]) });
  },

  onRemoveById(todoId) {
    const todos = this.todos.filter(todo => todo.id !== todoId);

    this.__update({ todos });
  },

  onSetIsFinishedById(todoId) {
    const todos = this.todos.map(todo => {
      if (todo.id === todoId) todo.isFinished = !todo.isFinished;

      return todo;
    });

    this.__update({ todos });
  },

  __update({ todos }) {
    this.todos = todos;

    window.localStorage.setItem('todoList', JSON.stringify(todos));

    this.trigger({ todos });
  },
});

export default todoListStore;
