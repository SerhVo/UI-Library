import $ from "../core";

// Добавляет функциональность выпадающего списка для всех выбранных элементов
$.prototype.dropdown = function () {
  for (let i = 0; i < this.length; i++) {
    // Получаем идентификатор элемента
    const id = this[i].getAttribute("id");

    // Устанавливаем обработчик клика на элемент
    $(this[i]).click(() => {
      // Ищем элемент с атрибутом data-toggle-id, соответствующим id, и переключаем его видимость с анимацией
      $(`[data-toggle-id="${id}"]`).fadeToggle(300);
    });
  }
};

// Инициализация функциональности выпадающего списка для всех элементов с классом "dropdown-toggle"
$(".dropdown-toggle").dropdown();
