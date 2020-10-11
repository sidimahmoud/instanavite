import Vue from 'vue';

/*
|--------------------------------------------------------------------------
| Partials
|--------------------------------------------------------------------------
*/
Vue.component('topbar-page', require('../components/partials/Topbar').default);
Vue.component('topbar-extras', require('../components/partials/TopbarExtras').default);
Vue.component('bottom-page', require('../components/partials/BottomPage').default);
Vue.component('topbar-page', require('../components/partials/Topbar').default);
Vue.component('topbar-mobile', require('../components/partials/Mobile/TopbarMobile').default);
Vue.component('google-maps-address', require('../components/partials/GoogleMapsAddress').default);

/*
|--------------------------------------------------------------------------
| lists
|--------------------------------------------------------------------------
*/
Vue.component('products-list', require('../components/lists/ProductsList').default);
Vue.component('progress-orders', require('../components/lists/ProgressOrders').default);
Vue.component('orders-recips', require('../components/lists/OrdersRecips').default);
Vue.component('partners-categories', require('../components/lists/PartnersCategories').default);

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

// pages->user
Vue.component('login-page', require('../components/pages/user/LoginPage').default);
Vue.component('dashboard-page', require('../components/pages/Dashboard/Dashboard').default);
Vue.component('user-profile', require('../components/pages/user/UserProfile').default);
Vue.component('register-user', require('../components/pages/user/RegisterUser').default);

//Order
Vue.component('order-details-page', require('../components/pages/Order/OrderDetailsPage').default);
Vue.component('order-recit-page', require('../components/pages/Order/OrderRecipPage').default);
//cart
Vue.component('cart-page', require('../components/pages/cart/CartPage').default);
Vue.component('about-us', require('../components/pages/AboutUs').default);
Vue.component('product-details', require('../components/pages/ProductDetails').default);
Vue.component('others', require('../components/pages/Others').default);
Vue.component('terme-condition', require('../components/pages/TermeCondition').default);
Vue.component('contact-us', require('../components/pages/ContactUs').default);
/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/
Vue.component('default-layout', require('../components/layouts/default-layout').default);

/*
|--------------------------------------------------------------------------
| Forms
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Modals
|--------------------------------------------------------------------------
*/
Vue.component('address-modal', require('../components/modals/AddressModal').default);