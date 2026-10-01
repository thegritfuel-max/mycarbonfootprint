import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { StudentDashboard } from './components/StudentDashboard';
import { GpsJourneyTracker } from './components/GpsJourneyTracker';
import { CarbonChallenges } from './components/CarbonChallenges';
import { RewardStore } from './components/RewardStore';
import { IndividualLeaderboard } from './components/IndividualLeaderboard';
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { UtilityBillOcrModal } from './components/UtilityBillOcrModal';
import { CampusMapModule } from './components/CampusMapModule';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { SatelliteModule } from './components/SatelliteModule';
import { SuperAdminPanel } from './components/SuperAdminPanel';

import {
  UserProfile,
  UserRole,
  DepartmentData,
  JourneyRecord,
  ChallengeItem,
  RewardItem,
  UserRewardRecord,
  UtilityBillRecord,
  RecommendationItem,
} from './types';

import {
  INITIAL_USER_STUDENT,
  INITIAL_USER_ADMIN,
  INITIAL_DEPARTMENTS,
  INITIAL_JOURNEYS,
  INITIAL_CHALLENGES,
  INITIAL_REWARDS,
  INITIAL_USER_REWARDS,
  INITIAL_UTILITY_BILLS,
  INITIAL_RECOMMENDATIONS,
} from './mockData';

