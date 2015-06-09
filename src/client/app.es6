import FastclickAttach from 'fastclick';

import _                    from './util';
import initializeForDesktop from './desktop';
import initializeForMobile  from './mobile';

const getUserAgent = () => {
  const isDefined = 'navigator' in window && 'userAgent' in navigator;

  return isDefined ? navigator.userAgent : '';
};

const isMobile = () => {
  const ua = getUserAgent();

  return _.isIphone(ua) || _.isAndroidPhone(ua);
};

const onReady = () => {
  FastclickAttach(document.body);

  isMobile() ? initializeForMobile() : initializeForDesktop();
};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  window.attachEvent('onload', onReady);
}
