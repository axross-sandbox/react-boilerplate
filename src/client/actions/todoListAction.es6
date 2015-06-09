import Reflux from 'reflux';

const todoListAction = Reflux.createActions([
  'add',
  'removeById',
  'setIsFinishedById'
]);

export default todoListAction;
