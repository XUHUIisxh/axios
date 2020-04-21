import axios from 'axios'
import qs from 'qs'

// 请求拦截
axios.interceptors.request.use(config => {
  // loadding
  return config
}, error => {
  return Promise.reject(error)
})

// 相应拦截
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

// 
function checkStatus(response) {
  // loadding
  // 如果状态码正常 直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // console.log(response)
    return response;
    // 如果不需要data之外的数据 可以只返回data

  }
  return {
    status: -404,
    msg: '状态码错误'
  }
}




function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    alert(res.data.error_msg)
  }
  return res
}


axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
axios.defaults.timeout = 3000

// 封装get和post方法
export default {
  post(url, data) {
    return axios({
      method: "post",
      // baseURL: 'https://cnodejs.org/api/v1',
      url,
      data: qs.stringify(data),
      // timeout: 2000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  get(url, params) {
    return axios({
      method: 'get',
      // baseURL: 'https://cnodejs.org/api/v1',
      url,
      params, //请求时携带的参数
      // timeout: 2000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  }
}




// axios.defaults.baseURL = ''
// axios.defaults.timeout = 2000

// function post(url,data){
//   return axios({
//     method:'post',
//     url,
//     headers:{

//     },
//     data:qs.stringify(data)
//   }).then((res)=> {
//     console.log(res)
//   })
// }

// function get(url,data){
//   return axios({
//     method:'get',
//     url,
//     data:qs.stringify(data),
//     headers:{

//     }
//   })
// }

// export default{
//   post,
//   get
// }







// 使用axios创建实例化对象进行请求
// const server = axios.create({
//   baseURL:'',
//   timeout:5000,
// })

// 请求拦截
// server.interceptors.request.use( (response) => {return response},error => {return Promise.reject(error)})

// 相应拦截 
// server.interceptors.response.use( (res) => {return res},error => {return Promise.reject(error)})

// export default server