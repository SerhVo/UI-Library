import $ from "../core";

// 1.	animateOverTime - основная функция для выполнения анимации. Запускает анимацию на основе requestAnimationFrame.

// 2.	fadeIn, fadeOut, fadeToggle - методы, выполняющие появление, исчезновение и переключение видимости элементов с анимацией.

// 3.	_fade - внутренний метод для выполнения анимации прозрачности, универсальный для всех операций fade.

// Функция для создания анимации в течение заданного времени
$.prototype.animateOverTime = function (dur, cb, fin) {
  let timeStart;

  // Функция для анимации, которая будет выполняться с использованием requestAnimationFrame
  function _animateOverTime(time) {
    timeStart ||= time; // Записываем начальное время
    let complection = Math.min((time - timeStart) / dur, 1); // Рассчитываем процент завершенности

    cb(complection); // Вызываем callback для изменения состояния анимации

    if (complection < 1) {
      requestAnimationFrame(_animateOverTime); // Продолжаем анимацию
    } else if (typeof fin === "function") {
      fin(); // Если анимация завершена, вызываем финальную функцию
    }
  }

  return _animateOverTime;
};

// Метод fadeIn - плавное появление элемента с изменением прозрачности
$.prototype.fadeIn = function (dur, display = "block", fin) {
  return this._fade(dur, 0, 1, display, fin);
};

// Метод fadeOut - плавное исчезновение элемента с изменением прозрачности
$.prototype.fadeOut = function (dur, fin) {
  return this._fade(dur, 1, 0, "none", fin);
};

// Метод fadeToggle - переключение между появлением и исчезновением элемента
$.prototype.fadeToggle = function (dur, display = "block", fin) {
  for (let i = 0; i < this.length; i++) {
    const isHidden = window.getComputedStyle(this[i]).display === "none";
    this._fade(
      dur,
      isHidden ? 0 : 1, // Начальная прозрачность
      isHidden ? 1 : 0, // Конечная прозрачность
      isHidden ? display : "none", // Устанавливаем или убираем display
      fin,
      i
    );
  }
  return this;
};

// Общая функция _fade для управления анимацией изменения прозрачности
$.prototype._fade = function (
  dur,
  startOpacity,
  endOpacity,
  display,
  fin,
  index = null
) {
  for (
    let i = index ?? 0;
    i < (index !== null ? index + 1 : this.length);
    i++
  ) {
    this[i].style.display = display; // Устанавливаем display, если нужно
    const fade = (complection) => {
      // Изменяем прозрачность элемента
      this[i].style.opacity =
        startOpacity + (endOpacity - startOpacity) * complection;
      if (complection === 1 && endOpacity === 0) this[i].style.display = "none"; // Скрываем элемент, если прозрачность равна 0
    };
    requestAnimationFrame(this.animateOverTime(dur, fade, fin));
  }
  return this;
};
