import React, { useState } from 'react';
import { CampusBuildingHotspot } from '../types';
import { MapPin, Zap, Laptop, Flame, Info, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SITANANDA_CAMPUS_BUILDINGS: CampusBuildingHotspot[] = [
  {
    id: 'bldg_sita_01',
    name: 'Academic & Administrative Building (PG Building)',
    code: 'ACAD-PG',
    departmentName: 'Computer Science & Higher Studies',
    co2eKgMonth: 11800,
    status: 'HIGH',
    latOffsetPct: 58,
    lngOffsetPct: 37,
    electricityKg: 9400,
    computingKg: 1800,
    acKg: 600,
  },
  {
    id: 'bldg_sita_02',
    name: 'College Canteen & Student Commons',
    code: 'CANTEEN',
    departmentName: 'Food Services',
    co2eKgMonth: 5400,
    status: 'MODERATE',
    latOffsetPct: 66,
    lngOffsetPct: 45,
    electricityKg: 3200,
    computingKg: 200,
    acKg: 2000,
  },
  {
    id: 'bldg_sita_03',
    name: 'Girls\' Hostel & Residential Block',
    code: 'HOSTEL-G',
    departmentName: 'Campus Housing',
    co2eKgMonth: 8200,
    status: 'MODERATE',
    latOffsetPct: 48,
    lngOffsetPct: 42,
    electricityKg: 6800,
    computingKg: 400,
    acKg: 1000,
  },
  {
    id: 'bldg_sita_04',
    name: 'Biocompost & Vermicompost Eco Project',
    code: 'BIO-COMPOST',
    departmentName: 'Environmental Research',
    co2eKgMonth: 800,
    status: 'LOW',
    latOffsetPct: 92,
    lngOffsetPct: 42,
    electricityKg: 400,
    computingKg: 100,
    acKg: 0,
  },
  {
    id: 'bldg_sita_05',
    name: 'Open Air Theatre & Playground',
    code: 'OAT-GROUND',
    departmentName: 'Physical Education & Cultural',
    co2eKgMonth: 1200,
    status: 'LOW',
    latOffsetPct: 32,
    lngOffsetPct: 45,
    electricityKg: 1000,
    computingKg: 0,
    acKg: 0,
  },
  {
    id: 'bldg_sita_06',
    name: 'Gate No. 1 & Nandigram Bus Stand Corridor',
    code: 'GATE-01',
    departmentName: 'Transport & Security',
    co2eKgMonth: 3800,
    status: 'LOW',
    latOffsetPct: 52,
    lngOffsetPct: 55,
    electricityKg: 1800,
    computingKg: 200,
    acKg: 0,
  },
];

export const CampusMapModule: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuildingHotspot | null>(
    SITANANDA_CAMPUS_BUILDINGS[0]
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 lg:pb-8 font-sans">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Official Campus Map · Sitananda College (Nandigram)</span>
        </div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          <MapPin className="w-8 h-8 text-emerald-600" />
          <span>Sitananda College Interactive Campus Carbon Map</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Visual blueprint map of Sitananda College showing building carbon hotspots, biocompost projects, and energy distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sitananda College Campus Map Graphic Container */}
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 mb-2">
            <span className="font-bold text-lime-400 uppercase tracking-wider">Sitananda College Blueprint</span>
            <div className="flex items-center gap-3 text-[10px] bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> High Load</span>
            </div>
          </div>

          {/* Sitananda College SVG Blueprint Map Image */}
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-slate-800 bg-white p-2 flex items-center justify-center">
            
            {/* Vector Blueprint Representation of Sitananda College Map */}
            <svg className="w-full h-full text-slate-800" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              {/* Background Campus Road & Boundaries */}
              <rect x="0" y="0" width="800" height="600" fill="#F8FAF6" />

              {/* Title Header */}
              <text x="400" y="35" textAnchor="middle" fill="#0284C7" fontWeight="bold" fontSize="22" fontFamily="sans-serif">
                CAMPUS MAP OF SITANANDA COLLEGE
              </text>

              {/* Playground */}
              <rect x="300" y="80" width="180" height="100" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
              <text x="390" y="135" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="14">College Playground</text>

              {/* Rainwater Harvesting Reservoir (Blue Pond) */}
              <rect x="360" y="270" width="90" height="200" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              <text x="405" y="370" textAnchor="middle" fill="#0369A1" fontWeight="bold" fontSize="13" transform="rotate(-90 405 370)">
                Rainwater harvesting Reservoir
              </text>

              {/* Academic & Admin Buildings (Pink) */}
              <path d="M 220,260 L 320,260 L 320,380 L 260,380 L 260,450 L 340,450 L 340,480 L 220,480 Z" fill="#F472B6" stroke="#C026D3" strokeWidth="2" />
              <text x="270" y="320" textAnchor="middle" fill="#831843" fontWeight="bold" fontSize="12">Academic & Admin Block</text>

              {/* Girls' Hostel (Orange) */}
              <rect x="310" y="200" width="70" height="35" fill="#FB923C" stroke="#EA580C" strokeWidth="2" />
              <text x="345" y="222" textAnchor="middle" fill="#7C2D12" fontWeight="bold" fontSize="11">Girls' Hostel</text>

              {/* Canteen (Red) */}
              <rect x="360" y="340" width="20" height="25" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />

              {/* Garden (Green) */}
              <rect x="380" y="220" width="30" height="25" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />

              {/* Nandigram-Chandipur Road (Red Strip) */}
              <polygon points="460,70 480,70 510,550 490,550" fill="#F87171" stroke="#B91C1C" strokeWidth="2" />
              <text x="485" y="310" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12" transform="rotate(84 485 310)">
                Nandigram-Chandipur Road
              </text>

              {/* Nandigram Bus Stand */}
              <text x="465" y="360" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="13" transform="rotate(84 465 360)">
                Nandigram Bus Stand
              </text>

              {/* Vermicompost & Biocompost (Brown / Grey) */}
              <rect x="320" y="520" width="40" height="25" fill="#A16207" stroke="#78350F" strokeWidth="1.5" />
              <text x="340" y="537" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="9">Biocompost</text>

              {/* Legend Box */}
              <rect x="540" y="80" width="230" height="320" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="8" />
              <text x="655" y="105" textAnchor="middle" fill="#78350F" fontWeight="bold" fontSize="15">LEGEND</text>
              <rect x="550" y="120" width="15" height="10" fill="#F472B6" />
              <text x="575" y="129" fill="#334155" fontSize="10" fontWeight="bold">Academic & Admin Building</text>
              <rect x="550" y="140" width="15" height="10" fill="#FB923C" />
              <text x="575" y="149" fill="#334155" fontSize="10">Girls' Hostel</text>
              <rect x="550" y="160" width="15" height="10" fill="#EF4444" />
              <text x="575" y="169" fill="#334155" fontSize="10">College Canteen</text>
              <rect x="550" y="180" width="15" height="10" fill="#38BDF8" />
              <text x="575" y="189" fill="#334155" fontSize="10">Rainwater Reservoir</text>
              <rect x="550" y="200" width="15" height="10" fill="#A16207" />
              <text x="575" y="209" fill="#334155" fontSize="10">Biocompost Project</text>
            </svg>

            {/* Clickable Hotspot Pins Overlay */}
            {SITANANDA_CAMPUS_BUILDINGS.map((bldg) => {
              const isSelected = selectedBuilding?.id === bldg.id;
              const colorBg =
                bldg.status === 'HIGH'
                  ? 'bg-rose-600 text-white shadow-rose-500/50'
                  : bldg.status === 'MODERATE'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/50'
                  : 'bg-emerald-600 text-white shadow-emerald-500/50';

              return (
                <button
                  key={bldg.id}
                  onClick={() => setSelectedBuilding(bldg)}
                  style={{ top: `${bldg.latOffsetPct}%`, left: `${bldg.lngOffsetPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg border border-white ${colorBg} ${
                    isSelected ? 'scale-110 ring-4 ring-slate-950 z-30 font-bold' : 'hover:scale-105 opacity-90 z-20'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span className="text-[10px] font-bold whitespace-nowrap">{bldg.code}</span>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 mt-2">
            Click any hotspot pin on the Sitananda College blueprint map to view building carbon metrics.
          </div>
        </div>

        {/* Selected Building Detail Panel */}
        {selectedBuilding && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sitananda Building Profile</span>
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

              <h2 className="font-['Syne'] text-lg font-bold text-slate-900 mt-3">{selectedBuilding.name}</h2>
              <p className="text-xs text-slate-500">{selectedBuilding.departmentName}</p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mt-4 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-600">Monthly Footprint</span>
                  <span className="font-['Syne'] text-xl font-extrabold text-emerald-700 tabular-nums">
                    {(selectedBuilding.co2eKgMonth / 1000).toFixed(2)} t CO2e
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" /> Electricity</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.electricityKg} kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-indigo-500" /> Computing</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.computingKg} kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-rose-500" /> Cooling Load</span>
                    <span className="font-bold text-slate-900 tabular-nums">{selectedBuilding.acKg} kg</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Satellite & Utility Verified
              </span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Footprint cross-audited against Sentinel-2 vegetation canopy absorption and utility electricity logs.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
