// Load on dependencies
import './bootstrap';


// Import window.Vue...
import Vue from 'vue';

// and its plugins...
import ElementUI from './elementui';
import locale from 'element-ui/lib/locale/lang/en'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n';
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'
import VueHtmlToPaper from "vue-html-to-paper";

// ...
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.use(VueHtmlToPaper, options);

// Use the plugins
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) });
Vue.use(GSignInButton)
Vue.use(FBSignInButton)
//Vue.use(VueFuse);

import './components';
import store from './store';
import router from './routes';


new Vue({
    el: '#app',
    store,
    i18n,
    router,
});
