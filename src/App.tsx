import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { DroughtRiskView } from './components/DroughtRiskView';
import { BudgetOptimizerView } from './components/BudgetOptimizerView';
import { ClaimReviewView } from './components/ClaimReviewView';
import { ResourceRoutingView } from './components/ResourceRoutingView';
import { ReportsView } from './components/ReportsView';
import { DriverCallModal } from './components/DriverCallModal';
import { DashcamModal } from './components/DashcamModal';
import { SettingsModal } from './components/SettingsModal';

const AppContent: React.FC = () => {
  const { isAuthenticated, currentModule, toast, clearToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is not authenticated, display the Government Officer Login screen first
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpenOnMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Fixed Header */}
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Viewport Content */}
        <main className="w-full pt-20 px-4 sm:px-6 lg:px-8 py-6 flex-1 max-w-[1600px] mx-auto">
          {currentModule === 'overview' && <DashboardView />}
          {currentModule === 'drought-risk-monitor' && <DroughtRiskView />}
          {currentModule === 'relief-budget-optimizer' && <BudgetOptimizerView />}
          {currentModule === 'claim-evidence-review' && <ClaimReviewView />}
          {currentModule === 'resource-routing-logistics' && <ResourceRoutingView />}
          {currentModule === 'reports-and-analytics' && <ReportsView />}
          {currentModule === 'settings' && <ReportsView />}
        </main>
      </div>

      {/* Global Interactive Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-2xl ${
              toast.tone === 'primary'
                ? 'bg-primary-container/90 border-primary/40 text-on-primary-container'
                : toast.tone === 'secondary'
                ? 'bg-secondary-container/90 border-secondary/40 text-on-secondary-container'
                : toast.tone === 'error'
                ? 'bg-error-container/90 border-error/40 text-on-error-container'
                : 'bg-surface-container-high/95 border-outline-variant/40 text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-2xl shrink-0 mt-0.5">
              {toast.tone === 'primary'
                ? 'check_circle'
                : toast.tone === 'error'
                ? 'error'
                : 'info'}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-headline-sm text-sm font-bold">{toast.title}</h4>
              <p className="font-body-sm text-xs opacity-90 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={clearToast}
              className="text-current hover:opacity-75 p-1"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <DriverCallModal />
      <DashcamModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
