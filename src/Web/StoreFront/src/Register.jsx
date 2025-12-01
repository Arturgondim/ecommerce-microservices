import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: '', 
    cpf: '', 
    phoneNumber: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlurCep = async () => {
    if (formData.zipCode.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formData.zipCode}/json/`);
        if (!response.data.erro) {
          setFormData(prev => ({
            ...prev,
            street: response.data.logradouro,
            neighborhood: response.data.bairro,
            city: response.data.localidade,
            state: response.data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP");
      }
    }
  };
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasUpperCase && hasSpecialChar;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // SENHAS IGUAIS? 
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem! Verifique e tente novamente.");
      return; // Para tudo e não envia
    }
    // VALIDAÇÃO FORÇA DA SENHA
    if (!validatePassword(formData.password)) {
      alert("A senha precisa ter pelo menos uma Letra Maiúscula e um Caractere Especial (ex: ! @ # $).");
      return;
    }
   

    try {
      const { confirmPassword, ...dataToSend } = formData;

      await axios.post('http://localhost:5144/loja/auth/register', dataToSend);
      alert("Cadastro realizado com sucesso! Faça login.");
      navigate('/login');
    } catch (err) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-24 pb-10">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border-t-8 border-flamengo-black">
        <h2 className="text-3xl font-bold text-center text-flamengo-red mb-6">Cadastre-se</h2>
        
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          
          {/* DADOS PESSOAIS */}
          <div className="md:col-span-6 text-lg font-bold text-gray-700 border-b pb-1 mb-2">Dados Pessoais</div>
          
          <input name="fullName" placeholder="Nome Completo" onChange={handleChange} className="border p-3 rounded md:col-span-4 focus:outline-none focus:border-flamengo-red" required />
          <input name="cpf" placeholder="CPF" onChange={handleChange} className="border p-3 rounded md:col-span-2 focus:outline-none focus:border-flamengo-red" required />
          
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="border p-3 rounded md:col-span-4 focus:outline-none focus:border-flamengo-red" required />
          <input name="phoneNumber" placeholder="Celular (WhatsApp)" onChange={handleChange} className="border p-3 rounded md:col-span-2 focus:outline-none focus:border-flamengo-red" />

          {/* ENDEREÇO */}
          <div className="md:col-span-6 text-lg font-bold text-gray-700 border-b pb-1 mb-2 mt-4">Endereço</div>

          <input 
            name="zipCode" 
            placeholder="CEP (somente números)" 
            onChange={handleChange} 
            onBlur={handleBlurCep} 
            className="border p-3 rounded md:col-span-2 focus:outline-none focus:border-flamengo-red" 
            maxLength={8}
            required 
          />
          <div className="md:col-span-4 text-xs text-gray-500 flex items-center">* Digite o CEP para preencher automático</div>

          <input name="street" placeholder="Rua / Avenida" value={formData.street} onChange={handleChange} className="border p-3 rounded md:col-span-5 focus:outline-none focus:border-flamengo-red" required />
          <input name="number" placeholder="Nº" onChange={handleChange} className="border p-3 rounded md:col-span-1 focus:outline-none focus:border-flamengo-red" required />

          <input name="neighborhood" placeholder="Bairro" value={formData.neighborhood} onChange={handleChange} className="border p-3 rounded md:col-span-2 focus:outline-none focus:border-flamengo-red" required />
          <input name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} className="border p-3 rounded md:col-span-3 focus:outline-none focus:border-flamengo-red" required />
          <input name="state" placeholder="UF" value={formData.state} onChange={handleChange} className="border p-3 rounded md:col-span-1 focus:outline-none focus:border-flamengo-red" required />
          
          <input name="complement" placeholder="Complemento (Apto, Bloco...)" onChange={handleChange} className="border p-3 rounded md:col-span-6 focus:outline-none focus:border-flamengo-red" />

          {/* SEGURANÇA */}
          <div className="md:col-span-6 text-lg font-bold text-gray-700 border-b pb-1 mb-2 mt-4">Segurança</div>
          
          {/* formulario de senha e confirmar senha*/}
          <div className="md:col-span-6">
            <input 
              name="password" 
              type="password" 
              placeholder="Senha" 
              onChange={handleChange} 
              className="border p-3 rounded w-full focus:outline-none focus:border-flamengo-red" 
              required 
            />
            {/* Aviso para informar usuaario que a senha deve ser forte*/}
            <p className="text-xs text-gray-500 mt-1">
               A senha deve conter <strong>8 caracteres,</strong> pelo menos uma <strong>Letra Maiúscula</strong> e um <strong>Caractere Especial</strong> (!@#$%).
            </p>
          </div>
          
          <input 
            name="confirmPassword" 
            type="password" 
            placeholder="Confirmar Senha" 
            onChange={handleChange} 
            className="border p-3 rounded md:col-span-6 focus:outline-none focus:border-flamengo-red" 
            required 
          />
          <button type="submit" className="w-full bg-flamengo-black text-white font-bold py-4 rounded hover:bg-gray-800 transition md:col-span-6 mt-4 text-lg shadow-lg">
            FINALIZAR CADASTRO
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
           Já tem conta? <Link to="/login" className="text-flamengo-red font-bold hover:underline">Faça Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;