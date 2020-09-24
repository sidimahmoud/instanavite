import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './store/auth';
import cart from './store/cart';
import product from './store/product';
import message from './store/message';
import user from './store/user';
import order from './store/order';
import ui from './store/ui';

export default new Vuex.Store({
  modules: {
    auth,
    cart,
    product,
    message,
    user,
    order,
    ui
  }
});
