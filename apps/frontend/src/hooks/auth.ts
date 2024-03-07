import { useMutation } from "@tanstack/react-query"

import { login, register } from "../api/auth"
import { Chef } from "../entities/chef"

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: Omit<Chef, "id"> & { password: string }) =>
      register(credentials),
  })
}
