import expect from 'expect.js';
import React  from 'react/addons';

import Todo                 from '../../models/Todo';
import todoListAction       from '../../actions/todoListAction';
import TodoList, { __Item } from '../TodoList';
import todoSamples          from '../../models/__samples__/todos';

const TestUtils = React.addons.TestUtils;

describe('TodoList', () => {
  afterEach(() => {
    todoListAction.removeById.emitter.removeAllListeners();
    todoListAction.setIsFinishedById.emitter.removeAllListeners();
  });

  it('this.props.todosをもとに、__Itemを内包する', () => {
    const todos    = todoSamples.map(item => Todo.fromJSON(item));
    const rendered = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    const items = TestUtils.scryRenderedComponentsWithType(rendered, __Item);

    expect(items.length).to.be(3);

    todos.forEach((todo, i) => {
      expect(items[i].props.todo.isFinished).to.be(todo.isFinished);
    });
  });

  it('「完了にする」をクリックすると、todoListAction.setIsFinishedByIdがコールされる', done => {
    const todos    = todoSamples.map(item => Todo.fromJSON(item));
    const rendered = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    const items = TestUtils.scryRenderedComponentsWithType(rendered, __Item);

    todoListAction.setIsFinishedById.listen((todoId, value) => {
      expect(todoId).to.be(items[1].props.todo.id);
      expect(value).to.be(!items[1].props.todo.isFinished);

      done();
    });

    TestUtils.Simulate.click(items[1].refs.toggleIsFinished);
  });

  it('「削除する」をクリックすると、todoListAction.removeByIdがコールされる', done => {
    const todos    = todoSamples.map(item => Todo.fromJSON(item));
    const rendered = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    const items = TestUtils.scryRenderedComponentsWithType(rendered, __Item);

    todoListAction.removeById.listen(todoId => {
      expect(todoId).to.be(items[1].props.todo.id);

      done();
    });

    TestUtils.Simulate.click(items[1].refs.remove);
  })
});
