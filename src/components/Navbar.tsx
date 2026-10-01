import React from 'react';
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
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF6]/90 backdrop-blur-md border-b border-emerald-900/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element + icon) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(user.role === 'student' ? 'dashboard' : 'campus')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold shadow-sm shadow-lime-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-['Syne'] text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                CarbonConnect
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {user.role === 'student' ? (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                My Impact
              </button>
              <button
                onClick={() => setActiveTab('journey')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'journey'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Track Journey
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'challenges'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Challenges
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'rewards'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Reward Store
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'leaderboard'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Leaderboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('campus')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'campus'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Campus Overview
              </button>
              <button
                onClick={() => setActiveTab('league')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'league'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Carbon League
              </button>
              <button
                onClick={() => setActiveTab('ocr')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'ocr'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                OCR Bills
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'map'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Campus Map
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'simulator'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                What-If Simulator
              </button>
              <button
                onClick={() => setActiveTab('satellite')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'satellite'
                    ? 'bg-slate-900 text-lime-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Geo Environment
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & User Controls */}
        <div className="flex items-center gap-3">
          
          {/* Mode / Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              {user.role === 'student' && <User className="w-3.5 h-3.5 text-emerald-700" />}
              {user.role === 'institution_admin' && <Building2 className="w-3.5 h-3.5 text-emerald-700" />}
              {user.role === 'super_admin' && <Shield className="w-3.5 h-3.5 text-emerald-700" />}
              <span className="capitalize">{user.role.replace('_', ' ')} Mode</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50">
                <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Switch Portal Mode
                </div>
                <button
                  onClick={() => {
                    onSwitchRole('student');
                    setShowRoleDropdown(false);
                    setActiveTab('dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 ${
                    user.role === 'student' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Student App
                  </span>
                  {user.role === 'student' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('institution_admin');
                    setShowRoleDropdown(false);
                    setActiveTab('campus');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 ${
                    user.role === 'institution_admin' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Institution Admin
                  </span>
                  {user.role === 'institution_admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('super_admin');
                    setShowRoleDropdown(false);
                    setActiveTab('campus');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-slate-50 ${
                    user.role === 'super_admin' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
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

          {/* User Auth Info / Points Pill */}
          {user.role === 'student' && (
            <div className="hidden sm:flex items-center gap-1.5 bg-lime-100/80 border border-lime-300/80 text-lime-950 px-3 py-1.5 rounded-xl text-xs font-bold tabular-nums">
              <Sparkles className="w-3.5 h-3.5 text-lime-700 fill-lime-600" />
              <span>{user.impactPoints.toLocaleString()} Points</span>
            </div>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{user.name}</span>
                <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{user.email}</span>
              </div>
              <button
                onClick={onSignOut}
                title="Sign Out"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onGoogleSignIn}
              className="bg-slate-900 hover:bg-slate-800 text-lime-400 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Sign in with Google</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
