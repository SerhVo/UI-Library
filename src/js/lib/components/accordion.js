import $ from "../core";

// Добавляет функциональность аккордеона для всех выбранных элементов
$.prototype.accordion = function (
  headActive = "accordion-head--active", // Класс активности для заголовка
  contentActive = "accordion-content--active", // Класс активности для контента
  paddings = 40 // Дополнительные отступы для увеличения высоты
) {
  for (let i = 0; i < this.length; i++) {
    // Устанавливаем обработчик клика на каждый элемент
    $(this[i]).click(() => {
      // Переключаем класс активности для заголовка
      $(this[i]).toggleClass(headActive);

      // Переключаем класс активности для контента
      $(this[i].nextElementSibling).toggleClass(contentActive);

      // Если заголовок активен, разворачиваем контент с заданной высотой
      if (this[i].classList.contains(headActive)) {
        this[i].nextElementSibling.style.maxHeight =
          this[i].nextElementSibling.scrollHeight + paddings + "px";
      } else {
        // Если заголовок неактивен, сворачиваем контент
        this[i].nextElementSibling.style.maxHeight = "0px";
      }
    });
  }
};

// Инициализация функциональности аккордеона для всех элементов с классом "accordion-head"
$(".accordion-head").accordion();
