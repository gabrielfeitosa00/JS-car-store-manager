(function (win,doc) {
  "use strict";

  function DOM(elements) {
    if(!(this instanceof DOM))
      return new DOM(elements)

    this.element = document.querySelectorAll(elements);

  }

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element, function (element) {
      element.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element, function (element) {
      element.removeEventListener(event, callback, false);
    });
  };

  DOM.prototype.get = function get(index) {
    if(!index)
      return this.element[0];
    
    return this.element[index];
  };

  DOM.prototype.forEach = function () {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function () {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function () {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function () {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function () {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.isArray = function (param) {
    return Object.prototype.toString.call(param) === "[object Array]";
  };

  DOM.isObject = function (param) {
    return Object.prototype.toString.call(param) === "[object Object]";
  };

  DOM.isFunction = function (param) {
    return Object.prototype.toString.call(param) === "[object Function]";
  };

  DOM.isNumber = function (param) {
    return Object.prototype.toString.call(param) === "[object Number]";
  };

  DOM.isString = function (param) {
    return Object.prototype.toString.call(param) === "[object String]";
  };

  DOM.isBoolean = function (param) {
    return Object.prototype.toString.call(param) === "[object Boolean]";
  };

  DOM.isNull = function (param) {
    return (
      Object.prototype.toString.call(param) === "[object Null]" ||
      Object.prototype.toString.call(param) === "[object Undefined]"
    );
  };

  window.DOM = DOM
})(window, document);
