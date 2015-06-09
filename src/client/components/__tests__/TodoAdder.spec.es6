import expect from 'expect.js';
import React  from 'react/addons';

import todoListAction from '../../actions/todoListAction';
import TodoAdder      from '../TodoAdder';

const TestUtils = React.addons.TestUtils;

describe('TodoAdder', () => {
  afterEach(() => {
    todoListAction.add.emitter.removeAllListeners();
  });

  it('input:textに文字を入力して「追加」をクリックすると、todoListActionのaddがコールされる', done => {
    const rendered = TestUtils.renderIntoDocument(<TodoAdder />);

    todoListAction.add.listen(title => {
      expect(title).to.be('Lorem Ipsum');

      done();
    });

    TestUtils.Simulate.change(rendered.refs.input, {
      target: { value: 'Lorem Ipsum' },
    });
    TestUtils.Simulate.click(rendered.refs.click);
  });
});
