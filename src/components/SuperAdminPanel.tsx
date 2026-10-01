import React, { useState } from 'react';
import { Shield, Settings, Sliders, Database, Award, CheckCircle2 } from 'lucide-react';

export const SuperAdminPanel: React.FC = () => {
  const [gridFactor, setGridFactor] = useState(0.82);
  const [dieselFactor, setDieselFactor] = useState(2.68);
  const [pointsRate, setPointsRate] = useState(100); // 100 points per 1 kg CO2e
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveFactors = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <Shield className="w-8 h-8 text-emerald-700" />
          <span>Super Admin System Control</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Configure regional greenhouse gas emission factors, carbon credit point conversion rates, and multi-tenant rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Emission Factors Config Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-600" /> Emission Factors Database
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full">
              v2026.1 IN-DEFRA
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Grid Electricity Emission Factor (kg CO2e / kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={gridFactor}
                onChange={(e) => setGridFactor(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Diesel Generator Emission Factor (kg CO2e / Liter)
              </label>
              <input
                type="number"
                step="0.01"
                value={dieselFactor}
                onChange={(e) => setDieselFactor(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Impact Points Conversion Rate (Points per 1.0 kg CO2e Avoided)
              </label>
              <input
                type="number"
                value={pointsRate}
                onChange={(e) => setPointsRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={handleSaveFactors}
            className="w-full bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold py-3 rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>Emission Factors Updated & Synced</span>
              </>
            ) : (
              <span>SAVE EMISSION FACTORS</span>
            )}
          </button>
        </div>

        {/* Global Network Analytics Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-6 text-white space-y-5 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-lime-400" />
              <span>Network Impact Overview</span>
            </div>

            <h2 className="font-['Syne'] text-xl font-bold text-white">Global Platform Metrics</h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Active Institutions</span>
                <span className="font-['Syne'] text-2xl font-extrabold text-lime-400 tabular-nums">12</span>
                <span className="text-[10px] text-slate-400 block mt-1">Universities enrolled</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Verified Journeys</span>
                <span className="font-['Syne'] text-2xl font-extrabold text-emerald-400 tabular-nums">48,290</span>
                <span className="text-[10px] text-slate-400 block mt-1">Low-carbon trips</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/80 text-xs text-slate-200">
            <span className="font-bold text-lime-300 block">System Verification Status</span>
            <p className="mt-0.5">
              All carbon algorithms and GPS velocity filters conform to academic PRD standards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
