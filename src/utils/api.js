import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 800
})

// 请求拦截器示例：自动加 token
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default api
