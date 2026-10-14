import React from 'react';
import { useApp } from '../context/AppContext';
import { OperationalModule } from '../types';
import {
  LayoutDashboard,
  Radar,
  Calculator,
  ClipboardCheck,
  Truck,
  FileBarChart,
  Settings,
  X,
  Building2,
  Database
} from 'lucide-react';

interface SidebarProps {
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenOnMobile,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { currentModule, setCurrentModule, setIsHealthModalOpen } = useApp();

  const navItems: { path: OperationalModule; label: string; icon: React.ElementType }[] = [
    {
      path: 'overview',
      label: 'Overview',
      icon: LayoutDashboard
    },
    {
      path: 'drought-risk-monitor',
      label: 'Drought Risk & NDVI',
      icon: Radar
    },
    {
      path: 'relief-budget-optimizer',
      label: 'Budget Allocation',
      icon: Calculator
    },
    {
      path: 'claim-evidence-review',
      label: 'Crop Distress Claims',
      icon: ClipboardCheck
    },
    {
      path: 'resource-routing-logistics',
      label: 'Tanker Logistics',
      icon: Truck
    },
    {
      path: 'reports-and-analytics',
      label: 'Reports & Export',
      icon: FileBarChart
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
          className="fixed inset-0 bg-[#111827]/40 z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full ${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-white z-50 flex flex-col justify-between border-r border-[#E3E6EB] transition-all duration-200 ease-in-out ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Official Emblem & Branding */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-[#E3E6EB]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-md bg-[#0F4C81] text-white flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 stroke-[1.5]" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#111827] tracking-tight truncate leading-tight">
                    State Relief Cell
                  </span>
                  <span className="text-[11px] text-[#6B7280] truncate leading-tight">
                    Govt. of Maharashtra
                  </span>
                </div>
              )}
            </div>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-[#6B7280] hover:text-[#111827]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            )}
          </div>

          {/* Section Label */}
          {!isCollapsed && (
            <div className="px-4 pt-4 pb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Relief Modules
              </span>
            </div>
          )}

          {/* Nav Items */}
          <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentModule === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left relative ${
                    isActive
                      ? 'bg-[#EEF4FA] text-[#0F4C81]'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F7F9]'
                  }`}
                >
                  {/* 3px left accent bar for active item */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#0F4C81] rounded-r"
                      aria-hidden="true"
                    />
                  )}

                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 stroke-[1.5] ${
                      isActive ? 'text-[#0F4C81]' : 'text-[#6B7280]'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Data Feed Status & System Settings */}
        <div className="p-3 border-t border-[#E3E6EB] bg-[#FAFBFC]">
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(true)}
            className="w-full flex items-center gap-2.5 p-2 rounded-md hover:bg-[#F1F3F5] transition-colors text-left text-[#4B5563]"
          >
            <Database className="w-4 h-4 text-[#6B7280] stroke-[1.5] shrink-0" />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                  <span className="text-[11px] font-semibold text-[#111827] truncate">
                    Data Sync Online
                  </span>
                </div>
                <span className="text-[10px] text-[#6B7280] truncate">
                  INSAT-3DR & IMD Feeds
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
