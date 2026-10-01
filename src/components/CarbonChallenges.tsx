import React from 'react';
import { ChallengeItem } from '../types';
import { Trophy, CheckCircle2, Flame, Award, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CarbonChallengesProps {
  challenges: ChallengeItem[];
  onClaimReward: (challengeId: string, points: number) => void;
}

export const CarbonChallenges: React.FC<CarbonChallengesProps> = ({
  challenges,
  onClaimReward,
}) => {
  const handleClaim = (challenge: ChallengeItem) => {
    onClaimReward(challenge.id, challenge.rewardPoints);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#84CC16', '#10B981', '#F59E0B'],
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-500" />
            <span>Campus Carbon Challenges</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Complete weekly carbon-reduction goals to earn verified Impact Points and unlock canteen coupons.
          </p>
        </div>
      </div>

      {/* Challenges List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {challenges.map((item) => {
          const progressPercent = Math.min(100, Math.round((item.currentProgress / item.targetQuantity) * 100));
          const canClaim = progressPercent >= 100 && !item.completed;

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                item.completed
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    +{item.rewardPoints} Points
                  </span>
                </div>

                <h3 className="font-['Syne'] text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">
                    Progress: {item.currentProgress} / {item.targetQuantity} {item.unit}
                  </span>
                  <span className="text-emerald-600">-{item.co2eSavingKg} kg CO2e potential</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-lime-400 to-emerald-600'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Expires in {item.expiresInDays} days
                  </span>

                  {item.completed ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Reward Claimed
                    </span>
                  ) : canClaim ? (
                    <button
                      onClick={() => handleClaim(item)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer animate-bounce"
                    >
                      <Award className="w-4 h-4 text-slate-950" />
                      <span>CLAIM +{item.rewardPoints} PTS</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {progressPercent}% Complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
