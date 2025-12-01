import { Link } from 'react-router-dom';

function Home() {
    const bannerUrl ="https://uploads.metroimg.com/wp-content/uploads/2024/09/13082707/Torcida-Flamengo-Maracana.jpeg"
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mt-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg uppercase leading-tight">
          RAÇA, AMOR E <br className="md:hidden" /> 
          <span className="text-flamengo-red">PAIXÃO</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 font-light">
          Garanta agora seu manto e ingressos para comemorar o Tetra.
        </p>
        <Link 
          to="/produtos"
          className="px-8 py-3 bg-flamengo-red text-white text-lg font-bold rounded-full hover:bg-red-800 transition transform hover:scale-105 shadow-2xl inline-block"
        >
          ACESSAR LOJA
        </Link>
      </div>
    </div>
  );
}
export default Home;