import { MenuItem } from "../entities/menuitem"
import { axiosInstance } from "./client"

export interface CreateMenuItem extends Omit<MenuItem, "iD" | "imageUrl"> {
  image: File
}

export interface UpdateMenuItem extends Omit<MenuItem, "imageUrl"> {
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

export async function mutateMenuItem(
  payload: CreateMenuItem | UpdateMenuItem,
  type: "CREATE" | "UPDATE"
): Promise<MenuItem[]> {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "image") {
      formData.append(key, value.toString())
      return
    }
    formData.append(key, value)
  })

  if (type === "CREATE") {
    return (
      await axiosInstance.post(`/menuitems`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data
  }

  const data = payload as UpdateMenuItem
  return (
    await axiosInstance.put(`/menuitems/${data.iD}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data
}

export async function deleteMenuItem(id: MenuItem["iD"]) {
  return await axiosInstance.delete(`/menuitems/${id}`)
}
