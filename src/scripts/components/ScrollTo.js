// For Aceable Exercise
// Will J Haggard (2017)

// attach waypoint jumping to given elements via json
window.jQuery = window.$ = require('jquery');
window.$.velocity = require('velocity-animate');

import { beziers } from '../lib/utils';
const { bezSwing } = beziers;

const defaultOptions = {
  duration: 750,
  easing: bezSwing
};

export class ScrollTo {
  constructor(selector = '', start = '', options = defaultOptions) {
    this.context = $(document);
    this.selector = selector;
    this.start = $(start);
    this.options = options;
    this.init('click touch');
  }

  cb = e => {
    const { start, options } = this;
    start.velocity('scroll', options);
  };

  init = eType => {
    const { context, selector, cb } = this;
    context.on(eType, selector, cb);
  };
}