import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER_STUDENT);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasEnteredPortal, setHasEnteredPortal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [departments, setDepartments] = useState<DepartmentData[]>(INITIAL_DEPARTMENTS);
  const [journeys, setJourneys] = useState<JourneyRecord[]>(INITIAL_JOURNEYS);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(INITIAL_CHALLENGES);
  const [userRewards, setUserRewards] = useState<UserRewardRecord[]>(INITIAL_USER_REWARDS);
  const [utilityBills, setUtilityBills] = useState<UtilityBillRecord[]>(INITIAL_UTILITY_BILLS);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);

  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsLoggedIn(true);
        setHasEnteredPortal(true);
        const userDocRef = doc(db, 'users', fbUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setCurrentUser(userSnap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || 'student@university.edu',
              name: fbUser.displayName || 'Campus User',
              role: 'student',
              institutionId: 'inst_coep_01',
              institutionName: 'COEP Technological University',
              departmentId: 'dept_cse_01',
              departmentName: 'Computer Science & Engineering',
              studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
              impactPoints: 500,
              co2eAvoidedKg: 5.2,
              level: 1,
              levelName: 'Carbon Starter',
              createdAt: new Date().toISOString().split('T')[0],
            };
            await setDoc(userDocRef, newProfile);
            setCurrentUser(newProfile);
          }
        } catch (err) {
          console.warn('Firestore user fetch error (using active session):', err);
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setHasEnteredPortal(true);
    } catch (err) {
      console.error('Google Sign-In Error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(INITIAL_USER_STUDENT);
      setHasEnteredPortal(false);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  // Direct portal choice from Login landing screen
  const handleSelectPortalRole = (role: 'student' | 'institution_admin') => {
    if (role === 'institution_admin') {
      setCurrentUser(INITIAL_USER_ADMIN);
      setActiveTab('campus');
    } else {
      setCurrentUser(INITIAL_USER_STUDENT);
      setActiveTab('dashboard');
    }
    setHasEnteredPortal(true);
  };

  // Switch role view (Student <-> Institution Admin <-> Super Admin)
  const handleSwitchRole = (role: UserRole) => {
    if (role === 'institution_admin') {
      setCurrentUser((prev) => ({
        ...INITIAL_USER_ADMIN,
        uid: prev.uid,
        email: prev.email,
        name: prev.name.includes('Dr.') ? prev.name : `Admin (${prev.name})`,
      }));
      setActiveTab('campus');
    } else if (role === 'super_admin') {
      setCurrentUser((prev) => ({
        ...prev,
        role: 'super_admin',
      }));
      setActiveTab('superadmin');
    } else {
      setCurrentUser((prev) => ({
        ...INITIAL_USER_STUDENT,
        uid: prev.uid,
        email: prev.email,
        name: prev.name.replace('Admin (', '').replace(')', ''),
      }));
      setActiveTab('dashboard');
    }
    setHasEnteredPortal(true);
  };

  // Callback when student completes a verified journey
  const handleJourneyCompleted = async (newJourney: JourneyRecord) => {
    setJourneys((prev) => [newJourney, ...prev]);

    // Update user impact points & avoided CO2e
    const updatedUser = {
      ...currentUser,
      impactPoints: currentUser.impactPoints + newJourney.impactPointsEarned,
      co2eAvoidedKg: Number((currentUser.co2eAvoidedKg + newJourney.avoidedCo2eKg).toFixed(2)),
    };
    setCurrentUser(updatedUser);

    // Persist journey to Firestore
    try {
      if (auth.currentUser) {
        await setDoc(doc(db, 'journeys', newJourney.id), newJourney);
        await setDoc(doc(db, 'users', updatedUser.uid), updatedUser);
      }
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    // Check challenge progress updates
    setChallenges((prev) =>
      prev.map((chal) => {
        if (chal.category === 'transport' && !chal.completed) {
          const nextProg = Number((chal.currentProgress + newJourney.distanceKm).toFixed(1));
          return {
            ...chal,
            currentProgress: nextProg,
            completed: nextProg >= chal.targetQuantity,
          };
        }
        return chal;
      })
    );
  };

  // Callback when user claims challenge points
  const handleClaimChallengeReward = (challengeId: string, rewardPoints: number) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, completed: true } : c))
    );

    setCurrentUser((prev) => ({
      ...prev,
      impactPoints: prev.impactPoints + rewardPoints,
    }));
  };

  // Callback when user redeems coupon
  const handleRedeemReward = (reward: RewardItem) => {
    const code = `${reward.couponCodePrefix}${Math.floor(1000 + Math.random() * 9000)}-ECO`;
    const newRecord: UserRewardRecord = {
      id: `urew_${Date.now()}`,
      userId: currentUser.uid,
      rewardId: reward.id,
      title: reward.title,
      merchant: reward.merchant,
      couponCode: code,
      pointsSpent: reward.pointsRequired,
      status: 'AVAILABLE',
      redeemedAt: new Date().toLocaleString(),
    };

    setUserRewards((prev) => [newRecord, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      impactPoints: Math.max(0, prev.impactPoints - reward.pointsRequired),
    }));
  };

  // Callback when utility bill OCR is approved
  const handleBillApproved = (bill: UtilityBillRecord) => {
    setUtilityBills((prev) => [bill, ...prev]);

    // Update target department current CO2e
    setDepartments((prev) =>
      prev.map((d) =>
        d.name === bill.departmentName
          ? { ...d, currentCo2eKg: d.currentCo2eKg + bill.co2eKg }
          : d
      )
    );
  };

  if (!hasEnteredPortal) {
    return <LoginPage onSelectRole={handleSelectPortalRole} onGoogleSignIn={handleGoogleSignIn} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Navigation */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSwitchRole={handleSwitchRole}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentUser.role === 'student' ? (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard
                user={currentUser}
                journeys={journeys}
                recommendations={recommendations}
                onStartJourney={() => setActiveTab('journey')}
                onGoToRewards={() => setActiveTab('rewards')}
                onGoToChallenges={() => setActiveTab('challenges')}
              />
            )}

            {activeTab === 'journey' && (
              <GpsJourneyTracker
                userId={currentUser.uid}
                userName={currentUser.name}
                onJourneyCompleted={handleJourneyCompleted}
              />
            )}

            {activeTab === 'challenges' && (
              <CarbonChallenges
                challenges={challenges}
                onClaimReward={handleClaimChallengeReward}
              />
            )}

            {activeTab === 'rewards' && (
              <RewardStore
                userPoints={currentUser.impactPoints}
                rewards={INITIAL_REWARDS}
                userRewards={userRewards}
                onRedeemReward={handleRedeemReward}
              />
            )}

            {activeTab === 'leaderboard' && (
              <IndividualLeaderboard currentUser={currentUser} />
            )}
          </>
        ) : (
          <>
            {(activeTab === 'campus' || activeTab === 'league') && (
              <InstitutionDashboard
                departments={departments}
                utilityBills={utilityBills}
                onOpenOcrModal={() => setIsOcrModalOpen(true)}
                onOpenSimulator={() => setActiveTab('simulator')}
                onOpenMap={() => setActiveTab('map')}
                onSelectDepartment={() => {}}
              />
            )}

            {activeTab === 'ocr' && (
              <div className="text-center py-12">
                <button
                  onClick={() => setIsOcrModalOpen(true)}
                  className="bg-slate-900 text-lime-400 font-bold px-6 py-3 rounded-2xl text-sm shadow-md"
                >
                  Open Utility Bill OCR Scanner
                </button>
              </div>
            )}

            {activeTab === 'map' && <CampusMapModule />}

            {activeTab === 'simulator' && <WhatIfSimulator />}

            {activeTab === 'satellite' && <SatelliteModule />}

            {activeTab === 'superadmin' && <SuperAdminPanel />}
          </>
        )}
      </main>

      {/* OCR Utility Bill Modal */}
      <UtilityBillOcrModal
        isOpen={isOcrModalOpen}
        onClose={() => setIsOcrModalOpen(false)}
        onBillApproved={handleBillApproved}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={currentUser.role}
      />
    </div>
  );
}
