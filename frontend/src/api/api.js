import axios from 'axios';
import { apiPrefix } from '../config/config';
import { getLocalStorage } from '../utils/utils';
export default {
    install(Vue) {
        Vue.prototype.$get = function get(url, catchError = true) {
            return new Promise((resolve, reject) => {
                const token = getLocalStorage('token')
                const config = {}
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`
                    }
                }
                axios.get(`${apiPrefix}${url}`, config)
                    .then(rsl => {
                        const {
                            data,
                        } = rsl;
                        if (data.code !== 0) {
                            if (catchError) {
                                this.$message.error(data.message);
                            }
                            reject(data);
                            return;
                        }
                        resolve(data);
                    }).catch(err => {
                        if (catchError) {
                            this.$message.error(err.message)
                        }
                        reject(err)
                    })
            })
        }
        Vue.prototype.$post = function post(url, data = {}, catchError = true) {
            return new Promise((resolve, reject) => {
                const token = getLocalStorage('token')
                const config = {}
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                        // 'Content-Type': 'multipart/form-data'
                    }
                }
                axios.post(`${apiPrefix}${url}`, data, config)
                    .then(rsl => {
                        const {
                            data,
                        } = rsl;
                        if (data.code !== 0) {
                            if (catchError) {
                                this.$message.error(data.message);
                            }
                            reject(data);
                            return;
                        }
                        resolve(data);
                    }).catch(err => {
                        if (catchError) {
                            this.$message.error(err.message)
                        }
                        reject(err)
                    })
            })
        }
        Vue.prototype.$upload = function upload(url, file, catchError = true) {
            return new Promise((resolve, reject) => {
                const token = getLocalStorage('token')
                const config = {

                }
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`
                    }
                }
                axios.post(`${apiPrefix}${url}`, data, config)
                    .then(rsl => {
                        const {
                            data,
                        } = rsl;
                        if (data.code !== 0) {
                            if (catchError) {
                                this.$message.error(data.message);
                            }
                            reject(data);
                            return;
                        }
                        resolve(data);
                    }).catch(err => {
                        if (catchError) {
                            this.$message.error(err.message)
                        }
                        reject(err)
                    })
            })
        }
    }
} 