import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmerClaim } from '../types';

export const ClaimReviewView: React.FC = () => {
  const { claims, authorizeBatchClaims, updateClaimStatus, showToast } = useApp();

  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchId, setSearchId] = useState('');
  const [inspectingClaim, setInspectingClaim] = useState<FarmerClaim | null>(null);

  const filteredClaims = claims.filter(c => {
    if (districtFilter !== 'all' && c.district.toLowerCase() !== districtFilter.toLowerCase()) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchId && !c.id.toLowerCase().includes(searchId.toLowerCase()) && !c.farmerName.toLowerCase().includes(searchId.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleApprove = (claim: FarmerClaim) => {
    updateClaimStatus(claim.id, 'Genuine');
    setInspectingClaim(null);
  };

  const handleMarkReview = (claim: FarmerClaim) => {
    updateClaimStatus(claim.id, 'Needs Review');
    setInspectingClaim(null);
  };

  const handleMarkDuplicate = (claim: FarmerClaim) => {
    updateClaimStatus(claim.id, 'Duplicate');
    setInspectingClaim(null);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-xs tracking-wider uppercase mb-1">
            <span>Agrarian Insurance Verification</span>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="text-primary-fixed font-semibold">Sentinel-2 NDVI Cross-Reference</span>
          </div>
          <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
            Claim Evidence Review & Verification
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Flag missing fields, NDVI inconsistencies, and potential duplicate land parcels automatically.
          </p>
        </div>

        <button
          type="button"
          onClick={() => authorizeBatchClaims()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-xs font-bold transition-all shadow-[0_0_16px_rgba(78,222,163,0.3)] self-start sm:self-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">fact_check</span>
          <span>Authorize Verified Batch (142)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full md:w-auto">
          {/* District Filter */}
          <div className="relative">
            <select
              aria-label="Filter by district"
              value={districtFilter}
              onChange={e => setDistrictFilter(e.target.value)}
              className="bg-surface-container-lowest text-on-surface font-body-sm text-xs px-3 py-2 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 w-full sm:w-44 cursor-pointer"
            >
              <option value="all">All Districts</option>
              <option value="beed">Beed</option>
              <option value="latur">Latur</option>
              <option value="osmanabad">Osmanabad</option>
              <option value="solapur">Solapur</option>
              <option value="nanded">Nanded</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-surface-container-lowest text-on-surface font-body-sm text-xs px-3 py-2 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 w-full sm:w-44 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Genuine">Genuine (Verified)</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Duplicate">Duplicates Flagged</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Search by Claim ID or Farmer Name */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
            search
          </span>
          <input
            type="text"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Search claim ID or farmer..."
            className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
          />
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
          <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
            Total Claims Registered
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-headline-xl text-2xl text-on-surface font-bold">8,432</span>
            <span className="text-primary font-mono text-xs font-semibold">48,392 Total</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
          <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
            Needs Field Review
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-headline-xl text-2xl text-tertiary font-bold">1,248</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold">
              14.8%
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
          <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
            Duplicates Flagged
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-headline-xl text-2xl text-error font-bold">237</span>
            <span className="px-2 py-0.5 rounded-full bg-error-container/30 text-error text-xs font-bold">
              2.8%
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
          <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
            Missing Fields
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-headline-xl text-2xl text-on-surface font-bold">412</span>
            <span className="text-on-surface-variant text-xs">4.9%</span>
          </div>
        </div>
      </div>

      {/* Claims Data Table */}
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
          <span className="font-headline-sm text-sm text-on-surface font-bold">
            Farmer Claims Ledger & Telemetry Analysis
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant">
            Showing {filteredClaims.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-xs">
            <thead>
              <tr className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                <th className="pb-3">Claim ID</th>
                <th className="pb-3">Farmer & Location</th>
                <th className="pb-3">Crop & Area</th>
                <th className="pb-3 text-right">Claimed Loss</th>
                <th className="pb-3 text-right">Sentinel-2 Loss</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredClaims.map(claim => {
                const diff = Math.abs(claim.claimedLoss - claim.spectralLossIndex);
                const isMismatch = diff > 25;

                return (
                  <tr key={claim.id} className="hover:bg-surface-container-high/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-on-surface">{claim.id}</td>
                    <td className="py-3">
                      <div className="font-semibold text-on-surface">{claim.farmerName}</div>
                      <div className="text-[11px] text-on-surface-variant">
                        {claim.district} ({claim.taluka})
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-on-surface">{claim.cropType}</div>
                      <div className="text-[11px] text-on-surface-variant">{claim.plotSizeHectares} ha</div>
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-on-surface">
                      {claim.claimedLoss}%
                    </td>
                    <td className="py-3 text-right font-mono font-bold">
                      <span className={isMismatch ? 'text-error font-extrabold' : 'text-primary'}>
                        {claim.spectralLossIndex}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-md text-[10px] font-bold ${
                          claim.status === 'Genuine'
                            ? 'bg-primary-container/20 text-primary border border-primary/30'
                            : claim.status === 'Needs Review'
                            ? 'bg-tertiary-container/20 text-tertiary border border-tertiary/30'
                            : 'bg-error-container/30 text-error border border-error/30'
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setInspectingClaim(claim)}
                        className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-xs font-semibold transition-colors border border-outline-variant/30 cursor-pointer"
                      >
                        Inspect NDVI
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Satellite Evidence Inspector */}
      {inspectingClaim && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Satellite Evidence: {inspectingClaim.id}
                </h3>
              </div>
              <button
                onClick={() => setInspectingClaim(null)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest/80 p-3 rounded-xl border border-outline-variant/30">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Farmer</span>
                  <span className="font-bold text-on-surface">{inspectingClaim.farmerName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Location</span>
                  <span className="font-medium text-on-surface">
                    {inspectingClaim.district} • {inspectingClaim.taluka}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Crop & Area</span>
                  <span className="text-on-surface font-medium">
                    {inspectingClaim.cropType} ({inspectingClaim.plotSizeHectares} ha)
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Spectral Confidence</span>
                  <span className="font-mono text-primary font-bold">
                    {(inspectingClaim.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Spectral Loss Visual Comparison */}
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
                <span className="font-bold text-on-surface text-xs block">
                  NDVI Discrepancy Analysis
                </span>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Self-Claimed Crop Loss:</span>
                    <span className="font-bold text-on-surface">{inspectingClaim.claimedLoss}%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-tertiary h-full rounded-full"
                      style={{ width: `${inspectingClaim.claimedLoss}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Sentinel-2 Verified Spectral Loss:</span>
                    <span className="font-bold text-primary">{inspectingClaim.spectralLossIndex}%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${inspectingClaim.spectralLossIndex}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 text-on-surface-variant text-[11px] leading-relaxed">
                {Math.abs(inspectingClaim.claimedLoss - inspectingClaim.spectralLossIndex) > 25
                  ? '⚠️ High anomaly detected: Claimed loss deviates by >25% from Sentinel-2 multispectral reflectance. Recommend physical field agent review.'
                  : '✅ Spectral index aligns within allowable 5% margin of satellite vegetation anomaly.'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => handleMarkDuplicate(inspectingClaim)}
                className="px-3 py-1.5 rounded-xl bg-error-container/30 hover:bg-error-container/50 text-error text-xs font-semibold cursor-pointer"
              >
                Flag Duplicate
              </button>
              <button
                type="button"
                onClick={() => handleMarkReview(inspectingClaim)}
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface text-xs font-semibold cursor-pointer"
              >
                Send to Field Review
              </button>
              <button
                type="button"
                onClick={() => handleApprove(inspectingClaim)}
                className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-bold shadow-md cursor-pointer"
              >
                Approve Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
