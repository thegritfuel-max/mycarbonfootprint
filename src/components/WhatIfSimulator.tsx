import React, { useState, useEffect } from 'react';
import { BarChart3, Sliders, Sparkles, Trees, ShieldCheck, RefreshCw } from 'lucide-react';

export const WhatIfSimulator: React.FC = () => {
  const [acCutPercent, setAcCutPercent] = useState(10);
  const [busShiftPercent, setBusShiftPercent] = useState(15);
  const [labAutoShutdown, setLabAutoShutdown] = useState(true);
  const [foodWasteCutPercent, setFoodWasteCutPercent] = useState(20);

  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/what-if', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acPercentChange: acCutPercent,
          busShiftPercent: busShiftPercent,
          labAutoShutdown: labAutoShutdown,
          foodWasteReductionPercent: foodWasteCutPercent,
        }),
      });
      const data = await res.json();
      setSimulationResult(data);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [acCutPercent, busShiftPercent, labAutoShutdown, foodWasteCutPercent]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <BarChart3 className="w-8 h-8 text-emerald-600" />
          <span>What-If Campus Carbon Simulator</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Adjust policy sliders to simulate real-time energy savings, vehicle consolidation, and annual carbon reduction goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Policy Controls Sliders Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" /> Policy Simulation Parameters
            </span>
            <button
              onClick={runSimulation}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Recalculate
            </button>
          </div>

          {/* Slider 1: AC Setpoint / Usage Reduction */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">AC Cooling Setpoint Optimization</span>
              <span className="text-emerald-700 tabular-nums">-{acCutPercent}% load</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={acCutPercent}
              onChange={(e) => setAcCutPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">Raising AC setpoints from 21°C to 24°C across campus blocks.</p>
          </div>

          {/* Slider 2: Bus Route Consolidation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Bus Route Optimization & Pass Adoption</span>
              <span className="text-emerald-700 tabular-nums">+{busShiftPercent}% efficiency</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={busShiftPercent}
              onChange={(e) => setBusShiftPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">Consolidating low-occupancy midday campus bus trips.</p>
          </div>

          {/* Toggle: Lab Auto Shutdown */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Automatic Lab PC Power-Down at 8 PM</span>
              <span className="text-[11px] text-slate-500">Eliminates standby power drain across 1,170 lab computers.</span>
            </div>
            <input
              type="checkbox"
              checked={labAutoShutdown}
              onChange={(e) => setLabAutoShutdown(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3: Food Waste Reduction */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Campus Mess Food Waste Reduction</span>
              <span className="text-emerald-700 tabular-nums">-{foodWasteCutPercent}% waste</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={foodWasteCutPercent}
              onChange={(e) => setFoodWasteCutPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">Portion optimization and composting in hostel dining facilities.</p>
          </div>
        </div>

        {/* Live Simulation Results Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>Projected Carbon Savings</span>
            </div>

            <h2 className="font-['Syne'] text-2xl font-extrabold text-white">
              Simulation Impact Results
            </h2>

            {simulationResult && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-semibold">Monthly Saved</span>
                  <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-lime-400 tabular-nums">
                    {simulationResult.monthlySavedCo2eKg.toLocaleString()} kg
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">CO2e avoided per month</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-semibold">Annual Reduction</span>
                  <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                    {simulationResult.annualSavedTonnes} t
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">Tonnes CO2e / year</span>
                </div>
              </div>
            )}

            {simulationResult && (
              <div className="bg-emerald-900/60 border border-emerald-700/80 p-4 rounded-2xl mt-4 flex items-center gap-3">
                <Trees className="w-8 h-8 text-lime-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-lime-300">Equivalent Environmental Impact</span>
                  <p className="text-xs text-slate-200 mt-0.5">
                    Equal to planting <strong className="text-white font-bold">{simulationResult.treesEquivalent.toLocaleString()} mature trees</strong> annually!
                  </p>
                </div>
              </div>
            )}
          </div>

          {simulationResult && (
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-lime-400 block">AI Strategic Commentary</span>
              <p className="leading-relaxed">
                {simulationResult.summary}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
