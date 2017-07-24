const prefix = (obj, prop, value) => {
  const prefs = ['webkit', 'Moz', 'o', 'ms'];
  for (let pref in prefs) {
    obj[prefs[pref] + prop] = value;
  }
};

const raf = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const is_touch_device = () => {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

const beziers = {
  bezEasing: [0.19, 1, 0.22, 1],
  bezSwing: [1, 0, 0, 1]
};

export { prefix, raf, is_touch_device, beziers };
