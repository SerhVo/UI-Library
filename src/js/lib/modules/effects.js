// import $ from "../core";

// $.prototype.animateOverTime = function (dur, cb, fin) {
//   let timeStart;
//   function _animateOverTime(time) {
//     if (!timeStart) {
//       timeStart = time;
//     }

//     let timeElapsed = time - timeStart;
//     let complection = Math.min(timeElapsed / dur, 1);
//     cb(complection);

//     if (timeElapsed < dur) {
//       requestAnimationFrame(_animateOverTime);
//     } else {
//       if (typeof fin === "function") {
//         fin();
//       }
//     }
//   }
//   return _animateOverTime;
// };

// $.prototype.fadeIn = function (dur, display, fin) {
//   for (let i = 0; i < this.length; i++) {
//     this[i].style.display = display || "block";

//     const _fadeIn = (complection) => {
//       this[i].style.opacity = complection;
//     };
//     const ani = this.animateOverTime(dur, _fadeIn, fin);
//     requestAnimationFrame(ani);
//   }
//   return this;
// };

// $.prototype.fadeOut = function (dur, fin) {
//   for (let i = 0; i < this.length; i++) {
//     const _fadeOut = (complection) => {
//       this[i].style.opacity = 1 - complection;
//       if (complection === 1) {
//         this[i].style.display = "none";
//       }
//     };
//     const ani = this.animateOverTime(dur, _fadeOut, fin);
//     requestAnimationFrame(ani);
//   }
//   return this;
// };

// $.prototype.fadeToggle = function (dur, display, fin) {
//   for (let i = 0; i < this.length; i++) {
//     if (window.getComputedStyle(this[i]).display === "none") {
//       this[i].style.display = display || "block";

//       const _fadeIn = (complection) => {
//         this[i].style.opacity = complection;
//       };

//       const ani = this.animateOverTime(dur, _fadeIn, fin);
//       requestAnimationFrame(ani);
//     } else {
//       const _fadeOut = (complection) => {
//         this[i].style.opacity = 1 - complection;
//         if (complection === 1) {
//           this[i].style.display = "none";
//         }
//       };

//       const ani = this.animateOverTime(dur, _fadeOut, fin);
//       requestAnimationFrame(ani);
//     }
//   }

//   return this;
// };

import $ from "../core";

$.prototype.animateOverTime = function (dur, cb, fin) {
  let timeStart;

  function _animateOverTime(time) {
    timeStart ||= time;
    let complection = Math.min((time - timeStart) / dur, 1);

    cb(complection);
    if (complection < 1) {
      requestAnimationFrame(_animateOverTime);
    } else if (typeof fin === "function") {
      fin();
    }
  }

  return _animateOverTime;
};

$.prototype.fadeIn = function (dur, display = "block", fin) {
  return this._fade(dur, 0, 1, display, fin);
};

$.prototype.fadeOut = function (dur, fin) {
  return this._fade(dur, 1, 0, "none", fin);
};

$.prototype.fadeToggle = function (dur, display = "block", fin) {
  for (let i = 0; i < this.length; i++) {
    const isHidden = window.getComputedStyle(this[i]).display === "none";
    this._fade(
      dur,
      isHidden ? 0 : 1,
      isHidden ? 1 : 0,
      isHidden ? display : "none",
      fin,
      i
    );
  }
  return this;
};

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
    this[i].style.display = display;
    const fade = (complection) => {
      this[i].style.opacity =
        startOpacity + (endOpacity - startOpacity) * complection;
      if (complection === 1 && endOpacity === 0) this[i].style.display = "none";
    };
    requestAnimationFrame(this.animateOverTime(dur, fade, fin));
  }
  return this;
};
