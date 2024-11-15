import $ from "../core";

// Добавляет функциональность модального окна для всех выбранных элементов
$.prototype.modal = function (created) {
  for (let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute("data-target");

    // Устанавливаем обработчик клика для открытия модального окна
    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(500);
      document.body.style.overflow = "hidden";
    });

    // Закрываем модальное окно при клике на элементы с атрибутом data-close
    const closeElements = document.querySelectorAll(`${target} [data-close]`);
    closeElements.forEach((elem) => {
      $(elem).click(() => {
        $(target).fadeOut(500);
        document.body.style.overflow = "";
        if (created) {
          document.querySelector(target).remove();
        }
      });
    });

    // Закрываем модальное окно при клике на область вне содержимого модального окна
    $(target).click((e) => {
      if (e.target.classList.contains("modal")) {
        $(target).fadeOut(500);
        document.body.style.overflow = "";
        if (created) {
          document.querySelector(target).remove();
        }
      }
    });
  }
};

// Инициализация функциональности модального окна для всех элементов с атрибутом data-toggle="modal"
$('[data-toggle="modal"]').modal();

// Создает модальное окно с заданным текстом и кнопками
$.prototype.createModal = function ({ text, btns } = {}) {
  for (let i = 0; i < this.length; i++) {
    // Создаем контейнер для модального окна
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("id", this[i].getAttribute("data-target").slice(1));

    // btns = {count: количество кнопок, settings: [[текст кнопки, классы, закрывать ли, колбэк]]}
    const buttons = [];
    for (let j = 0; j < btns.count; j++) {
      let btn = document.createElement("button");
      btn.classList.add("btn", ...btns.settings[j][1]);
      btn.textContent = btns.settings[j][0];
      if (btns.settings[j][2]) {
        btn.setAttribute("data-close", "true");
      }
      if (btns.settings[j][3] && typeof btns.settings[j][3] === "function") {
        btn.addEventListener("click", btns.settings[j][3]);
      }

      buttons.push(btn);
    }

    // Разметка HTML для модального окна с заголовком и телом
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <button class="close" data-close>
                    <span>&times;</span>
                </button>
                <div class="modal-header">
                    <div class="modal-title">
                        ${text.title}
                    </div>
                </div>
                <div class="modal-body">
                    ${text.body}
                </div>
                <div class="modal-footer">
                    
                </div>
            </div>
        </div>
        `;

    // Добавляем кнопки в футер модального окна
    modal.querySelector(".modal-footer").append(...buttons);
    document.body.appendChild(modal);

    // Инициализация созданного модального окна
    $(this[i]).modal(true);
    $(this[i].getAttribute("data-target")).fadeIn(500);
  }
};
