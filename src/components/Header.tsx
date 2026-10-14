import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bell, HelpCircle, ChevronDown, LogOut, Menu, X, Shield, ExternalLink } from 'lucide-react';

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
    currentModule,
    setCurrentModule,
    setIsHealthModalOpen,
    directives
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute initials
  const initials = officerName
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'YL';

  // Module to breadcrumb label
  const getModuleLabel = () => {
    switch (currentModule) {
      case 'overview':
        return 'State Drought Overview';
      case 'drought-risk-monitor':
        return 'Drought Risk & Rainfall Indices';
      case 'relief-budget-optimizer':
        return 'Relief Budget Allocation';
      case 'claim-evidence-review':
        return 'Crop Distress Claims Review';
      case 'resource-routing-logistics':
        return 'Fleet & Tanker Operations';
      case 'reports-and-analytics':
        return 'Reports & Data Export';
      case 'settings':
        return 'System & Feed Configuration';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-14 bg-white z-40 border-b border-[#E3E6EB] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F3F5] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <button
              type="button"
              onClick={() => setCurrentModule('overview')}
              className="hover:text-[#111827] transition-colors"
            >
              Home
            </button>
            <span className="text-[#D1D5DB]">/</span>
            <span className="text-[#111827] font-medium truncate max-w-[180px] sm:max-w-xs">
              {getModuleLabel()}
            </span>
          </nav>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-2 hidden sm:block">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search districts, talukas, claims, convoys..."
              className="w-full bg-[#F6F7F9] text-[#111827] placeholder:text-[#9CA3AF] pl-9 pr-8 py-1.5 rounded-md text-xs border border-[#E3E6EB] focus:bg-white focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Notification Bell, Help, and User Profile Menu */}
        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F7F9] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 stroke-[1.5]" />
              {directives.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C62828]" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-lg border border-[#E3E6EB] shadow-lg py-2 z-50">
                <div className="px-3.5 py-2 border-b border-[#E3E6EB] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#111827]">Priority Alerts</span>
                  <span className="text-[11px] text-[#6B7280]">{directives.length} active</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#F1F3F5]">
                  {directives.map(dir => (
                    <div key={dir.id} className="p-3 hover:bg-[#F9FAFB] transition-colors">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            dir.severity === 'critical' ? 'bg-[#C62828]' : 'bg-[#B26A00]'
                          }`}
                        />
                        <span className="text-xs font-medium text-[#111827] line-clamp-1">{dir.title}</span>
                      </div>
                      <p className="text-[11px] text-[#4B5563] line-clamp-2">{dir.description}</p>
                      <span className="text-[10px] text-[#9CA3AF] block mt-1">{dir.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help Icon */}
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(true)}
            className="p-2 rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F6F7F9] transition-colors"
            title="System Diagnostics & Help"
            aria-label="Help and Diagnostics"
          >
            <HelpCircle className="w-4 h-4 stroke-[1.5]" />
          </button>

          <div className="h-5 w-px bg-[#E3E6EB] mx-1" />

          {/* User Menu */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 rounded-md hover:bg-[#F6F7F9] transition-colors text-left"
              aria-expanded={isProfileOpen}
            >
              {/* Initials Avatar */}
              <div className="w-7 h-7 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-xs font-semibold tracking-tight shrink-0">
                {initials}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-semibold text-[#111827] leading-tight">{officerName}</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">{officerRole}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] hidden md:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-lg border border-[#E3E6EB] shadow-lg py-1 z-50">
                <div className="px-3.5 py-2.5 border-b border-[#E3E6EB]">
                  <p className="text-xs font-semibold text-[#111827]">{officerName}</p>
                  <p className="text-[11px] text-[#6B7280]">{officerRole}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Revenue & Forest Dept, GoM</p>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsHealthModalOpen(true);
                      setIsProfileOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-[#4B5563] hover:bg-[#F6F7F9] hover:text-[#111827] flex items-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>System Diagnostics & Feed Status</span>
                  </button>
                  <a
                    href="https://maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3.5 py-2 text-left text-xs text-[#4B5563] hover:bg-[#F6F7F9] hover:text-[#111827] flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>Government Portal</span>
                  </a>
                </div>
                <div className="border-t border-[#E3E6EB] pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-[#C62828] hover:bg-[#FDECEA] flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out of session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
