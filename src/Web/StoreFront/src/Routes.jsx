import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Products from './Products';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Cart from './Cart';
import AddProduct from './AddProduct'; 


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Rotas Públicas */}
          <Route index element={<Home />} />
          <Route path="produtos" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
          <Route path="recuperar-senha" element={<ForgotPassword />} />
          
          {/* Rotas de Usuário */}
          <Route path="carrinho" element={<Cart />} />
          
          {/* Rotas de Admin */}
          <Route path="novo-produto" element={<AddProduct />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};