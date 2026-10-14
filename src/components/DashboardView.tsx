import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DroughtSeverityChart } from './DroughtSeverityChart';
import { DistrictMetric } from '../types';
import {
  Download,
  FileSpreadsheet,
  RefreshCw,
  Truck,
  ArrowUpRight,
  ChevronDown,
  Layers,
  MapPin,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    setCurrentModule,
    districts,
    convoys,
    directives,
    showToast,
    dismissDirective
  } = useApp();

  // Date range selector state
  const [dateRange, setDateRange] = useState<'7D' | '30D' | '90D'>('30D');

  // Map layer toggle
  const [mapLayer, setMapLayer] = useState<'deficit' | 'moisture' | 'tankers'>('deficit');

  // Selected taluka popover on map
  const [selectedTalukaId, setSelectedTalukaId] = useState<string>('beed');

  // Data table state
  const [tableSearch, setTableSearch] = useState('');
  const [sortField, setSortField] = useState<keyof DistrictMetric>('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Active district for map popover
  const activeDistrict = districts.find(d => d.id === selectedTalukaId) || districts[0];

  // Map Taluka Polygon definitions (single-hue choropleth)
  const mapPolygons = [
    {
      id: 'beed',
      name: 'Beed',
      taluka: 'Patoda & Ashti',
      path: 'M 250 150 L 360 135 L 390 195 L 350 250 L 270 245 L 230 190 Z',
      centroid: { x: 300, y: 190 },
      deficit: -54.2,
      moisture: 14.8,
      claims: 14820,
      crop: 'Soybean & Cotton'
    },
    {
      id: 'latur',
      name: 'Latur',
      taluka: 'Ausa & Nilanga',
      path: 'M 390 195 L 470 185 L 510 255 L 450 310 L 370 285 L 350 250 Z',
      centroid: { x: 430, y: 250 },
      deficit: -49.6,
      moisture: 16.2,
      claims: 12450,
      crop: 'Soybean & Pigeon Pea'
    },
    {
      id: 'osmanabad',
      name: 'Dharashiv',
      taluka: 'Tuljapur & Bhoom',
      path: 'M 270 245 L 350 250 L 370 285 L 350 345 L 290 355 L 240 305 Z',
      centroid: { x: 310, y: 300 },
      deficit: -46.8,
      moisture: 18.1,
      claims: 9120,
      crop: 'Soybean & Sugarcane'
    },
    {
      id: 'parbhani',
      name: 'Parbhani',
      taluka: 'Jintur & Gangakhed',
      path: 'M 360 135 L 460 115 L 490 175 L 390 195 Z',
      centroid: { x: 420, y: 155 },
      deficit: -42.1,
      moisture: 21.4,
      claims: 7840,
      crop: 'Cotton & Soybean'
    },
    {
      id: 'nanded',
      name: 'Nanded',
      taluka: 'Mukhed & Biloli',
      path: 'M 470 185 L 570 170 L 610 240 L 510 255 Z',
      centroid: { x: 535, y: 210 },
      deficit: -38.5,
      moisture: 23.0,
      claims: 6420,
      crop: 'Cotton & Turmeric'
    },
    {
      id: 'jalna',
      name: 'Jalna',
      taluka: 'Ambad & Partur',
      path: 'M 270 95 L 370 80 L 360 135 L 250 150 Z',
      centroid: { x: 310, y: 115 },
      deficit: -36.2,
      moisture: 24.5,
      claims: 5610,
      crop: 'Mosambi & Cotton'
    },
    {
      id: 'solapur',
      name: 'Solapur',
      taluka: 'Karmala & Sangola',
      path: 'M 180 260 L 240 305 L 290 355 L 240 405 L 150 375 L 145 310 Z',
      centroid: { x: 205, y: 335 },
      deficit: -34.5,
      moisture: 25.1,
      claims: 5582,
      crop: 'Pomegranate & Jowar'
    }
  ];

  // Sequential single-hue choropleth fill (light to dark red)
  const getChoroplethFill = (deficit: number) => {
    const abs = Math.abs(deficit);
    if (abs >= 52) return '#991B1B'; // dark red / maroon (critical)
    if (abs >= 45) return '#C62828'; // red (severe)
    if (abs >= 38) return '#EF5350'; // medium red
    if (abs >= 30) return '#FCA5A5'; // light red
    return '#FEE2E2'; // very light red
  };

  // Filtered and sorted table data
  const filteredDistricts = useMemo(() => {
    return districts
      .filter(d => {
        if (!tableSearch) return true;
        const q = tableSearch.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.talukas.toLowerCase().includes(q) ||
          d.division.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortAsc
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [districts, tableSearch, sortField, sortAsc]);

  const handleSort = (field: keyof DistrictMetric) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleDeployTeam = () => {
    setCurrentModule('resource-routing-logistics');
    showToast(
      'Deployment Assigned',
      `Tanker convoy assigned to ${activeDistrict.name} (${activeDistrict.talukas.split(',')[0]}).`,
      'primary'
    );
  };

  const handleUpdateSatellite = () => {
    showToast(
      'Satellite Indices Refreshed',
      'Sentinel-2 / INSAT-3DR NDVI layers synchronized at 09:12 IST.',
      'secondary'
    );
  };

  const handleExportCSV = () => {
    const headers = 'District,Division,Taluka Count,Risk Level,Rainfall Deficit %,Soil Moisture %,Open Claims,Last Action\n';
    const rows = districts
      .map(
        d =>
          `"${d.name}","${d.division}",${d.talukaCount},"${d.riskLevel}",${d.precipDeficit}%,${d.soilMoisture}%,${d.openClaims},"${d.lastAction}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Maharashtra_Drought_Overview_24Oct2026.csv`;
    a.click();
    showToast('Export Completed', 'Downloaded district dataset (CSV)', 'primary');
  };

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Page Header (No 'Good morning' hero text) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">
            State Drought Overview
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Maharashtra State Relief Cell · Last updated 24 Oct 2026, 09:12 IST
          </p>
        </div>

        {/* Action Controls: Flat Segmented Date Control + Primary & Secondary Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Flat Date Range Segmented Control */}
          <div className="flex items-center bg-[#F1F3F5] p-0.5 rounded-md border border-[#E3E6EB]">
            {(['7D', '30D', '90D'] as const).map(range => (
              <button
                key={range}
                type="button"
                onClick={() => setDateRange(range)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Secondary Action */}
          <button
            type="button"
            onClick={handleUpdateSatellite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#E3E6EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#6B7280] stroke-[1.5]" />
            <span>Update satellite data</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleDeployTeam}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3963] shadow-[0_1px_2px_rgba(16,24,40,0.08)] transition-colors"
          >
            <Truck className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Deploy relief team</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Bar: Slim, full-width, light red background #FDECEA, 3px red left border #C62828 */}
      <div className="w-full bg-[#FDECEA] border-l-[3px] border-[#C62828] border-y border-r border-[#F5C6CB] px-3.5 py-2.5 rounded-r-md flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#C62828] min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#C62828] shrink-0" />
          <span className="font-medium truncate">
            Critical moisture deficit detected across 12 talukas in Beed, Latur and Dharashiv. Emergency tanker mobilization active.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setCurrentModule('drought-risk-monitor')}
          className="text-xs font-semibold text-[#C62828] hover:underline whitespace-nowrap ml-4 shrink-0"
        >
          View details →
        </button>
      </div>

      {/* KPI Row of 4 Cards: Consistent heights, 8px radius, white with 1px border #E3E6EB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Districts at high risk */}
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between h-[124px]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Districts at high risk
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#C62828] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
              +2 this week
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[28px] font-bold text-[#111827] tabular-nums leading-none">
              12
            </span>
            <span className="text-xs text-[#6B7280]">of 36 districts</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>Zone V severe stress</span>
            {/* Sparkline mini-graph */}
            <svg className="w-16 h-3 text-[#C62828]" viewBox="0 0 60 12" fill="none">
              <path
                d="M 2 10 L 15 8 L 30 9 L 45 4 L 58 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Relief budget utilised */}
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between h-[124px]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Relief budget utilised
            </span>
            <span className="text-[11px] text-[#4B5563] font-medium tabular-nums">
              28.4%
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[28px] font-bold text-[#111827] tabular-nums leading-none">
              ₹142 Cr
            </span>
            <span className="text-xs text-[#6B7280]">of ₹500 Cr cap</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full bg-[#E3E6EB] rounded-full h-1 overflow-hidden">
              <div
                className="bg-[#0F4C81] h-full rounded-full"
                style={{ width: '28.4%' }}
              />
            </div>
            <span className="text-[11px] text-[#6B7280] truncate">
              ₹358 Cr uncommitted reserve
            </span>
          </div>
        </div>

        {/* Card 3: Verified beneficiaries */}
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between h-[124px]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Verified beneficiaries
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
              94.2% verified
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[28px] font-bold text-[#111827] tabular-nums leading-none">
              48,392
            </span>
            <span className="text-xs text-[#6B7280]">farmers</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>Geo-tagged plots</span>
            <span className="text-[#2E7D32] font-medium">+1,240 today</span>
          </div>
        </div>

        {/* Card 4: Convoys in transit */}
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between h-[124px]">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Convoys in transit
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
              On schedule
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-[28px] font-bold text-[#111827] tabular-nums leading-none">
              {convoys.length}
            </span>
            <span className="text-xs text-[#6B7280]">relief fleets</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
            <span>Water tankers & fodder</span>
            <span>4 hr avg ETA</span>
          </div>
        </div>
      </div>

      {/* Main Area: Map Card (65% width) next to Priority Actions Card (35% width) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Map Card (~65% width, 8 cols on desktop) */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between">
          <div>
            {/* Map Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3E6EB]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#111827]">
                    Regional Drought Severity Map
                  </h3>
                  <span className="text-[11px] text-[#6B7280]">
                    Marathwada Division
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Click a taluka polygon to inspect key telemetry and dispatch units
                </p>
              </div>

              {/* Layer Toggle & Actions */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="flex items-center bg-[#F1F3F5] p-0.5 rounded-md border border-[#E3E6EB]">
                  <button
                    type="button"
                    onClick={() => setMapLayer('deficit')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                      mapLayer === 'deficit'
                        ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    Rainfall deficit
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLayer('moisture')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                      mapLayer === 'moisture'
                        ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    Soil moisture
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapLayer('tankers')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                      mapLayer === 'tankers'
                        ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    Routes
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="p-1 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F3F5]"
                  title="Download GIS data"
                >
                  <Download className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Map Canvas with Single-Hue Choropleth & Scale Bar */}
            <div className="relative w-full h-[360px] bg-[#F9FAFB] rounded-md border border-[#E3E6EB] mt-3 overflow-hidden">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#D1D5DB_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

              {/* Clean SVG Vector Map */}
              <svg className="w-full h-full" viewBox="0 0 750 440" preserveAspectRatio="xMidYMid meet">
                {/* District Polygons */}
                {mapPolygons.map(poly => {
                  const isSelected = selectedTalukaId === poly.id;
                  const fill = getChoroplethFill(poly.deficit);

                  return (
                    <g key={poly.id} onClick={() => setSelectedTalukaId(poly.id)} className="cursor-pointer">
                      <path
                        d={poly.path}
                        fill={fill}
                        fillOpacity={isSelected ? 0.95 : 0.8}
                        stroke={isSelected ? '#0F4C81' : '#FFFFFF'}
                        strokeWidth={isSelected ? 2.5 : 1.2}
                        className="transition-all duration-150 hover:fill-opacity-95"
                      />
                      {/* District Label */}
                      <text
                        x={poly.centroid.x}
                        y={poly.centroid.y - 4}
                        textAnchor="middle"
                        fill={Math.abs(poly.deficit) >= 45 ? '#FFFFFF' : '#111827'}
                        fontSize="11px"
                        fontWeight="600"
                        fontFamily="Inter, sans-serif"
                        className="pointer-events-none"
                      >
                        {poly.name}
                      </text>
                      <text
                        x={poly.centroid.x}
                        y={poly.centroid.y + 10}
                        textAnchor="middle"
                        fill={Math.abs(poly.deficit) >= 45 ? '#FEE2E2' : '#4B5563'}
                        fontSize="9.5px"
                        fontWeight="500"
                        fontFamily="Inter, sans-serif"
                        className="pointer-events-none"
                      >
                        {poly.deficit}%
                      </text>
                    </g>
                  );
                })}

                {/* Tanker Corridors (if layer enabled) */}
                {mapLayer === 'tankers' && (
                  <g className="pointer-events-none">
                    <path
                      d="M 300 190 Q 370 210 430 250"
                      stroke="#0F4C81"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      fill="none"
                    />
                    <path
                      d="M 430 250 Q 380 270 310 300"
                      stroke="#0F4C81"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      fill="none"
                    />
                  </g>
                )}
              </svg>

              {/* Taluka Detail Popover (Small white card, 4 key-value rows, NO floating dark overlay) */}
              <div className="absolute top-3 left-3 bg-white border border-[#E3E6EB] rounded-md shadow-md p-3 w-64 text-xs z-10">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#E3E6EB] mb-2">
                  <div>
                    <span className="font-bold text-[#111827]">{activeDistrict.name}</span>
                    <span className="text-[11px] text-[#6B7280] block">{activeDistrict.talukas}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      activeDistrict.riskLevel === 'Critical'
                        ? 'bg-[#FDECEA] text-[#C62828]'
                        : 'bg-[#FFF8E1] text-[#B26A00]'
                    }`}
                  >
                    {activeDistrict.riskLevel}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Rainfall deficit:</span>
                    <span className="font-semibold text-[#C62828] tabular-nums">
                      {activeDistrict.precipDeficit}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Soil moisture:</span>
                    <span className="font-semibold text-[#111827] tabular-nums">
                      {activeDistrict.soilMoisture}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Open claims:</span>
                    <span className="font-semibold text-[#111827] tabular-nums">
                      {activeDistrict.openClaims.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Primary crop:</span>
                    <span className="font-medium text-[#111827]">Soybean / Cotton</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDeployTeam}
                  className="mt-2.5 w-full py-1 rounded bg-[#0F4C81] text-white font-medium text-[11px] hover:bg-[#0A3963] transition-colors"
                >
                  Deploy tankers to taluka
                </button>
              </div>

              {/* Map Legend Box */}
              <div className="absolute bottom-3 right-3 bg-white/95 border border-[#E3E6EB] rounded px-2.5 py-1.5 text-[11px] text-[#4B5563] shadow-sm flex items-center gap-3">
                <span className="font-semibold text-[#111827]">Rain deficit:</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#991B1B]" />
                  <span>&gt;50%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#C62828]" />
                  <span>45–50%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#EF5350]" />
                  <span>35–45%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#FCA5A5]" />
                  <span>&lt;35%</span>
                </div>
              </div>

              {/* Scale Bar */}
              <div className="absolute bottom-3 left-3 bg-white/90 border border-[#E3E6EB] rounded px-2 py-1 text-[10px] text-[#6B7280] shadow-sm flex items-center gap-1.5">
                <div className="w-10 h-1 bg-[#111827]" />
                <span>50 km</span>
              </div>
            </div>
          </div>

          {/* Provenance note */}
          <div className="pt-2 text-[11px] text-[#9CA3AF] flex items-center justify-between">
            <span>Source: IMD rainfall data, Sentinel-2 / INSAT-3DR, updated daily · Survey of India reference grid</span>
            <button
              type="button"
              onClick={() => setCurrentModule('drought-risk-monitor')}
              className="text-[#0F4C81] font-medium hover:underline text-[11px]"
            >
              Open multispectral viewer →
            </button>
          </div>
        </div>

        {/* Priority Actions Card (~35% width, 4 cols on desktop) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E6EB]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#111827]">
                  Priority Actions
                </h3>
                <span className="text-[11px] px-1.5 py-0.2 rounded bg-[#F1F3F5] text-[#4B5563] font-medium">
                  {directives.length} pending
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280]">Relief Cell Queue</span>
            </div>

            {/* Compact Action List (severity dot, title, description, timestamp, text-button) */}
            <div className="divide-y divide-[#F1F3F5] mt-1">
              {directives.map(dir => (
                <div key={dir.id} className="py-2.5 first:pt-2">
                  <div className="flex items-start gap-2">
                    {/* Severity dot */}
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                        dir.severity === 'critical' ? 'bg-[#C62828]' : 'bg-[#B26A00]'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#111827] leading-snug">
                          {dir.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#4B5563] mt-0.5 leading-relaxed">
                        {dir.description}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-[#9CA3AF] tabular-nums">
                          {dir.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (dir.targetModule) setCurrentModule(dir.targetModule);
                            showToast('Action Processed', `Triggered: ${dir.title}`, 'primary');
                          }}
                          className="text-[11px] font-semibold text-[#0F4C81] hover:underline"
                        >
                          {dir.actionText} →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3E6EB] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#6B7280]">All actions logged to State Cell audit trail</span>
            <button
              type="button"
              onClick={() => showToast('Protocol Verified', 'All active directives acknowledged by Duty Officer.', 'secondary')}
              className="text-[11px] text-[#4B5563] hover:text-[#111827] font-medium"
            >
              Acknowledge all
            </button>
          </div>
        </div>
      </div>

      {/* D3.js Line Chart: Visualizing Drought Severity & Predictive Trajectory */}
      <DroughtSeverityChart />

      {/* Data Table: Districts Requiring Attention */}
      <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3E6EB]">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Districts Requiring Attention
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Ranked by composite moisture deficit and relief vulnerability index
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
              <input
                type="text"
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                placeholder="Filter districts..."
                className="bg-[#F6F7F9] text-xs text-[#111827] pl-8 pr-3 py-1 rounded border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] w-44"
              />
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#E3E6EB] bg-white text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#6B7280] stroke-[1.5]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Sortable Table (Zebra-free, clean 13px font, hover state) */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#E3E6EB] text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider bg-[#FAFBFC]">
                <th
                  onClick={() => handleSort('name')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#111827] select-none"
                >
                  District
                </th>
                <th
                  onClick={() => handleSort('riskLevel')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#111827] select-none"
                >
                  Risk level
                </th>
                <th
                  onClick={() => handleSort('precipDeficit')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#111827] select-none"
                >
                  Rainfall deficit %
                </th>
                <th
                  onClick={() => handleSort('soilMoisture')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#111827] select-none"
                >
                  Soil moisture %
                </th>
                <th
                  onClick={() => handleSort('openClaims')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#111827] select-none"
                >
                  Open claims
                </th>
                <th className="py-2.5 px-3">
                  Last action
                </th>
                <th className="py-2.5 px-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EB]">
              {filteredDistricts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#6B7280]">
                    No districts matching filter.
                  </td>
                </tr>
              ) : (
                filteredDistricts.map(dist => (
                  <tr
                    key={dist.id}
                    className="hover:bg-[#F9FAFB] transition-colors group"
                  >
                    {/* District & Talukas */}
                    <td className="py-2.5 px-3 font-medium text-[#111827]">
                      <div>
                        <span className="font-semibold">{dist.name}</span>
                        <span className="text-[11px] text-[#6B7280] block font-normal">
                          {dist.talukas}
                        </span>
                      </div>
                    </td>

                    {/* Risk Level with Small Dot */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            dist.riskLevel === 'Critical'
                              ? 'bg-[#C62828]'
                              : dist.riskLevel === 'Warning'
                              ? 'bg-[#B26A00]'
                              : 'bg-[#2E7D32]'
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            dist.riskLevel === 'Critical'
                              ? 'text-[#C62828]'
                              : dist.riskLevel === 'Warning'
                              ? 'text-[#B26A00]'
                              : 'text-[#2E7D32]'
                          }`}
                        >
                          {dist.riskLevel}
                        </span>
                      </div>
                    </td>

                    {/* Rainfall Deficit with Subtle Mini Bar */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums font-semibold text-[#C62828]">
                          {dist.precipDeficit}%
                        </span>
                        <div className="w-12 bg-[#F1F3F5] rounded-full h-1 overflow-hidden">
                          <div
                            className="bg-[#C62828] h-full"
                            style={{ width: `${Math.min(100, Math.abs(dist.precipDeficit))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Soil Moisture */}
                    <td className="py-2.5 px-3 tabular-nums text-[#111827]">
                      {dist.soilMoisture}%
                    </td>

                    {/* Open Claims */}
                    <td className="py-2.5 px-3 tabular-nums text-[#111827]">
                      {dist.openClaims.toLocaleString()}
                    </td>

                    {/* Last Action */}
                    <td className="py-2.5 px-3 text-xs text-[#4B5563]">
                      {dist.lastAction}
                    </td>

                    {/* Action Link */}
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTalukaId(dist.id);
                          setCurrentModule('drought-risk-monitor');
                        }}
                        className="text-xs font-semibold text-[#0F4C81] hover:underline"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Provenance */}
        <div className="pt-3 border-t border-[#E3E6EB] mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#6B7280] gap-2">
          <span>Source: Maharashtra Department of Relief and Rehabilitation, updated 24 Oct 2026, 09:12 IST</span>
          <span className="tabular-nums">Showing {filteredDistricts.length} of {districts.length} monitored administrative units</span>
        </div>
      </div>
    </div>
  );
};
