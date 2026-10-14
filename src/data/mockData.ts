import { DistrictMetric, ConvoyRoute, FarmerClaim, PriorityDirective, DepotInventory } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1XjtdZkCMPynmEN7s8WUF1Zl6aaIrRM9TJ9pP0nQF8X95nXRtYe42fhmkoQ5M3jdAXPH5O6O7WJkx-VafhWfc64nJsC0pxOuHyvEw0TQ_RIc_1m5d7S_CaFljWHIA9jYTX9e53Zy7c7UEgkkbxc-iZ6mTkJRwzQmzBjAdGXN6dw1QwgbJeSC1-HCQyJPMtOPlQTchrATmujfaAP-KGuz3d9AqenxPmNYfoH8EJXOWtzUr8jJOJMcvIZe-w';
export const OFFICER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU1pGggl2MrG8Mt1T8dkCoNQLJWExnTJU7UuIivKoBiT3_RuUcNeKot-BZy-RCVUNBorTqw1ZeEqKp3T8jNQEETwD340aTqWVDX9OgWUThtPrdDXvUgl_Nb6xaDkSfJQ3Zox5DL39WagiWKt4OA9XabPKLMHJNWXhkMHbVf5ixtfOsyrAyu5eSf7Q6OtyQ6MeTFmXjPoEGpAINJMw0RLPY3x08SUTnA-_mGx1vtnWz8FhXHIzJiDRb';
export const TOPOGRAPHIC_MAP_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAspBK9yb_-qjPP9gsGfsj6dinZxU_NQWqOniIfeKo9d0LlRxnj4tUvDobd_dM-GvG3k8S-aRenBh-jEAHJyZ5ZkU2cgJqqyW5X3ifFLtL3orfPMVSPYvWKDzSgh0XJE6xFm2OWrw2keayLbhYXf5gqg1LlGKOFVdqLaHepHVhh2nmN6YNr-FCq0pztZ7PWtyUuhjAPzibSQwLaMlHLdsqgWXO9-tKjzzduRUu1mlNvFcTkHU-AJBOP';
export const MARATHWADA_GIS_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf5YBUfZWfrN2hGI-PnvkKBUqwNm_1wAgujSdRTl0cf7v81XTnz3ydsHYIPBpCvsAi55fAHs3cyavXS5R3N1mGiftry2SWNtGnk_hFbW2Dhm9hETarcqORDCp5QlUln9Nhm2TL8V14RZi-b25xhn-IhOhijMajbNJY_dMP7Nk34FLuQO2M9ku5e-fb9bNQdjAoSSkjGz5MMAAD1mK7Rf2z6NeBGuVN4v_fnvPHNAgjRTkoY-YjfaAI';

export const INITIAL_DISTRICTS: DistrictMetric[] = [
  {
    id: 'beed',
    name: 'Beed',
    taluka: 'Patoda & Ashti',
    riskScore: 0.92,
    riskLevel: 'Very High',
    precipDeficit: -62.4,
    soilMoisture: 9.1,
    drySpellDays: 22,
    activeClaims: 14820,
    farmersCount: 140000,
    aiConfidence: 99.1,
    reqBudgetCr: 42.0,
    baseSharePct: 28.7,
    trend: 'up',
    coordinates: { x: 350, y: 220 }
  },
  {
    id: 'latur',
    name: 'Latur',
    taluka: 'Ausa & Nilanga',
    riskScore: 0.88,
    riskLevel: 'Very High',
    precipDeficit: -58.2,
    soilMoisture: 10.4,
    drySpellDays: 19,
    activeClaims: 12450,
    farmersCount: 120000,
    aiConfidence: 97.4,
    reqBudgetCr: 38.0,
    baseSharePct: 26.8,
    trend: 'up',
    coordinates: { x: 440, y: 270 }
  },
  {
    id: 'osmanabad',
    name: 'Osmanabad',
    taluka: 'Tuljapur & Bhoom',
    riskScore: 0.76,
    riskLevel: 'High',
    precipDeficit: -48.5,
    soilMoisture: 12.8,
    drySpellDays: 14,
    activeClaims: 9120,
    farmersCount: 95000,
    aiConfidence: 95.8,
    reqBudgetCr: 30.0,
    baseSharePct: 23.5,
    trend: 'up',
    coordinates: { x: 380, y: 310 }
  },
  {
    id: 'nanded',
    name: 'Nanded',
    taluka: 'Mukhed & Biloli',
    riskScore: 0.68,
    riskLevel: 'Moderate',
    precipDeficit: -41.2,
    soilMoisture: 14.6,
    drySpellDays: 11,
    activeClaims: 6420,
    farmersCount: 88000,
    aiConfidence: 94.2,
    reqBudgetCr: 25.0,
    baseSharePct: 11.0,
    trend: 'steady',
    coordinates: { x: 520, y: 240 }
  },
  {
    id: 'solapur',
    name: 'Solapur',
    taluka: 'Karmala & Sangola',
    riskScore: 0.54,
    riskLevel: 'Moderate',
    precipDeficit: -36.8,
    soilMoisture: 16.2,
    drySpellDays: 7,
    activeClaims: 5582,
    farmersCount: 85000,
    aiConfidence: 93.6,
    reqBudgetCr: 20.0,
    baseSharePct: 10.0,
    trend: 'down',
    coordinates: { x: 310, y: 340 }
  }
];

