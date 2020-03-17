import Write from './markdown.vue'
import Vue from 'vue'
import './write.less'
import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css';
import httpExtension from '@/api/api'
import {
    Message
} from 'element-ui'

Vue.component(Message.name, Message)
Vue.prototype.$message = Message
Vue.use(httpExtension)
new Vue({
    el: '#app',
    render: h => h(Write)
})