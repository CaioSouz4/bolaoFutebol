import React from 'react';

export default function Palpites({ listaPalpitesAmigos, jogoDestaque, outrosJogos = [] }) {
  if (!jogoDestaque) return null;

  // Filtra os palpites pertencentes a um jogo específico (Garantindo match de tipo string/número)
  const obterPalpitesDoJogo = (jogoId) => {
    return listaPalpitesAmigos.filter(p => String(p.jogoId) === String(jogoId));
  };

  const palpitesDestaque = obterPalpitesDoJogo(jogoDestaque.id);

  return (
    <div className="space-y-4">
      {/* 🟦 CARD PRINCIPAL (JOGO DESTAQUE) - Combinando com o tema escuro/azul do app */}
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

      {/* 💤 SEÇÃO SECUNDÁRIA (OUTROS JOGOS) - Visual menos destacado e discreto */}
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
                  {/* Cabeçalho do mini jogo */}
                  <div className="text-[11px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded w-fit border border-gray-700/50">
                    {jogo.timeA} x {jogo.timeB}
                  </div>

                  {/* Lista de palpites curtinhos em badge */}
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
    </div>
  );
}