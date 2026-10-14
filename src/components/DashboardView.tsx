import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOPOGRAPHIC_MAP_BG } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const {
    officerName,
    setCurrentModule,
    districts,
    convoys,
    claims,
    directives,
    dismissDirective,
    authorizeBatchClaims,
    showToast,
    setIsHealthModalOpen,
    setSelectedConvoyForCall
  } = useApp();

  const [activeProjection, setActiveProjection] = useState<'15D' | '30D' | '60D'>('30D');
  const [selectedHotspot, setSelectedHotspot] = useState<'beed' | 'latur' | 'solapur'>('beed');

  const activeDistrict = districts.find(d => d.id === selectedHotspot) || districts[0];

  const handleDispatchRapidUnits = () => {
    setCurrentModule('resource-routing-logistics');
    showToast(
      'Rapid Units Assigned',
      `Dispatching 2x potable water tankers directly to ${activeDistrict.name} (${activeDistrict.taluka}).`,
      'primary'
    );
  };

  const handleRecalculateAi = () => {
    showToast(
      'MILP Algorithm Re-run',
      'CartoSat-3 elevation slope and current evapotranspiration rates converged in 28ms.',
      'secondary'
    );
  };

  const handleExportBrief = () => {
    setCurrentModule('reports-and-analytics');
    showToast('Executive Relief Brief', 'Navigating to Reports & Analytics for print export.', 'secondary');
  };

  const handleDeclareCalamity = () => {
    showToast(
      'State Calamity Protocol',
      'NDRF contingency tranche notification dispatched to Ministry of Home Affairs.',
      'error'
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Top Greeting & Live Advisory Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span>Operational Command Matrix</span>
            <span className="text-outline">/</span>
            <span>Maharashtra State Relief Cell</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3 mt-1">
            <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-semibold tracking-tight">
              Good morning, <span className="text-primary font-bold">{officerName}</span>
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-xs border border-outline-variant/30">
              <span className="material-symbols-outlined text-xs text-primary">calendar_today</span>
              <span>Today, 24 Oct 2026</span>
            </div>
          </div>
        </div>

        {/* El Niño Live Severe Weather Warning Banner */}
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-error-container/20 border border-error/30 shadow-lg backdrop-blur-md max-w-xl">
          <div className="p-2.5 rounded-xl bg-error-container/50 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-error text-xl animate-pulse">crisis_alert</span>
          </div>
          <div className="flex flex-col pr-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-xs text-error uppercase font-bold tracking-wider">
                El Niño Advisory Priority Alpha
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-error text-on-error uppercase">
                Critical
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-error-container mt-0.5 truncate">
              Severe dry spell projected for Marathwada belt: Beed, Latur & Osmanabad rain deficit at +54%.
            </p>
          </div>
          <button
            onClick={() => setCurrentModule('drought-risk-monitor')}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-label-md transition-all border border-outline-variant/40"
          >
            View Telemetry
          </button>
        </div>
      </div>

      {/* Primary Metric Instrumentation Row (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Drought Vulnerable Districts */}
        <div
          onClick={() => setCurrentModule('drought-risk-monitor')}
          className="rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-error/40 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-error-container/30 border border-error/20 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Districts at High Risk
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">Zone V Threshold</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full font-label-md text-[11px] bg-error-container/40 text-error flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" /> Alert
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-xl text-3xl text-on-surface font-bold">12</span>
              <span className="font-headline-sm text-lg text-on-surface-variant">/ 36</span>
            </div>
            <div className="flex items-center gap-1 font-label-md text-xs text-error bg-error-container/20 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+4 since last week</span>
            </div>
          </div>

          <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div className="bg-error h-full rounded-full transition-all duration-700" style={{ width: '33.3%' }} />
          </div>
        </div>

        {/* Card 2: Allocated Relief Budget */}
        <div
          onClick={() => setCurrentModule('relief-budget-optimizer')}
          className="rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-primary/40 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">account_balance</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Allocated Relief Budget
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">State Contingency Pool</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full font-label-md text-[11px] bg-primary-container/20 text-primary flex items-center gap-1 font-bold">
              Active Cap
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-xl text-2xl text-primary font-bold">₹ 142 Cr</span>
              <span className="font-label-md text-xs text-on-surface-variant">/ ₹ 500 Cr</span>
            </div>
            <span className="font-label-numeric text-base text-primary font-semibold">28.4%</span>
          </div>

          <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: '28.4%' }} />
          </div>
        </div>

        {/* Card 3: Vulnerable Farmers Identified */}
        <div
          onClick={() => setCurrentModule('claim-evidence-review')}
          className="rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-secondary/40 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-xl">nature_people</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Verified Beneficiaries
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">Sat-Validated Plots</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full font-label-md text-[11px] bg-secondary-container/20 text-secondary flex items-center gap-1 font-bold">
              Geo-Tagged
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-headline-xl text-2xl text-on-surface font-bold">48,392</span>
            <div className="flex items-center gap-1 font-label-md text-xs text-primary bg-primary-container/20 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>94.2% verified</span>
            </div>
          </div>

          <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '94.2%' }} />
          </div>
        </div>

        {/* Card 4: Active Relief Convoys */}
        <div
          onClick={() => setCurrentModule('resource-routing-logistics')}
          className="rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-tertiary/40 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/20 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Resources in Transit
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">5 Critical Arteries</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full font-label-md text-[11px] bg-tertiary-container/20 text-tertiary flex items-center gap-1 font-bold">
              98% On-Time
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-xl text-2xl text-on-surface font-bold">{convoys.length}</span>
              <span className="font-label-md text-xs text-on-surface-variant">Fleet Convoys</span>
            </div>
            <div className="flex items-center gap-1 font-label-md text-xs text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-xs">alt_route</span>
              <span>Active Route 4</span>
            </div>
          </div>

          <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full transition-all duration-700" style={{ width: '78%' }} />
          </div>
        </div>
      </div>

      {/* Operational Command Grid (8 Cols Left / 4 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Interactive Geospatial Drought Vulnerability Map Container */}
          <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-outline-variant/30">
                  <span className="material-symbols-outlined text-lg">map</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base text-on-surface font-bold leading-tight">
                    Drought Risk Cartography & Soil Moisture Index
                  </h2>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Live INSAT-3DR Multispectral Imagery (30m Resolution Ground Model)
                  </span>
                </div>
              </div>

              {/* Horizon Switcher & Expand Button */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                  {(['15D', '30D', '60D'] as const).map(horizon => (
                    <button
                      key={horizon}
                      type="button"
                      onClick={() => setActiveProjection(horizon)}
                      className={`px-3 py-1 rounded-lg font-label-md text-xs transition-all ${
                        activeProjection === horizon
                          ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {horizon === '30D' ? '30D Projected' : horizon}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentModule('drought-risk-monitor')}
                  className="p-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface border border-outline-variant/30"
                  title="Expand GIS Screen"
                >
                  <span className="material-symbols-outlined text-base">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Geospatial Canvas with SVG Overlay */}
            <div className="relative w-full h-[400px] mt-4 rounded-xl bg-surface-container-lowest overflow-hidden border border-outline-variant/30">
              {/* Satellite Background */}
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center filter contrast-125"
                style={{ backgroundImage: `url('${TOPOGRAPHIC_MAP_BG}')` }}
              />

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#4edea3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              {/* SVG Region Boundaries & Transit Vectors */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                {/* Western Ghats (Low Risk - Green) */}
                <path
                  d="M 120 180 Q 140 260 170 340 L 220 310 Q 200 220 180 150 Z"
                  className="fill-primary/20 stroke-primary/50 hover:fill-primary/40 cursor-pointer transition-colors"
                  strokeWidth="1.5"
                >
                  <title>Nashik & Pune West: Low Stress</title>
                </path>

                {/* Vidarbha Eastern Zone (Moderate - Amber) */}
                <path
                  d="M 520 80 Q 640 120 720 180 L 680 260 Q 560 210 490 160 Z"
                  className="fill-tertiary/25 stroke-tertiary/60 hover:fill-tertiary/45 cursor-pointer transition-colors"
                  strokeWidth="1.5"
                >
                  <title>Nagpur Basin: Moderate Deficit</title>
                </path>

                {/* Core Marathwada Stress Epicenter (Critical - Coral/Red) */}
                <path
                  d="M 280 190 L 410 160 L 470 230 L 390 320 L 290 280 Z"
                  className="fill-error/30 stroke-error/80 hover:fill-error/50 cursor-pointer transition-colors animate-pulse"
                  strokeWidth="2"
                >
                  <title>Marathwada Core: Severe Risk</title>
                </path>

                {/* Transit Vector Paths */}
                <path
                  d="M 200 240 Q 300 220 360 235 T 520 210"
                  stroke="#93ccff"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  fill="none"
                  className="opacity-70"
                />
                <path
                  d="M 360 235 L 340 310"
                  stroke="#93ccff"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="opacity-70"
                />
              </svg>

              {/* Hotspot Markers */}
              {/* Beed */}
              <button
                type="button"
                onClick={() => setSelectedHotspot('beed')}
                className="absolute top-[52%] left-[44%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 group cursor-pointer"
                title="Beed District Hotspot"
              >
                <span className="w-7 h-7 rounded-full bg-error/30 animate-ping absolute" />
                <span className="w-3.5 h-3.5 rounded-full bg-error shadow-[0_0_12px_#ffb4ab] border-2 border-white/60 group-hover:scale-125 transition-transform" />
              </button>

              {/* Latur */}
              <button
                type="button"
                onClick={() => setSelectedHotspot('latur')}
                className="absolute top-[68%] left-[54%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 group cursor-pointer"
                title="Latur District Hotspot"
              >
                <span className="w-6 h-6 rounded-full bg-error/30 animate-ping absolute" />
                <span className="w-3 h-3 rounded-full bg-error shadow-[0_0_10px_#ffb4ab] border-2 border-white/60 group-hover:scale-125 transition-transform" />
              </button>

              {/* Solapur */}
              <button
                type="button"
                onClick={() => setSelectedHotspot('solapur')}
                className="absolute top-[75%] left-[39%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 group cursor-pointer"
                title="Solapur District Hotspot"
              >
                <span className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_8px_#ffb95f] border-2 border-white/60 group-hover:scale-125 transition-transform" />
              </button>

              {/* Floating Inspection Telemetry HUD Pill (Beed Detail) */}
              <div className="absolute top-4 left-4 p-4 rounded-2xl bg-surface-container-high/95 backdrop-blur-2xl shadow-2xl border border-outline-variant/40 max-w-xs transition-transform hover:scale-102">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error" />
                    <span className="font-headline-sm text-sm text-on-surface font-bold">
                      {activeDistrict.name} Taluka
                    </span>
                  </div>
                  <span className="font-label-md text-[10px] px-2 py-0.5 rounded-full bg-error-container/30 text-error font-bold uppercase">
                    {activeDistrict.riskLevel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-body-sm text-xs">
                  <div className="flex flex-col bg-surface-container-lowest/60 p-2 rounded-lg">
                    <span className="text-on-surface-variant text-[11px]">Precip. Deficit</span>
                    <span className="font-label-numeric text-sm text-error font-bold">
                      {activeDistrict.precipDeficit}%
                    </span>
                  </div>
                  <div className="flex flex-col bg-surface-container-lowest/60 p-2 rounded-lg">
                    <span className="text-on-surface-variant text-[11px]">Soil Moisture</span>
                    <span className="font-label-numeric text-sm text-tertiary font-bold">
                      {activeDistrict.soilMoisture}% (Crit)
                    </span>
                  </div>
                  <div className="flex flex-col bg-surface-container-lowest/60 p-2 rounded-lg">
                    <span className="text-on-surface-variant text-[11px]">Active Claims</span>
                    <span className="font-label-numeric text-sm text-on-surface font-bold">
                      {activeDistrict.activeClaims.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col bg-surface-container-lowest/60 p-2 rounded-lg">
                    <span className="text-on-surface-variant text-[11px]">AI Confidence</span>
                    <span className="font-label-numeric text-sm text-primary font-bold">
                      {activeDistrict.aiConfidence}%
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDispatchRapidUnits}
                  className="mt-3 w-full py-2 rounded-xl bg-error hover:bg-error/90 text-on-error font-label-md text-xs flex items-center justify-center gap-1.5 font-bold transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">tune</span>
                  <span>Dispatch Rapid Water Units</span>
                </button>
              </div>

              {/* Map Legend Box */}
              <div className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/30 flex items-center gap-4 text-xs font-label-md">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-error" />
                  <span className="text-on-surface">Very High (&gt;50%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <span className="text-on-surface">Moderate (25-50%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-on-surface">Optimal</span>
                </div>
              </div>
            </div>

            {/* Quick District Risk Assessment Strip */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {districts.map(dist => (
                <button
                  key={dist.id}
                  onClick={() => setSelectedHotspot(dist.id as any)}
                  className={`p-2.5 rounded-xl text-left flex flex-col transition-all border ${
                    selectedHotspot === dist.id
                      ? 'bg-surface-container-high border-primary/50 shadow-md'
                      : 'bg-surface-container-highest/60 border-outline-variant/20 hover:bg-surface-container-high'
                  }`}
                >
                  <span className="font-label-md text-xs text-on-surface-variant">{dist.name}</span>
                  <span
                    className={`font-label-numeric text-sm font-bold ${
                      dist.riskScore >= 0.85
                        ? 'text-error'
                        : dist.riskScore >= 0.65
                        ? 'text-tertiary'
                        : 'text-secondary'
                    }`}
                  >
                    {dist.riskScore} Risk
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Dry Spell {dist.drySpellDays}d
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Split Analytical Row: MILP Budget Simulator & AI Claim Verification Queue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module A: Relief Allocation Quick Simulator */}
            <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">insights</span>
                    <h3 className="font-headline-sm text-sm text-on-surface font-bold">
                      MILP Budget Optimizer
                    </h3>
                  </div>
                  <span className="font-label-md text-[11px] text-primary bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded-full font-bold">
                    2.4x Multiplier
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Algorithmically recommended micro-grants based on satellite crop stress indicators vs equal blanket splits.
                </p>

                {/* Live Comparison Rows */}
                <div className="mt-4 flex flex-col gap-3">
                  {districts.slice(0, 4).map(d => (
                    <div key={d.id}>
                      <div className="flex justify-between font-label-md text-xs mb-1">
                        <span className="text-on-surface">{d.name} Drought Grant</span>
                        <span className="text-primary font-bold">
                          ₹ {d.reqBudgetCr.toFixed(1)} Cr{' '}
                          <span className="text-on-surface-variant font-normal text-[11px]">
                            ({d.baseSharePct}% share)
                          </span>
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, d.baseSharePct * 3)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-sm text-xs text-on-surface-variant">Recommended Deployment</span>
                  <span className="font-headline-sm text-base text-on-surface font-bold">
                    ₹ 132.0 Cr
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentModule('relief-budget-optimizer')}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Apply Simulation
                </button>
              </div>
            </div>

            {/* Module B: Claim Evidence Review Table */}
            <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">fact_check</span>
                    <h3 className="font-headline-sm text-sm text-on-surface font-bold">
                      AI Claim Evidence Stream
                    </h3>
                  </div>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    {claims.length} of 48.3k Claims
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  High-confidence machine verification cross-referencing Sentinel-2 NDVI anomalies.
                </p>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left font-body-sm text-xs">
                    <thead>
                      <tr className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                        <th className="pb-2">Claim ID</th>
                        <th className="pb-2">District</th>
                        <th className="pb-2 text-right">Loss Index</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {claims.slice(0, 4).map(claim => (
                        <tr key={claim.id} className="hover:bg-surface-container-high/60 transition-colors">
                          <td className="py-2.5 font-mono text-on-surface">{claim.id}</td>
                          <td className="py-2.5 text-on-surface">
                            {claim.district} ({claim.taluka})
                          </td>
                          <td
                            className={`py-2.5 text-right font-semibold ${
                              claim.claimedLoss > 60
                                ? 'text-error'
                                : claim.claimedLoss > 30
                                ? 'text-tertiary'
                                : 'text-on-surface-variant'
                            }`}
                          >
                            {claim.claimedLoss}%
                          </td>
                          <td className="py-2.5 text-right">
                            <span
                              className={`px-2 py-0.5 rounded-full font-label-md text-[10px] font-bold ${
                                claim.status === 'Genuine'
                                  ? 'bg-primary-container/20 text-primary'
                                  : claim.status === 'Needs Review'
                                  ? 'bg-tertiary-container/20 text-tertiary'
                                  : 'bg-error-container/30 text-error'
                              }`}
                            >
                              {claim.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentModule('claim-evidence-review')}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-all border border-outline-variant/30"
                >
                  Audit Telemetry Log
                </button>
                <button
                  type="button"
                  onClick={() => authorizeBatchClaims()}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Authorize Batch (142)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Critical Executive Priority Directives */}
          <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg">bolt</span>
                <h3 className="font-headline-sm text-sm text-on-surface font-bold">Priority Directives</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            </div>

            <div className="flex flex-col gap-3">
              {directives.map(dir => (
                <div
                  key={dir.id}
                  className="p-3.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/30 transition-all flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label-md text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        dir.category === 'Critical'
                          ? 'bg-error-container/40 text-error'
                          : dir.category === 'Warning'
                          ? 'bg-tertiary-container/30 text-tertiary'
                          : 'bg-secondary-container/30 text-secondary'
                      }`}
                    >
                      {dir.tag}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">{dir.timestamp}</span>
                  </div>

                  <p className="font-body-md text-xs text-on-surface font-medium leading-snug">
                    {dir.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-body-sm text-xs text-primary font-semibold">
                      {dir.metricLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (dir.targetModule) setCurrentModule(dir.targetModule);
                        dismissDirective(dir.id);
                      }}
                      className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-md text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                    >
                      {dir.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Routing & Fleet Realtime Telemetry Card */}
          <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">alt_route</span>
                <h3 className="font-headline-sm text-sm text-on-surface font-bold">Corridor Tracking</h3>
              </div>
              <span className="font-label-md text-xs text-primary font-bold">
                {convoys.length} Convoys En Route
              </span>
            </div>

            {/* Micro GIS Corridor Miniature Map */}
            <div className="w-full h-36 rounded-xl bg-surface-container-lowest relative overflow-hidden border border-outline-variant/30 bg-cover bg-center">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: `url('${TOPOGRAPHIC_MAP_BG}')` }}
              />
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-[1px] p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded-md bg-surface-container-high/90 text-on-surface font-label-md text-xs border border-outline-variant/30">
                    Corridor Beta-1
                  </span>
                  <span className="text-primary font-mono text-xs font-bold">54 km/h GPS</span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-lowest/80 p-2 rounded-lg border border-outline-variant/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-body-sm text-xs text-on-surface">
                      Pune Depot → Solapur Mandi
                    </span>
                  </div>
                  <span className="font-label-md text-xs text-primary font-bold">ETA 2h 10m</span>
                </div>
              </div>
            </div>

            {/* Fleet Status Summary Rows */}
            <div className="flex flex-col gap-1.5 font-body-sm text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">water_drop</span>
                  <span className="text-on-surface">Water Tankers (24)</span>
                </div>
                <span className="font-bold text-primary">On Schedule</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
                  <span className="text-on-surface">Cattle Feed Kits (3,200)</span>
                </div>
                <span className="font-bold text-secondary">Loading (Beed)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">medical_services</span>
                  <span className="text-on-surface">Veterinary Mobile Kits (8)</span>
                </div>
                <span className="font-bold text-tertiary">In Transit</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentModule('resource-routing-logistics')}
              className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs font-semibold transition-all border border-outline-variant/30 text-center cursor-pointer"
            >
              Launch Realtime Fleet GPS Console
            </button>
          </div>

          {/* Quick Immediate Execution Shortcut Pod */}
          <div className="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-3">
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Immediate Execution
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleRecalculateAi}
                className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 transition-all flex flex-col items-center justify-center text-center gap-1 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-2xl">
                  model_training
                </span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Recalculate AI</span>
              </button>
              <button
                type="button"
                onClick={handleExportBrief}
                className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 transition-all flex flex-col items-center justify-center text-center gap-1 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform text-2xl">
                  picture_as_pdf
                </span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Export Brief</span>
              </button>
              <button
                type="button"
                onClick={() => setIsHealthModalOpen(true)}
                className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 transition-all flex flex-col items-center justify-center text-center gap-1 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform text-2xl">
                  sensors
                </span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Sync Ground Sensors</span>
              </button>
              <button
                type="button"
                onClick={handleDeclareCalamity}
                className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/30 transition-all flex flex-col items-center justify-center text-center gap-1 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-error group-hover:scale-110 transition-transform text-2xl">
                  emergency_home
                </span>
                <span className="font-label-md text-xs text-on-surface font-semibold">Declare State Calamity</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quick Status Drawer: Ground Sensor Telemetry Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-low/90 backdrop-blur-md border border-outline-variant/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-headline-sm text-sm text-on-surface font-bold">1,480 / 1,500</span>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Automated Weather Stations Active
            </span>
          </div>
          <div className="hidden md:block h-4 w-px bg-outline-variant/40" />
          <div className="hidden md:flex items-center gap-2 font-body-sm text-xs text-on-surface-variant">
            <span>Soil Moisture Probes:</span>
            <span className="text-primary font-bold">98.7% Online</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-md text-xs text-on-surface-variant">Telemetry sync freq: 300s</span>
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-all border border-outline-variant/30 cursor-pointer"
          >
            Telemetry Health Check
          </button>
        </div>
      </div>
    </div>
  );
};
