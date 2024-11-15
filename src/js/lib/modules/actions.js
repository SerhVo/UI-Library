import $ from "../core";

// Устанавливает или получает HTML-содержимое выбранных элементов
$.prototype.html = function (content) {
  for (let i = 0; i < this.length; i++) {
    // Возвращает HTML-содержимое, если контент не указан
    if (content === undefined) {
      return this[i].innerHTML;
    } else {
      // Устанавливает HTML-содержимое для текущего элемента
      this[i].innerHTML = content;
    }
  }
  return this;
};

// Возвращает объект с выбранным элементом по индексу
$.prototype.eq = function (i) {
  const swap = this[i];
  const objLength = Object.keys(this).length;

  // Удаляем все элементы из текущего объекта
  for (let i = 0; i < objLength; i++) {
    delete this[i];
  }

  // Добавляем только выбранный элемент и задаем длину объекта
  this[0] = swap;
  this.length = 1;
  return this;
};

// Возвращает индекс текущего элемента среди всех детей его родителя
$.prototype.index = function () {
  const parent = this[0].parentNode;
  const childs = [...parent.children];
  return childs.findIndex((item) => item == this[0]);
};

// Находит все элементы внутри текущих элементов, соответствующие селектору
$.prototype.find = function (selector) {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);
  for (let i = 0; i < copyObj.length; i++) {
    const arr = copyObj[i].querySelectorAll(selector);

    for (let j = 0; j < arr.length; j++) {
      this[counter] = arr[j];
      counter++;
    }
    numberOfItems += arr.length;
  }
  this.length = numberOfItems;

  // Очищаем лишние элементы из текущего объекта
  const objLength = Object.keys(this).length;
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems];
  }
  return this;
};

// Находит ближайший родительский элемент, соответствующий селектору
$.prototype.closest = function (selector) {
  let counter = 0;

  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].closest(selector);
    if (this[i]) {
      counter++;
    }
  }

  // Удаляем лишние элементы
  const objLength = Object.keys(this).length;
  for (; counter < objLength; counter++) {
    delete this[counter];
  }
  return this;
};

// Находит все соседние элементы, исключая текущий
$.prototype.siblings = function () {
  let numberOfItems = 0;
  let counter = 0;

  const copyObj = Object.assign({}, this);

  for (let i = 0; i < copyObj.length; i++) {
    const arr = copyObj[i].parentNode.children;

    for (let j = 0; j < arr.length; j++) {
      if (copyObj[i] === arr[j]) continue;

      this[counter] = arr[j];
      counter++;
    }

    numberOfItems += arr.length - 1;
  }

  this.length = numberOfItems;

  // Очищаем лишние элементы
  const objLength = Object.keys(this).length;
  for (; numberOfItems < objLength; numberOfItems++) {
    delete this[numberOfItems];
  }

  return this;
};
