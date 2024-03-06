import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react'

import { appRouter } from './routes.tsx'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme: ThemeConfig = extendTheme({ config, styles: {
    global: {
      'html::-webkit-scrollbar': {
        display: 'none',
      },
      body: {
        background: 'gray.50',
        color: 'night.500',
      },
    },
  }, 
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={appRouter} />
    </ChakraProvider>
  </React.StrictMode>,
)
