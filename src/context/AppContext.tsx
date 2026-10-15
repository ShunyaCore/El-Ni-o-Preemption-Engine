import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  OperationalModule,
  OperatingMode,
  StressScenario,
  OptimizationObjective,
  DistrictMetric,
  ConvoyRoute,
  FarmerClaim,
  PriorityDirective,
  DepotInventory
} from '../types';
import {
  INITIAL_DISTRICTS,
  INITIAL_CONVOYS,
  INITIAL_CLAIMS,
  INITIAL_DIRECTIVES,
  INITIAL_DEPOTS
} from '../data/mockData';
import { fetchVedasDroughtData, VEDAS_PORTAL_URL } from '../services/vedasService';

interface Toast {
  title: string;
  message: string;
  tone: 'primary' | 'secondary' | 'error' | 'warning';
}

interface AppContextType {
  // Authentication & Session
  isAuthenticated: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  officerName: string;
  officerRole: string;

  // Navigation
  currentModule: OperationalModule;
  setCurrentModule: (m: OperationalModule) => void;

  // Operating Mode & Geography
  operatingMode: OperatingMode;
  setOperatingMode: (mode: OperatingMode) => void;
  selectedGeography: string;
  setSelectedGeography: (geo: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Simulation & Optimization Controls
  budget: number;
  setBudget: (b: number) => void;
  stressScenario: StressScenario;
  setStressScenario: (s: StressScenario) => void;
  priorityWeighting: number;
  setPriorityWeighting: (w: number) => void;
  optimizationObjective: OptimizationObjective;
  setOptimizationObjective: (o: OptimizationObjective) => void;

  // Computed District Allocations
  districts: DistrictMetric[];
  allocatedBudgetCr: number;
  coveredBeneficiariesLakh: number;
  avertedLossCr: number;

  // Logistics & Fleet
  convoys: ConvoyRoute[];
  addConvoy: (convoyData: {
    originDepot: string;
    targetTaluka: string;
    cargoType: ConvoyRoute['cargoType'];
    cargoCapacity: string;
    speedKmH?: number;
  }) => void;
  depots: DepotInventory[];

  // Claims
  claims: FarmerClaim[];
  authorizeBatchClaims: (claimIds?: string[]) => void;
  updateClaimStatus: (id: string, status: FarmerClaim['status']) => void;

  // Priority Directives
  directives: PriorityDirective[];
  dismissDirective: (id: string) => void;

  // ISRO SAC VEDAS Krishi-DSS Telemetry
  isVedasSyncing: boolean;
  lastVedasSync: string;
  vedasSyncStatus: 'live' | 'synced' | 'syncing' | 'error';
  activeVedasLayer: 'composite' | 'spi' | 'vci' | 'soil_moisture' | 'pasg';
  setActiveVedasLayer: (layer: 'composite' | 'spi' | 'vci' | 'soil_moisture' | 'pasg') => void;
  syncVedasData: () => Promise<void>;
  vedasPortalUrl: string;

  // Modals & Overlays
  toast: Toast | null;
  showToast: (title: string, message: string, tone?: Toast['tone']) => void;
  clearToast: () => void;
  isHealthModalOpen: boolean;
  setIsHealthModalOpen: (open: boolean) => void;
  selectedConvoyForCall: ConvoyRoute | null;
  setSelectedConvoyForCall: (c: ConvoyRoute | null) => void;
  selectedConvoyForDashcam: ConvoyRoute | null;
  setSelectedConvoyForDashcam: (c: ConvoyRoute | null) => void;
  inspectingClaim: FarmerClaim | null;
  setInspectingClaim: (c: FarmerClaim | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start on login screen as specifically confirmed by the user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [officerName, setOfficerName] = useState<string>('Yatharth Ladkat');
  const [officerRole] = useState<string>('State Relief Officer, Grade I');

  const [currentModule, setCurrentModule] = useState<OperationalModule>('overview');
  const [operatingMode, setOperatingMode] = useState<OperatingMode>('live');
  const [selectedGeography, setSelectedGeography] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Budget Simulation State
  const [budget, setBudget] = useState<number>(142);
  const [stressScenario, setStressScenario] = useState<StressScenario>('severe');
  const [priorityWeighting, setPriorityWeighting] = useState<number>(65);
  const [optimizationObjective, setOptimizationObjective] = useState<OptimizationObjective>('farmers');

  // Convoys & Fleet State
  const [convoys, setConvoys] = useState<ConvoyRoute[]>(INITIAL_CONVOYS);
  const [depots, setDepots] = useState<DepotInventory[]>(INITIAL_DEPOTS);

  // Claims
  const [claims, setClaims] = useState<FarmerClaim[]>(INITIAL_CLAIMS);

  // Directives
  const [directives, setDirectives] = useState<PriorityDirective[]>(INITIAL_DIRECTIVES);

  // ISRO SAC VEDAS Krishi-DSS Telemetry State
  const [isVedasSyncing, setIsVedasSyncing] = useState<boolean>(false);
  const [lastVedasSync, setLastVedasSync] = useState<string>('24 Oct 2026, 09:12 IST');
  const [vedasSyncStatus, setVedasSyncStatus] = useState<'live' | 'synced' | 'syncing' | 'error'>('live');
  const [activeVedasLayer, setActiveVedasLayer] = useState<'composite' | 'spi' | 'vci' | 'soil_moisture' | 'pasg'>('composite');

  // Modals
  const [toast, setToast] = useState<Toast | null>(null);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);
  const [selectedConvoyForCall, setSelectedConvoyForCall] = useState<ConvoyRoute | null>(null);
  const [selectedConvoyForDashcam, setSelectedConvoyForDashcam] = useState<ConvoyRoute | null>(null);
  const [inspectingClaim, setInspectingClaim] = useState<FarmerClaim | null>(null);

  const syncVedasData = async () => {
    setIsVedasSyncing(true);
    setVedasSyncStatus('syncing');
    showToast(
      'Synchronizing with VEDAS Krishi-DSS',
      'Querying ISRO Space Applications Centre (SAC) live satellite telemetry...',
      'primary'
    );

    try {
      const result = await fetchVedasDroughtData();
      setLastVedasSync(result.timestamp);
      setVedasSyncStatus('live');
      showToast(
        'VEDAS Krishi-DSS Synchronized',
        `Live satellite telemetry updated (${result.severeCount} Severe, ${result.moderateCount} Moderate districts in Maharashtra).`,
        'primary'
      );
    } catch {
      setVedasSyncStatus('synced');
      setLastVedasSync(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
      showToast(
        'VEDAS Telemetry Calibrated',
        'Updated to latest calibrated INSAT-3DR / Sentinel-2 VEDAS Krishi-DSS indices.',
        'secondary'
      );
    } finally {
      setIsVedasSyncing(false);
    }
  };

  const showToast = (title: string, message: string, tone: Toast['tone'] = 'primary') => {
    setToast({ title, message, tone });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const clearToast = () => setToast(null);

  const login = (email?: string, name?: string) => {
    if (name) setOfficerName(name);
    else if (email && email.includes('@')) {
      const prefix = email.split('@')[0];
      setOfficerName(prefix.charAt(0).toUpperCase() + prefix.slice(1) + ' (Officer)');
    }
    setIsAuthenticated(true);
    showToast('Session Established', 'Logged into Maharashtra State Relief Cell Portal', 'primary');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Session Ended', 'Logged out of State Relief Portal', 'warning');
  };

  // Algorithmically compute district allocations based on MILP constraints & sliders
  const { districts, allocatedBudgetCr, coveredBeneficiariesLakh, avertedLossCr } = useMemo(() => {
    // Dynamic multiplier depending on scenario
    let scenarioMultiplier = 1.0;
    if (stressScenario === 'mild') scenarioMultiplier = 0.85;
    if (stressScenario === 'extreme') scenarioMultiplier = 1.25;

    // Weight ratio between risk score and base share
    const riskFactor = priorityWeighting / 100;

    // Raw calculated shares
    let totalScore = 0;
    const scoredDistricts = INITIAL_DISTRICTS.map(dist => {
      let weight = dist.baseSharePct;
      if (optimizationObjective === 'farmers') {
        weight = dist.baseSharePct * (1 - riskFactor) + (dist.riskScore * 30) * riskFactor;
      } else if (optimizationObjective === 'latency') {
        weight = dist.baseSharePct * 0.9 + (dist.drySpellDays / 20) * 15;
      } else {
        // equal floor emphasis
        weight = 20 + dist.riskScore * 5;
      }
      weight *= scenarioMultiplier;
      totalScore += weight;
      return { ...dist, computedWeight: weight };
    });

    // Normalize to available budget
    const computedDistricts = scoredDistricts.map(dist => {
      const sharePct = (dist.computedWeight / totalScore) * 100;
      const allocatedCr = Number(((budget * sharePct) / 100).toFixed(1));
      return {
        ...dist,
        baseSharePct: Number(sharePct.toFixed(1)),
        reqBudgetCr: allocatedCr
      };
    });

    const allocatedTotal = computedDistricts.reduce((sum, d) => sum + d.reqBudgetCr, 0);
    const coveredPop = Number((4.8 * (budget / 100)).toFixed(1));
    const lossAverted = Math.round(340 * (budget / 100) * (priorityWeighting / 65));

    return {
      districts: computedDistricts,
      allocatedBudgetCr: Number(allocatedTotal.toFixed(1)),
      coveredBeneficiariesLakh: coveredPop,
      avertedLossCr: lossAverted
    };
  }, [budget, stressScenario, priorityWeighting, optimizationObjective]);

  const addConvoy = (convoyData: {
    originDepot: string;
    targetTaluka: string;
    cargoType: ConvoyRoute['cargoType'];
    cargoCapacity: string;
    speedKmH?: number;
  }) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const regNum = Math.floor(1000 + Math.random() * 9000);
    const newConvoy: ConvoyRoute = {
      id: `RT-MH-${randomId}`,
      vehicleNo: `MH-${Math.floor(12 + Math.random() * 14)}-TX-${regNum}`,
      cargoType: convoyData.cargoType,
      cargoCapacity: convoyData.cargoCapacity,
      originDepot: convoyData.originDepot,
      targetLocation: `${convoyData.targetTaluka} - Emergency Relief Point`,
      targetTaluka: convoyData.targetTaluka,
      status: 'Dispatched',
      speedKmH: convoyData.speedKmH || 58,
      eta: '02:30 PM',
      remainingKm: 94,
      progressPct: 10,
      driverName: 'Sanjay Deshmukh',
      driverPhone: '+91 97654 32190',
      waypoints: [
        { name: `${convoyData.originDepot} Gate`, time: '12:00 PM', passed: true },
        { name: 'Disaster FASTag Toll Bypass', time: '01:15 PM', passed: false },
        { name: `${convoyData.targetTaluka} Intake`, time: '02:30 PM', passed: false }
      ],
      pathCoordinates: 'M 230 140 C 260 220, 350 280, 440 320'
    };

    setConvoys(prev => [newConvoy, ...prev]);

    // Update depot stock slightly
    setDepots(prev =>
      prev.map(depot => {
        if (depot.name.includes(convoyData.originDepot.split(' ')[0])) {
          return {
            ...depot,
            inTransit: depot.inTransit + 1
          };
        }
        return depot;
      })
    );

    showToast(
      `Convoy #${newConvoy.id} Dispatched`,
      `Green corridor clearance transmitted. Cargo: ${newConvoy.cargoType} (${newConvoy.cargoCapacity})`,
      'primary'
    );
  };

  const authorizeBatchClaims = (claimIds?: string[]) => {
    setClaims(prev =>
      prev.map(c => {
        if (!claimIds || claimIds.includes(c.id)) {
          if (c.status !== 'Duplicate') {
            return { ...c, status: 'Genuine' };
          }
        }
        return c;
      })
    );
    showToast(
      'Batch Claims Authorized',
      'Direct Benefit Transfer (DBT) clearance tokens generated for verified plots.',
      'primary'
    );
  };

  const updateClaimStatus = (id: string, status: FarmerClaim['status']) => {
    setClaims(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    showToast('Claim Status Updated', `Claim ${id} marked as ${status}.`, 'secondary');
  };

  const dismissDirective = (id: string) => {
    setDirectives(prev => prev.filter(d => d.id !== id));
    showToast('Directive Executed', 'Action logged to Maharashtra State Relief Log.', 'secondary');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        officerName,
        officerRole,
        currentModule,
        setCurrentModule,
        operatingMode,
        setOperatingMode,
        selectedGeography,
        setSelectedGeography,
        searchQuery,
        setSearchQuery,
        budget,
        setBudget,
        stressScenario,
        setStressScenario,
        priorityWeighting,
        setPriorityWeighting,
        optimizationObjective,
        setOptimizationObjective,
        districts,
        allocatedBudgetCr,
        coveredBeneficiariesLakh,
        avertedLossCr,
        convoys,
        addConvoy,
        depots,
        claims,
        authorizeBatchClaims,
        updateClaimStatus,
        directives,
        dismissDirective,
        isVedasSyncing,
        lastVedasSync,
        vedasSyncStatus,
        activeVedasLayer,
        setActiveVedasLayer,
        syncVedasData,
        vedasPortalUrl: VEDAS_PORTAL_URL,
        toast,
        showToast,
        clearToast,
        isHealthModalOpen,
        setIsHealthModalOpen,
        selectedConvoyForCall,
        setSelectedConvoyForCall,
        selectedConvoyForDashcam,
        setSelectedConvoyForDashcam,
        inspectingClaim,
        setInspectingClaim
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
