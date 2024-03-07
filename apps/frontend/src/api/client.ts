import axios from "axios"
import { camelizeKeys, decamelizeKeys } from "humps"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [(data: any) => camelizeKeys(JSON.parse(data))],
  withCredentials: true,
})
