export interface DistrictGeoFeature {
  id: string;
  name: string;
  marathiName: string;
  division: string;
  center: [number, number]; // [lat, lng]
  polygon: [number, number][]; // [[lat, lng], ...]
  // Baseline telemetry
  spi3M: number;
  vci: number;
  soilMoistureDev: number;
  precipDeficit: number;
  cropLossRiskPct: number;
  vedasCategory: 'Severe' | 'Moderate' | 'Mild' | 'Normal';
  talukasCount: number;
  monitoredAcreageHa: string;
  groundwaterDepthM: number;
  activeTankers: number;
}

export interface TalukaHotspot {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
  coordinates: [number, number]; // [lat, lng]
  severity: 'Critical' | 'Severe' | 'Moderate';
  vci: number;
  spi3M: number;
  rainfallDeviationPct: number;
  soilMoistureDeviationPct: number;
  groundwaterDeficitM: number;
  keyCrop: string;
  cropStage: string;
  lossRiskPct: number;
  tankersAssigned: number;
}

export interface WeatherStation {
  id: string;
  name: string;
  district: string;
  coordinates: [number, number];
  stationType: 'IMD AWS' | 'State Agro-Met' | 'ISRO Telemetry';
  temperatureC: number;
  relativeHumidityPct: number;
  windSpeedKmh: number;
  rainfall24hMm: number;
  lastReading: string;
}

