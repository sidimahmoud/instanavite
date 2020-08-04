/*
|--------------------------------------------------------------------------
| Store > Auth > Mutations
|--------------------------------------------------------------------------
|
| This file contains the mutations property of Auth Vuex Module
|
| You may freely extend this store file if the store file that you will
| be building has similar characteristics.
|
*/
'use strict';

import Vue from 'vue';
import { Notification } from 'element-ui';
import {isEmpty} from '../../helpers/Common';

export default {

    addToCart(state, item) {
        let found = state.cart.find(product => product.id == item.id);

        if (found) {
            found.quantity ++;
            found.total = found.quantity * found.price;
        } else {
            state.cart.push(item);

            Vue.set(item, 'quantity', 1);
            Vue.set(item, 'total', item.price);
        }

        state.cartCount++;
        Notification({
            title: 'Success',
            message: 'Product added to cart',
            type: 'success'
        });
        this.commit('cart/saveCart');
    },

    removeFromCart(state, item) {
        let index = state.cart.indexOf(item);
    
        if (index > -1) {
            let product = state.cart[index];
            state.cartCount -= product.quantity;
    
            state.cart.splice(index, 1);
        }
        this.commit('cart/saveCart');
    },

    saveCart(state) {
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
        window.localStorage.setItem('cartCount', state.cartCount);
    }


} // End of export default
