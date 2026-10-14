export type OperationalModule =
  | 'overview'
  | 'drought-risk-monitor'
  | 'relief-budget-optimizer'
  | 'claim-evidence-review'
  | 'resource-routing-logistics'
  | 'reports-and-analytics'
  | 'settings';

export type StressScenario = 'mild' | 'severe' | 'extreme';

export type OptimizationObjective = 'farmers' | 'latency' | 'floor';

export interface DistrictMetric {
  id: string;
  name: string;
  division: string;
  talukas: string;
  talukaCount: number;
  riskScore: number; // 0.0 - 1.0
  riskLevel: 'Critical' | 'Warning' | 'Moderate' | 'Low';
  precipDeficit: number; // e.g. -62.4
  soilMoisture: number; // e.g. 9.1
  drySpellDays: number;
  openClaims: number;
  activeClaims: number;
  farmersCount: number;
  lastAction: string;
  reqBudgetCr: number;
  baseSharePct: number;
  trend: 'up' | 'down' | 'steady';
  coordinates: { x: number; y: number };
}

export interface ConvoyRoute {
  id: string;
  vehicleNo: string;
  cargoType: 'Potable Water' | 'Cattle Fodder Kits' | 'Nutri-Pouches' | 'Drought Seed Pouches';
  cargoCapacity: string;
  originDepot: string;
  targetLocation: string;
  targetTaluka: string;
  status: 'En Route - On Time' | 'Delayed +25m' | 'Loading at Depot' | 'Dispatched' | 'Delivered';
  speedKmH: number;
  eta: string;
  remainingKm: number;
  progressPct: number;
  driverName: string;
  driverPhone: string;
  waypoints: { name: string; time: string; passed: boolean }[];
  pathCoordinates: string;
}

export interface FarmerClaim {
  id: string;
  farmerName: string;
  district: string;
  taluka: string;
  claimedLoss: number; // percentage
  spectralLossIndex: number; // percentage
  status: 'Genuine' | 'Needs Review' | 'Duplicate' | 'Missing Fields';
  confidence: number;
  plotSizeHectares: number;
  cropType: string;
  submissionDate: string;
}

export interface PriorityDirective {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  category?: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  timestamp: string;
  metricLabel: string;
  actionText: string;
  targetModule?: OperationalModule;
}

export interface DepotInventory {
  id: string;
  name: string;
  region: string;
  availableCapacity: string;
  capacityPct: number;
  inTransit: number;
  statusTone: 'healthy' | 'warning' | 'critical';
  statusText: string;
}
