import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

export default function HomeSalas() {
  const { idSalaUrl } = useParams();
  const navigate = useNavigate();

  const [nomeSala, setNomeSala] = useState('');
  const [senhaSala, setSenhaSala] = useState('');
  const [senhaTentativa, setSenhaTentativa] = useState('');
  const [dadosSalaUrl, setDadosSalaUrl] = useState(null);
  const [carregando, setCarregando] = useState(!!idSalaUrl);

 
  useEffect(() => {
    if (idSalaUrl) {
      if (localStorage.getItem(`sala_autenticada_${idSalaUrl}`) === 'true') {
        navigate(`/bolao/${idSalaUrl}/palpites`);
        return;
      }

      const buscarSala = async () => {
        try {
          const docRef = doc(db, "salas", idSalaUrl);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setDadosSalaUrl({ id: docSnap.id, ...docSnap.data() });
          } else {
            alert("Sala não encontrada!");
            navigate('/');
          }
        } catch (e) {
          console.error(e);
        } finally {
          setCarregando(false);
        }
      };
      buscarSala();
    }
  }, [idSalaUrl, navigate]);

  // Função para CRIAR uma nova sala
  const criarSala = async (e) => {
    e.preventDefault();
    if (!nomeSala.trim() || !senhaSala.trim()) return alert("Preencha todos os campos!");

    try {
      const docRef = await addDoc(collection(db, "salas"), {
        nome: nomeSala.trim(),
        senha: senhaSala.trim(),
        criadoEm: new Date().toISOString()
      });

      // Salva a permissão no próprio navegador de quem criou
      localStorage.setItem(`sala_autenticada_${docRef.id}`, 'true');
      // Redireciona para a tela de jogos da nova sala
      navigate(`/bolao/${docRef.id}/palpites`);
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };


  const verificarSenha = (e) => {
    e.preventDefault();
    if (senhaTentativa === dadosSalaUrl.senha) {
    
      localStorage.setItem(`sala_autenticada_${dadosSalaUrl.id}`, 'true');
      
      
      setTimeout(() => {
        navigate(`/bolao/${dadosSalaUrl.id}/palpites`);
      }, 50);
    } else {
      alert("Senha incorreta!");
    }
  };

  if (carregando) return <div className="text-center mt-20 text-white font-bold">Carregando sala...</div>;

  if (dadosSalaUrl) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 rounded-2xl text-white shadow-xl text-center">
        <h2 className="text-2xl font-black text-yellow-400 mb-2">⚽ {dadosSalaUrl.nome}</h2>
        <p className="text-sm opacity-70 mb-6">Este é um grupo privado. Digite a senha para entrar e palpitar.</p>
        
        <form onSubmit={verificarSenha} className="space-y-4">
          <input
            type="password"
            placeholder="Digite a senha da sala"
            value={senhaTentativa}
            onChange={(e) => setSenhaTentativa(e.target.value)}
            className="w-full mt-2 p-3 bg-gray-700 rounded-lg text-white font-medium text-center outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold py-3 rounded-lg transition-colors">
            Entrar no Bolão
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 rounded-2xl text-white shadow-xl">
      <h1 className="text-3xl font-black text-center text-yellow-400 mb-2">🏆 BOLÃO COPA 2026</h1>
      <p className="text-center text-sm opacity-70 mb-8">Crie um grupo, defina uma senha e jogue com seus amigos!</p>

      <form onSubmit={criarSala} className="space-y-4 mt-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Nome do Bolão</label>
          <input
            type="text"
            value={nomeSala}
            onChange={(e) => setNomeSala(e.target.value)}
            className="w-full bg-gray-900 p-3 rounded-lg text-white font-medium outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Senha </label>
          <input
            type="password"
            onChange={(e) => setSenhaSala(e.target.value)}
            className="w-full bg-gray-900 p-3 rounded-lg text-white font-medium outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-lg transition-colors shadow-md mt-2">
          Criar Bolão
        </button>
      </form>
    </div>
  );
}