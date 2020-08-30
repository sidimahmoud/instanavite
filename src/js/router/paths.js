/*
|--------------------------------------------------------------------------
| Route Paths
|--------------------------------------------------------------------------
|
| This file contains all the route to be used in Vue Routers.
| Kindly use this file for cleaner implementation.
|
*/

import Vue from 'vue';

export default [

  // Landing Page
  {
    path: '/', component: Vue.component('products-list'),
  },
  {
    path: '/dashboard', component: Vue.component('dashboard-page'),
    name: 'starting-point',
    meta: {
      page_class: 'dashboard-route',
      full_screen: false
    }
  },
  {
    path: '/products', component: Vue.component('products-list'),
    name: 'products-list',
    meta: {
      page_class: 'product-route',
      full_screen: false
    }
  },
  {
    path: '/cart', component: Vue.component('cart-page'),
    name: 'cart-page',
    meta: {
      page_class: 'cart-route',
      full_screen: false
    }
  },
  {
    path: '/about', component: Vue.component('about-us'),
    name: 'about-page',
    meta: {
      page_class: 'about-route',
      full_screen: false
    }
  },
  {
    path: '/product/:id',
    component: Vue.component('product-details'),
    name: 'product-details-page',
    meta: {
      page_class: 'product-details--route',
      full_screen: false
    }
  },

  {
    path: '/login', component: Vue.component('login-page'),
    name: 'login-page',
    meta: {
      page_class: 'login-route',
      full_screen: true
    }
  },
  {
    path: '/profile', component: Vue.component('user-profile'),
    name: 'profile-page',
    meta: {
      page_class: 'profile-route',
      full_screen: false
    }
  },
  {
    path: '/others', component: Vue.component('others'),
    name: 'others-page',
    meta: {
      page_class: 'others-route',
      full_screen: false
    }
  },
  {
    path: '/terme-condition', component: Vue.component('terme-condition'),
    name: 'terme-condition-page',
    meta: {
      page_class: 'terme-condition-route',
      full_screen: false
    }
  },

  


] // End of default
