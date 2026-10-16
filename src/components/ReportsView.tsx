import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, FileSpreadsheet, Calendar, ArrowRight, Printer, Shield } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { districts, budget, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'reports' | 'trends' | 'export'>('reports');

  const handleExportBrief = (reportTitle: string) => {
    showToast(
      'Document Generated',
      `Official PDF summary created: ${reportTitle}. Ready for download.`,
      'primary'
    );
  };

  const reports = [
    {
      id: 'REP-01',
      title: 'State Relief Executive Dossier',
      subtitle: 'Cabinet & Divisional Commissioner Briefing',
      updated: '24 Oct 2026, 08:00 IST',
      category: 'Governance',
      metrics: '12 Districts · ₹142 Cr Requisition'
    },
    {
      id: 'REP-02',
      title: 'District Precipitation Deficit Matrix',
      subtitle: 'IMD Ground Stations vs 50-Year Median',
      updated: '24 Oct 2026, 06:00 IST',
      category: 'Meteorology',
      metrics: '36 AWS Nodes · -48.5% Regional Mean'
    },
    {
      id: 'REP-03',
      title: 'Emergency Tanker Dispatch Ledger',
      subtitle: 'Potable Water Distribution & Route Logs',
      updated: '23 Oct 2026, 22:30 IST',
      category: 'Logistics',
      metrics: '42 Active Tankers · 840,000 Litres Delivered'
    },
    {
      id: 'REP-04',
      title: 'Direct Benefit Transfer (DBT) Clearance',
      subtitle: 'Aadhaar-Linked Crop Failure Relief Disbursals',
      updated: '23 Oct 2026, 17:00 IST',
      category: 'Finance',
      metrics: '48,392 Accounts Verified · 94.2% Passed'
    }
  ];

  return (
    <div className="flex flex-col w-full gap-5 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">
            Reports & Analytical Records
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Official government relief dossiers, hydrological audit records, and DBT ledger exports
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#F1F3F5] p-0.5 rounded-md border border-[#E3E6EB]">
          {(['reports', 'trends', 'export'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map(rep => (
            <div
              key={rep.id}
              className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-[#0F4C81] bg-[#EEF4FA] px-1.5 py-0.5 rounded border border-[#BCD4EC]">
                    {rep.id} · {rep.category}
                  </span>
                  <span className="text-[11px] text-[#6B7280]">{rep.updated}</span>
                </div>
                <h3 className="text-sm font-bold text-[#111827]">{rep.title}</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">{rep.subtitle}</p>

                <div className="mt-3 p-2 rounded bg-[#F9FAFB] border border-[#E3E6EB] text-xs">
                  <span className="text-[11px] text-[#6B7280] block">Scope / Summary</span>
                  <span className="font-semibold text-[#111827] mt-0.5 block">{rep.metrics}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E3E6EB] flex justify-between items-center">
                <span className="text-[11px] text-[#6B7280]">Format: PDF & CSV</span>
                <button
                  type="button"
                  onClick={() => handleExportBrief(rep.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3963] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">
              Multi-Year Drought Stress Trajectory (2020–2026)
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Historical yield loss averted under predictive preemption algorithms vs reactive relief
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E3E6EB] text-[11px] font-semibold text-[#6B7280] bg-[#FAFBFC]">
                  <th className="py-2.5 px-3">Season Year</th>
                  <th className="py-2.5 px-3">Rainfall Deficit</th>
                  <th className="py-2.5 px-3">Relief Budget (₹ Cr)</th>
                  <th className="py-2.5 px-3">Farmers Covered</th>
                  <th className="py-2.5 px-3">Loss Averted Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E6EB]">
                <tr className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 font-semibold text-[#111827]">2026 (El Niño Active)</td>
                  <td className="py-2.5 px-3 font-semibold text-[#C62828]">-48.5%</td>
                  <td className="py-2.5 px-3">₹142.0 Cr</td>
                  <td className="py-2.5 px-3">48,392 (Projected: 1.4L)</td>
                  <td className="py-2.5 px-3 font-bold text-[#0F4C81]">2.4x (Preemptive)</td>
                </tr>
                <tr className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 text-[#111827]">2025 (Normal Monsoon)</td>
                  <td className="py-2.5 px-3 text-[#2E7D32]">+4.2%</td>
                  <td className="py-2.5 px-3">₹45.0 Cr</td>
                  <td className="py-2.5 px-3">22,100</td>
                  <td className="py-2.5 px-3 text-[#6B7280]">1.0x (Baseline)</td>
                </tr>
                <tr className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 px-3 text-[#111827]">2024 (Dry Monsoon)</td>
                  <td className="py-2.5 px-3 text-[#B26A00]">-32.1%</td>
                  <td className="py-2.5 px-3">₹98.0 Cr</td>
                  <td className="py-2.5 px-3">34,500</td>
                  <td className="py-2.5 px-3 text-[#6B7280]">1.2x (Reactive)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="bg-white rounded-lg border border-[#E3E6EB] p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] space-y-4">
          <h3 className="text-sm font-semibold text-[#111827]">
            State Relief Cell Data Export Center
          </h3>
          <p className="text-xs text-[#6B7280]">
            Export raw geospatial, financial, and logistical datasets in standard government open data formats
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => showToast('GeoJSON Exported', 'Downloaded Madhya Pradesh tehsils GIS polygons (GeoJSON)', 'primary')}
              className="p-3 rounded border border-[#E3E6EB] hover:bg-[#F9FAFB] text-left flex flex-col justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-[#111827] block">GIS Boundaries (GeoJSON)</span>
                <span className="text-[11px] text-[#6B7280] mt-0.5 block">Taluka polygons with NDVI indices</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0F4C81] mt-3">Download .geojson →</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('CSV Exported', 'Downloaded all 36 monitored districts dataset (CSV)', 'primary')}
              className="p-3 rounded border border-[#E3E6EB] hover:bg-[#F9FAFB] text-left flex flex-col justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-[#111827] block">District Telemetry (CSV)</span>
                <span className="text-[11px] text-[#6B7280] mt-0.5 block">Rainfall, soil moisture & claims</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0F4C81] mt-3">Download .csv →</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('PDF Exported', 'Downloaded Treasury authorization ledger (PDF)', 'primary')}
              className="p-3 rounded border border-[#E3E6EB] hover:bg-[#F9FAFB] text-left flex flex-col justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-[#111827] block">Finance Ledger (PDF)</span>
                <span className="text-[11px] text-[#6B7280] mt-0.5 block">Signed state relief allocations</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0F4C81] mt-3">Download .pdf →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
