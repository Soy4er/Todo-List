import '@/assets/scss/styles.scss';

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faCheck, faLongArrowAltLeft, faTimes, faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutside from 'v-click-outside'
import VueLocalStorage from 'vue-localstorage'
import Notifications from 'vue-notification'

library.add(faPlus, faEdit, faTrashAlt, faCheck, faLongArrowAltLeft, faTimes, faUndoAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(vClickOutside)
Vue.use(VueLocalStorage)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
