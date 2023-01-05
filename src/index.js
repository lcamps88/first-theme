import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ShopProvider from './context/shopContext'
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ChakraProvider>
    <ShopProvider>
      <App />
    </ShopProvider>
  </ChakraProvider>
)
reportWebVitals()
