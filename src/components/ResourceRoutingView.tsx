import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MARATHWADA_GIS_BG } from '../data/mockData';
import { ConvoyRoute } from '../types';

export const ResourceRoutingView: React.FC = () => {
  const {
    convoys,
    addConvoy,
    depots,
    showToast,
    setSelectedConvoyForCall,
    setSelectedConvoyForDashcam
  } = useApp();

  const [viewMode, setViewMode] = useState<'planned' | 'telemetry' | 'both'>('planned');
  const [statusFilter, setStatusFilter] = useState<'all' | 'en_route' | 'loading' | 'delayed'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [cargoFilter, setCargoFilter] = useState<string>('all');
  const [selectedConvoyId, setSelectedConvoyId] = useState<string>('RT-MH-4019');

  // Quick Dispatch Form State
  const [originHub, setOriginHub] = useState('Aurangabad Central Hub (Bay 2)');
  const [destCenter, setDestCenter] = useState('Beed • Patoda Critical Tank Point #3');
  const [cargoSelection, setCargoSelection] = useState('2x Potable Water Tankers (24,000 L)');
  const [priorityAlgo, setPriorityAlgo] = useState('Fastest Arrival (Green Corridor)');
  const [isSimulating, setIsSimulating] = useState(false);
  const [successBanner, setSuccessBanner] = useState<{ id: string; target: string } | null>(null);

  // Filtered Convoys
  const filteredConvoys = convoys.filter(c => {
    if (statusFilter === 'en_route' && !c.status.includes('En Route')) return false;
    if (statusFilter === 'loading' && !c.status.includes('Loading')) return false;
    if (statusFilter === 'delayed' && !c.status.includes('Delayed')) return false;
    if (districtFilter !== 'all' && !c.targetLocation.toLowerCase().includes(districtFilter.toLowerCase())) return false;
    if (cargoFilter !== 'all' && !c.cargoType.toLowerCase().includes(cargoFilter.toLowerCase())) return false;
    return true;
  });

  const selectedConvoy = convoys.find(c => c.id === selectedConvoyId) || convoys[0];

  const handleTriggerDispatch = () => {
    let cargoType: ConvoyRoute['cargoType'] = 'Potable Water';
    if (cargoSelection.includes('Fodder')) cargoType = 'Cattle Fodder Kits';
    else if (cargoSelection.includes('Nutrition')) cargoType = 'Nutri-Pouches';
    else if (cargoSelection.includes('Seed')) cargoType = 'Drought Seed Pouches';

    const targetTaluka = destCenter.split('•')[0].trim();

    addConvoy({
      originDepot: originHub.split('(')[0].trim(),
      targetTaluka: targetTaluka,
      cargoType,
      cargoCapacity: cargoSelection,
      speedKmH: 56
    });

    const newId = `RT-MH-${Math.floor(1000 + Math.random() * 9000)}`;
    setSuccessBanner({ id: newId, target: targetTaluka });
    setTimeout(() => {
      setSuccessBanner(null);
    }, 8000);
  };

  const handleSimulateAlternatives = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      showToast(
        'Route Alternatives Calculated',
        'Secondary bypass via State Highway 142 avoids bridge bottleneck with +12 min delta.',
        'secondary'
      );
    }, 600);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-8">
      {/* Breadcrumbs & Tactical Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-xs tracking-wider uppercase mb-1">
            <span>Logistics Hub</span>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="text-primary font-semibold">Marathwada Tactical Grid</span>
            <span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
            <span className="text-secondary font-semibold">Fleet Operations</span>
          </div>
          <h1 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
            Resource Routing & Fleet Logistics
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Dynamic supply chain dispatch for water tankers, fodder banks, and emergency nutrition packets.
          </p>
        </div>

        {/* Quick Mode / Re-route Optimizers */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30">
            <button
              type="button"
              onClick={() => setViewMode('planned')}
              className={`px-3 py-1.5 rounded-lg font-headline-sm text-xs transition-all ${
                viewMode === 'planned'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Planned View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('telemetry')}
              className={`px-3 py-1.5 rounded-lg font-headline-sm text-xs transition-all ${
                viewMode === 'telemetry'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Telemetry Live
            </button>
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg font-headline-sm text-xs transition-all ${
                viewMode === 'both'
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Both Overlaid
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast('Routes Recalculated', 'GPS telemetry updated via NavIC gateway.', 'secondary')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-xs font-semibold border border-outline-variant/30 transition-colors"
          >
            <span className="material-symbols-outlined text-secondary text-base">refresh</span>
            <span>Recalculate Routes</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('quickDispatchPanel');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-fixed-dim font-headline-sm text-xs font-bold transition-all shadow-[0_0_16px_rgba(78,222,163,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">emergency_share</span>
            <span>Instant Convoy</span>
          </button>
        </div>
      </div>

      {/* Real-Time Operational Fleet Telemetry Bar (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Active Convoys */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
                Active Convoys
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-xl text-2xl text-on-surface font-bold">
                  {convoys.length + 72}
                </span>
                <span className="font-label-md text-xs text-on-surface-variant">/ 84 on-duty</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 font-label-md text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              90.5% deployed
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">12 depots active</span>
          </div>
        </div>

        {/* Completed Dispatches */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-2xl">task_alt</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
                Completed Dispatches
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-xl text-2xl text-on-surface font-bold">142</span>
                <span className="font-label-md text-xs text-on-surface-variant">drops today</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 font-label-md text-[11px] text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +18% vs avg
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">1.84 ML delivered</span>
          </div>
        </div>

        {/* Delayed Routes */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-2xl">warning_amber</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
                Delayed Routes
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-xl text-2xl text-tertiary font-bold">3</span>
                <span className="font-label-md text-xs text-on-surface-variant">convoys</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 font-label-md text-[11px] text-tertiary bg-tertiary/10 border border-tertiary/20 px-2 py-0.5 rounded-full font-bold">
              Terrain / Ghats
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">Avg lag: +28 min</span>
          </div>
        </div>

        {/* Fuel Efficiency */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim text-2xl">eco</span>
            </div>
            <div>
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
                Fleet Fuel Optimization
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-xl text-2xl text-on-surface font-bold">96.4%</span>
                <span className="font-label-md text-xs text-on-surface-variant">efficiency</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 font-label-md text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-xs">insights</span>
              -1,420 kg CO₂
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">Toll saves ₹42,800</span>
          </div>
        </div>
      </div>

      {/* Main Split Canvas: Multi-Stop Schedule (Left 5) + Interactive GIS Canvas (Right 7) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Filterable Route Queue (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">route</span>
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  Dispatches & Multi-Stop Queues
                </span>
              </div>
              <span className="font-label-md text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md border border-outline-variant/20">
                Showing {filteredConvoys.length} of {convoys.length + 72}
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {(
                [
                  { id: 'all', label: 'All Statuses' },
                  { id: 'en_route', label: 'En Route (48)' },
                  { id: 'loading', label: 'Depot Loading (16)' },
                  { id: 'delayed', label: 'Delayed (3)' }
                ] as const
              ).map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-label-md transition-all font-semibold ${
                    statusFilter === tab.id
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dropdown Filters */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="relative">
                <select
                  aria-label="Filter by target district"
                  value={districtFilter}
                  onChange={e => setDistrictFilter(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs px-3 py-2 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
                >
                  <option value="all">All Districts (Marathwada)</option>
                  <option value="beed">Beed & Ashti Cluster</option>
                  <option value="latur">Latur & Ausa Sector</option>
                  <option value="osmanabad">Osmanabad / Dharashiv</option>
                  <option value="solapur">Solapur Border Hub</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>

              <div className="relative">
                <select
                  aria-label="Filter by cargo payload"
                  value={cargoFilter}
                  onChange={e => setCargoFilter(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-xs px-3 py-2 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
                >
                  <option value="all">All Payloads</option>
                  <option value="water">Water Tankers (12kL - 20kL)</option>
                  <option value="fodder">Cattle Fodder Blocks</option>
                  <option value="nutri">Emergency Nutri-Packs</option>
                  <option value="seed">Drought Seed Pouches</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Route Cards Scrollable Feed */}
          <div className="flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredConvoys.map(convoy => {
              const isSelected = selectedConvoy.id === convoy.id;
              const isDelayed = convoy.status.includes('Delayed');
              const isLoading = convoy.status.includes('Loading');

              return (
                <div
                  key={convoy.id}
                  onClick={() => setSelectedConvoyId(convoy.id)}
                  className={`p-4 rounded-2xl transition-all shadow-sm relative group cursor-pointer border ${
                    isSelected
                      ? 'bg-surface-container-high border-primary/50 shadow-md'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30'
                  }`}
                >
                  {/* Left Indicator Stripe */}
                  <div
                    className={`absolute left-0 top-3 bottom-3 w-1 rounded-r ${
                      isDelayed
                        ? 'bg-tertiary'
                        : isLoading
                        ? 'bg-secondary'
                        : 'bg-primary'
                    }`}
                  />

                  <div className="flex items-start justify-between gap-3 pl-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-sm text-on-surface font-bold tracking-tight">
                          {convoy.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                            isDelayed
                              ? 'bg-tertiary/10 text-tertiary border-tertiary/30'
                              : isLoading
                              ? 'bg-secondary/10 text-secondary border-secondary/30'
                              : 'bg-primary/10 text-primary border-primary/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDelayed ? 'bg-tertiary' : isLoading ? 'bg-secondary' : 'bg-primary animate-pulse'
                            }`}
                          />
                          {convoy.status}
                        </span>
                      </div>
                      <div className="font-body-sm text-xs text-on-surface-variant mt-1">
                        Depot: <span className="text-on-surface font-medium">{convoy.originDepot}</span> →
                        Target: <span className="text-on-surface font-medium"> {convoy.targetLocation}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`font-headline-sm text-sm font-bold block ${
                          isDelayed ? 'text-tertiary' : 'text-primary'
                        }`}
                      >
                        ETA {convoy.eta}
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        {convoy.remainingKm} km remaining
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 grid grid-cols-3 gap-2 pl-2 text-on-surface-variant font-body-sm text-xs bg-surface-container-lowest/60 p-2 rounded-xl border border-outline-variant/20">
                    <div className="flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-sm text-secondary">
                        {convoy.cargoType === 'Potable Water' ? 'water_drop' : 'inventory_2'}
                      </span>
                      <span className="truncate">{convoy.cargoType}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-sm text-outline">badge</span>
                      <span className="truncate">{convoy.vehicleNo}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="material-symbols-outlined text-sm text-primary">speed</span>
                      <span className="font-mono">{convoy.speedKmH} km/h</span>
                    </div>
                  </div>

                  {/* Waypoints Bar if available */}
                  {convoy.waypoints && convoy.waypoints.length > 0 && (
                    <div className="mt-3 pl-2">
                      <div className="flex items-center justify-between text-xs font-label-md text-on-surface-variant mb-1">
                        <span>Progress</span>
                        <span className="text-primary font-bold">{convoy.progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${convoy.progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Drop Velocity mini bar chart */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-headline-sm text-xs text-on-surface font-bold">
                Hourly Fleet Drop Velocity
              </span>
              <span className="font-label-md text-[11px] text-on-surface-variant">Last 8 Hours</span>
            </div>
            <div className="w-full h-20 flex items-end justify-between gap-2 px-1">
              {[
                { time: '06h', h: 32 },
                { time: '07h', h: 48 },
                { time: '08h', h: 62 },
                { time: '09h', h: 76, peak: true },
                { time: '10h', h: 80, peak: true },
                { time: '11h', h: 58 },
                { time: '12h', h: 42 }
              ].map(bar => (
                <div key={bar.time} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-colors ${
                      bar.peak
                        ? 'bg-primary-container shadow-[0_0_8px_rgba(78,222,163,0.4)]'
                        : 'bg-surface-container-high hover:bg-secondary'
                    }`}
                    style={{ height: `${bar.h}%` }}
                  />
                  <span
                    className={`font-body-sm text-[10px] ${
                      bar.peak ? 'text-primary font-bold' : 'text-on-surface-variant'
                    }`}
                  >
                    {bar.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive GIS Logistics Map Viewport (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-2xl bg-surface-container-lowest overflow-hidden shadow-2xl border border-outline-variant/30 min-h-[580px] flex flex-col justify-between">
            {/* Background Map Graphic */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 pointer-events-none"
              style={{ backgroundImage: `url('${MARATHWADA_GIS_BG}')` }}
            />

            {/* Ambient Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/80" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-surface-container-lowest/90 via-transparent to-surface-container-lowest/40" />

            {/* High-Tech Route Overlays (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#93ccff" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffb95f" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffb4ab" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Route 1: Aurangabad to Beed */}
              <path
                d="M 230 140 C 270 210, 310 260, 410 320"
                fill="none"
                stroke="url(#routeGrad1)"
                strokeWidth="4"
                strokeDasharray="6,4"
                className="animate-pulse"
              />

              {/* Route 2: Solapur to Tuljapur */}
              <path
                d="M 480 520 C 490 470, 520 440, 560 380"
                fill="none"
                stroke="url(#routeGrad2)"
                strokeWidth="3.5"
                strokeDasharray="4,4"
              />

              {/* Route 3: Pune to Latur corridor */}
              <path
                d="M 120 420 C 240 430, 410 420, 570 340"
                fill="none"
                stroke="#93ccff"
                strokeWidth="3"
                strokeDasharray="8,6"
                className="opacity-60"
              />

              {/* Waypoint circles */}
              <circle cx="230" cy="140" r="7" fill="#4edea3" className="animate-ping" opacity="0.5" />
              <circle cx="230" cy="140" r="5" fill="#4edea3" />
              <circle cx="410" cy="320" r="6" fill="#93ccff" />
              <circle cx="560" cy="380" r="6" fill="#ffb95f" />
              <circle cx="480" cy="520" r="6" fill="#ffb4ab" />
            </svg>

            {/* Map Layer Top HUD */}
            <div className="relative z-10 p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 px-3 py-1.5 rounded-xl shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="font-headline-sm text-xs text-on-surface font-bold">
                  GIS Route Telemetry Active
                </span>
                <span className="text-on-surface-variant font-body-sm text-[11px] ml-2">
                  Zoom: 1:25,000
                </span>
              </div>

              <div className="flex items-center gap-1 bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 p-1 rounded-xl shadow-md">
                <button
                  type="button"
                  onClick={() => showToast('Zoom In', 'Map scale adjusted to 1:15,000.', 'secondary')}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container"
                  title="Zoom in"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Zoom Out', 'Map scale adjusted to 1:50,000.', 'secondary')}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container"
                  title="Zoom out"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <div className="w-px h-4 bg-outline-variant/30" />
                <button
                  type="button"
                  onClick={() => showToast('Layer Reset', 'Centered on Marathwada tactical grid.', 'secondary')}
                  className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container"
                  title="Center map"
                >
                  <span className="material-symbols-outlined text-sm">my_location</span>
                </button>
              </div>
            </div>

            {/* Center Node Pins & Active Truck Live Telematics Popover */}
            <div className="relative z-10 w-full h-full flex-1 min-h-[380px]">
              {/* Hub Pin 1: Aurangabad */}
              <div className="absolute top-[22%] left-[26%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                <div className="flex items-center gap-1.5 bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/40 px-2.5 py-1 rounded-full shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary text-xs">warehouse</span>
                  <span className="font-headline-sm text-[11px] text-on-surface font-bold">
                    Aurangabad Central Hub
                  </span>
                </div>
                <span className="font-body-sm text-[10px] text-on-surface-variant block text-center mt-0.5">
                  24 Trucks Ready
                </span>
              </div>

              {/* Hub Pin 2: Solapur */}
              <div className="absolute bottom-[20%] left-[58%] -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                <div className="flex items-center gap-1.5 bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/40 px-2.5 py-1 rounded-full shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-tertiary text-xs">home_work</span>
                  <span className="font-headline-sm text-[11px] text-on-surface font-bold">
                    Solapur Regional Depot
                  </span>
                </div>
              </div>

              {/* Active Truck Live Telematics Popover */}
              <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
                <div className="relative flex items-center justify-center mb-1">
                  <span className="absolute w-8 h-8 rounded-full bg-primary/20 animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_14px_rgba(78,222,163,0.8)] cursor-pointer">
                    <span className="material-symbols-outlined text-base">water_drop</span>
                  </div>
                </div>

                <div className="w-72 p-4 rounded-2xl bg-surface-container-high/95 backdrop-blur-2xl border border-outline-variant/40 shadow-2xl transition-all">
                  <div className="flex items-start justify-between pb-2 mb-2 border-b border-outline-variant/20">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline-sm text-sm text-on-surface font-bold">
                          {selectedConvoy.id}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="font-body-sm text-xs text-on-surface-variant">
                        Lead: {selectedConvoy.driverName}
                      </span>
                    </div>
                    <span className="font-label-md text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                      100% Loaded
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-body-sm text-xs mb-3">
                    <div className="p-2 rounded-xl bg-surface-container-lowest/60 border border-outline-variant/20">
                      <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider font-semibold">
                        Live Speed
                      </span>
                      <span className="font-headline-sm text-sm text-primary font-bold">
                        {selectedConvoy.speedKmH} km/h
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface-container-lowest/60 border border-outline-variant/20">
                      <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider font-semibold">
                        Est. Delivery
                      </span>
                      <span className="font-headline-sm text-sm text-on-surface font-bold">
                        {selectedConvoy.eta}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-on-surface-variant">
                    <div className="flex items-center justify-between">
                      <span>Cargo:</span>
                      <span className="text-on-surface font-medium truncate max-w-[150px]">
                        {selectedConvoy.cargoType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Target:</span>
                      <span className="text-on-surface font-medium truncate max-w-[150px]">
                        {selectedConvoy.targetLocation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Contact:</span>
                      <span className="text-secondary font-mono font-medium">{selectedConvoy.driverPhone}</span>
                    </div>
                  </div>

                  {/* Micro Action Bar */}
                  <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedConvoyForCall(selectedConvoy)}
                      className="flex-1 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-xs hover:brightness-110 transition-all font-bold text-center cursor-pointer"
                    >
                      Call Driver
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedConvoyForDashcam(selectedConvoy)}
                      className="flex-1 py-1.5 rounded-xl bg-surface-container text-on-surface font-headline-sm text-xs hover:bg-surface-container-highest transition-colors font-semibold text-center cursor-pointer border border-outline-variant/30"
                    >
                      Live Dashcam
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Bottom Legend */}
            <div className="relative z-10 p-3.5 flex flex-wrap items-center justify-between gap-3 bg-surface-container-low/85 backdrop-blur-xl border-t border-outline-variant/30">
              <div className="flex items-center gap-4 flex-wrap text-xs text-on-surface-variant">
                <span className="font-label-md text-on-surface uppercase tracking-wider font-bold">
                  Legend:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Water Convoy Priority</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <span>Fodder Kit Haul</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span>Nutrition Packet Van</span>
                </div>
              </div>
              <span className="font-body-sm text-[11px] text-outline">
                Refreshed every 15s via NavIC Telematics
              </span>
            </div>
          </div>

          {/* Live Resource Depot Inventory Status Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {depots.map(depot => (
              <div
                key={depot.id}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-xl shadow-md flex items-center justify-between"
              >
                <div>
                  <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    {depot.name}
                  </span>
                  <div className="font-headline-sm text-base text-on-surface font-bold mt-0.5">
                    {depot.availableCapacity}
                  </div>
                  <span
                    className={`font-body-sm text-xs ${
                      depot.statusTone === 'primary'
                        ? 'text-primary'
                        : depot.statusTone === 'secondary'
                        ? 'text-secondary'
                        : 'text-tertiary'
                    }`}
                  >
                    {depot.statusText}
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    depot.statusTone === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : depot.statusTone === 'secondary'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-tertiary/10 text-tertiary'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {depot.statusTone === 'primary' ? 'water_ph' : 'inventory'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Immediate Dispatch Form & Route Generator */}
      <div
        id="quickDispatchPanel"
        className="p-6 lg:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-2xl shadow-xl flex flex-col gap-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-lg lg:text-xl text-on-surface font-bold tracking-tight">
                Immediate Dispatch & Optimal Route Generator
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
                Configure emergency relief convoys with AI-computed minimal travel time, grade slope, and zero toll bottlenecks.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-md text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-base">satellite_alt</span>
              ISRO CartoSat-3 Elevation Sync Active
            </span>
          </div>
        </div>

        {/* 4 Form Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Origin Depot */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              1. Origin Supply Hub
            </label>
            <div className="relative">
              <select
                aria-label="Select source warehouse"
                value={originHub}
                onChange={e => setOriginHub(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs sm:text-sm px-3.5 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
              >
                <option value="Aurangabad Central Hub (Bay 2)">Aurangabad Central Hub (Bay 2)</option>
                <option value="Pune East Agro Depot">Pune East Agro Depot</option>
                <option value="Solapur South Tanker Station">Solapur South Strategic Tanker Station</option>
                <option value="Ahmednagar Fodder Logistics Base">Ahmednagar Fodder Logistics Base</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-outline">Available Tankers: 18 units</span>
          </div>

          {/* 2. Destination Taluka */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              2. Destination Relief Center
            </label>
            <div className="relative">
              <select
                aria-label="Select destination taluka"
                value={destCenter}
                onChange={e => setDestCenter(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs sm:text-sm px-3.5 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
              >
                <option value="Beed • Patoda Critical Tank Point #3">Beed • Patoda Critical Tank Point #3</option>
                <option value="Latur • Nilanga Community Reservoir">Latur • Nilanga Community Reservoir</option>
                <option value="Osmanabad • Bhoom Agro Cattle Camp">Osmanabad • Bhoom Agro Cattle Camp</option>
                <option value="Jalna • Ambad Drought Shelter">Jalna • Ambad Drought Shelter</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-tertiary">Deficit Index: Severe (44% deficit)</span>
          </div>

          {/* 3. Cargo Allocation */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              3. Cargo Allocation
            </label>
            <div className="relative">
              <select
                aria-label="Select cargo payload type"
                value={cargoSelection}
                onChange={e => setCargoSelection(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs sm:text-sm px-3.5 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
              >
                <option value="2x Potable Water Tankers (24,000 L)">2x Potable Water Tankers (24,000 L)</option>
                <option value="1x Water Tanker + 1x Cattle Fodder Truck">1x Water Tanker + 1x Cattle Fodder Truck</option>
                <option value="500x Dry Nutrition Ration Bags">500x Dry Nutrition Ration Bags</option>
                <option value="Express Drought Seed Reseed Kits">Express Drought Seed Reseed Kits (1,000 pkts)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-outline">Estimated Gross Weight: 28.4 MT</span>
          </div>

          {/* 4. Route Algorithm */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              4. Route Priority Algorithm
            </label>
            <div className="relative">
              <select
                aria-label="Select routing priority"
                value={priorityAlgo}
                onChange={e => setPriorityAlgo(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs sm:text-sm px-3.5 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 cursor-pointer"
              >
                <option value="Fastest Arrival (Green Corridor)">Fastest Arrival (Green Corridor)</option>
                <option value="Fuel Economical (Avoid Steep Ghats)">Fuel Economical (Avoid Steep Ghats)</option>
                <option value="Toll Exempt High-Speed Expressway">Toll Exempt High-Speed Expressway</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-primary">AI confidence: 99.1%</span>
          </div>
        </div>

        {/* Calculation Outcome Bar & Trigger Button */}
        <div className="mt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest/80 border border-outline-variant/30 p-4 rounded-2xl">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">timer</span>
              <div>
                <span className="text-on-surface-variant font-body-sm text-[11px] block">
                  Estimated Drive Time
                </span>
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  1 hr 42 min (118 km)
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-outline-variant/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-xl">toll</span>
              <div>
                <span className="text-on-surface-variant font-body-sm text-[11px] block">
                  Toll Cost Exemption
                </span>
                <span className="font-headline-sm text-sm text-secondary font-bold">
                  ₹0 (Disaster FASTag Exemption)
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-outline-variant/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-xl">ev_station</span>
              <div>
                <span className="text-on-surface-variant font-body-sm text-[11px] block">
                  Projected Diesel Burn
                </span>
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  29.4 Liters (₹2,680)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              disabled={isSimulating}
              onClick={handleSimulateAlternatives}
              className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-xs font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
            >
              {isSimulating ? 'Simulating...' : 'Simulate Alternatives'}
            </button>
            <button
              type="button"
              onClick={handleTriggerDispatch}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-fixed-dim font-headline-sm text-xs font-bold transition-all shadow-[0_0_20px_rgba(78,222,163,0.35)] flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">send_and_archive</span>
              <span>Trigger Immediate Water Convoy</span>
            </button>
          </div>
        </div>

        {/* Operational Success Banner */}
        {successBanner && (
          <div className="p-4 rounded-2xl bg-primary-container/20 border border-primary/40 text-on-primary-container flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">verified</span>
              <div>
                <span className="font-headline-sm text-sm text-primary font-bold">
                  Convoy #{successBanner.id} Dispatched to {successBanner.target}
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  2x Tankers notified via driver terminal. Green corridor transit code transmitted to Aurangabad-Beed Toll Plaza.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSuccessBanner(null)}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
