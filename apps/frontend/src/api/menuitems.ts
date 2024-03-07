import { MenuItem } from "../entities/menuitem"
import { axiosInstance } from "./client"

export interface CreateMenuItem extends Pick<MenuItem, "iD" | "imageUrl"> {
  image: File
}

export async function getMenuItemById(id: MenuItem["iD"]): Promise<MenuItem> {
  return (await axiosInstance.get(`/menuitems/${id}`)).data
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const { data } = await axiosInstance.get(`/menuitems`)
  return data
}

export async function createMenuItem(
  payload: CreateMenuItem
): Promise<MenuItem[]> {
  return (await axiosInstance.post(`/menuitems`, payload)).data
}

export async function updateMenuItem(
  payload: CreateMenuItem
): Promise<MenuItem[]> {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "image") {
      formData.append(key, value.toString())
      return
    }
    formData.append(key, value)
  })
  return (
    await axiosInstance.put(`/menuitems/${payload.iD}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data
}
