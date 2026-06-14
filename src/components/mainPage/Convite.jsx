import { useState } from 'react';

export default function Convite() {
  const [copiado, setCopiado] = useState(false);

  const copiarLink = () => {
    const linkConvite = window.location.href.replace('/palpites', '');
    navigator.clipboard.writeText(linkConvite);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 border border-gray-700/80 p-3.5 rounded-2xl text-white shadow-lg flex items-center justify-between gap-3 my-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">📢</span>
        <p className="text-xs text-gray-400 font-medium">
            <span className="text-gray-300 font-semibold">Convidar amigos!</span>
        </p>
      </div>

      <button
        onClick={copiarLink}
        className={`px-3 py-1.5 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1.5 shadow-sm ${
          copiado 
            ? 'bg-emerald-600 text-white' 
            : 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700'
        }`}
      >
        <span>{copiado ? '✅' : '🔗'}</span>
        {copiado ? 'Copiado' : 'Copiar Link'}
      </button>
    </div>
  );
}