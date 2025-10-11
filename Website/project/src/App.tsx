import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navigation from './components/Navigation';
import Hero from './views/Hero';
import Dashboard from './views/Dashboard';
import DataGenerator from './views/DataGenerator';
import Report from './views/Report';
import About from './views/About';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Hero onNavigate={setCurrentView} />;
      case 'dashboard':
        return <Dashboard />;
      case 'generate':
        return <DataGenerator />;
      case 'report':
        return <Report />;
      case 'about':
        return <About />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen cosmic-gradient scroll-smooth">
      <ParticleBackground />
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <div className="relative z-10">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
