import $ from "../core";

// 1.	on - метод для добавления события. Позволяет повесить обработчик для указанного события на все элементы объекта.
// •	Проверяет наличие eventName и callback, чтобы избежать ошибок.
// •	Использует метод addEventListener для добавления обработчика.
// 2.	off - метод для удаления события. Позволяет убрать ранее установленный обработчик для указанного события.
// •	Также проверяет наличие eventName и callback.
// •	Использует метод removeEventListener для удаления обработчика.
// 3.	click - метод для работы с событием “click”.
// •	Если передан обработчик (handler), метод добавляет его как слушатель события.
// •	Если обработчик не передан, метод инициирует событие click на элементах вручную.

// Метод для добавления события
$.prototype.on = function (eventName, callback) {
  if (!eventName || !callback) {
    return this; // Если событие или callback не указаны, возвращаем объект без изменений
  }

  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName, callback); // Добавляем обработчик события
  }
  return this; // Возвращаем объект для цепочки вызовов
};

// Метод для удаления события
$.prototype.off = function (eventName, callback) {
  if (!eventName || !callback) {
    return this; // Если событие или callback не указаны, возвращаем объект без изменений
  }

  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, callback); // Удаляем обработчик события
  }
  return this; // Возвращаем объект для цепочки вызовов
};

// Метод для работы с событием "click"
$.prototype.click = function (handler) {
  for (let i = 0; i < this.length; i++) {
    if (handler) {
      // Если передан обработчик, добавляем событие
      this[i].addEventListener("click", handler);
    } else {
      // Если обработчик не передан, вызываем событие "click" вручную
      this[i].click();
    }
  }
  return this; // Возвращаем объект для цепочки вызовов
};
