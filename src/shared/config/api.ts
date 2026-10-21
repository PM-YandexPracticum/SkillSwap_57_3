import axios from 'axios'

export const API_URL = `http://localhost:${import.meta.env.VITE_API_PORT || 5000}`

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
})