// Bounding polygons [lat, lng] for Maharashtra districts
export const MAHARASHTRA_DISTRICTS_GEO: DistrictGeoFeature[] = [
  {
    id: 'beed',
    name: 'Beed',
    marathiName: 'बीड',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [18.9891, 75.7601],
    polygon: [
      [19.45, 75.60],
      [19.38, 76.15],
      [19.22, 76.42],
      [18.95, 76.35],
      [18.72, 76.18],
      [18.55, 75.85],
      [18.62, 75.40],
      [18.88, 74.98],
      [19.18, 75.12],
      [19.35, 75.38],
      [19.45, 75.60]
    ],
    spi3M: -2.18,
    vci: 21.8,
    soilMoistureDev: -51.2,
    precipDeficit: -62.4,
    cropLossRiskPct: 74,
    vedasCategory: 'Severe',
    talukasCount: 11,
    monitoredAcreageHa: '6.7 Lakh Ha',
    groundwaterDepthM: 14.2,
    activeTankers: 34
  },
  {
    id: 'latur',
    name: 'Latur',
    marathiName: 'लातूर',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [18.4088, 76.5604],
    polygon: [
      [18.82, 76.45],
      [18.85, 76.85],
      [18.70, 77.20],
      [18.40, 77.15],
      [18.05, 76.85],
      [17.95, 76.50],
      [18.15, 76.22],
      [18.45, 76.28],
      [18.82, 76.45]
    ],
    spi3M: -2.08,
    vci: 24.5,
    soilMoistureDev: -47.8,
    precipDeficit: -57.8,
    cropLossRiskPct: 68,
    vedasCategory: 'Severe',
    talukasCount: 10,
    monitoredAcreageHa: '5.9 Lakh Ha',
    groundwaterDepthM: 15.6,
    activeTankers: 28
  },
  {
    id: 'osmanabad',
    name: 'Dharashiv (Osmanabad)',
    marathiName: 'धाराशिव',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [18.1856, 76.0419],
    polygon: [
      [18.65, 75.75],
      [18.62, 76.20],
      [18.35, 76.25],
      [18.05, 76.35],
      [17.75, 76.10],
      [17.60, 75.75],
      [17.90, 75.40],
      [18.25, 75.35],
      [18.52, 75.52],
      [18.65, 75.75]
    ],
    spi3M: -1.99,
    vci: 27.2,
    soilMoistureDev: -44.6,
    precipDeficit: -54.1,
    cropLossRiskPct: 58,
    vedasCategory: 'Severe',
    talukasCount: 8,
    monitoredAcreageHa: '4.8 Lakh Ha',
    groundwaterDepthM: 13.8,
    activeTankers: 22
  },
  {
    id: 'parbhani',
    name: 'Parbhani',
    marathiName: 'परभणी',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [19.2686, 76.7708],
    polygon: [
      [19.75, 76.60],
      [19.78, 77.05],
      [19.55, 77.25],
      [19.25, 77.20],
      [19.00, 76.85],
      [18.98, 76.45],
      [19.25, 76.35],
      [19.55, 76.42],
      [19.75, 76.60]
    ],
    spi3M: -1.78,
    vci: 32.6,
    soilMoistureDev: -39.5,
    precipDeficit: -46.7,
    cropLossRiskPct: 54,
    vedasCategory: 'Moderate',
    talukasCount: 9,
    monitoredAcreageHa: '5.1 Lakh Ha',
    groundwaterDepthM: 11.4,
    activeTankers: 18
  },
  {
    id: 'nanded',
    name: 'Nanded',
    marathiName: 'नांदेड',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [19.1383, 77.3210],
    polygon: [
      [19.60, 77.10],
      [19.70, 77.65],
      [19.45, 78.15],
      [19.05, 78.10],
      [18.65, 77.85],
      [18.60, 77.40],
      [18.85, 77.15],
      [19.20, 77.05],
      [19.60, 77.10]
    ],
    spi3M: -1.69,
    vci: 36.1,
    soilMoistureDev: -36.1,
    precipDeficit: -43.2,
    cropLossRiskPct: 46,
    vedasCategory: 'Moderate',
    talukasCount: 16,
    monitoredAcreageHa: '6.2 Lakh Ha',
    groundwaterDepthM: 10.9,
    activeTankers: 15
  },
  {
    id: 'jalna',
    name: 'Jalna',
    marathiName: 'जालना',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [19.8410, 75.8864],
    polygon: [
      [20.30, 75.75],
      [20.25, 76.25],
      [19.95, 76.40],
      [19.60, 76.25],
      [19.45, 75.85],
      [19.55, 75.50],
      [19.85, 75.45],
      [20.15, 75.55],
      [20.30, 75.75]
    ],
    spi3M: -1.62,
    vci: 39.4,
    soilMoistureDev: -32.8,
    precipDeficit: -39.5,
    cropLossRiskPct: 53,
    vedasCategory: 'Moderate',
    talukasCount: 8,
    monitoredAcreageHa: '4.9 Lakh Ha',
    groundwaterDepthM: 11.2,
    activeTankers: 16
  },
  {
    id: 'hingoli',
    name: 'Hingoli',
    marathiName: 'हिंगोली',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [19.7197, 77.1485],
    polygon: [
      [20.05, 76.95],
      [20.08, 77.30],
      [19.85, 77.45],
      [19.50, 77.35],
      [19.45, 77.00],
      [19.75, 76.85],
      [20.05, 76.95]
    ],
    spi3M: -1.48,
    vci: 44.8,
    soilMoistureDev: -27.4,
    precipDeficit: -35.2,
    cropLossRiskPct: 41,
    vedasCategory: 'Mild',
    talukasCount: 5,
    monitoredAcreageHa: '3.6 Lakh Ha',
    groundwaterDepthM: 9.8,
    activeTankers: 8
  },
  {
    id: 'aurangabad',
    name: 'Chhatrapati Sambhajinagar',
    marathiName: 'छत्रपती संभाजीनगर',
    division: 'Chhatrapati Sambhajinagar Division',
    center: [19.8762, 75.3433],
    polygon: [
      [20.45, 75.05],
      [20.40, 75.60],
      [20.15, 75.75],
      [19.65, 75.65],
      [19.45, 75.30],
      [19.60, 74.85],
      [20.05, 74.80],
      [20.35, 74.92],
      [20.45, 75.05]
    ],
    spi3M: -1.41,
    vci: 48.2,
    soilMoistureDev: -24.8,
    precipDeficit: -33.4,
    cropLossRiskPct: 38,
    vedasCategory: 'Mild',
    talukasCount: 9,
    monitoredAcreageHa: '6.4 Lakh Ha',
    groundwaterDepthM: 10.1,
    activeTankers: 12
  },
  {
    id: 'solapur',
    name: 'Solapur',
    marathiName: 'सोलापूर',
    division: 'Pune Division',
    center: [17.6599, 75.9064],
    polygon: [
      [18.30, 75.30],
      [18.25, 75.95],
      [17.85, 76.30],
      [17.35, 76.25],
      [17.15, 75.80],
      [17.20, 75.15],
      [17.65, 74.95],
      [18.05, 75.05],
      [18.30, 75.30]
    ],
    spi3M: -1.55,
    vci: 40.5,
    soilMoistureDev: -30.1,
    precipDeficit: -34.5,
    cropLossRiskPct: 49,
    vedasCategory: 'Moderate',
    talukasCount: 11,
    monitoredAcreageHa: '7.1 Lakh Ha',
    groundwaterDepthM: 12.6,
    activeTankers: 20
  },
  {
    id: 'ahmednagar',
    name: 'Ahilyanagar (Ahmednagar)',
    marathiName: 'अहिल्यानगर',
    division: 'Nashik Division',
    center: [19.0948, 74.7480],
    polygon: [
      [19.90, 74.45],
      [19.80, 75.10],
      [19.35, 75.25],
      [18.85, 75.10],
      [18.50, 74.75],
      [18.70, 74.20],
      [19.25, 73.80],
      [19.65, 74.05],
      [19.90, 74.45]
    ],
    spi3M: -1.45,
    vci: 43.0,
    soilMoistureDev: -28.0,
    precipDeficit: -36.0,
    cropLossRiskPct: 45,
    vedasCategory: 'Moderate',
    talukasCount: 14,
    monitoredAcreageHa: '8.2 Lakh Ha',
    groundwaterDepthM: 11.8,
    activeTankers: 17
  },
  {
    id: 'pune',
    name: 'Pune',
    marathiName: 'पुणे',
    division: 'Pune Division',
    center: [18.5204, 73.8567],
    polygon: [
      [19.25, 73.65],
      [19.15, 74.15],
      [18.70, 74.65],
      [18.25, 74.90],
      [18.00, 74.50],
      [18.05, 73.70],
      [18.50, 73.40],
      [18.95, 73.45],
      [19.25, 73.65]
    ],
    spi3M: -0.85,
    vci: 58.0,
    soilMoistureDev: -12.5,
    precipDeficit: -14.2,
    cropLossRiskPct: 22,
    vedasCategory: 'Normal',
    talukasCount: 14,
    monitoredAcreageHa: '5.8 Lakh Ha',
    groundwaterDepthM: 7.2,
    activeTankers: 4
  },
  {
    id: 'nashik',
    name: 'Nashik',
    marathiName: 'नाशिक',
    division: 'Nashik Division',
    center: [19.9975, 73.7898],
    polygon: [
      [20.75, 73.85],
      [20.65, 74.55],
      [20.15, 74.65],
      [19.75, 74.30],
      [19.60, 73.65],
      [19.85, 73.35],
      [20.35, 73.40],
      [20.75, 73.85]
    ],
    spi3M: -1.12,
    vci: 51.4,
    soilMoistureDev: -19.4,
    precipDeficit: -22.1,
    cropLossRiskPct: 28,
    vedasCategory: 'Mild',
    talukasCount: 15,
    monitoredAcreageHa: '6.9 Lakh Ha',
    groundwaterDepthM: 8.5,
    activeTankers: 6
  },
  {
    id: 'satara',
    name: 'Satara',
    marathiName: 'सातारा',
    division: 'Pune Division',
    center: [17.6805, 73.9929],
    polygon: [
      [18.15, 73.85],
      [18.05, 74.45],
      [17.65, 74.65],
      [17.30, 74.30],
      [17.25, 73.70],
      [17.60, 73.60],
      [18.15, 73.85]
    ],
    spi3M: -1.05,
    vci: 53.0,
    soilMoistureDev: -18.2,
    precipDeficit: -21.4,
    cropLossRiskPct: 31,
    vedasCategory: 'Mild',
    talukasCount: 11,
    monitoredAcreageHa: '4.7 Lakh Ha',
    groundwaterDepthM: 8.1,
    activeTankers: 5
  },
  {
    id: 'buldhana',
    name: 'Buldhana',
    marathiName: 'बुलढाणा',
    division: 'Amravati Division',
    center: [20.5293, 76.1843],
    polygon: [
      [21.25, 76.20],
      [21.15, 76.75],
      [20.65, 76.70],
      [20.15, 76.40],
      [20.00, 75.95],
      [20.45, 75.85],
      [20.95, 75.95],
      [21.25, 76.20]
    ],
    spi3M: -1.35,
    vci: 46.5,
    soilMoistureDev: -26.2,
    precipDeficit: -31.8,
    cropLossRiskPct: 39,
    vedasCategory: 'Mild',
    talukasCount: 13,
    monitoredAcreageHa: '5.6 Lakh Ha',
    groundwaterDepthM: 9.7,
    activeTankers: 9
  },
  {
    id: 'yavatmal',
    name: 'Yavatmal',
    marathiName: 'यवतमाळ',
    division: 'Amravati Division',
    center: [20.3888, 78.1204],
    polygon: [
      [20.75, 77.85],
      [20.70, 78.75],
      [20.25, 79.10],
      [19.75, 78.85],
      [19.65, 78.20],
      [20.05, 77.55],
      [20.50, 77.50],
      [20.75, 77.85]
    ],
    spi3M: -1.52,
    vci: 41.2,
    soilMoistureDev: -31.5,
    precipDeficit: -35.8,
    cropLossRiskPct: 48,
    vedasCategory: 'Moderate',
    talukasCount: 16,
    monitoredAcreageHa: '7.8 Lakh Ha',
    groundwaterDepthM: 11.5,
    activeTankers: 14
  }
];

