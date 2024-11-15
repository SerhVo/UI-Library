import $ from "../core";

// Добавляет указанный атрибут и его значение ко всем выбранным элементам
$.prototype.addAttr = function (attrName, attrValue) {
  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(attrName, attrValue); // Устанавливаем атрибут с указанным значением
  }
  return this;
};

// Удаляет указанный атрибут у всех выбранных элементов
$.prototype.removeAttr = function (attrName) {
  for (let i = 0; i < this.length; i++) {
    this[i].removeAttribute(attrName); // Удаляем атрибут
  }
  return this;
};

// Переключает атрибут: если атрибут присутствует, он удаляется; если отсутствует, добавляется с указанным значением
$.prototype.toggleAttr = function (attrName, attrValue) {
  for (let i = 0; i < this.length; i++) {
    if (this[i].hasAttribute(attrName)) {
      this[i].removeAttribute(attrName); // Удаляем атрибут, если он присутствует
    } else {
      this[i].setAttribute(attrName, attrValue); // Добавляем атрибут, если его нет
    }
  }
  return this;
};
