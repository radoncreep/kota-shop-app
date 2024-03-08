import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  CreateMenuItem,
  UpdateMenuItem,
  deleteMenuItem,
  getMenuItems,
  mutateMenuItem,
} from "../api/menuitems"
import { MenuItem } from "../entities/menuitem"

export const useMenuItems = () => {
  return useQuery({
    queryKey: ["menuitems"],
    queryFn: () => getMenuItems(),
  })
}

export const useUpdateMenuItem = () => {
  return useMutation({
    mutationFn: (menuitem: UpdateMenuItem) =>
      mutateMenuItem(menuitem, "UPDATE"),
  })
}

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (menuitem: CreateMenuItem) => {
      const response = await mutateMenuItem(menuitem, "CREATE")
      queryClient.invalidateQueries({ queryKey: ["menuitems"] })
      return response
    },
  })
}

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (menuitemId: MenuItem["iD"]) => {
      const response = await deleteMenuItem(menuitemId)
      queryClient.invalidateQueries({ queryKey: ["menuitems"] })
      return response
    },
  })
}
