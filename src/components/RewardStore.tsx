import React, { useState } from 'react';
import { RewardItem, UserRewardRecord } from '../types';
import { Gift, Coffee, Printer, Utensils, Award, Sparkles, Check, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardStoreProps {
  userPoints: number;
  rewards: RewardItem[];
  userRewards: UserRewardRecord[];
  onRedeemReward: (reward: RewardItem) => void;
}

export const RewardStore: React.FC<RewardStoreProps> = ({
  userPoints,
  rewards,
  userRewards,
  onRedeemReward,
}) => {
  const [selectedCoupon, setSelectedCoupon] = useState<UserRewardRecord | null>(null);

  const handleRedeem = (item: RewardItem) => {
    if (userPoints < item.pointsRequired) return;

    onRedeemReward(item);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84CC16', '#10B981', '#3B82F6'],
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
            <Gift className="w-4 h-4 text-lime-400" />
            <span>Campus Impact Reward Store</span>
          </div>
          <h1 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white">
            Redeem Your Carbon Impact Points
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-md leading-relaxed">
            Exchange your verified avoided CO2e points for campus canteen coupons, printing discounts, and official sustainability certificates.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-right shrink-0">
          <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-semibold">Available Points Balance</span>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles className="w-5 h-5 text-lime-400 fill-lime-300" />
            <span className="font-['Syne'] text-2xl font-extrabold text-lime-400 tabular-nums">
              {userPoints.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div>
        <h2 className="font-['Syne'] text-xl font-bold text-slate-900 mb-4">Available Campus Rewards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rewards.map((item) => {
            const canAfford = userPoints >= item.pointsRequired;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-100">
                    {item.icon === 'Coffee' && <Coffee className="w-6 h-6 text-emerald-700" />}
                    {item.icon === 'Printer' && <Printer className="w-6 h-6 text-blue-600" />}
                    {item.icon === 'Utensils' && <Utensils className="w-6 h-6 text-amber-600" />}
                    {item.icon === 'Award' && <Award className="w-6 h-6 text-purple-600" />}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {item.merchant}
                  </span>
                  <h3 className="font-['Syne'] text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Cost:</span>
                    <span className="text-emerald-600 tabular-nums">{item.pointsRequired} Points</span>
                  </div>

                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'REDEEM NOW' : `Need ${item.pointsRequired - userPoints} More Pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redeemed Active Coupons */}
      {userRewards.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-['Syne'] text-xl font-bold text-slate-900">My Redeemed Coupons</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userRewards.map((urew) => (
              <div
                key={urew.id}
                className="bg-lime-50/70 border border-lime-200 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{urew.title}</span>
                    <span className="text-[10px] bg-lime-200 text-lime-900 px-2 py-0.5 rounded-full font-bold">
                      {urew.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-emerald-800 tracking-wider">
                    {urew.couponCode}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Redeemed: {urew.redeemedAt}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCoupon(urew)}
                  className="p-2.5 rounded-xl bg-white border border-lime-300 text-emerald-800 hover:bg-lime-100 transition-colors shrink-0 cursor-pointer"
                  title="Show QR Code"
                >
                  <QrCode className="w-5 h-5 text-emerald-700" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal for Merchant Scanning */}
      {selectedCoupon && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-scaleIn">
            <h3 className="font-['Syne'] text-lg font-bold text-slate-900">{selectedCoupon.title}</h3>
            <p className="text-xs text-slate-500">Show this QR code at {selectedCoupon.merchant} to redeem.</p>

            <div className="w-48 h-48 mx-auto bg-slate-900 p-3 rounded-2xl flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-xl p-3 flex flex-col items-center justify-center border-4 border-slate-900">
                <QrCode className="w-28 h-28 text-slate-900" />
                <span className="text-[10px] font-mono font-bold text-slate-800 mt-1">{selectedCoupon.couponCode}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCoupon(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              Close QR Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
