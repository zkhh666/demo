import axios from 'axios'
import store from '@/store'


// 这些都是需要 提醒的，选定ui框架后配置一下就可以了
let apiBaseUrl
let notification
let Modal = {error(){}}
let error


//1、为了封装各种方法=》api文件夹下去寻找，可以引入后直接使用

const service = axios.create({
    baseURL: apiBaseUrl, // api base_url
    timeout: 9000 // 请求超时时间
  })


//2、请求拦截
service.interceptors.request.use(config => {
    // 拿token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return Promise.reject(error)
})


// 3、响应拦截
service.interceptors.response.use((response) => {
    return response.data
},err)

// 4、请求异常常见的，如果遇到可以修改成自己ui框架的
const err = (error) => {
    if (error.message.includes('timeout')) {
      notification.error({
        message: '系统提示',
        description: '请求超时！',
        duration: 4
      })
    }
    if (error.response) {
      let data = error.response.data
      const token = localStorage.getItem("token");
      console.log("------异常响应------", token)
      console.log("------异常响应------", error.response.status)
      switch (error.response.status) {
        case 403:
          notification.error({
            message: '系统提示',
            description: '拒绝访问',
            duration: 4
          })
        break
        case 500:
          //notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
          if (token && data.message == "Token失效，请重新登录") {
            // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
            // store.dispatch('Logout').then(() => {
            //     window.location.reload()
            // })
            Modal.error({
              title: '登录已过期',
              content: '很抱歉，登录已过期，请重新登录',
              okText: '重新登录',
              mask: false,
              onOk: () => {
                store.dispatch('Logout').then(() => {
                  localStorage.removeItem("token");
                  window.location.reload()
                })
              }
            })
            // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          }
        break
        case 404:
          notification.error({
            message: '系统提示',
            description: '很抱歉，资源未找到!',
            duration: 4
          })
        break
        case 504:
          notification.error({
            message: '系统提示',
            description: '网络超时'
          })
        break
        case 401:
          notification.error({
            message: '系统提示',
            description: '未授权，请重新登录',
            duration: 4
          })
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        break
        default:
          notification.error({
            message: '系统提示',
            description: data.message,
            duration: 4
          })
        break
      }
    }
    return Promise.reject(error)
  };

// 抛出实例
export {
    service as axios
  }