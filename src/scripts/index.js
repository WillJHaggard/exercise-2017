import '../styles/index.scss';
import 'babel-polyfill';

if (module.hot) {
  module.hot.accept();
}

let app;
document.addEventListener('DOMContentLoaded', () => (app = require('./App')));
