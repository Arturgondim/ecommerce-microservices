import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App'; 
import Products from './Products';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword'; 
import Home from './Home'; 
import Cart from './Cart';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="produtos" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
          <Route path="recuperar-senha" element={<ForgotPassword />} />
          <Route path="carrinho" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};