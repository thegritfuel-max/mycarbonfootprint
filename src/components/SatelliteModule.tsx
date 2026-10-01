import React, { useState, useEffect } from 'react';
import { Globe, Leaf, Wind, ShieldCheck, Activity, LineChart } from 'lucide-react';

export const SatelliteModule: React.FC = () => {
  const [geoData, setGeoData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/satellite')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Satellite API Error:', err));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <Globe className="w-8 h-8 text-emerald-600" />
          <span>Copernicus Satellite & Geo-Environment Module</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Contextual environmental monitoring using Copernicus Sentinel-2 vegetation health and Sentinel-5P air quality telemetry.
        </p>
      </div>

      {geoData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sentinel-2 Vegetation Health Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" /> Sentinel-2 MSI Vegetation Index
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                {geoData.sentinel2.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-['Syne'] text-3xl font-extrabold text-slate-900 tabular-nums">
                  {geoData.sentinel2.ndviScore}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-1">NDVI Score (0 - 1.0)</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-600 tabular-nums">
                  {geoData.sentinel2.canopyCoverPercent}% Canopy
                </span>
                <span className="text-[10px] text-slate-400 block">Campus Tree Cover</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-lime-400 to-emerald-600 h-full rounded-full"
                style={{ width: `${geoData.sentinel2.ndviScore * 100}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              High vegetation density detected over campus green corridors and Botanical Garden zone. Last satellite pass: {geoData.sentinel2.lastObservation}.
            </p>
          </div>

          {/* Sentinel-5P Air Quality Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-blue-600" /> Sentinel-5P TROPOMI Air Quality
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full">
                {geoData.sentinel5p.airQualityStatus}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">NO2 Column Density</span>
              <span className="font-['Syne'] text-xl font-extrabold text-slate-900 tabular-nums">
                {geoData.sentinel5p.no2ColumnDensity}
              </span>
            </div>

            <div className="bg-blue-50/80 border border-blue-200/80 p-3.5 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-blue-900 block">Regional Trend</span>
              <p className="text-blue-800">
                {geoData.sentinel5p.trend}. Low nitrogen dioxide indicates efficient vehicle management on campus grounds.
              </p>
            </div>
          </div>

          {/* Historical 6-Month NDVI Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Syne'] text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" /> Historical Campus NDVI Vegetation Index
              </h3>
              <span className="text-xs text-slate-400 font-medium">Monthly Sentinel Observation</span>
            </div>

            <div className="grid grid-cols-6 gap-2 pt-4 items-end h-40 border-b border-slate-100 pb-2">
              {geoData.historicalNdvi.map((item: any) => (
                <div key={item.month} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-emerald-700 tabular-nums">{item.ndvi}</span>
                  <div
                    className="w-full bg-gradient-to-t from-lime-400 to-emerald-600 rounded-t-xl transition-all duration-500"
                    style={{ height: `${item.ndvi * 100}%` }}
                  />
                  <span className="text-xs font-bold text-slate-600">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
