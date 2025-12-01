import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5144/loja/auth/forgot-password', 
        email, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage("Se o e-mail estiver cadastrado, enviamos um link de recuperação.");
    } catch (err) {
      setMessage("Erro ao processar solicitação.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-20">
      {/* BORDA SUPERIOR VERMELHA */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-flamengo-red">
        
        <h2 className="text-2xl font-bold text-center text-flamengo-black mb-4">Recuperar Senha</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Digite seu e-mail para receber as instruções de redefinição.</p>
        
        {message && <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm">{message}</div>}
        
        <form onSubmit={handleRecover} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">E-mail cadastrado</label>
            <input 
                type="email" 
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-flamengo-red" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
          </div>
          
          {/* BOTÃO VERMELHO */}
          <button type="submit" className="w-full bg-flamengo-red text-white font-bold py-3 rounded hover:bg-red-800 transition">
            ENVIAR LINK
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-flamengo-red font-medium">
            ← Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;