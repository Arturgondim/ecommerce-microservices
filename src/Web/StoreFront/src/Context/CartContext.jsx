import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Tenta carregar do localStorage ao iniciar (para não perder o carrinho se der F5)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Salva no localStorage toda vez que o carrinho muda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar Produto
  const addToCart = (product) => {
    setCartItems(prev => {
      // Verifica se já tem esse produto no carrinho
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        // Se já tem, só aumenta a quantidade
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Se não tem, adiciona com quantidade 1
      return [...prev, { ...product, quantity: 1 }];
    });
    alert("Produto adicionado ao carrinho! 🛒"); // Feedback simples
  };

  // Remover Produto
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Limpar Carrinho (usado após a compra)
  const clearCart = () => {
    setCartItems([]);
  };

  // Cálculos
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export function useCart() {
  return useContext(CartContext);
}