// High-stress Taluka Hotspots across drought-hit districts
export const TALUKA_HOTSPOTS: TalukaHotspot[] = [
  {
    id: 'ashti',
    name: 'Ashti',
    districtId: 'beed',
    districtName: 'Beed',
    coordinates: [18.8021, 75.1764],
    severity: 'Critical',
    vci: 18.2,
    spi3M: -2.35,
    rainfallDeviationPct: -68.1,
    soilMoistureDeviationPct: -56.4,
    groundwaterDeficitM: 4.8,
    keyCrop: 'Soybean & Pearl Millet',
    cropStage: 'Terminal drought / Grain abortion',
    lossRiskPct: 84,
    tankersAssigned: 12
  },
  {
    id: 'patoda',
    name: 'Patoda',
    districtId: 'beed',
    districtName: 'Beed',
    coordinates: [18.9667, 75.4500],
    severity: 'Critical',
    vci: 19.5,
    spi3M: -2.28,
    rainfallDeviationPct: -65.3,
    soilMoistureDeviationPct: -54.0,
    groundwaterDeficitM: 4.5,
    keyCrop: 'Cotton (Bt)',
    cropStage: 'Square dropping / Boll drying',
    lossRiskPct: 81,
    tankersAssigned: 10
  },
  {
    id: 'majalgaon',
    name: 'Majalgaon',
    districtId: 'beed',
    districtName: 'Beed',
    coordinates: [19.1500, 76.0667],
    severity: 'Critical',
    vci: 22.4,
    spi3M: -2.11,
    rainfallDeviationPct: -60.8,
    soilMoistureDeviationPct: -48.9,
    groundwaterDeficitM: 3.9,
    keyCrop: 'Soybean',
    cropStage: 'Pod development failure',
    lossRiskPct: 75,
    tankersAssigned: 8
  },
  {
    id: 'ausa',
    name: 'Ausa',
    districtId: 'latur',
    districtName: 'Latur',
    coordinates: [18.2483, 76.5050],
    severity: 'Critical',
    vci: 21.0,
    spi3M: -2.16,
    rainfallDeviationPct: -61.4,
    soilMoistureDeviationPct: -51.3,
    groundwaterDeficitM: 4.2,
    keyCrop: 'Soybean & Tur (Pigeon Pea)',
    cropStage: 'Vegetative stunt / Pod empty',
    lossRiskPct: 78,
    tankersAssigned: 11
  },
  {
    id: 'nilanga',
    name: 'Nilanga',
    districtId: 'latur',
    districtName: 'Latur',
    coordinates: [18.1250, 76.7556],
    severity: 'Critical',
    vci: 23.6,
    spi3M: -2.10,
    rainfallDeviationPct: -58.9,
    soilMoistureDeviationPct: -48.2,
    groundwaterDeficitM: 3.8,
    keyCrop: 'Soybean',
    cropStage: 'Seed maturation halt',
    lossRiskPct: 74,
    tankersAssigned: 9
  },
  {
    id: 'bhoom',
    name: 'Bhoom',
    districtId: 'osmanabad',
    districtName: 'Dharashiv',
    coordinates: [18.4667, 75.6667],
    severity: 'Critical',
    vci: 23.9,
    spi3M: -2.12,
    rainfallDeviationPct: -58.4,
    soilMoistureDeviationPct: -48.1,
    groundwaterDeficitM: 3.9,
    keyCrop: 'Sugarcane & Jowar',
    cropStage: 'Severe stalk desiccation',
    lossRiskPct: 75,
    tankersAssigned: 8
  },
  {
    id: 'paranda',
    name: 'Paranda',
    districtId: 'osmanabad',
    districtName: 'Dharashiv',
    coordinates: [18.2611, 75.4472],
    severity: 'Critical',
    vci: 25.4,
    spi3M: -2.05,
    rainfallDeviationPct: -56.1,
    soilMoistureDeviationPct: -45.7,
    groundwaterDeficitM: 3.7,
    keyCrop: 'Jowar & Pulses',
    cropStage: 'Flowering abortion',
    lossRiskPct: 71,
    tankersAssigned: 7
  },
  {
    id: 'gangakhed',
    name: 'Gangakhed',
    districtId: 'parbhani',
    districtName: 'Parbhani',
    coordinates: [18.9500, 76.7500],
    severity: 'Severe',
    vci: 29.4,
    spi3M: -1.86,
    rainfallDeviationPct: -49.8,
    soilMoistureDeviationPct: -42.8,
    groundwaterDeficitM: 3.3,
    keyCrop: 'Cotton & Soybean',
    cropStage: 'Boll retention loss',
    lossRiskPct: 67,
    tankersAssigned: 6
  },
  {
    id: 'mukhed',
    name: 'Mukhed',
    districtId: 'nanded',
    districtName: 'Nanded',
    coordinates: [18.7167, 77.3667],
    severity: 'Severe',
    vci: 31.8,
    spi3M: -1.82,
    rainfallDeviationPct: -47.1,
    soilMoistureDeviationPct: -39.7,
    groundwaterDeficitM: 3.1,
    keyCrop: 'Cotton',
    cropStage: 'Vegetative moisture stress',
    lossRiskPct: 64,
    tankersAssigned: 6
  },
  {
    id: 'ambad',
    name: 'Ambad',
    districtId: 'jalna',
    districtName: 'Jalna',
    coordinates: [19.6167, 75.7833],
    severity: 'Severe',
    vci: 34.8,
    spi3M: -1.74,
    rainfallDeviationPct: -43.0,
    soilMoistureDeviationPct: -37.1,
    groundwaterDeficitM: 2.9,
    keyCrop: 'Mosambi (Sweet Orange)',
    cropStage: 'Fruit drop due to water stress',
    lossRiskPct: 60,
    tankersAssigned: 5
  },
  {
    id: 'karmala',
    name: 'Karmala',
    districtId: 'solapur',
    districtName: 'Solapur',
    coordinates: [18.4167, 75.2000],
    severity: 'Severe',
    vci: 33.2,
    spi3M: -1.78,
    rainfallDeviationPct: -45.6,
    soilMoistureDeviationPct: -38.4,
    groundwaterDeficitM: 3.4,
    keyCrop: 'Pomegranate & Jowar',
    cropStage: 'Fruit cracking & defoliation',
    lossRiskPct: 63,
    tankersAssigned: 7
  }
];

