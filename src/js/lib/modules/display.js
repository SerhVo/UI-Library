import $ from "../core";

// Показывает все выбранные элементы, сбрасывая стиль display
$.prototype.show = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) continue;
    this[i].style.display = ""; // Убираем display, чтобы показать элемент
  }
  return this;
};

// Скрывает все выбранные элементы, устанавливая стиль display: none
$.prototype.hide = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) continue;
    this[i].style.display = "none"; // Устанавливаем display: none, чтобы скрыть элемент
  }
  return this;
};

// Переключает видимость элемента: скрывает, если он видим, и показывает, если скрыт
$.prototype.toggle = function () {
  for (let i = 0; i < this.length; i++) {
    if (!this[i].style) continue;

    // Проверяем текущее состояние и переключаем
    if (this[i].style.display === "none") {
      this[i].style.display = ""; // Показываем элемент
    } else {
      this[i].style.display = "none"; // Скрываем элемент
    }
  }
  return this;
};
