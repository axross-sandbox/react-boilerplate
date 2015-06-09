import Reflux from 'reflux';

const navigationAction = Reflux.createActions([
  'transitionTo',
  'replaceWith',
  'goBack',
  'transitionWithUrl',
]);

export default navigationAction;
