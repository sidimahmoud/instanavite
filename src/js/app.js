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
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'

// Use the plugins
Vue.use(ElementUI, { locale });
Vue.use(GSignInButton)
Vue.use(FBSignInButton)
//Vue.use(VueFuse);

import './components';
import store from './store';
import router from './routes';


new Vue({
    el: '#app',
    store,
    router,
});
