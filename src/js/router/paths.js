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
    path: '/', component: Vue.component('login-page')
  },
  // Admin Dashboard Page
  {
    path: '/dashboard', component: Vue.component('dashboard-page'),
    name: 'starting-point',
    meta: {
      page_class: 'dashboard-route',
    }
  },


] // End of default