// Telemetry & Automatic Weather Stations (AWS)
export const AWS_WEATHER_STATIONS: WeatherStation[] = [
  {
    id: 'AWS-BD-01',
    name: 'Beed IMD Observatory',
    district: 'Beed',
    coordinates: [18.9950, 75.7520],
    stationType: 'IMD AWS',
    temperatureC: 38.6,
    relativeHumidityPct: 24,
    windSpeedKmh: 14.2,
    rainfall24hMm: 0.0,
    lastReading: '10 min ago'
  },
  {
    id: 'AWS-LT-01',
    name: 'Latur Agro-Met Station',
    district: 'Latur',
    coordinates: [18.4050, 76.5700],
    stationType: 'State Agro-Met',
    temperatureC: 37.9,
    relativeHumidityPct: 27,
    windSpeedKmh: 16.5,
    rainfall24hMm: 0.0,
    lastReading: '5 min ago'
  },
  {
    id: 'AWS-DH-01',
    name: 'Dharashiv Hilltop Radar & AWS',
    district: 'Dharashiv',
    coordinates: [18.1790, 76.0350],
    stationType: 'ISRO Telemetry',
    temperatureC: 37.2,
    relativeHumidityPct: 29,
    windSpeedKmh: 18.0,
    rainfall24hMm: 0.0,
    lastReading: '8 min ago'
  },
  {
    id: 'AWS-PB-01',
    name: 'Parbhani University AWS',
    district: 'Parbhani',
    coordinates: [19.2600, 76.7800],
    stationType: 'IMD AWS',
    temperatureC: 38.1,
    relativeHumidityPct: 26,
    windSpeedKmh: 12.8,
    rainfall24hMm: 0.0,
    lastReading: '12 min ago'
  },
  {
    id: 'AWS-SL-01',
    name: 'Solapur Central Agro Station',
    district: 'Solapur',
    coordinates: [17.6700, 75.9100],
    stationType: 'State Agro-Met',
    temperatureC: 39.4,
    relativeHumidityPct: 22,
    windSpeedKmh: 15.6,
    rainfall24hMm: 0.0,
    lastReading: '4 min ago'
  }
];

