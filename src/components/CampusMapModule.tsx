import React, { useState } from 'react';
import { CampusBuildingHotspot } from '../types';
import { CAMPUS_BUILDINGS_HOTSPOTS } from '../mockData';
import { MapPin, Zap, Laptop, Flame, Info, ChevronRight, X } from 'lucide-react';

export const CampusMapModule: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuildingHotspot | null>(
    CAMPUS_BUILDINGS_HOTSPOTS[0]
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <MapPin className="w-8 h-8 text-emerald-600" />
          <span>Interactive Campus Carbon Hotspot Map</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Geo-spatial visual map highlighting electrical loads, lab computing hotspots, and building-level emissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Stylized Campus Map Surface */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 border border-slate-800 shadow-xl relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          
          {/* Map Grid / Pathways Graphic */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#84CC16" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold text-lime-400 uppercase tracking-wider">COEP Technological University · Main Campus</span>
            <div className="flex items-center gap-3 text-[11px] bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> High</span>
            </div>
          </div>

          {/* Hotspot Markers */}
          <div className="relative w-full h-[320px] my-4">
            {CAMPUS_BUILDINGS_HOTSPOTS.map((bldg) => {
              const isSelected = selectedBuilding?.id === bldg.id;
              const colorBg =
                bldg.status === 'HIGH'
                  ? 'bg-rose-500 text-white shadow-rose-500/50'
                  : bldg.status === 'MODERATE'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/50'
                  : 'bg-emerald-500 text-slate-950 shadow-emerald-500/50';

              return (
                <button
                  key={bldg.id}
                  onClick={() => setSelectedBuilding(bldg)}
                  style={{ top: `${bldg.latOffsetPct}%`, left: `${bldg.lngOffsetPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-lg ${colorBg} ${
                    isSelected ? 'ring-4 ring-white scale-110 z-30' : 'hover:scale-105 opacity-90 z-20'
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0 fill-current" />
                  <span className="text-xs font-bold whitespace-nowrap">{bldg.code}</span>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-slate-400">
            Click any building marker on the map to inspect energy load & carbon breakdown.
          </div>
        </div>

        {/* Selected Building Detail Sidebar */}
        {selectedBuilding && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Building Carbon Profile</span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    selectedBuilding.status === 'HIGH'
                      ? 'bg-rose-100 text-rose-800'
                      : selectedBuilding.status === 'MODERATE'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedBuilding.status} LOAD
                </span>
              </div>

              <h2 className="font-['Syne'] text-xl font-bold text-slate-900 mt-3">{selectedBuilding.name}</h2>
              <p className="text-xs text-slate-500">{selectedBuilding.departmentName}</p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mt-4 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-600">Monthly Footprint</span>
                  <span className="font-['Syne'] text-xl font-extrabold text-emerald-700 tabular-nums">
                    {(selectedBuilding.co2eKgMonth / 1000).toFixed(1)} t CO2e
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" /> Electricity Load</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.electricityKg} kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-indigo-500" /> Lab Computing</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.computingKg} kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-rose-500" /> AC Cooling Load</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.acKg} kg</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Hotspot Recommendation</span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Automating thermostat setpoints and enforcing 8 PM lab PC power-down will reduce this building's emissions by ~14%.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
