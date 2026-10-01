import React from 'react';
import { UserProfile, JourneyRecord, RecommendationItem } from '../types';
import { Navigation, ArrowDownRight, Award, Zap, Bus, Footprints, ChevronRight, Sparkles, PlusCircle } from 'lucide-react';

interface StudentDashboardProps {
  user: UserProfile;
  journeys: JourneyRecord[];
  recommendations: RecommendationItem[];
  onStartJourney: () => void;
  onGoToRewards: () => void;
  onGoToChallenges: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  journeys,
  recommendations,
  onStartJourney,
  onGoToRewards,
  onGoToChallenges,
}) => {
  const totalAvoidedToday = journeys
    .filter((j) => j.timestamp.includes('Today') || j.timestamp.includes('2026-09-30'))
    .reduce((acc, curr) => acc + curr.avoidedCo2eKg, 0);

  const levelProgressPercent = Math.min(100, Math.round(((user.impactPoints % 1000) / 1000) * 100));

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>Student Sustainability Portal · {user.institutionName}</span>
            </div>
            <h1 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-300 text-sm max-w-xl mt-1.5 leading-relaxed">
              You’ve avoided <strong className="text-lime-300 font-semibold">{user.co2eAvoidedKg.toFixed(1)} kg CO2e</strong> so far this month. You're 80 points away from unlocking your next canteen discount!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onStartJourney}
              className="bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold px-5 py-3 rounded-2xl transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02]"
            >
              <Navigation className="w-4 h-4 fill-slate-950" />
              <span>+ Track Journey</span>
            </button>
            <button
              onClick={onGoToChallenges}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-2xl transition-all border border-white/10 text-sm cursor-pointer"
            >
              <span>View Challenges</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Impact Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Today's Carbon Footprint */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>TODAY'S FOOTPRINT</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> 18% vs avg
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-['Syne'] text-3xl font-extrabold text-slate-900 tabular-nums">2.8</span>
            <span className="text-sm font-medium text-slate-500">kg CO2e</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-slate-800 h-full rounded-full" style={{ width: '42%' }} />
          </div>
          <p className="text-xs text-slate-500 mt-2.5">
            Daily limit target: 6.0 kg CO2e
          </p>
        </div>

        {/* Card 2: Carbon Avoided Today */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>CARBON SAVED TODAY</span>
            <span className="text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full text-[11px] font-bold">
              +90 Points Earned
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-['Syne'] text-3xl font-extrabold text-emerald-600 tabular-nums">
              {totalAvoidedToday > 0 ? totalAvoidedToday.toFixed(2) : '0.90'}
            </span>
            <span className="text-sm font-medium text-slate-500">kg CO2e</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">
            <Footprints className="w-4 h-4 text-emerald-600" />
            <span>2 verified walking journeys logged</span>
          </div>
        </div>

        {/* Card 3: Level & Badge Progression */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>CURRENT TIER</span>
            <button
              onClick={onGoToRewards}
              className="text-emerald-700 hover:underline text-xs font-semibold flex items-center gap-1"
            >
              <span>Store</span> <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-amber-800 font-bold shadow-xs">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-['Syne'] text-lg font-bold text-slate-900">{user.levelName}</h3>
              <p className="text-xs text-slate-500">Level {user.level} · {user.impactPoints} Impact Points</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium text-slate-500">
              <span>Level Progress</span>
              <span className="tabular-nums">{levelProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-lime-400 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Layout: Journeys + Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Verified Journeys */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-['Syne'] text-lg font-bold text-slate-900">Recent Verified Journeys</h2>
                <p className="text-xs text-slate-500">GPS verified travel data and avoided CO2e calculation</p>
              </div>
              <button
                onClick={onStartJourney}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Track Journey</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {journeys.map((j) => (
                <div key={j.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                      {j.transportMode === 'walking' && <Footprints className="w-5 h-5" />}
                      {j.transportMode === 'cycling' && <Footprints className="w-5 h-5 text-lime-700" />}
                      {j.transportMode === 'bus' && <Bus className="w-5 h-5 text-blue-600" />}
                      {j.transportMode === 'ev' && <Zap className="w-5 h-5 text-amber-600" />}
                      {j.transportMode === 'motorcycle' && <Navigation className="w-5 h-5 text-slate-700" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 capitalize">{j.transportMode} Journey</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          {j.verificationStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {j.origin} → {j.destination} ({j.distanceKm} km · {j.durationMin} min)
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-xs font-extrabold text-emerald-600 tabular-nums">
                      -{j.avoidedCo2eKg.toFixed(2)} kg CO2e
                    </span>
                    <span className="text-[11px] font-bold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      +{j.impactPointsEarned} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footprint Category Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h2 className="font-['Syne'] text-lg font-bold text-slate-900 mb-1">Weekly Footprint Breakdown</h2>
            <p className="text-xs text-slate-500 mb-5">Estimated emissions across student activity categories</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">Transport & Commute (55%)</span>
                  <span className="text-slate-900 tabular-nums">11.2 kg CO2e</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">Food & Canteen (22%)</span>
                  <span className="text-slate-900 tabular-nums">4.5 kg CO2e</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-lime-500 h-full rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">Hostel Energy (13%)</span>
                  <span className="text-slate-900 tabular-nums">2.6 kg CO2e</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '13%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">Lab Computing (10%)</span>
                  <span className="text-slate-900 tabular-nums">2.0 kg CO2e</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant Recommendations */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-emerald-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-emerald-800">
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>AI Carbon Coach</span>
            </div>

            <h3 className="font-['Syne'] text-lg font-bold text-white mb-2">Smart Action Advice</h3>
            
            {recommendations.slice(0, 2).map((rec) => (
              <div key={rec.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-3 border border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-lime-300">{rec.title}</span>
                  <span className="text-[10px] bg-lime-400/20 text-lime-300 px-2 py-0.5 rounded-full font-semibold">
                    -{rec.potentialSavingKg} kg CO2e
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            ))}

            <button
              onClick={onStartJourney}
              className="w-full mt-2 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Take Recommended Action</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Reward Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center mx-auto border border-lime-200">
              <Award className="w-6 h-6 text-lime-700" />
            </div>
            <div>
              <h3 className="font-['Syne'] text-base font-bold text-slate-900">Campus Reward Store</h3>
              <p className="text-xs text-slate-500 mt-1">
                You have <strong className="text-slate-900">{user.impactPoints} points</strong> available to redeem for canteen coupons & library passes.
              </p>
            </div>
            <button
              onClick={onGoToRewards}
              className="w-full bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              Open Reward Store
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
