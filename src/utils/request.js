import qs from 'qs'
import axios from 'axios'
// import { onMounted,onBeforeMount } from '@vue/runtime-core'


// 创建 axios 对象
const instance = axios.create({
    // baseURL: '/api' ,
    timeout: 60 * 1000,
})


// 请求拦截
// 所有的网络请求都会先走这个方法
instance.interceptors.request.use(
    config => {
        // 定义请求头
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config;
    })

// 响应拦截
//   所有的网络请求返回数据之后都会先执行这个方法
instance.interceptors.response.use(
    response => {
        setTimeout(() => {
          }, 100)
        return response;
    },
    err => {
        setTimeout(() => {
          }, 100)
        return Promise.reject(err);
    }
)

// GET请求
export function GET(url, params = {params:{}}){
    return instance.get(url, params);
}

// POST请求
export function POST(url, params = {}){
    return instance.post(url, qs.stringify({...params}));
}

// DELECT请求
export function DEL(url){
    return instance.delete(url);
}

// PUT请求
export function PUT(url, params = null){
    return instance.put(url, params);
}

