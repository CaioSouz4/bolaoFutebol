import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import matchesData from '../../utils/copaJogos2026';
import Palpites from './Palpites.jsx';
import { useParams } from 'react-router-dom';
import Convite from './Convite.jsx';
import { getBandeiraUrl } from '../../utils/flags';


const formatData = (date) => {
  const d = new Date(date);
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit' };
  const isSameDay = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  if (isSameDay) return `Hoje - ${d.toLocaleTimeString('pt-BR', options)}`;
  if (isTomorrow) return `Amanhã - ${d.toLocaleTimeString('pt-BR', options)}`;
  return d.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export default function Jogos() {
  const { idSalaUrl } = useParams();

  if (localStorage.getItem(`sala_autenticada_${idSalaUrl}`) !== 'true') {
    window.location.href = `/bolao/${idSalaUrl}`;
    return null;
  }

  const now = new Date();
  const jogosOrdenados = [...matchesData.groupStageMatches].sort((a, b) => a.date - b.date);

  const jogoDestaque = jogosOrdenados.find(jogo => {
    if (jogo.encerrado) return false;
    const horarioInicio = new Date(jogo.date);
    const horarioTermino = new Date(horarioInicio.getTime() + (115 * 60 * 1000)); 
    
    return now < horarioTermino;
  });

  const jogoAnterior = [...jogosOrdenados]
    .reverse()
    .find(jogo => {
      if (jogoDestaque && jogo.id === jogoDestaque.id) return false;
      const horarioInicio = new Date(jogo.date);
      const horarioTermino = new Date(horarioInicio.getTime() + (2 * 60 * 60 * 1000));
      return now >= horarioTermino;
    });


  const próximosJogosFiltrados = jogosOrdenados.filter(jogo => {
    if (jogo.encerrado) return false;
    if (jogoDestaque && jogo.id === jogoDestaque.id) return false; 
    return new Date(jogo.date) >= now;
  });


  const outrosJogos = próximosJogosFiltrados.slice(0, 2);

  const [nomeSala, setNomeSala] = useState('Carregando sala...');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [palpiteAtual, setPalpiteAtual] = useState({ golsA: '', golsB: '' });
  const [listaPalpitesAmigos, setListaPalpitesAmigos] = useState([]);
  const [palpitesLista, setPalpitesLista] = useState({});


  useEffect(() => {
    const idsJogosAtivos = [jogoDestaque.id, ...outrosJogos.map(j => j.id)];
    if (jogoAnterior?.id) idsJogosAtivos.push(jogoAnterior.id);
    
    const q = query(
      collection(db, "palpites"),
      where("jogoId", "in", idsJogosAtivos),
      where("salaId", "==", idSalaUrl)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const palpites = [];
      snapshot.forEach((doc) => {
        palpites.push({ id: doc.id, ...doc.data() });
      });
      setListaPalpitesAmigos(palpites);
    });

    return () => unsubscribe();
  }, [jogoDestaque?.id, jogoAnterior?.id, outrosJogos.map(j => j.id).join(','), idSalaUrl]);

  const handlePlacarChange = (time, valor) => {
    setPalpiteAtual(prev => ({ ...prev, [time]: valor }));
  };

  const handlePlacarListaChange = (jogoId, time, valor) => {
    setPalpitesLista(prev => ({
      ...prev,
      [jogoId]: { ...prev[jogoId], [time]: valor }
    }));
  };

  const salvarPalpite = async () => {
    if (!nomeUsuario.trim()) {
      alert("Por favor, digite seu nome antes de salvar!");
      return;
    }

    const inicioDoJogo = new Date(jogoDestaque.date);
    if (now >= inicioDoJogo) {
      alert("A partida já começou! Não é mais possível enviar ou alterar palpites para este jogo.");
      return;
    }

    if (palpiteAtual.golsA === '' || palpiteAtual.golsB === '') {
      alert("Preencha o placar do jogo!");
      return;
    }

    const golsA = palpiteAtual.golsA === '' ? 0 : Number(palpiteAtual.golsA);
    const golsB = palpiteAtual.golsB === '' ? 0 : Number(palpiteAtual.golsB);

    try {
      await addDoc(collection(db, "palpites"), {
        salaId: idSalaUrl,
        jogador: nomeUsuario.trim(),
        jogoId: jogoDestaque.id,
        golsA: golsA,
        golsB: golsB,
        criadoEm: new Date().toISOString()
      });

      setPalpiteAtual({ golsA: '', golsB: '' });
      alert("Seu palpite foi salvo!");
    } catch (error) {
      console.error("Erro ao salvar palpite", error);
    }
  };

  const salvarPalpiteLista = async (jogo) => {
    if (!nomeUsuario.trim()) {
      alert("Por favor, digite seu nome antes de salvar!");
      return;
    }

    const inicioDoJogo = new Date(jogo.date);
    if (now >= inicioDoJogo) {
      alert("A partida já começou! Não é mais possível enviar palpites.");
      return;
    }

    const palpiteJogo = palpitesLista[jogo.id] || { golsA: '', golsB: '' };
    if (palpiteJogo.golsA === '' || palpiteJogo.golsB === '') {
      alert("Preencha o placar do jogo!");
      return;
    }

    const golsA = palpiteJogo.golsA === '' ? 0 : Number(palpiteJogo.golsA);
    const golsB = palpiteJogo.golsB === '' ? 0 : Number(palpiteJogo.golsB);

    try {
      await addDoc(collection(db, "palpites"), {
        salaId: idSalaUrl,
        jogador: nomeUsuario.trim(),
        jogoId: jogo.id,
        golsA: golsA,
        golsB: golsB,
        criadoEm: new Date().toISOString()
      });

      alert("Palpite da lista salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar palpite da lista", error);
    }
  };

  const palpitesDoJogoAnterior = listaPalpitesAmigos.filter(p => p.jogoId === jogoAnterior?.id);

  return (
    <div className="font-sans max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div className="lg:col-span-2 space-y-6">


        <div className="flex flex-col gap-2 bg-slate-800 p-4 rounded-xl shadow-sm">
          <label htmlFor="nome-jogador" className="font-bold text-white text-sm">
            Seu Nome para o Bolão:
          </label>
          <input
            id="nome-jogador"
            type="text"
            placeholder="Digite seu nome..."
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-yellow-400 outline-none transition-all text-base text-white font-medium"
          />
        </div>


        {jogoDestaque && (() => {
          const jogoJaComecou = now >= new Date(jogoDestaque.date);

          return (
            <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-950 to-blue-800 text-white p-5 sm:p-8 rounded-2xl text-center shadow-xl shadow-blue-950/40 border border-blue-700/30">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide inline-block ${jogoJaComecou ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-400 text-gray-900'
                }`}>
                {jogoJaComecou ? '⚽ JOGO EM ANDAMENTO / ENCERRADO' : '⏳ PALPITE PARA O JOGO:'}
              </span>
              <p className="text-xs sm:text-sm opacity-80 mt-2 font-medium">{formatData(jogoDestaque.date)}</p>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 my-6 bg-blue-900/40 sm:bg-transparent p-4 sm:p-4 rounded-xl border border-blue-700/20 sm:border-none">


                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-1/3 gap-3 sm:gap-2">
                  <img src={getBandeiraUrl(jogoDestaque.siglaA)} alt={jogoDestaque.timeA} className="w-12 h-9 sm:w-20 sm:h-14 object-cover rounded shadow-md" />
                  <span className="text-sm sm:text-lg font-bold truncate text-left sm:text-center w-full">{jogoDestaque.timeA}</span>
                </div>


                <div className="flex items-center gap-3 sm:gap-5 justify-center w-full sm:w-auto py-3 sm:py-0">
                  <input
                    type="number" min="0" placeholder="0"
                    value={palpiteAtual.golsA} disabled={jogoJaComecou}
                    onChange={(e) => handlePlacarChange('golsA', e.target.value)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-black bg-gradient-to-br from-yellow-500 to-yellow-700 text-white rounded-xl border-2 border-yellow-300 focus:outline-none disabled:from-gray-600 disabled:to-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-lg sm:text-2xl font-black text-yellow-400">X</span>
                  <input
                    type="number" min="0" placeholder="0"
                    value={palpiteAtual.golsB} disabled={jogoJaComecou}
                    onChange={(e) => handlePlacarChange('golsB', e.target.value)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-black bg-gradient-to-br from-yellow-500 to-yellow-700 text-white rounded-xl border-2 border-yellow-300 focus:outline-none disabled:from-gray-600 disabled:to-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>


                <div className="flex flex-row-reverse sm:flex-col items-center justify-between sm:justify-center w-full sm:w-1/3 gap-3 sm:gap-2">
                  <img src={getBandeiraUrl(jogoDestaque.siglaB)} alt={jogoDestaque.timeB} className="w-12 h-9 sm:w-20 sm:h-14 object-cover rounded shadow-md" />
                  <span className="text-sm sm:text-lg font-bold truncate text-right sm:text-center w-full">{jogoDestaque.timeB}</span>
                </div>
              </div>

              <button
                disabled={jogoJaComecou}
                className={`w-full sm:w-auto px-10 py-3.5 font-extrabold rounded-xl text-sm transition-all uppercase tracking-wider ${jogoJaComecou ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                  }`}
                onClick={salvarPalpite}
              >
                {jogoJaComecou ? 'Palpites Encerrados' : 'Confirmar Palpite'}
              </button>
            </div>
          );
        })()}

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Próximos Jogos</h3>
          <div className="flex flex-col gap-3">
            {outrosJogos.map(jogo => {
              const jaAconteceu = new Date(jogo.date) < now || !!jogo.encerrado;

              return (
                <div
                  key={jogo.id}
                  className={`flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border shadow-sm transition-all gap-4 ${jaAconteceu ? 'opacity-50 border-gray-100' : 'border-gray-100 hover:border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex flex-row sm:flex-col items-center gap-2.5 sm:gap-1 w-28 sm:w-20">
                      <img src={getBandeiraUrl(jogo.siglaA)} alt={jogo.timeA} className="w-8 h-6 object-cover rounded shadow-sm" />
                      <span className="text-sm sm:text-xs font-semibold text-gray-700 truncate text-left sm:text-center w-full">{jogo.timeA}</span>
                    </div>

                    <span className="text-xs text-gray-400 font-bold mx-auto sm:mx-4">vs</span>

                    <div className="flex flex-row-reverse sm:flex-col items-center gap-2.5 sm:gap-1 w-28 sm:w-20 justify-end sm:justify-center">
                      <img src={getBandeiraUrl(jogo.siglaB)} alt={jogo.timeB} className="w-8 h-6 object-cover rounded shadow-sm" />
                      <span className="text-sm sm:text-xs font-semibold text-gray-700 truncate text-right sm:text-center w-full">{jogo.timeB}</span>
                    </div>
                  </div>

                  {!jaAconteceu && (
                    <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100 gap-1.5 shadow-inner">
                      <input
                        type="number" min="0" placeholder="0"
                        value={palpitesLista[jogo.id]?.golsA || ''}
                        onChange={(e) => handlePlacarListaChange(jogo.id, 'golsA', e.target.value)}
                        className="w-10 h-8 text-center text-sm font-black bg-white text-gray-800 border border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] font-black text-gray-400">X</span>
                      <input
                        type="number" min="0" placeholder="0"
                        value={palpitesLista[jogo.id]?.golsB || ''}
                        onChange={(e) => handlePlacarListaChange(jogo.id, 'golsB', e.target.value)}
                        className="w-10 h-8 text-center text-sm font-black bg-white text-gray-800 border border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => salvarPalpiteLista(jogo)}
                        className="ml-1 bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 text-[11px] font-extrabold px-2.5 py-1.5 rounded-md transition-all uppercase tracking-wide"
                      >
                        Palpitar
                      </button>
                    </div>
                  )}

                  <span className={`text-xs px-2.5 py-1 rounded-md font-bold w-full sm:w-auto text-center ${jaAconteceu ? 'text-gray-400 bg-gray-50' : 'text-blue-600 bg-blue-50'
                    }`}>
                    {jaAconteceu ? 'Encerrado' : formatData(jogo.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="space-y-4">
        <Palpites
          listaPalpitesAmigos={listaPalpitesAmigos}
          jogoDestaque={jogoDestaque}
          outrosJogos={outrosJogos}
          jogoAnterior={jogoAnterior}
          palpitesDoJogoAnterior={palpitesDoJogoAnterior}
        />
        <Convite />
      </div>

    </div>
  );
}