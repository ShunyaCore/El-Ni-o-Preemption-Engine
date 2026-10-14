import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StressScenario, OptimizationObjective } from '../types';
import { Calculator, CheckCircle2, SlidersHorizontal, Download, FileSpreadsheet, ArrowRight, ShieldCheck, Info } from 'lucide-react';

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

  const handleCommit = () => {
    setIsCommitModalOpen(false);
    showToast(
      'Allocation Requisition Submitted',
      `Treasury authorization request for ₹${budget} Crore dispatched to Department of Finance.`,
      'primary'
    );
  };

  const handleExportPlan = () => {
    showToast('Plan Exported', `Generated allocation ledger for ₹${budget} Cr.`, 'secondary');
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">
            Relief Budget Allocation & Scenario Simulator
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Mixed-Integer Linear Programming (MILP) solver enforcing statutory taluka minimums and reserve quotas
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportPlan}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#E3E6EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280] stroke-[1.5]" />
            <span>Export allocation table</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCommitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3963] shadow-[0_1px_2px_rgba(16,24,40,0.08)] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Authorize state allocation</span>
          </button>
        </div>
      </div>

      {/* Control Panel: Sliders & Scenario Selectors */}
      <div className="bg-white rounded-lg border border-[#E3E6EB] p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E6EB] mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#0F4C81] stroke-[1.5]" />
            <h3 className="text-sm font-semibold text-[#111827]">
              Simulation Parameters & Constraints
            </h3>
          </div>
          <span className="text-xs text-[#6B7280]">
            Solver mode: Constrained Optimization (v4.12)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Available State Budget */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-medium text-[#4B5563]">
                Total Relief Allocation
              </label>
              <span className="text-sm font-bold text-[#0F4C81] tabular-nums">
                ₹{budget} Crore
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="5"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full accent-[#0F4C81] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#9CA3AF]">
              <span>Floor: ₹20 Cr</span>
              <span>Active: ₹{budget} Cr</span>
              <span>Cap: ₹250 Cr</span>
            </div>
          </div>

          {/* Slider 2: Algorithmic Priority Weighting */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-medium text-[#4B5563]">
                Priority Weighting
              </label>
              <span className="text-xs font-bold text-[#111827] tabular-nums">
                {priorityWeighting}% Risk-Weighted
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priorityWeighting}
              onChange={e => setPriorityWeighting(Number(e.target.value))}
              className="w-full accent-[#0F4C81] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#9CA3AF]">
              <span>Historical Vulnerability (0%)</span>
              <span>Predicted Risk (100%)</span>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#4B5563] block">
              Drought Stress Horizon
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#F1F3F5] p-1 rounded-md border border-[#E3E6EB]">
              {(['mild', 'severe', 'extreme'] as StressScenario[]).map(sc => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => setStressScenario(sc)}
                  className={`py-1 px-2 rounded text-xs font-medium capitalize transition-colors ${
                    stressScenario === sc
                      ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#6B7280] block">
              {stressScenario === 'mild'
                ? '10–15% rainfall deficit model'
                : stressScenario === 'severe'
                ? '30–45% deficit severe drought model'
                : '>50% acute crop failure contingency'}
            </span>
          </div>
        </div>

        {/* Objective Function Row */}
        <div className="mt-4 pt-4 border-t border-[#E3E6EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#4B5563] font-medium">Optimization Objective:</span>
            <div className="flex items-center gap-1.5">
              {(
                [
                  { key: 'farmers', label: 'Max Farmers Covered' },
                  { key: 'latency', label: 'Min Delivery Latency' },
                  { key: 'floor', label: 'Equal Taluka Floor' }
                ] as const
              ).map(obj => (
                <button
                  key={obj.key}
                  type="button"
                  onClick={() => setOptimizationObjective(obj.key)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                    optimizationObjective === obj.key
                      ? 'bg-[#EEF4FA] border-[#BCD4EC] text-[#0F4C81]'
                      : 'bg-white border-[#E3E6EB] text-[#4B5563] hover:text-[#111827]'
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#6B7280]">
            Constraints: Minimum ₹15 Cr / taluka · 5.0% State Emergency Reserve preserved
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison: Baseline Equal Split vs MILP Optimized Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baseline Card */}
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex justify-between items-center pb-2 border-b border-[#E3E6EB] mb-3">
            <div>
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                Historical Benchmark
              </span>
              <h4 className="text-sm font-semibold text-[#111827]">
                Equal Blanket Allocation Plan
              </h4>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-[#F1F3F5] text-[#4B5563] font-medium">
              Static Quota
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#FAFBFC] border border-[#E3E6EB]">
              <span className="text-[11px] text-[#6B7280]">Farmers Reached</span>
              <span className="text-base font-bold text-[#111827] block mt-0.5 tabular-nums">
                {(coveredBeneficiariesLakh * 0.72).toFixed(1)} Lakh
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#FAFBFC] border border-[#E3E6EB]">
              <span className="text-[11px] text-[#6B7280]">Loss Averted</span>
              <span className="text-base font-bold text-[#111827] block mt-0.5 tabular-nums">
                ₹{(avertedLossCr * 0.62).toFixed(0)} Cr
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#FAFBFC] border border-[#E3E6EB]">
              <span className="text-[11px] text-[#6B7280]">Delivery Latency</span>
              <span className="text-base font-bold text-[#6B7280] block mt-0.5 tabular-nums">
                14.2 Days
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-3">
            Equal split results in capital over-allocation in moderate zones while critical pockets face liquidity shortfalls.
          </p>
        </div>

        {/* MILP Optimized Card */}
        <div className="bg-white rounded-lg border-2 border-[#0F4C81] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex justify-between items-center pb-2 border-b border-[#E3E6EB] mb-3">
            <div>
              <span className="text-[11px] font-semibold text-[#0F4C81] uppercase tracking-wider">
                Recommended Solution
              </span>
              <h4 className="text-sm font-bold text-[#111827]">
                MILP Preemption Allocation Plan
              </h4>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-[#EEF4FA] text-[#0F4C81] font-semibold">
              +38% Efficiency
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#EEF4FA]/50 border border-[#BCD4EC]">
              <span className="text-[11px] text-[#4B5563]">Farmers Reached</span>
              <span className="text-base font-bold text-[#0F4C81] block mt-0.5 tabular-nums">
                {coveredBeneficiariesLakh} Lakh
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#EEF4FA]/50 border border-[#BCD4EC]">
              <span className="text-[11px] text-[#4B5563]">Loss Averted</span>
              <span className="text-base font-bold text-[#2E7D32] block mt-0.5 tabular-nums">
                ₹{avertedLossCr} Cr
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#EEF4FA]/50 border border-[#BCD4EC]">
              <span className="text-[11px] text-[#4B5563]">Delivery Latency</span>
              <span className="text-base font-bold text-[#0F4C81] block mt-0.5 tabular-nums">
                4.8 Days
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#4B5563] mt-3">
            Micro-grants targeted dynamically to talukas with &gt;45% rainfall deficit and high soybean/cotton vulnerability.
          </p>
        </div>
      </div>

      {/* District-wise Recommended Breakdown Table */}
      <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="pb-3 border-b border-[#E3E6EB] mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              District-Wise Relief Allocation Ledger
            </h3>
            <p className="text-xs text-[#6B7280]">
              Calculated micro-grants based on {stressScenario} scenario and ₹{budget} Cr total budget
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0F4C81] tabular-nums">
            Total Allocated: ₹{allocatedBudgetCr} Cr
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#E3E6EB] text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider bg-[#FAFBFC]">
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Rainfall Deficit</th>
                <th className="py-2.5 px-3">Farmers Monitored</th>
                <th className="py-2.5 px-3">Share %</th>
                <th className="py-2.5 px-3 text-right">Allocated Relief</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EB]">
              {districts.map(d => {
                const sharePct = ((d.baseSharePct / 100) * 100).toFixed(1);
                const allocCr = ((budget * d.baseSharePct) / 100).toFixed(1);

                return (
                  <tr key={d.id} className="hover:bg-[#F9FAFB]">
                    <td className="py-2.5 px-3 font-medium text-[#111827]">
                      {d.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-xs font-medium ${
                          d.riskLevel === 'Critical'
                            ? 'text-[#C62828]'
                            : d.riskLevel === 'Warning'
                            ? 'text-[#B26A00]'
                            : 'text-[#2E7D32]'
                        }`}
                      >
                        {d.riskLevel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 tabular-nums font-semibold text-[#C62828]">
                      {d.precipDeficit}%
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-[#4B5563]">
                      {d.farmersCount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-[#4B5563]">
                      {sharePct}%
                    </td>
                    <td className="py-2.5 px-3 tabular-nums font-bold text-[#0F4C81] text-right">
                      ₹{allocCr} Cr
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isCommitModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111827]/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-[#E3E6EB] shadow-xl max-w-md w-full p-6">
            <h3 className="text-base font-bold text-[#111827]">
              Authorize State Relief Allocation
            </h3>
            <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
              You are committing an allocation tranche of <strong className="text-[#0F4C81]">₹{budget} Crore</strong> across {districts.length} high-stress districts in the Marathwada region.
            </p>

            <div className="my-4 p-3 rounded bg-[#F9FAFB] border border-[#E3E6EB] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Treasury Code:</span>
                <span className="font-mono font-semibold text-[#111827]">MH-DRR-2026-TR-B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Authorized By:</span>
                <span className="font-semibold text-[#111827]">Yatharth Ladkat (Relief Officer)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Emergency Reserve Preserved:</span>
                <span className="font-semibold text-[#2E7D32]">5.0% (₹25.0 Cr)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setIsCommitModalOpen(false)}
                className="px-3 py-1.5 rounded-md border border-[#E3E6EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCommit}
                className="px-4 py-1.5 rounded-md bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3963]"
              >
                Confirm & Dispatch to Treasury
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
