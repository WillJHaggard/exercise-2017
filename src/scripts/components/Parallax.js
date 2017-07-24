// For Aceable Exercise
// Will J Haggard (2017)

// handle transform on scroll for one or more elements
import { is_touch_device } from '../lib/utils';

export class Parallax {
  constructor(sx = []) {
    this.selector = $(sx.join(', '));
    this.init();
  }

  setup = () => {
    const { selector } = this;
    if (!is_touch_device()) {
      let scrollTop = $(window).scrollTop();
      let winHeight = ($(window).height(), '-');
      $(window).width() &&
        selector.each(function() {
          let distance = 0.15 * scrollTop;
          $(this).css('transform', `translate3d(0, ${winHeight + distance}px, 0)`);
        });
    }
    return;
  };

  init = () => {
    requestAnimFrame(this.init);
    this.setup();
  };
}
