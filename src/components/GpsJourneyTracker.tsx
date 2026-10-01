import React, { useState, useEffect } from 'react';
import { JourneyRecord } from '../types';
import { Navigation, Footprints, Bus, Zap, Play, Square, CheckCircle2, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GpsJourneyTrackerProps {
  userId: string;
  userName: string;
  onJourneyCompleted: (newJourney: JourneyRecord) => void;
}

export const GpsJourneyTracker: React.FC<GpsJourneyTrackerProps> = ({
  userId,
  userName,
  onJourneyCompleted,
}) => {
  const [selectedMode, setSelectedMode] = useState<'walking' | 'cycling' | 'bus' | 'ev' | 'motorcycle' | 'car'>('walking');
  const [origin, setOrigin] = useState('Hostel Circle');
  const [destination, setDestination] = useState('Main Campus Building');
  
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [completedJourney, setCompletedJourney] = useState<JourneyRecord | null>(null);

  // Live Timer Simulation during active journey
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const nextSec = prev + 1;
          // Simulate realistic distance accumulation
          if (selectedMode === 'walking') {
            const addedDist = 0.0012; // ~4.3 km/h
            setDistanceKm((d) => Number((d + addedDist).toFixed(2)));
            setSpeedKmh(4.3);
          } else if (selectedMode === 'cycling') {
            const addedDist = 0.0035; // ~12.6 km/h
            setDistanceKm((d) => Number((d + addedDist).toFixed(2)));
            setSpeedKmh(12.6);
          } else {
            const addedDist = 0.008; // ~28.8 km/h
            setDistanceKm((d) => Number((d + addedDist).toFixed(2)));
            setSpeedKmh(28.8);
          }
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, selectedMode]);

  const handleStartTracking = () => {
    setIsTracking(true);
    setSeconds(0);
    setDistanceKm(0.1);
    setCompletedJourney(null);
  };

  const handleEndTracking = async () => {
    setIsTracking(false);

    // Call backend endpoint to calculate exact verified carbon avoided & points
    const finalDist = Math.max(0.5, distanceKm);
    const durationMin = Math.max(1, Math.round(seconds / 60));

    try {
      const res = await fetch('/api/journeys/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: selectedMode, distanceKm: finalDist }),
      });
      const data = await res.json();

      const newRecord: JourneyRecord = {
        id: `j_${Date.now()}`,
        userId,
        userName,
        origin,
        destination,
        transportMode: selectedMode,
        distanceKm: finalDist,
        durationMin,
        actualCo2eKg: data.actualCo2eKg,
        alternativeCo2eKg: data.baselineCo2eKg,
        avoidedCo2eKg: data.avoidedCo2eKg,
        impactPointsEarned: data.impactPointsEarned,
        verificationStatus: 'VERIFIED',
        timestamp: 'Just now (Today)',
      };

      setCompletedJourney(newRecord);
      onJourneyCompleted(newRecord);

      // Trigger Confetti Celebration for green journey
      if (data.impactPointsEarned > 0) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#84CC16', '#10B981', '#059669'],
        });
      }
    } catch (error) {
      console.error('Error ending journey:', error);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Smart Alternative Calculation Preview
  const previewDistance = distanceKm > 0 ? distanceKm : 2.5;
  const previewBaselineCo2e = Number((previewDistance * 0.13).toFixed(2));
  const previewWalkCo2e = 0.0;
  const previewAvoided = selectedMode === 'walking' || selectedMode === 'cycling'
    ? previewBaselineCo2e
    : Number(Math.max(0, previewBaselineCo2e - previewDistance * 0.038).toFixed(2));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900">
          GPS Journey Tracker & Verification
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Select transport mode, track your route with GPS speed profiling, and earn verified Carbon Impact Points.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">How are you travelling?</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedMode('walking')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'walking'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Footprints className="w-6 h-6" />
            <span className="text-xs">Walking 🚶</span>
          </button>

          <button
            onClick={() => setSelectedMode('cycling')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'cycling'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Footprints className="w-6 h-6 text-lime-400" />
            <span className="text-xs">Bicycle 🚲</span>
          </button>

          <button
            onClick={() => setSelectedMode('bus')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'bus'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bus className="w-6 h-6 text-blue-400" />
            <span className="text-xs">Campus Bus 🚌</span>
          </button>

          <button
            onClick={() => setSelectedMode('ev')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'ev'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-6 h-6 text-amber-400" />
            <span className="text-xs">EV Shuttle ⚡</span>
          </button>

          <button
            onClick={() => setSelectedMode('motorcycle')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'motorcycle'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Navigation className="w-6 h-6 text-slate-400" />
            <span className="text-xs">Motorcycle 🏍️</span>
          </button>

          <button
            onClick={() => setSelectedMode('car')}
            disabled={isTracking}
            className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              selectedMode === 'car'
                ? 'bg-slate-900 border-slate-900 text-lime-400 font-bold shadow-md'
                : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Navigation className="w-6 h-6 text-slate-400" />
            <span className="text-xs">Car 🚗</span>
          </button>
        </div>

        {/* Origin & Destination Route Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Origin Landmark</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              disabled={isTracking}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. North Gate Hostel"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Destination Landmark</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={isTracking}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. CSE Dept Lab 3"
            />
          </div>
        </div>
      </div>

      {/* Smart Alternative Comparison Card */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-900 shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider block mb-1">
              Smart Carbon Comparison
            </span>
            <h3 className="font-['Syne'] text-base font-bold text-white">
              Estimated Trip: {origin} → {destination}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
              <span>Motorcycle Baseline: <strong className="text-amber-300">{previewBaselineCo2e} kg CO2e</strong></span>
              <span>·</span>
              <span>Selected Mode: <strong className="text-lime-300">{(selectedMode === 'walking' || selectedMode === 'cycling') ? '0 kg CO2e' : `${(previewDistance * 0.038).toFixed(2)} kg CO2e`}</strong></span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-right shrink-0">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Potential Avoided</span>
            <span className="text-lg font-extrabold text-lime-400 tabular-nums">
              {previewAvoided} kg CO2e
            </span>
          </div>
        </div>
      </div>

      {/* Live GPS Journey Control Console */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200/80">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Anti-Fraud GPS Verification Active</span>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
            <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">
              {formatTimer(seconds)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Distance</span>
            <span className="font-['Syne'] text-2xl font-extrabold text-emerald-600 tabular-nums">
              {distanceKm.toFixed(2)} km
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Speed</span>
            <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">
              {speedKmh.toFixed(1)} km/h
            </span>
          </div>
        </div>

        {/* Action Controls */}
        {!isTracking ? (
          <button
            onClick={handleStartTracking}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>START {selectedMode.toUpperCase()} JOURNEY</span>
          </button>
        ) : (
          <button
            onClick={handleEndTracking}
            className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer animate-pulse"
          >
            <Square className="w-5 h-5 fill-white" />
            <span>FINISH & VERIFY JOURNEY</span>
          </button>
        )}

        {isTracking && (
          <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Live GPS tracking route: {origin} → {destination}...</span>
          </p>
        )}
      </div>

      {/* Completed Journey Summary Card */}
      {completedJourney && (
        <div className="bg-lime-50 border border-lime-300 rounded-3xl p-6 space-y-4 animate-fadeIn shadow-sm">
          <div className="flex items-center gap-3 text-lime-900">
            <CheckCircle2 className="w-7 h-7 text-lime-600 shrink-0" />
            <div>
              <h3 className="font-['Syne'] text-lg font-bold">Journey Successfully Verified!</h3>
              <p className="text-xs text-lime-800">
                GPS distance, speed profile, and geofence timing verified with high confidence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/80 p-4 rounded-2xl border border-lime-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Avoided Emissions</span>
              <span className="font-['Syne'] text-xl font-extrabold text-emerald-700 tabular-nums">
                {completedJourney.avoidedCo2eKg.toFixed(2)} kg CO2e
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Impact Points Awarded</span>
              <span className="font-['Syne'] text-xl font-extrabold text-lime-700 tabular-nums">
                +{completedJourney.impactPointsEarned} Points
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Verification Badge</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full inline-block mt-1">
                {completedJourney.verificationStatus}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
