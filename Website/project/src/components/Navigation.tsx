import { Atom, Home, Database, FileText, Info } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Atom },
    { id: 'generate', label: 'Generate Data', icon: Database },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 my-4">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Atom className="w-8 h-8 text-[#00d4ff]" />
            <h1 className="text-xl font-bold gradient-text">Dark Matter Scribe</h1>
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00d4ff] bg-opacity-20 text-[#00d4ff] border border-[#00d4ff]'
                      : 'text-[#b0bec5] hover:text-white hover:bg-white hover:bg-opacity-5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
