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
  taluka: string;
  riskScore: number; // 0.0 - 1.0
  riskLevel: 'Very High' | 'High' | 'Moderate' | 'Low';
  precipDeficit: number; // percentage, e.g. -62.4
  soilMoisture: number; // percentage, e.g. 9.1
  drySpellDays: number;
  activeClaims: number;
  farmersCount: number;
  aiConfidence: number;
  reqBudgetCr: number;
  baseSharePct: number;
  trend: 'up' | 'down' | 'steady';
  coordinates: { x: number; y: number }; // SVG canvas coordinates
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
  pathCoordinates: string; // SVG path d attribute
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
  category: 'Critical' | 'Warning' | 'Info';
  tag: string;
  timestamp: string;
  title: string;
  description: string;
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
  statusTone: 'primary' | 'secondary' | 'tertiary';
  statusText: string;
}