export const INITIAL_CONVOYS: ConvoyRoute[] = [
  {
    id: 'RT-MH-4019',
    vehicleNo: 'MH-23-T-8821',
    cargoType: 'Potable Water',
    cargoCapacity: '14,000 Liters (Tanker 14kL)',
    originDepot: 'Aurangabad Central Hub',
    targetLocation: 'Beed - Patoda Gram Panchayat',
    targetTaluka: 'Beed',
    status: 'En Route - On Time',
    speedKmH: 54,
    eta: '12:45 PM',
    remainingKm: 42,
    progressPct: 75,
    driverName: 'Sunil Rathod',
    driverPhone: '+91 98230 44918',
    waypoints: [
      { name: 'Jalna Checkpoint', time: '08:30 AM', passed: true },
      { name: 'Ambad Depot', time: '10:15 AM', passed: true },
      { name: 'Patoda Center', time: '12:15 PM', passed: false },
      { name: 'G.P. Reservoir Tank', time: '12:45 PM', passed: false }
    ],
    pathCoordinates: 'M 230 140 C 270 210, 310 260, 410 320'
  },
  {
    id: 'RT-MH-3104',
    vehicleNo: 'MH-13-CU-4490',
    cargoType: 'Cattle Fodder Kits',
    cargoCapacity: '480 Compressed Blocks',
    originDepot: 'Solapur Warehouse Base',
    targetLocation: 'Osmanabad - Tuljapur Cattle Camp',
    targetTaluka: 'Osmanabad',
    status: 'Delayed +25m',
    speedKmH: 28,
    eta: '01:20 PM',
    remainingKm: 34,
    progressPct: 58,
    driverName: 'Prakash Shinde',
    driverPhone: '+91 94220 18832',
    waypoints: [
      { name: 'Solapur Mandi Yard', time: '09:00 AM', passed: true },
      { name: 'SH-142 Bypass Culvert', time: '11:45 AM', passed: true },
      { name: 'Tuljapur Camp Gate', time: '01:20 PM', passed: false }
    ],
    pathCoordinates: 'M 480 520 C 490 470, 520 440, 560 380'
  },
  {
    id: 'RT-MH-5522',
    vehicleNo: 'MH-12-RP-1002',
    cargoType: 'Nutri-Pouches',
    cargoCapacity: '1,200 High-Calorie Pouches',
    originDepot: 'Pune East Depot',
    targetLocation: 'Latur - Nilanga Relief Shelter',
    targetTaluka: 'Latur',
    status: 'Loading at Depot',
    speedKmH: 0,
    eta: '04:15 PM',
    remainingKm: 180,
    progressPct: 15,
    driverName: 'Ganesh More',
    driverPhone: '+91 91580 77319',
    waypoints: [
      { name: 'Pune East Loading Bay 4', time: '01:00 PM', passed: true },
      { name: 'Indapur Checkpost', time: '02:30 PM', passed: false },
      { name: 'Nilanga Shelter', time: '04:15 PM', passed: false }
    ],
    pathCoordinates: 'M 120 420 C 240 430, 410 420, 570 340'
  },
  {
    id: 'RT-MH-4820',
    vehicleNo: 'MH-20-EQ-9118',
    cargoType: 'Potable Water',
    cargoCapacity: '20,000 Liters (Tanker 20kL)',
    originDepot: 'Aurangabad Central Hub',
    targetLocation: 'Jalna - Ambad Agri Point',
    targetTaluka: 'Jalna',
    status: 'Dispatched',
    speedKmH: 61,
    eta: '02:10 PM',
    remainingKm: 88,
    progressPct: 35,
    driverName: 'Vikram Jadhav',
    driverPhone: '+91 98901 22841',
    waypoints: [
      { name: 'Aurangabad Ring Road', time: '11:15 AM', passed: true },
      { name: 'Badnapur Junction', time: '01:00 PM', passed: false },
      { name: 'Ambad Gram Depot', time: '02:10 PM', passed: false }
    ],
    pathCoordinates: 'M 230 140 C 280 150, 340 180, 390 190'
  }
];

