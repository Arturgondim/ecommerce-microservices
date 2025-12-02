import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './Context/CartContext';
import { useOutletContext, useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pega os dados do usuário que vêm do App.jsx
  const { user } = useOutletContext() || {}; 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5144/loja/produtos')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  };

  // --- ADMIN: FUNÇÃO DE DELETAR -
  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir "${name}" do estoque?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem('user_token');
      await axios.delete(`http://localhost:5144/loja/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Produto removido com sucesso!");
      // Atualiza a lista na hora
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Erro ao excluir. Verifique se você é Admin.");
    }
  };

  // Filtros
  const uniformes = products.filter(p => p.name.toLowerCase().includes('camisa'));
  const ingressos = products.filter(p => p.name.toLowerCase().includes('ingresso'));
  const acessorios = products.filter(p => !p.name.toLowerCase().includes('camisa') && !p.name.toLowerCase().includes('ingresso'));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="text-2xl font-bold text-flamengo-red animate-pulse">Carregando a Loja...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      
      <div className="max-w-7xl mx-auto mb-8 flex justify-center space-x-4">
        <a href="#uniformes" className="px-4 py-2 bg-white rounded-full shadow hover:bg-red-50 text-flamengo-red font-bold transition">Uniformes</a>
        <a href="#ingressos" className="px-4 py-2 bg-white rounded-full shadow hover:bg-red-50 text-flamengo-red font-bold transition">Ingressos</a>
        <a href="#acessorios" className="px-4 py-2 bg-white rounded-full shadow hover:bg-red-50 text-flamengo-red font-bold transition">Acessórios</a>
      </div>

      {/* BOTÃO DE ADICIONAR (EXCLUSIVO PARA ADMIN) */}
      {user?.role === 'Admin' && (
        <div className="max-w-7xl mx-auto mb-8 text-right">
          <button 
            onClick={() => navigate('/novo-produto')} 
            className="bg-green-600 text-white px-6 py-2 rounded shadow font-bold hover:bg-green-700 transition transform hover:scale-105"
          >
            + Novo Produto
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {uniformes.length > 0 && <CategorySection title="Mantos Sagrados" id="uniformes" items={uniformes} user={user} onDelete={handleDelete} />}
        {ingressos.length > 0 && <CategorySection title="Ingressos e Experiências" id="ingressos" items={ingressos} user={user} onDelete={handleDelete} />}
        {acessorios.length > 0 && <CategorySection title="Acessórios e Colecionáveis" id="acessorios" items={acessorios} user={user} onDelete={handleDelete} />}
      </div>
    </div>
  );
}

function CategorySection({ title, id, items, user, onDelete }) {
  return (
    <div id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-8 border-flamengo-red pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} user={user} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, user, onDelete }) {
  const { addToCart } = useCart(); 

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 relative">
      
      {/* --- BOTÃO DE EXCLUIR (EXCLUSIVO DO ADMIN) */}
      {user?.role === 'Admin' && (
       <button 
          onClick={() => onDelete(product.id, product.name)}
          className="absolute top-2 right-2 bg-white text-red-600 w-8 h-8 rounded-full shadow-md hover:bg-red-100 z-10 font-bold flex items-center justify-center border border-red-100"
          title="Excluir Produto"
        >
          ✕
        </button>
      )}

      <div className="h-56 w-full bg-gray-100 flex items-center justify-center relative group">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'; 
          }}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        {product.stockQuantity < 50 && (
           <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold mb-2 w-fit">
             Últimas {product.stockQuantity} unidades!
           </span>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <div className="text-xs text-gray-500">À vista</div>
            <div className="text-2xl font-bold text-flamengo-red">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
          </div>
          
          <button 
            onClick={() => addToCart(product)} 
            className="w-full bg-flamengo-red text-white font-bold py-2 rounded hover:bg-red-800 transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
           Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;