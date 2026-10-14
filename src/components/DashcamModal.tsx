import React from 'react';
import { useApp } from '../context/AppContext';

export const DashcamModal: React.FC = () => {
  const { selectedConvoyForDashcam, setSelectedConvoyForDashcam } = useApp();

  if (!selectedConvoyForDashcam) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-high border border-outline-variant/40 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col animate-in zoom-in-95">
        {/* Top Header */}
        <div className="p-4 bg-surface-container-lowest flex items-center justify-between border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
            <span className="font-headline-sm text-sm text-on-surface font-bold">
              LIVE DASHCAM: {selectedConvoyForDashcam.id} ({selectedConvoyForDashcam.vehicleNo})
            </span>
          </div>
          <button
            onClick={() => setSelectedConvoyForDashcam(null)}
            className="text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Dashcam Viewport */}
        <div className="relative w-full h-80 bg-neutral-900 overflow-hidden flex items-center justify-center">
          {/* Highway Simulation Graphic */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-75 contrast-125"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBf5YBUfZWfrN2hGI-PnvkKBUqwNm_1wAgujSdRTl0cf7v81XTnz3ydsHYIPBpCvsAi55fAHs3cyavXS5R3N1mGiftry2SWNtGnk_hFbW2Dhm9hETarcqORDCp5QlUln9Nhm2TL8V14RZi-b25xhn-IhOhijMajbNJY_dMP7Nk34FLuQO2M9ku5e-fb9bNQdjAoSSkjGz5MMAAD1mK7Rf2z6NeBGuVN4v_fnvPHNAgjRTkoY-YjfaAI')`
            }}
          />

          {/* Perspective Grid Lines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

          {/* Crosshair / HUD Target */}
          <div className="relative z-10 w-32 h-32 border border-primary/40 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="absolute w-full h-px bg-primary/20" />
            <div className="absolute h-full w-px bg-primary/20" />
          </div>

          {/* Top Left HUD Telemetry */}
          <div className="absolute top-4 left-4 z-20 font-mono text-xs text-primary bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/30">
            <div>CAM-01 • FORWARD FACING</div>
            <div>LAT: 18.9892° N • LON: 75.7601° E</div>
            <div>ALTITUDE: 532m • SLOPE: +1.2%</div>
          </div>

          {/* Top Right Recording Badge */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 font-mono text-xs text-error bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-error/30 font-bold">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
            REC 1080p 60fps
          </div>

          {/* Bottom Speed & Route Readout */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-on-surface bg-black/70 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 font-mono">
            <div>
              <span className="text-on-surface-variant text-[10px] block">CURRENT VELOCITY</span>
              <span className="text-primary font-bold text-base">
                {selectedConvoyForDashcam.speedKmH} km/h
              </span>
            </div>
            <div className="text-center">
              <span className="text-on-surface-variant text-[10px] block">CORRIDOR STATUS</span>
              <span className="text-secondary font-bold">GREEN CORRIDOR ACTIVE</span>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant text-[10px] block">DESTINATION ETA</span>
              <span className="text-on-surface font-bold text-base">
                {selectedConvoyForDashcam.eta}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-surface-container flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">
            Driver: {selectedConvoyForDashcam.driverName} ({selectedConvoyForDashcam.driverPhone})
          </span>
          <button
            type="button"
            onClick={() => setSelectedConvoyForDashcam(null)}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
