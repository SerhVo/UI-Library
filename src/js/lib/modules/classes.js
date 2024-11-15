import $ from "../core";

// Добавляет один или несколько классов ко всем выбранным элементам
$.prototype.addClass = function (...classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.add(...classNames); // Добавляем указанные классы к текущему элементу
  }
  return this;
};

// Удаляет один или несколько классов у всех выбранных элементов
$.prototype.removeClass = function (...classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.remove(...classNames); // Удаляем указанные классы у текущего элемента
  }
  return this;
};

// Переключает класс на каждом выбранном элементе: добавляет, если класса нет, и удаляет, если есть
$.prototype.toggleClass = function (classNames) {
  for (let i = 0; i < this.length; i++) {
    this[i].classList.toggle(classNames); // Переключаем указанный класс на текущем элементе
  }
  return this;
};
