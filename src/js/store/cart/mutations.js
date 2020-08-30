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
        item.product_id=item.id;
        if (found) {
            found.quantity ++;
            found.total = found.quantity * found.price;
            state.cartTotal += found.total.toFixed(2);
        } else {
            state.cart.push(item);
            state.cartTotal += item.price.toFixed(2);
            Vue.set(item, 'quantity', 1);
            Vue.set(item, 'total', item.price);
        }

        state.cartCount++;
        
        /*Notification({
            title: '',
            message: 'Produit ajouté au panier',
            type: 'success'
        });*/
        this.commit('cart/saveCart');
    },

    removeFromCart(state, item) {
        let index = state.cart.indexOf(item);
    
        if (index > -1) {
            let product = state.cart[index];
            state.cartCount -= product.quantity;
            state.cartTotal -= product.total;
            state.cart.splice(index, 1);
        }
        this.commit('cart/saveCart');
    },

    saveCart(state) {
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
        window.localStorage.setItem('cartCount', state.cartCount);
        window.localStorage.setItem('cartTotal', state.cartTotal);
    }


} // End of export default
