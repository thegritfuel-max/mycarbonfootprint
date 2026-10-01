import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, Navigation, Trophy, Gift, BarChart3, Building2, ScanLine, MapPin } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, role }) => {
  if (role === 'student') {
    return (
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Impact</span>
        </button>

        <button
          onClick={() => setActiveTab('journey')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'journey' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px]">Track</span>
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'challenges' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Challenges</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'rewards' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px]">Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'leaderboard' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px]">Rank</span>
        </button>
      </nav>
    );
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('campus')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'campus' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
        }`}
      >
        <Building2 className="w-5 h-5" />
        <span className="text-[10px]">Overview</span>
      </button>

      <button
        onClick={() => setActiveTab('league')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'league' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
        }`}
      >
        <Trophy className="w-5 h-5" />
        <span className="text-[10px]">League</span>
      </button>

      <button
        onClick={() => setActiveTab('ocr')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'ocr' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
        }`}
      >
        <ScanLine className="w-5 h-5" />
        <span className="text-[10px]">OCR Bills</span>
      </button>

      <button
        onClick={() => setActiveTab('map')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'map' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[10px]">Map</span>
      </button>

      <button
        onClick={() => setActiveTab('simulator')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          activeTab === 'simulator' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px]">What-If</span>
      </button>
    </nav>
  );
};
