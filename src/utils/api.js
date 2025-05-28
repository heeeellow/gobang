import axios from 'axios'
import { useUserStore } from '@/store'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 7000
})
instance.interceptors.request.use(cfg => {
  const u = useUserStore(); if (u.token) cfg.headers.Authorization = `Bearer ${u.token}`; return cfg
})
export default instance
