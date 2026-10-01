import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { Leaf, Award, Shield, User, LogOut, Sparkles, Building2, ChevronDown } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: UserRole) => void;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onSwitchRole,
  onGoogleSignIn,
  onSignOut,
  isLoggedIn,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF6]/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab(user.role === 'student' ? 'dashboard' : 'campus')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-['Syne'] text-base sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              CarbonConnect
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {user.role === 'student' ? (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                My Impact
              </button>
              <button
                onClick={() => setActiveTab('journey')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'journey'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Track Journey
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'challenges'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Challenges
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'rewards'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Reward Store
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'leaderboard'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Leaderboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('campus')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'campus'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Campus ERP
              </button>
              <button
                onClick={() => setActiveTab('league')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'league'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Carbon League
              </button>
              <button
                onClick={() => setActiveTab('ocr')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'ocr'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                OCR Bills
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Campus Map
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'simulator'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                What-If Simulator
              </button>
              <button
                onClick={() => setActiveTab('satellite')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'satellite'
                    ? 'bg-slate-900 text-lime-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Geo Satellite
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: User Controls & Role Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Mode Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              {user.role === 'student' && <User className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
              {user.role === 'institution_admin' && <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
              {user.role === 'super_admin' && <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
              <span className="capitalize hidden sm:inline">{user.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Portal Mode
                </div>
                <button
                  onClick={() => {
                    onSwitchRole('student');
                    setShowRoleDropdown(false);
                    setActiveTab('dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    user.role === 'student' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Student
                  </span>
                  {user.role === 'student' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('institution_admin');
                    setShowRoleDropdown(false);
                    setActiveTab('campus');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    user.role === 'institution_admin' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Institution ERP
                  </span>
                  {user.role === 'institution_admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('super_admin');
                    setShowRoleDropdown(false);
                    setActiveTab('superadmin');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    user.role === 'super_admin' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" /> Super Admin
                  </span>
                  {user.role === 'super_admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
              </div>
            )}
          </div>

          {/* Points Pill (Student) */}
          {user.role === 'student' && (
            <div className="hidden md:flex items-center gap-1 bg-lime-100 border border-lime-300 text-lime-950 px-2.5 py-1.5 rounded-xl text-xs font-bold tabular-nums shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-lime-700 fill-lime-600" />
              <span>{user.impactPoints} pts</span>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={onSignOut}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onGoogleSignIn}
              className="bg-slate-900 hover:bg-slate-800 text-lime-400 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
