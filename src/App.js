import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <BrowserRouter>
      <div className={`flex flex-col ${isMobile ? 'md:flex-col' : 'md:flex-row'} min-h-screen bg-gray-50`}>
      <Sidebar className="fixed h-full w-64 z-10" />

        <div className="flex flex-col flex-1 overflow-hidden w-full md:ml-64">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 md:bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
