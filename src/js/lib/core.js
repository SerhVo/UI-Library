const $ = function (selector) {
  return new $.prototype.init(selector);
}; // Это функция, которая при вызове с селектором (например, $('.my-class')) создает новый экземпляр объекта с методами из $.prototype.init. Это основной “конструктор”, через который осуществляется создание объекта.

$.prototype.init = function (selector) {
  if (!selector) {
    return this; // Если селектор не передан, возвращаем сам объект
  }

  // Проверяем, является ли переданный параметр строкой и не является ли он пустым
  if (typeof selector !== "string" || selector.trim() === "") {
    throw new Error("Invalid selector string"); // Выбрасываем ошибку, если селектор невалиден
  }

  // Проверка на одиночный элемент DOM
  if (selector.tagName) {
    this[0] = selector;
    this.length = 1;
    return this;
  }

  // Если селектор валидный, выполняем поиск элементов
  try {
    const elements = document.querySelectorAll(selector);
    Object.assign(this, elements);
    this.length = elements.length;
  } catch (error) {
    // Если selector невалиден, выбрасываем ошибку
    throw new Error(`Invalid CSS selector: ${selector}`);
  }

  return this;
}; // Этот метод выполняет логику выбора DOM-элементов:
// 	•	Если передан пустой селектор (например, ""), возвращается сам объект без изменения.
// 	•	Если передан одиночный элемент DOM (например, document.querySelector), он добавляется в объект.
// 	•	Если передан обычный CSS-селектор (например, .my-class), используется document.querySelectorAll, чтобы собрать все элементы, соответствующие этому селектору, и записать их в объект.
// Этот метод также добавляет свойство length, которое указывает количество выбранных элементов.

$.prototype.init.prototype = $.prototype; // Это важная строка, которая гарантирует, что методы, добавленные в $.prototype, будут доступны для объектов, созданных с помощью $.prototype.init. Это позволяет использовать методы, такие как .on, .fadeIn, .hide и другие, как у стандартного объекта jQuery.

window.$ = $;

export default $; // Экспортирует $, что позволяет использовать ее в других модулях с помощью импорта, если вы используете ES-модули.



//  ----------- Пример использования с обработкой ошибок:

// try {
//   const elements = $(".my-class");
//   console.log(elements.length); // Выводим количество элементов
// } catch (error) {
//   console.error(error.message); // Обработка ошибок
// }
