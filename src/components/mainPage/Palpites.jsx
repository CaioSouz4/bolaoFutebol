import React from 'react';
import { getBandeiraUrl } from '../../utils/flags';

export default function Palpites({ listaPalpitesAmigos, palpitesDoJogoAnterior, jogoDestaque, outrosJogos, jogoAnterior = [] }) {
  if (!jogoDestaque) return null;
  const obterPalpitesDoJogo = (jogoId) => {
    return listaPalpitesAmigos.filter(p => String(p.jogoId) === String(jogoId));
  };

  const palpitesDestaque = obterPalpitesDoJogo(jogoDestaque.id);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-700 rounded-2xl p-5 shadow-lg space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-yellow-400">👥</span> Palpites do Bolão
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Palpites para: <span className="font-semibold text-gray-800 ">{jogoDestaque.timeA} x {jogoDestaque.timeB}</span>
          </p>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-800">
          {palpitesDestaque.map((amigo) => (
            <div
              key={amigo.id}
              className="flex justify-between items-center bg-gray-700 hover:bg-gray-900 transition-colors py-2.5 px-3.5 rounded-xl border border-gray-700/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-bold text-sm text-gray-200">{amigo.jogador}</span>
              </div>
              <span className="font-black bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-2.5 py-0.5 rounded-lg text-xs tracking-wider shadow-md border border-yellow-400/20">
                {amigo.golsA} x {amigo.golsB}
              </span>
            </div>
          ))}

          {palpitesDestaque.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-5 bg-gray-900/30 rounded-xl border border-dashed border-gray-700">
              Nenhum palpite enviado para este jogo.
            </p>
          )}
        </div>
      </div>

      {outrosJogos.length > 0 && (
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 space-y-3">
          <h4 className="text-[10px] font-extrabold text-gray-200 uppercase tracking-widest">
            Próximos Confrontos
          </h4>

          <div className="space-y-3">
            {outrosJogos.map(jogo => {
              const palpitesDesteJogo = obterPalpitesDoJogo(jogo.id);

              return (
                <div key={jogo.id} className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-3 space-y-2">
                  <div className="text-[11px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded w-fit border border-gray-700/50">
                    {jogo.timeA} x {jogo.timeB}
                  </div>


                  <div className="flex flex-wrap gap-1.5">
                    {palpitesDesteJogo.map(amigo => (
                      <div
                        key={amigo.id}
                        className="text-[11px] bg-gray-900/60 border border-gray-700 text-gray-300 px-2 py-1 rounded-md flex items-center gap-1 font-medium"
                      >
                        <span className="font-semibold text-gray-400 truncate max-w-[65px]">{amigo.jogador}:</span>
                        <span className="font-black text-emerald-400 bg-emerald-950/50 px-1 rounded border border-emerald-500/20">
                          {amigo.golsA}x{amigo.golsB}
                        </span>
                      </div>
                    ))}

                    {palpitesDesteJogo.length === 0 && (
                      <span className="text-[10px] text-gray-500 italic pl-1">Sem palpites...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {jogoAnterior && (
        <div className="w-full max-w-2xl mx-auto bg-gray-50 border border-gray-200 p-4 sm:p-4 rounded-2xl shadow-inner text-center">
          <span className="px-2.5 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[11px] font-bold tracking-wide inline-block uppercase">
            ⏮️ Último Jogo
          </span>

          <div className="flex justify-center items-center gap-6 my-1 text-gray-800">
            <div className="flex items-center gap-2">
              <img src={getBandeiraUrl(jogoAnterior.siglaA)} alt={jogoAnterior.timeA} className="w-6 h-6 object-cover rounded-full shadow-sm" />
              <span className="text-sm font-bold">{jogoAnterior.timeA}</span>
            </div>

            <span className="text-sm font-bold text-gray-500">x</span>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{jogoAnterior.timeB}</span>
              <img src={getBandeiraUrl(jogoAnterior.siglaB)} alt={jogoAnterior.timeB} className="w-6 h-6 object-cover rounded-full shadow-sm" />
            </div>
          </div>

          <div className="mt-3 bg-white border border-gray-100 rounded-xl p-3 max-h-36 overflow-y-auto shadow-sm">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider text-left mb-2">Palpites da Galera:</h4>
            {palpitesDoJogoAnterior.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-1">Ninguém palpitou nesta partida.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {palpitesDoJogoAnterior.map((palpite) => (
                  <div key={palpite.id} className="bg-gray-700 hover:bg-gray-900 transition-colors flex justify-between items-center bg-gray-50/50 px-2.5 py-1.5 rounded-lg border border-gray-100 text-xs">
                    <span className="font-semibold text-white truncate max-w-[120px]">{palpite.jogador}</span>
                    <span className="font-black bg-gradient-to-br from-yellow-500 to-yellow-600 text-white px-1.5 py-0.5 rounded text-[11px]">
                      {palpite.golsA} x {palpite.golsB}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}