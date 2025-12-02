import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

function Login() { 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5144/loja/auth/login', {
        email,
        password
      });

      localStorage.setItem('user_token', response.data.token);
      alert("Login realizado com sucesso! SRN! 🔴⚫");
      navigate('/produtos'); 
    } catch {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-20">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-8 border-flamengo-red">
        <h2 className="text-3xl font-bold text-center text-flamengo-black mb-6">Login</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-flamengo-red"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-flamengo-red"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* LINK DE ESQUECI A SENHA */}
            <div className="text-right mt-1">
                <Link to="/recuperar-senha" className="text-xs text-gray-500 hover:text-flamengo-red">
                    Esqueceu a senha?
                </Link>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-flamengo-red text-white font-bold py-3 rounded hover:bg-red-800 transition">
            ENTRAR
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Ainda não é sócio?{' '}
          <Link to="/cadastro" className="text-flamengo-red font-bold hover:underline">
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;