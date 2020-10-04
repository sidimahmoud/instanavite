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
            let som = found.quantity * found.price;
            found.total = som.toFixed(2);
            //state.cartTotal += found.price.toFixed(2);
            
            this.commit('cart/sumCartTotal',parseFloat(found.price).toFixed(2));
        } else {
            //state.cartTotal += item.price.toFixed(2);
            state.cart.push(item);
            Vue.set(item, 'quantity', 1);
            Vue.set(item, 'total', parseFloat(item.price).toFixed(2));
            
            this.commit('cart/sumCartTotal',parseFloat(item.price).toFixed(2));
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
            state.cartCount = state.cartCount  - product.quantity;
            let rest = state.cartTotal - product.total;
            state.cartTotal = parseFloat(rest).toFixed(2)
            state.cart.splice(index, 1);
        }
        this.commit('cart/saveCart');
    },

    saveCart(state) {
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
        window.localStorage.setItem('cartCount', state.cartCount);
        window.localStorage.setItem('cartTotal', state.cartTotal);
    },
    sumCartTotal(state, value){
        let som = parseFloat(state.cartTotal) + parseFloat(value);
        state.cartTotal = som.toFixed(2);
        this.commit('cart/saveCart');
    },
    setTips(state, value){
        state.tips = value;
    },

    clearCart(state) {
        console.log(state);
        state.cartCount = 0;
        state.cartTotal = 0;
        state.cart = []
        state.tips = 0;
        this.commit('cart/saveCart');
    }

} // End of export default
