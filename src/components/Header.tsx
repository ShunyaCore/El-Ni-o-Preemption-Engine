import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICER_AVATAR } from '../data/mockData';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    officerName,
    officerRole,
    logout,
    searchQuery,
    setSearchQuery,
    showToast,
    setCurrentModule,
    setIsHealthModalOpen
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleDispatchTeam = () => {
    setCurrentModule('resource-routing-logistics');
    showToast('Dispatch Terminal Activated', 'Navigated to Resource Routing & Fleet Logistics.', 'primary');
  };

  const handleNdviRecalibrate = () => {
    showToast('NDVI Recalibration Triggered', 'Request sent to CartoSat-3 and Sentinel-2 multispectral pipeline.', 'secondary');
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/90 backdrop-blur-2xl z-40 shadow-[0_1px_10px_rgba(0,0,0,0.3)] border-b border-outline-variant/30">
      <div className="w-full h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Mobile Hamburger & Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Open Menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search talukas, water indices, alerts, vehicles..."
              className="w-full bg-surface-container-lowest/90 text-on-surface placeholder:text-on-surface-variant/70 pl-9 pr-4 py-1.5 rounded-lg font-body-md text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-md text-xs text-primary font-semibold whitespace-nowrap">
              Live Satellite Sync Online
            </span>
          </div>
        </div>

        {/* Severe Weather Warning Strip (Desktop) */}
        <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-tertiary/20 max-w-sm">
          <span className="material-symbols-outlined text-tertiary text-lg animate-pulse">warning</span>
          <span className="font-body-sm text-xs text-on-surface-variant truncate">
            <strong className="text-tertiary">Alert:</strong> Solapur & Beed rain deficit escalated to 44%
          </span>
        </div>

        {/* Action Controls & Profile Area */}
        <div className="flex items-center gap-3">
          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleDispatchTeam}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-colors border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-primary text-base">add_circle</span>
              <span className="font-semibold">Dispatch Team</span>
            </button>
            <button
              type="button"
              onClick={handleNdviRecalibrate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-colors border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-secondary text-base">water_drop</span>
              <span className="font-semibold">NDVI Recalibrate</span>
            </button>
          </div>

          {/* Quick Notification & Diagnostics */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-tertiary ring-2 ring-surface" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-high/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-outline-variant/40 p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/30">
                    <span className="font-headline-sm text-sm text-on-surface font-bold">Alert Directives</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-error-container/40 text-error font-semibold">
                      3 Pending
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-surface-container-lowest/80 border border-outline-variant/20">
                      <div className="flex items-center justify-between text-error font-semibold">
                        <span>Majalgaon Reservoir</span>
                        <span className="text-[10px] text-on-surface-variant">12m ago</span>
                      </div>
                      <p className="text-on-surface-variant mt-0.5">Dipped below 11.2% dead storage threshold.</p>
                    </div>
                    <div className="p-2 rounded bg-surface-container-lowest/80 border border-outline-variant/20">
                      <div className="flex items-center justify-between text-tertiary font-semibold">
                        <span>Latur Soil Anomaly</span>
                        <span className="text-[10px] text-on-surface-variant">42m ago</span>
                      </div>
                      <p className="text-on-surface-variant mt-0.5">Moisture deficit crossed 60% for 14 days.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      setCurrentModule('overview');
                    }}
                    className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-primary hover:underline"
                  >
                    View All in Command Dashboard
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsHealthModalOpen(true)}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              title="System Diagnostics & Grid Status"
            >
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </button>
          </div>

          <div className="h-6 w-px bg-outline-variant/40" />

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/30"
            >
              <img
                src={OFFICER_AVATAR}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-primary/50"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-lg text-xs text-on-surface font-semibold leading-tight">
                  {officerName}
                </span>
                <span className="font-label-md text-[10px] text-on-surface-variant leading-tight">
                  {officerRole}
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-base">
                keyboard_arrow_down
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-high/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-outline-variant/40 p-2 z-50">
                <div className="px-3 py-2 border-b border-outline-variant/30 mb-1">
                  <p className="text-xs font-bold text-on-surface">{officerName}</p>
                  <p className="text-[11px] text-primary">{officerRole}</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Disaster Response Clearance: Level 5</p>
                </div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setCurrentModule('settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base text-primary">badge</span>
                  <span>Jurisdiction Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-error hover:bg-error-container/20 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
