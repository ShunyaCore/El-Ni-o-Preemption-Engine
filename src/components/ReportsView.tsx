import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReportsView: React.FC = () => {
  const { districts, budget, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'reports' | 'trends' | 'export'>('reports');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const handleExportBrief = () => {
    showToast(
      'Official Brief Downloaded',
      'Generated SDMA Executive Relief Brief (PDF) with digital watermark.',
      'primary'
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-xs tracking-wider uppercase mb-1">
            <span>Executive Governance</span>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="text-tertiary-fixed-dim font-semibold">State Disaster Management Authority</span>
          </div>
          <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
            Reports & Strategic Insights
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Audit trails, seasonal trend models, and printable executive relief dossiers.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
          {(['reports', 'trends', 'export'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg font-headline-sm text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 4 Primary Reports (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Report 1 */}
              <div
                onClick={() => setSelectedReport('District Risk & Precipitation Report')}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 backdrop-blur-xl shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-10 h-10 rounded-xl bg-error-container/20 border border-error/30 flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-xl">radar</span>
                    </span>
                    <span className="text-xs text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">
                    District Risk Report
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Risk levels, rainfall deficit indices, soil moisture anomalies across all 36 Maharashtra districts.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between text-xs text-on-surface-variant">
                  <span>Updated Today</span>
                  <span className="font-mono text-primary">INSAT-3DR Synced</span>
                </div>
              </div>

              {/* Report 2 */}
              <div
                onClick={() => setSelectedReport('Relief Allocation & MILP Budget Dossier')}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 backdrop-blur-xl shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                    </span>
                    <span className="text-xs text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">
                    Relief Allocation Report
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Budget usage, district-wise MILP distribution, and comparison against historical blanket equal allocations.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between text-xs text-on-surface-variant">
                  <span>Tranche: ₹{budget} Cr</span>
                  <span className="font-mono text-primary font-bold">+38% Yield</span>
                </div>
              </div>

              {/* Report 3 */}
              <div
                onClick={() => setSelectedReport('Claim Analysis & Duplicate Detection')}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 backdrop-blur-xl shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-10 h-10 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-xl">fact_check</span>
                    </span>
                    <span className="text-xs text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">
                    Claim Analysis Report
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Sentinel-2 NDVI verification flags, duplicate plots, and machine confidence distribution.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between text-xs text-on-surface-variant">
                  <span>48,392 Claims</span>
                  <span className="font-mono text-secondary">94.2% Genuine</span>
                </div>
              </div>

              {/* Report 4 */}
              <div
                onClick={() => setSelectedReport('Logistics Performance & Fleet Dispatch')}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 backdrop-blur-xl shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-10 h-10 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-xl">local_shipping</span>
                    </span>
                    <span className="text-xs text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">
                    Logistics Performance Report
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Transit routes, delivery status, FASTag toll exemptions, and vehicle depot fuel velocity.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between text-xs text-on-surface-variant">
                  <span>142 Drops</span>
                  <span className="font-mono text-tertiary">96.4% Efficiency</span>
                </div>
              </div>
            </div>

            {/* Quick Export Action Bar */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between gap-4">
              <div>
                <h4 className="font-headline-sm text-sm text-on-surface font-bold">
                  Generate Complete SDMA Audit Dossier
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Includes full mathematical formulations, GIS shapefiles, and treasury clearance receipts.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportBrief}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Export Official Brief (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right: Key Insights Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Key Strategic Insights
                </h3>
              </div>

              <div className="space-y-3 font-body-sm text-xs">
                <div className="p-3.5 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-base shrink-0 mt-0.5">
                    warning
                  </span>
                  <div>
                    <span className="font-bold text-on-surface block">Critical Deficit in Latur & Beed</span>
                    <span className="text-on-surface-variant mt-0.5 block leading-relaxed">
                      Latur currently has the highest compound risk score (0.88) with 58% cumulative rainfall deficit.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                    alt_route
                  </span>
                  <div>
                    <span className="font-bold text-on-surface block">Reallocation Benefit</span>
                    <span className="text-on-surface-variant mt-0.5 block leading-relaxed">
                      Reallocating ₹12 Cr from surplus zones to Beed & Osmanabad covers 2.4x more vulnerable farmers.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-highest/60 border border-outline-variant/20 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0 mt-0.5">
                    schedule
                  </span>
                  <div>
                    <span className="font-bold text-on-surface block">Supply Chain Alert</span>
                    <span className="text-on-surface-variant mt-0.5 block leading-relaxed">
                      Cattle fodder bank capacity at Solapur South Store is projected to reach threshold in 7 days without resupply.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-base text-on-surface font-bold">
                Multi-District Seasonal Trend Comparisons (2020 - 2026)
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Year-over-year agricultural loss averted under predictive preemption versus reactive relief.
              </p>
            </div>
            <span className="text-xs text-primary font-mono font-bold">Model: ARIMA + Sentinel-2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {districts.slice(0, 3).map(d => (
              <div key={d.id} className="p-4 rounded-xl bg-surface-container border border-outline-variant/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-on-surface">{d.name}</span>
                  <span className="text-xs text-error font-bold font-mono">{d.riskScore} Risk</span>
                </div>
                <div className="space-y-1.5 text-xs text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Precip. Deficit:</span>
                    <span className="font-bold text-error">{d.precipDeficit}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Claims:</span>
                    <span className="font-bold text-on-surface">{d.activeClaims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Averted Crop Loss:</span>
                    <span className="font-bold text-primary font-mono">₹ {(d.reqBudgetCr * 2.8).toFixed(1)} Cr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
          </div>
          <h2 className="font-headline-xl text-xl text-on-surface font-bold">
            Download Official Executive Relief Brief
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md">
            Export the official 2026 Preemption Tranche brief formatted for State Cabinet, Finance Ministry, and Collectorate desks.
          </p>
          <button
            type="button"
            onClick={handleExportBrief}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-sm font-bold shadow-lg transition-all cursor-pointer"
          >
            Download Signed PDF Brief
          </button>
        </div>
      )}

      {/* Report Inspection Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <h3 className="font-headline-sm text-base text-on-surface font-bold">
                {selectedReport}
              </h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Full report records loaded from Maharashtra State Disaster Management Authority server database. All numbers reflect current session variables.
            </p>
            <div className="p-4 rounded-xl bg-surface-container-lowest font-mono text-xs space-y-1">
              <div>Total State Allocation Pool: ₹ {budget} Crore</div>
              <div>Districts Covered: 5 High-Priority Zones</div>
              <div>Model Algorithm: Mixed-Integer Linear Programming v4.12</div>
              <div>Ground Stations Synced: 1,480 / 1,500 AWS Stations</div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedReport(null);
                  handleExportBrief();
                }}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
