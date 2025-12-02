import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('user_token');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity)
      };

      await axios.post('http://localhost:5144/loja/produtos', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Produto adicionado ao estoque! 📦");
      navigate('/produtos'); // Volta para a vitrine
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto. Verifique se você é Admin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-24 pb-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl border-t-8 border-green-600">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Novo Produto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nome do Produto</label>
            <input name="name" onChange={handleChange} className="w-full border p-3 rounded focus:outline-none focus:border-green-600" placeholder="Ex: Camisa Flamengo Zico" required />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Descrição</label>
            <textarea name="description" onChange={handleChange} className="w-full border p-3 rounded focus:outline-none focus:border-green-600" placeholder="Detalhes do item..." required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Preço (R$)</label>
              <input name="price" type="number" step="0.01" onChange={handleChange} className="w-full border p-3 rounded focus:outline-none focus:border-green-600" placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Qtd. Estoque</label>
              <input name="stockQuantity" type="number" onChange={handleChange} className="w-full border p-3 rounded focus:outline-none focus:border-green-600" placeholder="0" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">URL da Imagem</label>
            <input name="imageUrl" onChange={handleChange} className="w-full border p-3 rounded focus:outline-none focus:border-green-600" placeholder="https://..." />
            <p className="text-xs text-gray-500 mt-1">Cole o link direto da imagem (Google/Wikimedia)</p>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition shadow-lg text-lg">
            CADASTRAR PRODUTO
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;