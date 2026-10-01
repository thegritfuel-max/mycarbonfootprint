import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Trophy, Award, Filter, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

interface IndividualLeaderboardProps {
  currentUser: UserProfile;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  avoidedCo2eKg: number;
  impactPoints: number;
  isCurrentUser?: boolean;
}

export const IndividualLeaderboard: React.FC<IndividualLeaderboardProps> = ({ currentUser }) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'semester'>('month');

  // Sample verified leaderboard data
  const sampleLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Aarav Patel', department: 'Computer Science', avoidedCo2eKg: 54.2, impactPoints: 3820 },
    { rank: 2, name: 'Ananya Deshmukh', department: 'Civil Engineering', avoidedCo2eKg: 48.6, impactPoints: 3410 },
    { rank: 3, name: 'Chaitanya Sharma', department: 'Computer Science', avoidedCo2eKg: currentUser.co2eAvoidedKg, impactPoints: currentUser.impactPoints, isCurrentUser: true },
    { rank: 4, name: 'Priya Verma', department: 'Civil Engineering', avoidedCo2eKg: 34.1, impactPoints: 2390 },
    { rank: 5, name: 'Rohan Kulkarni', department: 'Mechanical Eng', avoidedCo2eKg: 31.8, impactPoints: 2210 },
    { rank: 6, name: 'Sneha Joshi', department: 'E&TC Engineering', avoidedCo2eKg: 28.5, impactPoints: 1980 },
    { rank: 7, name: 'Vikram Singh', department: 'Electrical Eng', avoidedCo2eKg: 26.0, impactPoints: 1820 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-500" />
            <span>Verified Carbon Savers Leaderboard</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Student rankings based strictly on verified low-carbon journey reductions.
          </p>
        </div>

        {/* Period Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              period === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              period === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod('semester')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              period === 'semester' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semester
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Podium 2: Silver */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center order-2 sm:order-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center mx-auto mb-2 text-sm">
              🥈 2nd
            </div>
            <h3 className="font-['Syne'] text-base font-bold text-slate-900">{sampleLeaderboard[1].name}</h3>
            <span className="text-[11px] text-slate-500 block">{sampleLeaderboard[1].department}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-base font-extrabold text-emerald-600 tabular-nums block">
              {sampleLeaderboard[1].avoidedCo2eKg} kg avoided
            </span>
            <span className="text-[11px] text-lime-700 font-bold bg-lime-50 px-2 py-0.5 rounded-md inline-block mt-1">
              +{sampleLeaderboard[1].impactPoints} pts
            </span>
          </div>
        </div>

        {/* Podium 1: Gold */}
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-300 shadow-md text-center order-1 sm:order-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            TOP SAVER
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 font-extrabold flex items-center justify-center mx-auto mb-2 text-lg shadow-xs">
              🥇 1st
            </div>
            <h3 className="font-['Syne'] text-lg font-extrabold text-slate-900">{sampleLeaderboard[0].name}</h3>
            <span className="text-xs text-slate-500 block">{sampleLeaderboard[0].department}</span>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/60">
            <span className="text-xl font-extrabold text-emerald-600 tabular-nums block">
              {sampleLeaderboard[0].avoidedCo2eKg} kg avoided
            </span>
            <span className="text-xs text-lime-800 font-bold bg-lime-100 px-3 py-1 rounded-full inline-block mt-1">
              +{sampleLeaderboard[0].impactPoints} Points
            </span>
          </div>
        </div>

        {/* Podium 3: Bronze */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center order-3 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100/60 text-amber-800 font-extrabold flex items-center justify-center mx-auto mb-2 text-sm">
              🥉 3rd
            </div>
            <h3 className="font-['Syne'] text-base font-bold text-slate-900">{sampleLeaderboard[2].name}</h3>
            <span className="text-[11px] text-slate-500 block">{sampleLeaderboard[2].department}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-base font-extrabold text-emerald-600 tabular-nums block">
              {sampleLeaderboard[2].avoidedCo2eKg} kg avoided
            </span>
            <span className="text-[11px] text-lime-700 font-bold bg-lime-50 px-2 py-0.5 rounded-md inline-block mt-1">
              +{sampleLeaderboard[2].impactPoints} pts
            </span>
          </div>
        </div>
      </div>

      {/* Full Rankings Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Syne'] text-lg font-bold text-slate-900">Rankings List</h2>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> GPS Verified Data Only
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {sampleLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`py-3.5 px-3 rounded-2xl flex items-center justify-between transition-colors ${
                entry.isCurrentUser ? 'bg-lime-50/80 border border-lime-200/80 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-xs font-extrabold text-slate-400 text-center tabular-nums">
                  #{entry.rank}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{entry.name}</span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] bg-lime-300 text-slate-950 font-extrabold px-2 py-0.5 rounded-md">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 block">{entry.department}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-600 tabular-nums block">
                  {entry.avoidedCo2eKg.toFixed(1)} kg CO2e
                </span>
                <span className="text-[11px] text-slate-400 font-medium tabular-nums">
                  {entry.impactPoints} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
