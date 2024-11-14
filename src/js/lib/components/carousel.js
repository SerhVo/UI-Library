// import $ from "../core";

// $.prototype.carousel = function () {
//   for (let i = 0; i < this.length; i++) {
//     const width = window.getComputedStyle(
//       this[i].querySelector(".carousel-inner")
//     ).width;
//     const slides = this[i].querySelectorAll(".carousel-item");
//     const slidesField = this[i].querySelector(".carousel-slides");
//     const dots = this[i].querySelectorAll(".carousel-indicators li");

//     slidesField.style.width = 100 * slides.length + "%";
//     slides.forEach((slide) => {
//       slide.style.width = width;
//     });

//     let offset = 0;
//     let slideIndex = 0;

//     $(this[i].querySelector('[data-slide="next"]')).click((e) => {
//       e.preventDefault();
//       if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
//         offset = 0;
//       } else {
//         offset += +width.replace(/\D/g, "");
//       }

//       slidesField.style.transform = `translateX(-${offset}px)`;

//       if (slideIndex == slides.length - 1) {
//         slideIndex = 0;
//       } else {
//         slideIndex++;
//       }
//       dots.forEach((dot) => dot.classList.remove("active"));
//       dots[slideIndex].classList.add("active");
//     });

//     $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
//       e.preventDefault();
//       if (offset == 0) {
//         offset = +width.replace(/\D/g, "") * (slides.length - 1);
//       } else {
//         offset -= +width.replace(/\D/g, "");
//       }

//       slidesField.style.transform = `translateX(-${offset}px)`;

//       if (slideIndex == 0) {
//         slideIndex = slides.length - 1;
//       } else {
//         slideIndex--;
//       }
//       dots.forEach((dot) => dot.classList.remove("active"));
//       dots[slideIndex].classList.add("active");
//     });

//     const sliderId = this[i].getAttribute("id");
//     $(`#${sliderId} .carousel-indicators li`).click((e) => {
//       const slideTo = e.target.getAttribute("data-slide-to");

//       slideIndex = slideTo;
//       offset = +width.replace(/\D/g, "") * slideTo;

//       slidesField.style.transform = `translateX(-${offset}px)`;
//       dots.forEach((dot) => dot.classList.remove("active"));
//       dots[slideIndex].classList.add("active");
//     });
//   }
// };

// $(".carousel").carousel();



//  ----------    Рефакторинг кода  ----

import $ from "../core";

//  функциональность карусели для всех выбранных элементов
$.prototype.carousel = function () {
  Array.from(this).forEach((carousel) => {
    // Получаем ширину одного слайда
    const width = parseInt(
      window.getComputedStyle(carousel.querySelector(".carousel-inner")).width
    );
    const slides = carousel.querySelectorAll(".carousel-item");
    const slidesField = carousel.querySelector(".carousel-slides");
    const dots = carousel.querySelectorAll(".carousel-indicators li");

    // Устанавливаем ширину поля для слайдов, чтобы вместить все слайды в одну строку
    slidesField.style.width = `${100 * slides.length}%`;

    // Задаем ширину каждого слайда в соответствии с шириной внутренней части карусели
    slides.forEach((slide) => (slide.style.width = `${width}px`));

    let offset = 0;
    let slideIndex = 0;

    // Функция для обновления позиции слайдов и активной точки, исходя из текущего индекса
    const updateSlidePosition = () => {
      slidesField.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[slideIndex].classList.add("active");
    };

    // Переход к следующему слайду и обновление смещения
    const moveNext = () => {
      slideIndex = (slideIndex + 1) % slides.length;
      offset = width * slideIndex;
      updateSlidePosition();
    };

    // Переход к предыдущему слайду и обновление смещения
    const movePrev = () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      offset = width * slideIndex;
      updateSlidePosition();
    };

    // Добавляем обработчик события на кнопку "next" для перехода к следующему слайду
    $(carousel.querySelector('[data-slide="next"]')).click((e) => {
      e.preventDefault();
      moveNext();
    });

    // Добавляем обработчик события на кнопку "prev" для перехода к предыдущему слайду
    $(carousel.querySelector('[data-slide="prev"]')).click((e) => {
      e.preventDefault();
      movePrev();
    });

    // Добавляем обработчики событий для каждой точки, чтобы при клике переходить к соответствующему слайду
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        slideIndex = index;
        offset = width * slideIndex;
        updateSlidePosition();
      });
    });
  });
};

// Инициализируем функциональность карусели для всех элементов с классом "carousel"
$(".carousel").carousel();