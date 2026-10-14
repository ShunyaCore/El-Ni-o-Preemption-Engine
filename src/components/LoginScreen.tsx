import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_LOGO } from '../data/mockData';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('officer.yatharth@maharashtra.gov.in');
  const [password, setPassword] = useState('GovSecure#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, 'Yatharth Officer');
      setIsLoading(false);
    }, 600);
  };

  const handleGovBypass = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('officer.yatharth@maharashtra.gov.in', 'Yatharth Officer');
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#060e20] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-body-md text-on-surface">
      {/* Container Box */}
      <div className="w-full max-w-5xl bg-surface-container-low/90 border border-outline-variant/30 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-2xl">
        {/* Left Hero Graphic Section (5 cols) */}
        <div className="lg:col-span-5 relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container-lowest">
          {/* Subtle Ambient Light Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

          {/* Background Soil/Sprout Stylized Image Overlay */}
          <div
            className="absolute inset-0 opacity-25 mix-blend-luminosity bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAspBK9yb_-qjPP9gsGfsj6dinZxU_NQWqOniIfeKo9d0LlRxnj4tUvDobd_dM-GvG3k8S-aRenBh-jEAHJyZ5ZkU2cgJqqyW5X3ifFLtL3orfPMVSPYvWKDzSgh0XJE6xFm2OWrw2keayLbhYXf5gqg1LlGKOFVdqLaHepHVhh2nmN6YNr-FCq0pztZ7PWtyUuhjAPzibSQwLaMlHLdsqgWXO9-tKjzzduRUu1mlNvFcTkHU-AJBOP')`
            }}
          />

          {/* Top Brand Identity */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center p-2 backdrop-blur-md shadow-md">
                <img src={APP_LOGO} alt="Preemption Engine" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-lg text-primary font-bold tracking-tight">
                  El Niño
                </span>
                <span className="font-headline-sm text-base text-on-surface font-semibold -mt-1">
                  Preemption Engine
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-headline-xl text-2xl lg:text-3xl text-on-surface font-bold tracking-tight leading-snug">
                Smarter decisions. <br />
                <span className="text-primary">Resilient communities.</span>
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-4 leading-relaxed">
                AI-assisted drought-response planning for government officers. Turn weather-risk signals into transparent, budget-aware relief priorities and delivery plans.
              </p>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-8 mt-8 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">verified_user</span>
              <span>Maharashtra Disaster Management Cell</span>
            </div>
            <span className="font-mono text-[10px] text-primary/80">INSAT-3DR Synced</span>
          </div>
        </div>

        {/* Right Form Section (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-low/40">
          <div className="max-w-md w-full mx-auto flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 font-label-md text-xs text-primary uppercase tracking-wider font-semibold mb-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>State Portal Access</span>
              </div>
              <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="font-body-sm text-sm text-on-surface-variant mt-1">
                Sign in to continue to El Niño Preemption Engine
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email / Username */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Email / Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="officer@maharashtra.gov.in"
                    className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-body-md text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('For testing, use the pre-filled credentials or click "Sign in with Government ID" below.')}
                    className="font-label-md text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 pl-10 pr-10 py-2.5 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-body-md text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Sign In CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-sm font-bold shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-outline-variant/30" />
              <span className="absolute px-3 bg-surface-container-low text-xs text-on-surface-variant">
                or
              </span>
            </div>

            {/* Government ID 1-Click Fast Bypass */}
            <button
              type="button"
              onClick={handleGovBypass}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-sm font-semibold border border-outline-variant/40 transition-all flex items-center justify-center gap-2.5 shadow-sm hover:border-primary/50 group"
            >
              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
                account_balance
              </span>
              <span>Sign in with Government ID (Demo Bypass)</span>
            </button>

            {/* Bottom Security Note */}
            <div className="text-center pt-2">
              <span className="inline-flex items-center gap-1.5 font-label-md text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-primary">gite</span>
                <span>Secure • Government Access Only</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
