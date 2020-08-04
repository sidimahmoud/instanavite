import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './store/auth';
import cart from './store/cart';
import product from './store/product';
import message from './store/message';



export default new Vuex.Store({
  modules: {
    auth,
    cart,
    product,
    message
  }
});
