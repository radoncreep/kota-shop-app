import { useMutation, useQuery } from "@tanstack/react-query"
import { CreateMenuItem, getMenuItems, updateMenuItem } from "../api/menuitems"
import { MenuItem } from "../entities/menuitem"

export const useMenuItems = () => {
  return useQuery({
    queryKey: ["menuitems"],
    queryFn: () => getMenuItems(),
  })
}

export const useUpdateMenuItem = () => {
  return useMutation({
    mutationFn: (menuitem: CreateMenuItem) => updateMenuItem(menuitem),
  })
}
