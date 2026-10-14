import React from 'react';
import { useApp } from '../context/AppContext';
import { OperationalModule } from '../types';
import { APP_LOGO } from '../data/mockData';

interface SidebarProps {
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenOnMobile, onCloseMobile }) => {
  const { currentModule, setCurrentModule, setIsHealthModalOpen } = useApp();

  const navItems: { path: OperationalModule; label: string; icon: string; iconColor: string }[] = [
    {
      path: 'overview',
      label: 'Dashboard',
      icon: 'space_dashboard',
      iconColor: 'text-primary'
    },
    {
      path: 'drought-risk-monitor',
      label: 'Drought Risk Monitor',
      icon: 'radar',
      iconColor: 'text-tertiary'
    },
    {
      path: 'relief-budget-optimizer',
      label: 'Relief Budget Optimizer',
      icon: 'account_balance_wallet',
      iconColor: 'text-secondary'
    },
    {
      path: 'claim-evidence-review',
      label: 'Claim Evidence Review',
      icon: 'fact_check',
      iconColor: 'text-primary-fixed'
    },
    {
      path: 'resource-routing-logistics',
      label: 'Resource Routing',
      icon: 'local_shipping',
      iconColor: 'text-secondary-container'
    },
    {
      path: 'reports-and-analytics',
      label: 'Reports & Analytics',
      icon: 'insights',
      iconColor: 'text-tertiary-fixed-dim'
    }
  ];

  const handleNavClick = (path: OperationalModule) => {
    setCurrentModule(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenOnMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low/95 backdrop-blur-2xl z-50 flex flex-col justify-between shadow-[0_1px_12px_rgba(0,0,0,0.4)] border-r border-outline-variant/30 transition-transform duration-300 ease-in-out ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-16 flex items-center justify-between px-5 bg-surface-container-lowest/80 border-b border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={APP_LOGO}
                alt="El Niño Preemption Engine Logo"
                className="h-8 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-base tracking-tight text-primary font-bold truncate leading-none">
                  Preemption
                </span>
                <span className="font-label-md text-[11px] text-on-surface-variant tracking-wider uppercase truncate mt-0.5">
                  Command Core
                </span>
              </div>
            </div>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>

          {/* Operational Modules Navigation */}
          <div className="px-3 py-4">
            <div className="px-3 py-1 mb-2 font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Operational Modules
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map(item => {
                const isActive = currentModule === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-headline-sm font-semibold shadow-md'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isActive ? 'text-on-primary-container' : item.iconColor
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Satellite Node Status Box & Settings */}
        <div className="p-3">
          <div
            onClick={() => setIsHealthModalOpen(true)}
            className="rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 p-3 flex flex-col gap-1.5 cursor-pointer hover:border-primary/50 transition-all shadow-inner group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider">
                Satellite Node
              </span>
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="font-headline-sm text-sm text-on-surface font-bold group-hover:text-primary transition-colors">
              INSAT-3DR GIS
            </span>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">sync</span>
                <span>Latency 42ms</span>
              </div>
              <span className="text-[10px] text-primary/80 group-hover:underline">Diagnostics</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-outline-variant/30">
            <button
              onClick={() => setIsHealthModalOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-label-lg text-sm text-left"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
              <span>System Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