export const INITIAL_CLAIMS: FarmerClaim[] = [
  {
    id: 'CLM-84920',
    farmerName: 'Ramesh B. Thombare',
    district: 'Beed',
    taluka: 'Ashti',
    claimedLoss: 78,
    spectralLossIndex: 76,
    status: 'Genuine',
    confidence: 0.98,
    plotSizeHectares: 3.2,
    cropType: 'Soybean & Cotton',
    submissionDate: '22 Oct 2026'
  },
  {
    id: 'CLM-84918',
    farmerName: 'Kaveri S. Kadam',
    district: 'Latur',
    taluka: 'Ausa',
    claimedLoss: 64,
    spectralLossIndex: 67,
    status: 'Genuine',
    confidence: 0.96,
    plotSizeHectares: 2.5,
    cropType: 'Pigeon Pea (Tur)',
    submissionDate: '23 Oct 2026'
  },
  {
    id: 'CLM-84915',
    farmerName: 'Dnyaneshwar M. Patil',
    district: 'Osmanabad',
    taluka: 'Bhoom',
    claimedLoss: 42,
    spectralLossIndex: 40,
    status: 'Needs Review',
    confidence: 0.81,
    plotSizeHectares: 4.8,
    cropType: 'Sugarcane & Bajra',
    submissionDate: '23 Oct 2026'
  },
  {
    id: 'CLM-84911',
    farmerName: 'Baburao T. Gaikwad',
    district: 'Solapur',
    taluka: 'Karmala',
    claimedLoss: 12,
    spectralLossIndex: 74,
    status: 'Duplicate',
    confidence: 0.42,
    plotSizeHectares: 1.8,
    cropType: 'Jowar',
    submissionDate: '24 Oct 2026'
  },
  {
    id: 'CLM-84908',
    farmerName: 'Santosh K. Shinde',
    district: 'Beed',
    taluka: 'Patoda',
    claimedLoss: 85,
    spectralLossIndex: 82,
    status: 'Genuine',
    confidence: 0.99,
    plotSizeHectares: 5.1,
    cropType: 'Cotton',
    submissionDate: '24 Oct 2026'
  },
  {
    id: 'CLM-84899',
    farmerName: 'Parvati D. Chavan',
    district: 'Nanded',
    taluka: 'Mukhed',
    claimedLoss: 52,
    spectralLossIndex: 50,
    status: 'Genuine',
    confidence: 0.93,
    plotSizeHectares: 2.1,
    cropType: 'Turmeric & Gram',
    submissionDate: '24 Oct 2026'
  }
];

export const INITIAL_DIRECTIVES: PriorityDirective[] = [
  {
    id: 'DIR-01',
    category: 'Critical',
    tag: 'Beed Reservoir Alert',
    timestamp: '12m ago',
    title: 'Majalgaon Reservoir Dead Storage',
    description: 'Majalgaon reservoir dipped below 11.2% dead storage. Immediate tanker authorization required.',
    metricLabel: 'Requirement: 34 Units',
    actionText: 'Dispatch Fleet',
    targetModule: 'resource-routing-logistics'
  },
  {
    id: 'DIR-02',
    category: 'Warning',
    tag: 'Contingency Tranche B',
    timestamp: '42m ago',
    title: 'Soil Moisture Deficit Exceeded 60%',
    description: 'Latur soil moisture deficit breached 60% threshold for 14 straight days. Release emergency fund.',
    metricLabel: 'Tranche B: ₹ 35 Cr',
    actionText: 'Review Tranche',
    targetModule: 'relief-budget-optimizer'
  },
  {
    id: 'DIR-03',
    category: 'Info',
    tag: 'Logistics Delay',
    timestamp: '1h ago',
    title: 'Culvert Maintenance Bypass',
    description: 'Convoy NH-52 (Fodder consignment from Pune to Osmanabad) rerouted due to culvert maintenance.',
    metricLabel: '+45 min Delta',
    actionText: 'Inspect Route',
    targetModule: 'resource-routing-logistics'
  }
];

export const INITIAL_DEPOTS: DepotInventory[] = [
  {
    id: 'aurangabad-central',
    name: 'Aurangabad Central Hub',
    region: 'Bay #02',
    availableCapacity: '380k Liters',
    capacityPct: 82,
    inTransit: 14,
    statusTone: 'primary',
    statusText: '82% Capacity • 14 in transit'
  },
  {
    id: 'pune-east',
    name: 'Pune Regional Depot',
    region: 'East Logistics Base',
    availableCapacity: '4,200 Kits',
    capacityPct: 64,
    inTransit: 8,
    statusTone: 'secondary',
    statusText: '64% Capacity • High Reserve'
  },
  {
    id: 'solapur-south',
    name: 'Solapur South Store',
    region: 'Strategic Tanker Station',
    availableCapacity: '185k Liters',
    capacityPct: 31,
    inTransit: 6,
    statusTone: 'tertiary',
    statusText: '31% Low Resupply Needed'
  }
];
