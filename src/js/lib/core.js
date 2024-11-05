// (() => {
//   const $ = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     const obj = {};

//     obj.hide = () => {
//       elements.forEach((element) => {
//         element.style.display = "none";
//       });
//     };

//       obj.show = () => {
//         elements.forEach((element) => {
//           element.style.display = "";
//         });
//       };
//       return obj;
//   };

//   window.$ = $;
// })();

const $ = function (selector) {
  return new $.prototype.init(selector);
};

$.prototype.init = function (selector) {
  if (!selector) {
    return this; // {}
  }
  Object.assign(this, document.querySelectorAll(selector));
  this.length = document.querySelectorAll(selector).length;
  return this;
};

$.prototype.init.prototype = $.prototype;
window.$ = $;

export default $;