export type DroughtMapMetric =
  | 'vedasComposite'
  | 'vci'
  | 'spi3M'
  | 'soilMoistureDev'
  | 'precipDeficit'
  | 'cropLossRiskPct';

export interface MetricConfig {
  id: DroughtMapMetric;
  label: string;
  shortLabel: string;
  unit: string;
  description: string;
  legendTitle: string;
  legendSteps: { label: string; color: string; desc: string }[];
}

export const DROUGHT_METRICS_CONFIG: Record<DroughtMapMetric, MetricConfig> = {
  vedasComposite: {
    id: 'vedasComposite',
    label: 'VEDAS Composite Drought Severity',
    shortLabel: 'VEDAS Severity',
    unit: 'Category',
    description: 'ISRO SAC Krishi-DSS multi-sensor composite: combines SPI-3M, VCI, Soil Moisture, and PASG.',
    legendTitle: 'ISRO VEDAS Drought Level',
    legendSteps: [
      { label: 'Severe', color: '#991B1B', desc: 'Critical agricultural drought' },
      { label: 'Moderate', color: '#D97706', desc: 'Significant stress / dry spells' },
      { label: 'Mild', color: '#EAB308', desc: 'Precipitation / moisture deficit' },
      { label: 'Normal', color: '#16A34A', desc: 'Within seasonal baseline' }
    ]
  },
  vci: {
    id: 'vci',
    label: 'Vegetation Condition Index (VCI)',
    shortLabel: 'VCI Anomaly',
    unit: '%',
    description: 'Measures photosynthetic vigor relative to historical maximum/minimum NDVI (INSAT-3DR / Sentinel-2).',
    legendTitle: 'Vegetation Condition Index (%)',
    legendSteps: [
      { label: '<25% (Critical)', color: '#7F1D1D', desc: 'Severe canopy desiccation' },
      { label: '25–35% (Severe)', color: '#C62828', desc: 'Substantial vegetative stress' },
      { label: '35–45% (Moderate)', color: '#F59E0B', desc: 'Moderate plant stress' },
      { label: '>45% (Normal/Mild)', color: '#2E7D32', desc: 'Healthy vegetative canopy' }
    ]
  },
  spi3M: {
    id: 'spi3M',
    label: '3-Month Standardized Precipitation Index (SPI-3M)',
    shortLabel: 'SPI-3M Index',
    unit: 'std dev',
    description: 'Quantifies cumulative 90-day precipitation surplus/deficit on a standardized normal distribution.',
    legendTitle: 'Standardized Precipitation Index (SPI)',
    legendSteps: [
      { label: '< -2.00 (Extreme)', color: '#581C87', desc: 'Extremely dry (1-in-50 yr)' },
      { label: '-1.50 to -2.00 (Severe)', color: '#DC2626', desc: 'Severely dry' },
      { label: '-1.00 to -1.50 (Moderate)', color: '#F97316', desc: 'Moderately dry' },
      { label: '> -1.00 (Near Normal)', color: '#10B981', desc: 'Normal rainfall range' }
    ]
  },
  soilMoistureDev: {
    id: 'soilMoistureDev',
    label: 'Root-Zone Soil Moisture Deviation',
    shortLabel: 'Soil Moisture Dev',
    unit: '%',
    description: 'Deviation of root-zone (0–40 cm) moisture saturation against 10-year agricultural baseline.',
    legendTitle: 'Soil Moisture Deviation (%)',
    legendSteps: [
      { label: '< -50% (Critical)', color: '#991B1B', desc: 'Permanent wilting point risk' },
      { label: '-35% to -50% (Severe)', color: '#EA580C', desc: 'High root depletion' },
      { label: '-20% to -35% (Moderate)', color: '#CA8A04', desc: 'Capillary water deficit' },
      { label: '> -20% (Mild/Normal)', color: '#16A34A', desc: 'Adequate soil retention' }
    ]
  },
  cropLossRiskPct: {
    id: 'cropLossRiskPct',
    label: 'Agrarian Crop Loss Risk Index',
    shortLabel: 'Crop Loss Risk',
    unit: '%',
    description: 'Econometric yield shortfall model synthesized from phenology stage, soil moisture, and dry spell days.',
    legendTitle: 'Projected Crop Loss (%)',
    legendSteps: [
      { label: '>70% Loss (Critical)', color: '#991B1B', desc: 'Emergency relief mandatory' },
      { label: '55–70% Loss (Severe)', color: '#DC2626', desc: 'Extensive yield reduction' },
      { label: '40–55% Loss (Moderate)', color: '#F59E0B', desc: 'Partial yield loss' },
      { label: '<40% Loss (Low/Mild)', color: '#2E7D32', desc: 'Manageable loss' }
    ]
  },
  precipDeficit: {
    id: 'precipDeficit',
    label: 'Rainfall Deficit vs IMD Normal',
    shortLabel: 'Precip Deficit',
    unit: '%',
    description: 'Percentage departure from long-period average (LPA) monsoon rainfall recorded by IMD rain gauges.',
    legendTitle: 'Rainfall Departure (% LPA)',
    legendSteps: [
      { label: '< -55% (Scanty)', color: '#991B1B', desc: 'Critical rainfall shortfall' },
      { label: '-40% to -55% (Deficient)', color: '#EA580C', desc: 'Severe monsoon hiatus' },
      { label: '-25% to -40% (Sub-normal)', color: '#EAB308', desc: 'Below average precipitation' },
      { label: '> -25% (Normal)', color: '#16A34A', desc: 'Acceptable rainfall' }
    ]
  }
};

