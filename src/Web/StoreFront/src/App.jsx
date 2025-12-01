import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './Context/CartContext';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Verifica token ao carregar ou mudar de rota
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token && !user) { 
      setUser({ name: 'Torcedor' });
    }
  }, [location, user]);

  const logout = () => {
    localStorage.removeItem('user_token');
    setUser(null);
    navigate('/');
  };

  // verifica se está na home ou em páginas de autenticação
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/recuperar-senha';

  return (
    <div>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-flamengo-black/95 text-white shadow-lg z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="text-2xl font-extrabold text-flamengo-red tracking-wider hover:opacity-80">
            CRF STORE
          </Link>
          
          <div className="flex items-center gap-6">
            
            {/* Botão INÍCIO  */}
            {!isHomePage && (
              <Link to="/" className="text-gray-300 hover:text-white transition font-medium flex items-center gap-1 text-sm">
                 Início
              </Link>
            )}

            {/* BLOCO DE USUÁRIO */}
            {user ? (
              // --- LOGADO ---
              <div className="flex items-center gap-3">
                <span className="text-gray-300 text-sm hidden sm:block">Olá, {user.name}</span>
                
                <Link 
                to="/carrinho" 
                className="bg-flamengo-red px-4 py-1 rounded font-bold text-sm hover:bg-red-700 transition text-white flex items-center"
                >
                Carrinho ({cartCount})
               </Link>
                <button 
                  onClick={logout} 
                  className="border border-white text-white hover:bg-white hover:text-black px-3 py-1 rounded transition text-xs font-bold uppercase ml-2"
                >
                  SAIR
                </button>
              </div>
            ) : (
              // --- DESLOGADO ---
              !isAuthPage && (
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login" 
                    className="text-white hover:text-flamengo-red font-medium transition text-sm"
                  >
                    Entrar
                  </Link>
                  
                  <Link 
                    to="/cadastro" 
                    className="bg-flamengo-red px-4 py-2 rounded font-bold text-sm hover:bg-red-700 transition"
                  >
                    Cadastrar
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;