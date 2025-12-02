import { useCart } from './Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Cart() {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Função para Finalizar a Compra (Integração com Backend)
  const handleCheckout = async () => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      alert("Você precisa estar logado para fechar o pedido!");
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      for (const item of cartItems) {
        const orderData = {
          productId: item.id,
          quantity: item.quantity
        };

        await axios.post('http://localhost:5144/loja/compras', orderData, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      alert("Compra realizada com sucesso! SRN! 🔴⚫");
      clearCart(); 
      navigate('/produtos'); 
    } catch (error) {
      console.error(error);
      alert("Erro ao processar a compra. Verifique se o estoque ainda está disponível.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pt-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Seu carrinho está vazio</h2>
        <Link to="/produtos" className="bg-flamengo-red text-white px-6 py-2 rounded font-bold hover:bg-red-800 transition">
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-flamengo-black text-white p-6 border-b-4 border-flamengo-red">
          <h2 className="text-2xl font-bold">Seu Carrinho de Compras</h2>
        </div>

        <div className="p-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-100 py-4 last:border-0">
              <div className="flex items-center gap-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-16 h-16 object-contain rounded border border-gray-200"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'; }}
                />
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qtd: {item.quantity} x R$ {item.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className="font-bold text-lg text-flamengo-red">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-600 transition font-bold text-xl"
                  title="Remover item"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold text-gray-700">
            Total: <span className="text-flamengo-red text-2xl ml-2">R$ {cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Link to="/produtos" className="px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded hover:bg-white transition text-center flex-1 sm:flex-none">
              Continuar Comprando
            </Link>
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`px-8 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition shadow-md flex-1 sm:flex-none ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Processando...' : 'FINALIZAR COMPRA'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;