import { Chef } from "../entities/chef"
import { axiosInstance } from "./client"

export async function login(credentials: {
  email: string
  password: string
}): Promise<any> {
  const { data } = await axiosInstance.post("/auth/login", credentials)

  return data
}

export async function register(
  credentials: Omit<Chef, "id"> & { password: string }
): Promise<any> {
  const { data } = await axiosInstance.post("/auth/register", credentials)

  return data
}
