import Vue from 'vue'
import VueI18n from 'vue-i18n'
let en = require('./lang/en');
let fr = require('./lang/fr');
import enLocale from 'element-ui/lib/locale/lang/en'
import frLocale from 'element-ui/lib/locale/lang/fr'
Vue.use(VueI18n);

console.log(en);
export default new VueI18n({
    locale: window.app_locale, // set locale
    messages: {
        en: Object.assign(en.default,enLocale),
        fr: Object.assign(fr.default,frLocale)
    }, // set locale messages
});
