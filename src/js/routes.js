import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let paths = (require('./router/paths.js')).default;

export default new VueRouter({
    routes : paths,
});
