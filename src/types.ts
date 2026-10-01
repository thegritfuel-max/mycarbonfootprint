export type UserRole = 'student' | 'institution_admin' | 'super_admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId: string;
  institutionName: string;
  departmentId: string;
  departmentName: string;
  studentId?: string;
  impactPoints: number;
  co2eAvoidedKg: number;
  level: number;
  levelName: string;
  createdAt: string;
}

export interface DepartmentData {
  id: string;
  institutionId: string;
  name: string;
  code: string;
  studentCount: number;
  staffCount: number;
  areaSqM: number;
  currentCo2eKg: number;
  baselineCo2eKg: number;
  reductionPercent: number;
  score: number;
  breakdown: {
    electricityCo2eKg: number;
    computingCo2eKg: number;
    acCo2eKg: number;
    transportCo2eKg: number;
    generatorsCo2eKg: number;
    foodCo2eKg: number;
  };
  infrastructure: {
    buildings: number;
    labs: number;
    computers: number;
    acUnits: number;
    lights: number;
    generators: number;
    buses: number;
  };
}

export interface JourneyRecord {
  id: string;
  userId: string;
  userName: string;
  origin: string;
  destination: string;
  transportMode: 'walking' | 'cycling' | 'bus' | 'ev' | 'carpool' | 'motorcycle' | 'car';
  distanceKm: number;
  durationMin: number;
  actualCo2eKg: number;
  alternativeCo2eKg: number;
  avoidedCo2eKg: number;
  impactPointsEarned: number;
  verificationStatus: 'VERIFIED' | 'ESTIMATED' | 'PENDING';
  timestamp: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'computing' | 'campus';
  targetQuantity: number;
  unit: string;
  rewardPoints: number;
  co2eSavingKg: number;
  currentProgress: number;
  completed: boolean;
  expiresInDays: number;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  merchant: string;
  pointsRequired: number;
  category: 'canteen' | 'printing' | 'event' | 'academic';
  icon: string;
  couponCodePrefix: string;
}

export interface UserRewardRecord {
  id: string;
  userId: string;
  rewardId: string;
  title: string;
  merchant: string;
  couponCode: string;
  pointsSpent: number;
  status: 'AVAILABLE' | 'REDEEMED' | 'EXPIRED';
  redeemedAt: string;
}

export interface UtilityBillRecord {
  id: string;
  institutionId: string;
  departmentId: string;
  departmentName: string;
  billingPeriod: string;
  consumerNumber: string;
  kwhConsumed: number;
  totalAmount: number;
  co2eKg: number;
  ocrStatus: 'VERIFIED' | 'PENDING_REVIEW' | 'FAILED';
  uploadedAt: string;
  notes?: string;
}

export interface RecommendationItem {
  id: string;
  targetType: 'user' | 'department' | 'institution';
  targetName: string;
  title: string;
  description: string;
  potentialSavingKg: number;
  actionType: 'transport' | 'energy' | 'computing' | 'food';
  confidence: number;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface CampusBuildingHotspot {
  id: string;
  name: string;
  code: string;
  departmentName: string;
  co2eKgMonth: number;
  status: 'LOW' | 'MODERATE' | 'HIGH';
  latOffsetPct: number; // For interactive visual map placement
  lngOffsetPct: number;
  electricityKg: number;
  computingKg: number;
  acKg: number;
}
