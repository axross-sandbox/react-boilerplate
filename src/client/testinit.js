import React                from 'react/addons';
import injectTapEventPlugin from 'react-tap-event-plugin';
import jsdom                from 'jsdom';

global.document  = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window    = document.parentWindow;
global.navigator = window.navigator;
