import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const {
    isHealthModalOpen,
    setIsHealthModalOpen,
    officerName,
    officerRole,
    logout,
    showToast
  } = useApp();

  const [awsFreq, setAwsFreq] = useState('300s');
  const [cartosatSync, setCartosatSync] = useState(true);
  const [fastagExemption, setFastagExemption] = useState(true);

  if (!isHealthModalOpen) return null;

  const handleSaveSettings = () => {
    setIsHealthModalOpen(false);
    showToast('Telemetry Settings Saved', 'Sensor polling cycle and FASTag parameters synced.', 'primary');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-high border border-outline-variant/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">settings</span>
            <h3 className="font-headline-sm text-base text-on-surface font-bold">
              System Settings & Grid Diagnostics
            </h3>
          </div>
          <button
            onClick={() => setIsHealthModalOpen(false)}
            className="text-on-surface-variant hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Officer Profile Summary */}
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="text-on-surface-variant text-[11px] block">Active User</span>
              <span className="font-bold text-sm text-on-surface">{officerName}</span>
              <span className="text-[11px] text-primary block">{officerRole}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsHealthModalOpen(false);
                logout();
              }}
              className="px-3 py-1.5 rounded-xl bg-error-container/30 hover:bg-error-container/50 text-error font-semibold text-xs transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Telemetry Hardware State */}
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
            <span className="font-bold text-on-surface text-xs block">
              Satellite & Telemetry Nodes
            </span>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant">INSAT-3DR Geostationary Link</span>
              <span className="text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                ONLINE (42ms)
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
              <span className="text-on-surface-variant">ISRO CartoSat-3 Digital Elevation</span>
              <span className="text-primary font-semibold">SYNCHRONIZED</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-on-surface-variant">Automated Weather Stations (AWS)</span>
              <span className="font-mono text-on-surface font-semibold">1,480 / 1,500 (98.7%)</span>
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Automated Polling Frequency</span>
                <span className="text-on-surface-variant text-[11px]">
                  Rate at which ground probes push moisture indices.
                </span>
              </div>
              <select
                value={awsFreq}
                onChange={e => setAwsFreq(e.target.value)}
                className="bg-surface-container text-on-surface px-3 py-1.5 rounded-xl border border-outline-variant/30 focus:outline-none"
              >
                <option value="60s">60s (Ultra-High)</option>
                <option value="300s">300s (Standard)</option>
                <option value="900s">900s (Battery Saver)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">CartoSat-3 Slope Gradient Filter</span>
                <span className="text-on-surface-variant text-[11px]">
                  Avoid steep ghat roads for tankers &gt;16kL.
                </span>
              </div>
              <input
                type="checkbox"
                checked={cartosatSync}
                onChange={e => setCartosatSync(e.target.checked)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Disaster FASTag Toll Exemption</span>
                <span className="text-on-surface-variant text-[11px]">
                  Automatic green corridor transmission to toll gates.
                </span>
              </div>
              <input
                type="checkbox"
                checked={fastagExemption}
                onChange={e => setFastagExemption(e.target.checked)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-bold shadow-md cursor-pointer"
          >
            Save Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
