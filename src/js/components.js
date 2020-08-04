import Vue from 'vue';

/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
*/
Vue.component('topbar-page', require('../components/partials/Topbar').default);
Vue.component('topbar-extras', require('../components/partials/TopbarExtras').default);
Vue.component('bottom-page', require('../components/partials/BottomPage').default);

/*
|--------------------------------------------------------------------------
| lists
|--------------------------------------------------------------------------
*/
Vue.component('products-list', require('../components/lists/ProductsList').default);

/*
|--------------------------------------------------------------------------
| Forms
|--------------------------------------------------------------------------
*/

// pages->user
Vue.component('login-page', require('../components/pages/user/LoginPage').default);
Vue.component('dashboard-page', require('../components/pages/Dashboard/Dashboard').default);
//cart
Vue.component('cart-page', require('../components/pages/cart/CartPage').default);
Vue.component('about-us', require('../components/pages/AboutUs').default);
Vue.component('product-details', require('../components/pages/ProductDetails').default);

/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/
Vue.component('default-layout', require('../components/layouts/default-layout').default);

/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/
