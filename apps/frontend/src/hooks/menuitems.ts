import { useMutation, useQuery } from "@tanstack/react-query"
import {
  CreateMenuItem,
  UpdateMenuItem,
  getMenuItems,
  mutateMenuItem,
} from "../api/menuitems"

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
  return useMutation({
    mutationFn: (menuitem: CreateMenuItem) =>
      mutateMenuItem(menuitem, "CREATE"),
  })
}
