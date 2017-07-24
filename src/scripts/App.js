// For Aceable Exercise
// Will J Haggard (2017)

// compose and attach modules for DOM
import { ScrollTo, Parallax } from './components';
import { navigation } from './navigation';
import { raf } from './lib/utils';
import hero2 from '../assets/img/hero2.jpg';
import hq from '../assets/img/hq.jpg';
window.requestAnimFrame = raf;

class App {
  constructor(navItems = [], components = {}, { log }, msg = '') {
    this.navItems = navItems;
    this.components = components;
    this.log = log;
    this.msg = `

      ${msg}

    `;
    this.init();
  }
  parallax = ({ Parallax }, sx) => {
    return new Parallax(sx);
  };
  navigation = ({ ScrollTo }, items) => {
    return items.map(({ selector, id }) => new ScrollTo(selector, id));
  };
  injectImage = () => {
    const img1 = (document.getElementById('centered').src = hero2);
    const img2 = (document.getElementById('headquarters').src = hq);
  };
  init = () => {
    const { navItems, components, log, msg, navigation, parallax, injectImage } = this;
    parallax(components, ['.hero h1', '.hero h2']);
    navigation(components, navItems);
    injectImage();
    log(msg);
  };
}

export default new App(navigation, { Parallax, ScrollTo }, console, '👋 Hi, Aceable!');
