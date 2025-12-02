import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; 

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserFromToken = () => {
    const token = localStorage.getItem('user_token');
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      
      const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const name = decoded.unique_name || decoded.email || "Usuário";

      return { name, role };
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const loggedUser = getUserFromToken();
    if (loggedUser && !user) {
      setUser(loggedUser);
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem('user_token');
    setUser(null);
    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro' || location.pathname === '/recuperar-senha';

  return (
    <div>
      <nav className="fixed top-0 w-full bg-flamengo-black/95 text-white shadow-lg z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          <Link to="/" className="text-2xl font-extrabold text-flamengo-red tracking-wider hover:opacity-80">
            CRF STORE
          </Link>
          
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             {!isHomePage && (
                <Link to="/" className="hover:text-flamengo-red transition flex items-center gap-1">
                      Início
                </Link>
              )}
          </div>

          <div className="flex items-center gap-4">
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="block text-gray-300 text-sm">Olá, {user.name}</span>
                  {user.role === 'Admin' && (
                    <span className="block text-[10px] text-flamengo-red font-bold uppercase tracking-widest text-right">
                      ADMINISTRADOR
                    </span>
                  )}
                </div>
                
                <button className="bg-flamengo-red px-4 py-1 rounded font-bold text-sm hover:bg-red-700 transition">
                  Carrinho (0)
                </button>

                <button 
                  onClick={logout} 
                  className="border border-white text-white hover:bg-white hover:text-black px-3 py-1 rounded transition text-xs font-bold uppercase ml-2"
                >
                  SAIR
                </button>
              </div>
            ) : (
              !isAuthPage && (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-white hover:text-flamengo-red font-medium transition text-sm">Entrar</Link>
                  <Link to="/cadastro" className="bg-flamengo-red px-4 py-2 rounded font-bold text-sm hover:bg-red-700 transition">Cadastrar</Link>
                </div>
              )
            )}
          </div>
        </div>
      </nav>

      <Outlet context={{ user }} /> 
    </div>
  );
}

export default App;