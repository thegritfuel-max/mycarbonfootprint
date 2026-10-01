import React, { useState } from 'react';
import { Leaf, User, Building2, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onSelectRole: (role: 'student' | 'institution_admin') => void;
  onGoogleSignIn: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSelectRole, onGoogleSignIn }) => {
  const [selectedPortal, setSelectedPortal] = useState<'student' | 'institution_admin'>('student');

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-slate-800 flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-lime-500/20">
            <Leaf className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-['Syne'] text-2xl font-bold tracking-tight text-slate-900">
            CarbonConnect
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoogleSignIn}
            className="bg-slate-900 hover:bg-slate-800 text-lime-400 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Google Sign-In</span>
          </button>
        </div>
      </header>

      {/* Main Entry Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <span>Campus & Commuter Carbon Intelligence Platform</span>
          </div>

          <h1 className="font-['Syne'] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Measure your impact.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              Move toward zero.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            CarbonConnect turns everyday choices and institutional utility data into measurable, verified carbon reduction. Select how you would like to sign in:
          </p>
        </div>

        {/* Dual Portal Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full pt-2">
          
          {/* Option 1: Individual Student */}
          <div
            onClick={() => setSelectedPortal('student')}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer text-left space-y-4 relative overflow-hidden ${
              selectedPortal === 'student'
                ? 'bg-white border-emerald-600 shadow-xl ring-4 ring-emerald-500/10'
                : 'bg-white/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            {selectedPortal === 'student' && (
              <div className="absolute top-4 right-4 text-emerald-600">
                <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
              </div>
            )}

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
              <User className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                For Students & Users
              </span>
              <h3 className="font-['Syne'] text-xl font-bold text-slate-900 mt-2">I'm an Individual</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Track daily travel, log verified zero-carbon GPS journeys, complete challenges, and earn redeemable campus canteen coupons.
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRole('student');
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>ENTER STUDENT PORTAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Option 2: Institution Admin */}
          <div
            onClick={() => setSelectedPortal('institution_admin')}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer text-left space-y-4 relative overflow-hidden ${
              selectedPortal === 'institution_admin'
                ? 'bg-white border-emerald-600 shadow-xl ring-4 ring-emerald-500/10'
                : 'bg-white/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            {selectedPortal === 'institution_admin' && (
              <div className="absolute top-4 right-4 text-emerald-600">
                <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
              </div>
            )}

            <div className="w-14 h-14 rounded-2xl bg-lime-50 border border-lime-200/80 flex items-center justify-center text-lime-800">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-lime-800 bg-lime-100 px-2.5 py-0.5 rounded-full">
                For Colleges & Universities
              </span>
              <h3 className="font-['Syne'] text-xl font-bold text-slate-900 mt-2">I'm an Institution</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Upload electricity bills for AI OCR parsing, track departments on Carbon League, run what-if simulations, and generate sustainability reports.
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRole('institution_admin');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <span>ENTER CAMPUS PORTAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick Google Login Callout */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-500">
          <span>Or sign in securely with Firebase Auth:</span>
          <button
            onClick={onGoogleSignIn}
            className="text-slate-900 font-bold hover:underline underline-offset-4 flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Google SSO Sign-In
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 border-t border-slate-200/60">
        CarbonConnect © 2026 · Node.js Full-Stack Architecture · Powered by Google AI Studio
      </footer>
    </div>
  );
};
