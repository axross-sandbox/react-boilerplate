const isPlainObject = value => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

  // inspired by https://github.com/arasatasaygin/is.js
const isIphone = userAgent => {
  return /iphone/i.test(userAgent) || /ipod/i.test(userAgent);
};

// inspired by https://github.com/arasatasaygin/is.js
const isAndroidPhone = userAgent => {
  return /android/i.test(userAgent) && /mobile/i.test(userAgent);
};

export default {
  isPlainObject,
  isIphone,
  isAndroidPhone,
};
