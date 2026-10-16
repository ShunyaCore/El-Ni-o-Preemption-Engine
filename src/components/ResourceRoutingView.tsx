import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConvoyRoute } from '../types';
import { Truck, MapPin, Phone, Video, Plus, Navigation, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export const ResourceRoutingView: React.FC = () => {
  const {
    convoys,
    addConvoy,
    depots,
    showToast,
    setSelectedConvoyForCall,
    setSelectedConvoyForDashcam
  } = useApp();

  const [selectedConvoyId, setSelectedConvoyId] = useState<string>(convoys[0]?.id || 'CV-MP-4019');
  const [statusFilter, setStatusFilter] = useState<'all' | 'en_route' | 'delayed'>('all');

  // Quick Dispatch Form State
  const [originHub, setOriginHub] = useState('Sagar Bundelkhand Regional Grain & Water Reserve');
  const [destTaluka, setDestTaluka] = useState('Baldeogarh (Tikamgarh)');
  const [cargoType, setCargoType] = useState<ConvoyRoute['cargoType']>('Potable Water');
  const [cargoCapacity, setCargoCapacity] = useState('20,000 Litres (Twin Tanker)');

  const selectedConvoy = convoys.find(c => c.id === selectedConvoyId) || convoys[0];

  const filteredConvoys = convoys.filter(c => {
    if (statusFilter === 'en_route' && !c.status.includes('En Route')) return false;
    if (statusFilter === 'delayed' && !c.status.includes('Delayed')) return false;
    return true;
  });

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    addConvoy({
      originDepot: originHub,
      targetTaluka: destTaluka,
      cargoType,
      cargoCapacity,
      speedKmH: 52
    });

    showToast(
      'Convoy Dispatched',
      `Tanker unit assigned from ${originHub} to ${destTaluka}. FASTag toll exemption pre-cleared.`,
      'primary'
    );
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#111827] tracking-tight">
            Tanker Logistics & Fleet Operations
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time GPS tracking of potable water tankers, cattle fodder convoys, and emergency nutritional kits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F1F3F5] p-0.5 rounded-md border border-[#E3E6EB]">
            {(['all', 'en_route', 'delayed'] as const).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${
                  statusFilter === f
                    ? 'bg-white text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Fleet Queue (Left 4 cols) + Interactive Route Map & Telematics (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Active Convoy Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E6EB]">
              <h3 className="text-sm font-semibold text-[#111827]">
                Active Relief Convoys
              </h3>
              <span className="text-xs text-[#6B7280]">
                {filteredConvoys.length} units tracked
              </span>
            </div>

            <div className="divide-y divide-[#E3E6EB] max-h-[460px] overflow-y-auto">
              {filteredConvoys.map(c => {
                const isSelected = selectedConvoy?.id === c.id;
                const isDelayed = c.status.includes('Delayed');

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedConvoyId(c.id)}
                    className={`py-3 px-2 cursor-pointer transition-colors rounded-md my-0.5 ${
                      isSelected
                        ? 'bg-[#EEF4FA] border border-[#BCD4EC]'
                        : 'hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isDelayed ? 'bg-[#B26A00]' : 'bg-[#2E7D32]'
                          }`}
                        />
                        <span className="text-xs font-bold text-[#111827]">
                          {c.vehicleNo}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#0F4C81]">
                        {c.id}
                      </span>
                    </div>

                    <div className="mt-1 flex justify-between items-baseline text-xs">
                      <span className="text-[#4B5563]">{c.cargoType} · {c.cargoCapacity}</span>
                      <span className="text-[11px] font-semibold text-[#111827] tabular-nums">
                        {c.speedKmH} km/h
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-[#6B7280] flex justify-between items-center">
                      <span>Dest: <strong>{c.targetTaluka}</strong></span>
                      <span className={isDelayed ? 'text-[#B26A00] font-medium' : 'text-[#2E7D32] font-medium'}>
                        {c.eta}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#E3E6EB] rounded-full h-1 mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isDelayed ? 'bg-[#B26A00]' : 'bg-[#0F4C81]'
                        }`}
                        style={{ width: `${c.progressPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3E6EB] text-[11px] text-[#9CA3AF]">
            GPS feed: MH Emergency Response Vehicle Telematics Network
          </div>
        </div>

        {/* Right Column: Route Map & Telematics HUD (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Selected Convoy Telemetry Details Card */}
          {selectedConvoy && (
            <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E3E6EB] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#111827]">
                      {selectedConvoy.vehicleNo} ({selectedConvoy.id})
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        selectedConvoy.status.includes('Delayed')
                          ? 'bg-[#FFF8E1] text-[#B26A00]'
                          : 'bg-[#E8F5E9] text-[#2E7D32]'
                      }`}
                    >
                      {selectedConvoy.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Driver: {selectedConvoy.driverName} ({selectedConvoy.driverPhone})
                  </p>
                </div>

                {/* Communication & Dashcam Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedConvoyForCall(selectedConvoy)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F1F3F5] text-xs font-medium text-[#111827] hover:bg-[#E3E6EB] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0F4C81] stroke-[1.5]" />
                    <span>Call Driver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedConvoyForDashcam(selectedConvoy)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F1F3F5] text-xs font-medium text-[#111827] hover:bg-[#E3E6EB] transition-colors"
                  >
                    <Video className="w-3.5 h-3.5 text-[#0F4C81] stroke-[1.5]" />
                    <span>Live Dashcam</span>
                  </button>
                </div>
              </div>

              {/* Waypoints & Route Canvas */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-2">
                  Checkpoint Route Sequence
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {selectedConvoy.waypoints.map((wp, idx) => (
                    <div
                      key={wp.name}
                      className={`p-2.5 rounded border ${
                        wp.passed
                          ? 'bg-[#E8F5E9]/50 border-[#C8E6C9]'
                          : idx === 1
                          ? 'bg-[#EEF4FA] border-[#BCD4EC]'
                          : 'bg-[#F9FAFB] border-[#E3E6EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#6B7280] font-mono">
                          CP-0{idx + 1}
                        </span>
                        {wp.passed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                        )}
                      </div>
                      <span className="font-semibold text-[#111827] block truncate">
                        {wp.name}
                      </span>
                      <span className="text-[11px] text-[#6B7280]">ETA {wp.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Dispatch Generator Form */}
          <div className="bg-white rounded-lg border border-[#E3E6EB] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h3 className="text-sm font-semibold text-[#111827] pb-2 border-b border-[#E3E6EB] mb-3">
              Generate New Emergency Relief Dispatch
            </h3>

            <form onSubmit={handleDispatch} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">
                  Origin Supply Depot
                </label>
                <select
                  value={originHub}
                  onChange={e => setOriginHub(e.target.value)}
                  className="w-full bg-[#F6F7F9] text-xs text-[#111827] p-2 rounded-md border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81]"
                >
                  <option value="Bhopal Vallabh Bhavan State Emergency Hub">Bhopal Vallabh Bhavan State Emergency Hub</option>
                  <option value="Sagar Bundelkhand Regional Grain & Water Reserve">Sagar Bundelkhand Regional Grain & Water Reserve</option>
                  <option value="Indore Nimar-Malwa Transit Storage Outpost">Indore Nimar-Malwa Transit Storage Outpost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">
                  Destination Taluka / Tank Point
                </label>
                <input
                  type="text"
                  value={destTaluka}
                  onChange={e => setDestTaluka(e.target.value)}
                  placeholder="e.g. Baldeogarh (Tikamgarh)"
                  className="w-full bg-[#F6F7F9] text-xs text-[#111827] p-2 rounded-md border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">
                  Resource Cargo Category
                </label>
                <select
                  value={cargoType}
                  onChange={e => setCargoType(e.target.value as any)}
                  className="w-full bg-[#F6F7F9] text-xs text-[#111827] p-2 rounded-md border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81]"
                >
                  <option value="Potable Water">Potable Water (Tankers)</option>
                  <option value="Cattle Fodder Kits">Cattle Fodder Kits (Dry Fodder)</option>
                  <option value="Nutri-Pouches">Emergency Nutritional Kits</option>
                  <option value="Drought Seed Pouches">Drought-Resilient Seed Kits</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">
                  Payload Capacity
                </label>
                <input
                  type="text"
                  value={cargoCapacity}
                  onChange={e => setCargoCapacity(e.target.value)}
                  placeholder="e.g. 18,000 Litres"
                  className="w-full bg-[#F6F7F9] text-xs text-[#111827] p-2 rounded-md border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81]"
                />
              </div>

              <div className="sm:col-span-2 pt-2 flex justify-between items-center border-t border-[#E3E6EB]">
                <span className="text-[11px] text-[#6B7280]">
                  FASTag Disaster Exemption automatically attached to e-waybill
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#0F4C81] text-white text-xs font-semibold hover:bg-[#0A3963] transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue Deployment Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
