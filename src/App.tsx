import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FandomPage from './pages/FandomPage';
import QuizPage from './pages/QuizPage';
import GalleryPage from './pages/GalleryPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { useWallet } from './contexts/WalletContext';

function App() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/fandom" 
            element={connected ? <FandomPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/quiz/:fandom" 
            element={connected ? <QuizPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/gallery" 
            element={connected ? <GalleryPage /> : <Navigate to="/" />} 
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;