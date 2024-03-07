import { useMutation } from '@tanstack/react-query'
// import Cookies from 'js-cookie'

import { login } from '../api/auth'

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
  })
}
