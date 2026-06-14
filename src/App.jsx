import React from 'react';
import Jogos from './components/mainPage/Jogos.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeSalas from './pages/HomeSalas.jsx'; 


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSalas />} />      
        {/* Rota do link compartilhado: Abre direto pedindo a senha daquela sala específica */}
        <Route path="/bolao/:idSalaUrl" element={<HomeSalas />} />
        <Route path="/bolao/:idSalaUrl/palpites" element={<Jogos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}