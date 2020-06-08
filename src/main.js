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
import Notifications from 'vue-notification'
import VueTextareaAutosize from 'vue-textarea-autosize'
import { Swipeable } from 'vue-swipeable';

library.add(faPlus, faEdit, faTrashAlt, faCheck, faLongArrowAltLeft, faTimes, faUndoAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(VueTextareaAutosize)
Vue.directive('swipeable', Swipeable)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
