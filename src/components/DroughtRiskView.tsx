import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOPOGRAPHIC_MAP_BG } from '../data/mockData';

export const DroughtRiskView: React.FC = () => {
  const { districts, setCurrentModule, showToast } = useApp();
  const [selectedHorizon, setSelectedHorizon] = useState<'30d' | '60d' | '90d'>('30d');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('beed');

  const selectedDist = districts.find(d => d.id === selectedDistrictId) || districts[0];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  // Synthetic VCI Heatmap colors
  const getCellColor = (year: number, monthIdx: number) => {
    if (year === 2026 && monthIdx >= 6) {
      if (monthIdx === 7 || monthIdx === 8 || monthIdx === 9) return 'bg-error'; // Extreme drought in Aug-Oct
      return 'bg-tertiary';
    }
    if (year === 2024 && (monthIdx === 5 || monthIdx === 6)) return 'bg-error';
    if ((year + monthIdx) % 7 === 0) return 'bg-error/80';
    if ((year + monthIdx) % 3 === 0) return 'bg-tertiary';
    if ((year + monthIdx) % 4 === 0) return 'bg-yellow-400';
    return 'bg-primary-container/80';
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-xs tracking-wider uppercase mb-1">
            <span>Meteorological Intelligence</span>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="text-tertiary font-semibold">INSAT-3DR Multispectral</span>
          </div>
          <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
            Drought Risk Monitor & NDVI Indices
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Monitor drought risk indicators, rainfall deficit, and dry spells across Marathwada agrarian zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
            {(['30d', '60d', '90d'] as const).map(h => (
              <button
                key={h}
                type="button"
                onClick={() => setSelectedHorizon(h)}
                className={`px-3 py-1.5 rounded-lg font-headline-sm text-xs font-semibold transition-all ${
                  selectedHorizon === h
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Last {h.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentModule('relief-budget-optimizer');
              showToast('Optimizer Launched', 'Passing active drought deficit values to MILP solver.', 'primary');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary font-headline-sm text-xs font-bold shadow-md hover:bg-primary-fixed-dim transition-all"
          >
            <span>Run Budget Optimizer</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Top 4 Key Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container/20 border border-error/30 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-xl">cloud_off</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Rainfall Deficit
              </span>
              <div className="font-headline-xl text-xl text-error font-bold mt-0.5">
                {selectedDist.precipDeficit}%
              </div>
            </div>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant">vs 50-yr avg</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-xl">sunny</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Dry Spell Duration
              </span>
              <div className="font-headline-xl text-xl text-tertiary font-bold mt-0.5">
                {selectedDist.drySpellDays} days
              </div>
            </div>
          </div>
          <span className="font-body-sm text-[11px] text-tertiary font-semibold">Consecutive</span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container/20 border border-error/30 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-xl">water_damage</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Soil Moisture
              </span>
              <div className="font-headline-xl text-xl text-error font-bold mt-0.5">
                {selectedDist.soilMoisture}%
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error-container/40 text-error text-[10px] font-bold uppercase">
            Critical
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                AI Confidence
              </span>
              <div className="font-headline-xl text-xl text-primary font-bold mt-0.5">
                {selectedDist.aiConfidence}%
              </div>
            </div>
          </div>
          <span className="font-body-sm text-[11px] text-primary font-semibold">CartoSat Model</span>
        </div>
      </div>

      {/* Main Grid: Interactive Map + VCI / NDVI Anomaly Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cartographic Regional Selector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-sm text-on-surface font-bold">
                Marathwada Vulnerability Map
              </span>
              <span className="font-label-md text-xs text-primary font-semibold">
                Active Focus: {selectedDist.name}
              </span>
            </div>

            <div className="relative w-full h-[320px] rounded-xl bg-surface-container-lowest overflow-hidden border border-outline-variant/30">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center filter contrast-125"
                style={{ backgroundImage: `url('${TOPOGRAPHIC_MAP_BG}')` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(#4edea3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                <path
                  d="M 280 190 L 410 160 L 470 230 L 390 320 L 290 280 Z"
                  className="fill-error/40 stroke-error/90 animate-pulse"
                  strokeWidth="2.5"
                />
              </svg>

              {districts.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDistrictId(d.id)}
                  className={`absolute p-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer group ${
                    selectedDistrictId === d.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                  style={{
                    left: `${(d.coordinates.x / 800) * 100}%`,
                    top: `${(d.coordinates.y / 400) * 100}%`
                  }}
                  title={d.name}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg border-2 border-white/80 ${
                      d.riskScore > 0.8 ? 'bg-error' : d.riskScore > 0.6 ? 'bg-tertiary' : 'bg-primary-container'
                    }`}
                  >
                    !
                  </div>
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-surface-container-high/90 text-[10px] font-bold text-on-surface border border-outline-variant/30">
                    {d.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick District Picker Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {districts.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDistrictId(d.id)}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-semibold transition-all border ${
                    selectedDistrictId === d.id
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant/20'
                  }`}
                >
                  {d.name} ({d.riskScore})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: VCI 3-Month Anomaly Heatmap & Precipitation Graph (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-outline-variant/20">
              <div>
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  VCI 3-Months Anomaly Heatmap ({selectedDist.name} Sector)
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Historical Vegetation Condition Index (VCI) matrix from 2020 to 2026.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-label-md">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-error" />
                  Extreme Drought
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-tertiary" />
                  Moderate
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-primary-container" />
                  Optimal
                </span>
              </div>
            </div>

            {/* Interactive Heatmap Matrix */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[500px]">
                {/* Header Months */}
                <div className="grid grid-cols-13 gap-1 mb-1 text-center font-label-md text-[10px] text-on-surface-variant font-semibold">
                  <span>Year</span>
                  {months.map(m => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                {/* Years Rows */}
                <div className="flex flex-col gap-1">
                  {years.map(yr => (
                    <div key={yr} className="grid grid-cols-13 gap-1 items-center">
                      <span className="font-mono text-xs text-on-surface font-bold text-center">
                        {yr}
                      </span>
                      {months.map((m, idx) => (
                        <div
                          key={m}
                          className={`h-6 rounded-md transition-all hover:scale-110 cursor-pointer ${getCellColor(
                            yr,
                            idx
                          )}`}
                          title={`${selectedDist.name} - ${m} ${yr}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Precipitation vs VCI Curve Graphic */}
            <div className="pt-3 border-t border-outline-variant/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-headline-sm text-xs text-on-surface font-bold">
                  2026 Monthly Precipitation Deficit vs Multi-Year Median (mm)
                </span>
                <span className="text-[11px] text-secondary font-mono">INSAT-3DR Multispectral</span>
              </div>

              {/* Synthetic Curve / Bars */}
              <div className="h-28 w-full flex items-end justify-between gap-2 px-2 bg-surface-container-lowest/60 p-2 rounded-xl border border-outline-variant/20">
                {[
                  { m: 'Jan', val: 12, norm: 18 },
                  { m: 'Feb', val: 8, norm: 15 },
                  { m: 'Mar', val: 4, norm: 12 },
                  { m: 'Apr', val: 2, norm: 20 },
                  { m: 'May', val: 18, norm: 35 },
                  { m: 'Jun', val: 48, norm: 95, deficit: true },
                  { m: 'Jul', val: 62, norm: 130, deficit: true },
                  { m: 'Aug', val: 42, norm: 110, deficit: true },
                  { m: 'Sep', val: 38, norm: 90, deficit: true },
                  { m: 'Oct', val: 14, norm: 55, deficit: true }
                ].map(bar => (
                  <div key={bar.m} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-0.5 h-20">
                      {/* Normal expectation */}
                      <div
                        className="w-1/2 bg-surface-container-highest rounded-t"
                        style={{ height: `${(bar.norm / 130) * 100}%` }}
                        title={`Expected: ${bar.norm}mm`}
                      />
                      {/* Actual recorded */}
                      <div
                        className={`w-1/2 rounded-t ${
                          bar.deficit ? 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]' : 'bg-primary'
                        }`}
                        style={{ height: `${(bar.val / 130) * 100}%` }}
                        title={`Recorded: ${bar.val}mm`}
                      />
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant">{bar.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* District Risk Summary Table */}
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
          <span className="font-headline-sm text-sm text-on-surface font-bold">
            District-wise Drought Vulnerability Matrix
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant">
            Ranked by composite El Niño risk index
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-xs">
            <thead>
              <tr className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                <th className="pb-3">District</th>
                <th className="pb-3">Talukas</th>
                <th className="pb-3 text-right">Rainfall Deficit</th>
                <th className="pb-3 text-right">Dry Spell (Days)</th>
                <th className="pb-3 text-right">Soil Moisture</th>
                <th className="pb-3 text-right">Risk Score</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {districts.map(d => (
                <tr key={d.id} className="hover:bg-surface-container-high/60 transition-colors">
                  <td className="py-3 font-semibold text-on-surface">{d.name}</td>
                  <td className="py-3 text-on-surface-variant">{d.taluka}</td>
                  <td className="py-3 text-right font-mono font-bold text-error">{d.precipDeficit}%</td>
                  <td className="py-3 text-right font-mono">{d.drySpellDays} days</td>
                  <td className="py-3 text-right font-mono text-tertiary">{d.soilMoisture}%</td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-md text-[10px] font-bold ${
                        d.riskScore > 0.8
                          ? 'bg-error-container/30 text-error'
                          : d.riskScore > 0.6
                          ? 'bg-tertiary-container/30 text-tertiary'
                          : 'bg-secondary-container/30 text-secondary'
                      }`}
                    >
                      {d.riskLevel} ({d.riskScore})
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDistrictId(d.id);
                        showToast('District Focused', `Loaded sensor telemetry for ${d.name}.`, 'secondary');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-[11px] transition-colors cursor-pointer border border-outline-variant/30"
                    >
                      Focus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
