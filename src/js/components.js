import Vue from 'vue';
import InputTag from 'vue-input-tag'
/*
|--------------------------------------------------------------------------
| Forms
|--------------------------------------------------------------------------
*/

// pages->user
Vue.component('login-page', require('../components/pages/user/LoginPage').default);
Vue.component('dashboard-page', require('../components/pages/Dashboard/Dashboard').default);
/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/
Vue.component('default-layout', require('../components/layouts/default-layout').default);