export function getDistrictColor(district: DistrictGeoFeature, metric: DroughtMapMetric): string {
  switch (metric) {
    case 'vedasComposite':
      if (district.vedasCategory === 'Severe') return '#991B1B';
      if (district.vedasCategory === 'Moderate') return '#D97706';
      if (district.vedasCategory === 'Mild') return '#EAB308';
      return '#16A34A';

    case 'vci':
      if (district.vci < 25) return '#7F1D1D';
      if (district.vci < 35) return '#C62828';
      if (district.vci < 45) return '#F59E0B';
      return '#2E7D32';

    case 'spi3M':
      if (district.spi3M < -2.0) return '#581C87';
      if (district.spi3M < -1.5) return '#DC2626';
      if (district.spi3M < -1.0) return '#F97316';
      return '#10B981';

    case 'soilMoistureDev':
      if (district.soilMoistureDev < -50) return '#991B1B';
      if (district.soilMoistureDev < -35) return '#EA580C';
      if (district.soilMoistureDev < -20) return '#CA8A04';
      return '#16A34A';

    case 'cropLossRiskPct':
      if (district.cropLossRiskPct >= 70) return '#991B1B';
      if (district.cropLossRiskPct >= 55) return '#DC2626';
      if (district.cropLossRiskPct >= 40) return '#F59E0B';
      return '#2E7D32';

    case 'precipDeficit':
      if (district.precipDeficit < -55) return '#991B1B';
      if (district.precipDeficit < -40) return '#EA580C';
      if (district.precipDeficit < -25) return '#EAB308';
      return '#16A34A';

    default:
      return '#C62828';
  }
}

export function formatMetricValue(district: DistrictGeoFeature, metric: DroughtMapMetric): string {
  switch (metric) {
    case 'vedasComposite':
      return district.vedasCategory;
    case 'vci':
      return `${district.vci.toFixed(1)}%`;
    case 'spi3M':
      return district.spi3M.toFixed(2);
    case 'soilMoistureDev':
      return `${district.soilMoistureDev > 0 ? '+' : ''}${district.soilMoistureDev.toFixed(1)}%`;
    case 'cropLossRiskPct':
      return `${district.cropLossRiskPct}%`;
    case 'precipDeficit':
      return `${district.precipDeficit.toFixed(1)}%`;
  }
}
