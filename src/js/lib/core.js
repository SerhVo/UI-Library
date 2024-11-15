const $ = function (selector) {
  return new $.prototype.init(selector);
}; // Это функция, которая при вызове с селектором (например, $('.my-class')) создает новый экземпляр объекта с методами из $.prototype.init. Это основной “конструктор”, через который осуществляется создание объекта.

$.prototype.init = function (selector) {
  if (!selector) {
    return this; // {}
  }

  if (selector.tagName) {
    this[0] = selector;
    this.length = 1;
    return this;
  }

  const elements = document.querySelectorAll(selector);
  Object.assign(this, elements); // Метод Object.assign(this, elements) используется для копирования свойств из коллекции элементов (которая получается через document.querySelectorAll) в текущий объект (this).
  this.length = elements.length;
  return this;
}; // Этот метод выполняет логику выбора DOM-элементов:
// 	•	Если передан пустой селектор (например, ""), возвращается сам объект без изменения.
// 	•	Если передан одиночный элемент DOM (например, document.querySelector), он добавляется в объект.
// 	•	Если передан обычный CSS-селектор (например, .my-class), используется document.querySelectorAll, чтобы собрать все элементы, соответствующие этому селектору, и записать их в объект.
// Этот метод также добавляет свойство length, которое указывает количество выбранных элементов.

$.prototype.init.prototype = $.prototype; // Это важная строка, которая гарантирует, что методы, добавленные в $.prototype, будут доступны для объектов, созданных с помощью $.prototype.init. Это позволяет использовать методы, такие как .on, .fadeIn, .hide и другие, как у стандартного объекта jQuery.

window.$ = $;

export default $; // Экспортирует $, что позволяет использовать ее в других модулях с помощью импорта, если вы используете ES-модули.

//  ----------- Пример использования:

// const elements = $('.my-class'); // Получаем все элементы с классом 'my-class'
// console.log(elements.length); // Выводим количество найденных элементов
// $('.my-class').addClass('new-class'); // Добавляем класс 'new-class' ко всем элементам с классом 'my-class'