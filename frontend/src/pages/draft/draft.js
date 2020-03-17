import Draft from './draft.vue'
import Vue from 'vue'
import '@/styles/index.less'
import './draft.less'

import httpExtension from '@/api/api'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Message,
    Pagination
} from 'element-ui'

Vue.component(Message.name, Message)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$message = Message

Vue.use(httpExtension)

new Vue({
    el: '#app',
    render: h => h(Draft)
})
