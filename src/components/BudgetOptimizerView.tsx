import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StressScenario, OptimizationObjective } from '../types';

export const BudgetOptimizerView: React.FC = () => {
  const {
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
    showToast
  } = useApp();

  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isComparingSeasons, setIsComparingSeasons] = useState(false);

  const handleCommit = () => {
    setIsCommitModalOpen(false);
    showToast(
      'Commitment Submitted to Finance Ministry',
      `Authorization dossier generated for ₹${budget} Crore. Digital signature verified with State Treasury API.`,
      'primary'
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Top Banner & Algorithmic Status */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 lg:p-8 shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute right-96 -bottom-16 h-48 w-48 rounded-full bg-tertiary/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30 text-primary font-label-md text-xs uppercase tracking-wider font-semibold">
                Operational Optimization Active
              </span>
              <span className="text-on-surface-variant font-body-sm text-xs">
                • INSAT-3DR Synced Cycle
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-surface-container-highest text-on-surface-variant font-label-md text-xs border border-outline-variant/30">
                Constrained MILP Data
              </span>
            </div>
            <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
              Relief Budget Scenario Simulator & Allocator
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Constrained Mixed-Integer Linear Programming (MILP) model for equitable and high-impact drought relief disbursement across high-stress agricultural zones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsComparingSeasons(!isComparingSeasons)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-lg text-xs font-semibold shadow-sm border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary text-base">history</span>
              <span>{isComparingSeasons ? 'Hide 2024-25 Season' : 'Compare Seasons'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAuditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-lg text-xs font-semibold shadow-sm border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-tertiary text-base">file_download</span>
              <span>Audit Memo</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCommitModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary transition-all font-headline-sm text-xs font-bold shadow-[0_0_20px_rgba(78,222,163,0.3)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Commit to Finance Ministry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical Season Compare Ribbon if Active */}
      {isComparingSeasons && (
        <div className="p-4 rounded-2xl bg-secondary-container/10 border border-secondary/30 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-2xl">compare_arrows</span>
            <div>
              <p className="text-xs font-bold text-secondary">Comparative Benchmark: 2024 Drought Tranche</p>
              <p className="text-xs text-on-surface-variant">
                Previous cycle disbursed ₹80 Cr via blanket equal quotas, resulting in ₹18.4 Cr sub-optimal allocation in Beed/Latur. Current MILP saves 38% more crop yield.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsComparingSeasons(false)}
            className="text-xs text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Interactive Simulator Matrix & Side-by-Side KPI View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Parameter Calibration Panel (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-low/90 rounded-2xl border border-outline-variant/30 p-6 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">tune</span>
                <span className="font-headline-sm text-base text-on-surface font-bold">
                  Simulation Controls
                </span>
              </div>
              <span className="font-label-md text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                MILP v4.12 Engine
              </span>
            </div>

            {/* Slider 1: Available Budget */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="budget-slider" className="font-label-lg text-xs text-on-surface font-semibold uppercase tracking-wider">
                  Available State Allocation
                </label>
                <span className="font-headline-lg text-2xl text-primary font-bold">
                  ₹ {budget} Crore
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Adjust state pool to forecast district-level linear constraint satisfaction.
              </p>
              <div className="pt-2">
                <input
                  id="budget-slider"
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-surface-container-highest appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center mt-2 font-label-md text-xs text-on-surface-variant">
                  <span>₹20 Cr (Floor)</span>
                  <span>₹100 Cr (Baseline)</span>
                  <span>₹250 Cr (Cap)</span>
                </div>
              </div>
            </div>

            {/* Drought Stress Horizon Radio-like bespoke cards */}
            <div className="flex flex-col gap-2">
              <label className="font-label-lg text-xs text-on-surface font-semibold uppercase tracking-wider">
                Drought Stress Horizon
              </label>
              <div className="grid grid-cols-1 gap-2">
                {/* Mild */}
                <button
                  type="button"
                  onClick={() => setStressScenario('mild')}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 border ${
                    stressScenario === 'mild'
                      ? 'bg-surface-container-highest border-primary shadow-md'
                      : 'bg-surface-container border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-lg ${
                      stressScenario === 'mild' ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {stressScenario === 'mild' ? 'check_circle' : 'circle'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-sm text-on-surface font-bold">
                      Mild Drought Stress
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      Standard safety net reserve, 10-15% rainfall deficit trajectory.
                    </span>
                  </div>
                </button>

                {/* Severe */}
                <button
                  type="button"
                  onClick={() => setStressScenario('severe')}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 border ${
                    stressScenario === 'severe'
                      ? 'bg-surface-container-highest border-primary shadow-md'
                      : 'bg-surface-container border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-lg ${
                      stressScenario === 'severe' ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {stressScenario === 'severe' ? 'check_circle' : 'circle'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-sm text-primary font-bold">
                        Severe Drought Risk
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-tertiary-container/30 text-tertiary uppercase">
                        Active Focus
                      </span>
                    </div>
                    <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      30-45% deficit trajectory, critical soil moisture depletion.
                    </span>
                  </div>
                </button>

                {/* Extreme */}
                <button
                  type="button"
                  onClick={() => setStressScenario('extreme')}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 border ${
                    stressScenario === 'extreme'
                      ? 'bg-surface-container-highest border-error shadow-md'
                      : 'bg-surface-container border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mt-0.5 text-lg ${
                      stressScenario === 'extreme' ? 'text-error' : 'text-on-surface-variant'
                    }`}
                  >
                    {stressScenario === 'extreme' ? 'check_circle' : 'circle'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-sm text-on-surface font-bold">
                      Extreme Stress Contingency
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      &gt;50% failure scenario with acute drinking water distress protocol.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Slider 2: Priority Weighting */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="priority-slider" className="font-label-lg text-xs text-on-surface font-semibold uppercase tracking-wider">
                  Algorithmic Priority Weighting
                </label>
                <span className="font-headline-sm text-sm text-secondary font-bold">
                  {priorityWeighting}% Forecast Risk
                </span>
              </div>
              <div className="pt-2">
                <input
                  id="priority-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={priorityWeighting}
                  onChange={e => setPriorityWeighting(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-surface-container-highest appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between items-center mt-2 font-label-md text-xs text-on-surface-variant">
                  <span>Historical (0%)</span>
                  <span>Balanced (50%)</span>
                  <span>Predicted (100%)</span>
                </div>
              </div>
            </div>

            {/* Optimization Objective Toggle */}
            <div className="flex flex-col gap-2">
              <label className="font-label-lg text-xs text-on-surface font-semibold uppercase tracking-wider">
                Primary Optimization Objective
              </label>
              <div className="grid grid-cols-3 gap-1 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                {(
                  [
                    { id: 'farmers', label: 'Max Farmers' },
                    { id: 'latency', label: 'Min Latency' },
                    { id: 'floor', label: 'Equal Floor' }
                  ] as const
                ).map(obj => (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => setOptimizationObjective(obj.id as OptimizationObjective)}
                    className={`py-2 px-2 rounded-lg font-label-md text-xs text-center transition-all truncate font-semibold cursor-pointer ${
                      optimizationObjective === obj.id
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {obj.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Integrity Footnote */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-lg mt-0.5">info</span>
              <p className="font-body-sm text-xs leading-relaxed">
                Mixed-Integer Linear constraints ensure no taluka receives &lt; ₹15 Cr minimum relief floor while preserving 5% state-level rapid-response reserve.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Scenario Comparison & Real-Time Impact Matrix (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Side-by-Side Head-to-Head Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Baseline Plan Card */}
            <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">balance</span>
                  <span className="font-headline-sm text-sm text-on-surface font-bold">Baseline Plan</span>
                </div>
                <span className="font-label-md text-xs text-on-surface-variant">Historical Mean</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-1">
                <div className="flex flex-col bg-surface-container/60 p-2 rounded-xl">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Total Budget</span>
                  <span className="font-label-numeric text-base text-on-surface font-bold mt-1">
                    ₹ {budget} Cr
                  </span>
                </div>
                <div className="flex flex-col bg-surface-container/60 p-2 rounded-xl">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Beneficiaries</span>
                  <span className="font-label-numeric text-base text-on-surface font-bold mt-1">
                    {(3.4 * (budget / 100)).toFixed(1)} L
                  </span>
                </div>
                <div className="flex flex-col bg-surface-container/60 p-2 rounded-xl">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Waste Index</span>
                  <span className="font-label-numeric text-base text-error font-bold mt-1">+18.2%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex justify-between font-label-md text-xs text-on-surface-variant">
                  <span>Coverage Efficiency</span>
                  <span>58%</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-outline w-[58%] h-full rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-on-surface-variant font-body-sm text-xs">
                <span>Drinking Water Security:</span>
                <span className="text-tertiary font-semibold">Sub-optimal (62%)</span>
              </div>
            </div>

            {/* MILP Optimized Plan Card */}
            <div className="bg-surface-container-high rounded-2xl border border-primary/40 p-5 shadow-xl flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between pb-2 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">auto_fix_high</span>
                  <span className="font-headline-sm text-sm text-primary font-bold">MILP Optimized Plan</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-label-md text-[11px] font-bold">
                  +38% Yield
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-1">
                <div className="flex flex-col bg-surface-container-lowest/80 p-2 rounded-xl border border-outline-variant/30">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Allocated</span>
                  <span className="font-label-numeric text-base text-on-surface font-bold mt-1">
                    ₹ {allocatedBudgetCr} Cr
                  </span>
                </div>
                <div className="flex flex-col bg-surface-container-lowest/80 p-2 rounded-xl border border-outline-variant/30">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Covered Pop.</span>
                  <span className="font-label-numeric text-base text-primary font-bold mt-1">
                    {coveredBeneficiariesLakh} Lakh
                  </span>
                </div>
                <div className="flex flex-col bg-surface-container-lowest/80 p-2 rounded-xl border border-outline-variant/30">
                  <span className="font-label-md text-[11px] text-on-surface-variant">Loss Averted</span>
                  <span className="font-label-numeric text-base text-secondary font-bold mt-1">
                    ₹ {avertedLossCr} Cr
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex justify-between font-label-md text-xs text-on-surface-variant">
                  <span>Optimization Score</span>
                  <span className="text-primary font-bold">94.6%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary w-[94.6%] h-full rounded-full shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-on-surface-variant font-body-sm text-xs">
                <span>Avg Cost / Beneficiary:</span>
                <span className="text-primary font-bold">₹2,083 (-24% vs baseline)</span>
              </div>
            </div>
          </div>

          {/* District-wise Allocations Breakdown Table */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-5 lg:p-6 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
              <div>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  District-Wise Allocation Breakdown
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Linear programming solver distribution with localized stress coefficients.
                </p>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant font-label-md text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Optimized
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                  Residual Reserve
                </span>
              </div>
            </div>

            {/* Allocation Rows */}
            <div className="flex flex-col gap-3">
              {districts.map(dist => (
                <div
                  key={dist.id}
                  className="flex flex-col gap-2 p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-headline-sm text-sm text-on-surface font-bold">
                        {dist.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-md text-[10px] font-bold ${
                          dist.riskLevel === 'Very High'
                            ? 'bg-error-container/30 text-error'
                            : dist.riskLevel === 'High'
                            ? 'bg-tertiary-container/30 text-tertiary'
                            : 'bg-secondary-container/30 text-secondary'
                        }`}
                      >
                        {dist.riskLevel} ({Math.abs(dist.precipDeficit)}% Deficit)
                      </span>
                      <span className="text-on-surface-variant font-body-sm text-xs hidden sm:inline">
                        {(dist.farmersCount / 100000).toFixed(1)} Lakh Farmers
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-label-md text-xs text-on-surface-variant">
                        {dist.baseSharePct}% share
                      </span>
                      <span className="font-label-numeric text-sm text-primary font-bold">
                        ₹ {dist.reqBudgetCr.toFixed(1)} Cr
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden flex">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${dist.baseSharePct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Checklist */}
            <div className="mt-2 pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <div className="flex items-center gap-1.5 text-primary font-label-md font-semibold">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Min Taluka Floor ₹15 Cr Met</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary font-label-md font-semibold">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Potable Water Buffer Active</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary font-label-md font-semibold">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Reserve Margin 5.0% Guaranteed</span>
                </div>
              </div>
              <span className="font-body-sm text-xs text-on-surface-variant">Convergence time: 31ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Analytics Deep Dive (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vector 1: Mission Impact Distribution */}
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-sm text-on-surface font-bold">
              Allocated by Mission Impact
            </span>
            <span className="material-symbols-outlined text-primary text-xl">bar_chart</span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Direct funding routing classified by field-level urgency tiers.
          </p>

          <div className="h-44 w-full flex items-end justify-between pt-4 px-3">
            <div className="flex flex-col items-center gap-2 w-1/3">
              <span className="font-label-md text-xs text-on-surface-variant">
                ₹ {(budget * 0.185).toFixed(1)}M
              </span>
              <div
                className="w-12 bg-primary/40 rounded-t hover:bg-primary transition-all cursor-pointer"
                style={{ height: `${Math.min(130, budget * 0.65)}px` }}
                title="Tier 1: Vital"
              />
              <span className="font-label-md text-[11px] text-on-surface-variant truncate text-center w-full">
                Tier 1: Vital
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 w-1/3">
              <span className="font-label-md text-xs text-on-surface font-semibold">
                ₹ {(budget * 0.42).toFixed(1)}M
              </span>
              <div
                className="w-12 bg-primary/75 rounded-t hover:bg-primary transition-all shadow-[0_0_12px_rgba(78,222,163,0.3)] cursor-pointer"
                style={{ height: `${Math.min(150, budget * 1.15)}px` }}
                title="Tier 2: Essential"
              />
              <span className="font-label-md text-[11px] text-on-surface font-medium truncate text-center w-full">
                Tier 2: Essential
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 w-1/3">
              <span className="font-label-md text-xs text-primary font-bold">
                ₹ {(budget * 0.395).toFixed(1)}M
              </span>
              <div
                className="w-12 bg-primary rounded-t hover:bg-primary-fixed shadow-[0_0_16px_rgba(78,222,163,0.5)] cursor-pointer"
                style={{ height: `${Math.min(160, budget * 1.05)}px` }}
                title="Tier 3: Critical"
              />
              <span className="font-label-md text-[11px] text-primary font-bold truncate text-center w-full">
                Tier 3: Critical
              </span>
            </div>
          </div>
        </div>

        {/* Vector 2: Stress Offset Trajectory */}
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-5 shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-sm text-on-surface font-bold">
              Stress Offset Trajectory
            </span>
            <span className="material-symbols-outlined text-secondary text-xl">water_loss</span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Model sensitivity across seasonal deficit bands.
          </p>

          <div className="flex flex-col justify-around h-44 gap-3 pt-2">
            <div>
              <div className="flex justify-between font-label-md text-xs mb-1">
                <span className="text-on-surface">Emergency Water Tankers</span>
                <span className="text-primary font-bold">96% Demand Met</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[96%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-xs mb-1">
                <span className="text-on-surface">Cattle Fodder Camp Subsidies</span>
                <span className="text-secondary font-bold">88% Coverage</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[88%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-xs mb-1">
                <span className="text-on-surface">Direct DBT Seed Compensation</span>
                <span className="text-tertiary font-bold">79% Target</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-[79%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Vector 3: Execution Readiness */}
        <div className="bg-surface-container-low rounded-2xl border border-outline-variant/30 p-5 shadow-lg flex flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-sm text-on-surface font-bold">Execution Readiness</span>
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Treasury clearance & direct benefit pipeline readiness status.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-highest/60 border border-outline-variant/30 flex items-center justify-between my-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  State Treasury Portal
                </span>
                <span className="font-body-sm text-xs text-primary">Pre-authorized API Handshake</span>
              </div>
            </div>
            <span className="font-headline-sm text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20 font-bold">
              Ready
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 text-on-surface-variant font-label-md text-xs">
            <span>Estimated Payout Velocity:</span>
            <span className="text-on-surface font-bold">24 to 48 Hours</span>
          </div>
        </div>
      </div>

      {/* Modal: Commit to Finance Ministry */}
      {isCommitModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Commit Allocation to Finance Ministry
                </h3>
              </div>
              <button
                onClick={() => setIsCommitModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-on-surface">
                You are about to authorize the formal drought relief disbursement tranche under the Maharashtra State Disaster Contingency Pool:
              </p>

              <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Total Recommended Tranche:</span>
                  <span className="font-bold text-primary font-mono text-sm">₹ {budget} Crore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Focus Districts:</span>
                  <span className="font-medium text-on-surface">Beed, Latur, Osmanabad, Nanded, Solapur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Active Stress Horizon:</span>
                  <span className="font-semibold text-tertiary capitalize">{stressScenario} Drought Risk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Algorithm Verification:</span>
                  <span className="font-semibold text-primary">MILP v4.12 Certified (94.6% efficiency)</span>
                </div>
              </div>

              <p className="text-on-surface-variant text-[11px]">
                Upon commitment, the cryptographically signed disbursement order will be transmitted directly to the State Treasury Portal and District Collector escrow accounts.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setIsCommitModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCommit}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-bold shadow-lg"
              >
                Sign & Transmit Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Audit Memo Preview */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl p-6 max-w-2xl w-full shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl">description</span>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  MILP Relief Allocation Audit Memo
                </h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest font-mono text-xs text-on-surface-variant space-y-2 max-h-80 overflow-y-auto">
              <div className="text-primary font-bold">--- SDMA MAHARASHTRA RELIEF AUDIT LOG ---</div>
              <div>Timestamp: 2026-10-24 10:35:00 IST</div>
              <div>Solver: Mixed-Integer Linear Programming v4.12</div>
              <div>Objective Function: Maximize (Farmers Protected * Weight)</div>
              <div>Constraint Set: Floor &ge; 15 Cr, Reserve &ge; 5%, Sum(X_i) &le; {budget} Cr</div>
              <div className="text-on-surface pt-2">DISTRICT ALLOCATION MATRIX:</div>
              {districts.map(d => (
                <div key={d.id} className="flex justify-between border-b border-outline-variant/20 py-1">
                  <span>{d.name.padEnd(12)} [{d.taluka}]</span>
                  <span className="text-primary font-bold">₹ {d.reqBudgetCr.toFixed(1)} Cr ({d.baseSharePct}%)</span>
                </div>
              ))}
              <div className="pt-2 text-secondary font-semibold">
                Status: Invariants Verified. Dual Slack = 0.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-on-surface-variant">Hash: 8f9b...a12c4 (SHA-256)</span>
              <button
                type="button"
                onClick={() => {
                  setIsAuditModalOpen(false);
                  showToast('Memo Downloaded', 'Audit report saved as JSON/CSV.', 'secondary');
                }}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
              >
                Download Audit Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
