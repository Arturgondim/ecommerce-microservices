import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './Routes'
import './index.css'
import { CartProvider } from './Context/CartContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </React.StrictMode>,
)