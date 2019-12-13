// Load on dependencies
import './bootstrap';


// Import window.Vue...
import Vue from 'vue';

// and its plugins...
import ElementUI from './elementui';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Use the plugins
Vue.use(ElementUI);
//Vue.use(VueFuse);

import './components';
import store from './store';
import router from './routes';


new Vue({
    el: '#app',
    store,
    router,
    beforeCreate: function() {

    },

});
