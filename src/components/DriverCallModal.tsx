import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const DriverCallModal: React.FC = () => {
  const { selectedConvoyForCall, setSelectedConvoyForCall, showToast } = useApp();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!selectedConvoyForCall) {
      setCallDuration(0);
      return;
    }
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedConvoyForCall]);

  if (!selectedConvoyForCall) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setSelectedConvoyForCall(null);
    showToast('Call Ended', `Secure dispatch call with ${selectedConvoyForCall.driverName} logged.`, 'secondary');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-high border border-outline-variant/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">person</span>
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary ring-2 ring-surface animate-ping" />
        </div>

        <div>
          <h3 className="font-headline-sm text-lg text-on-surface font-bold">
            {selectedConvoyForCall.driverName}
          </h3>
          <p className="text-xs text-primary font-mono font-semibold">
            {selectedConvoyForCall.driverPhone}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Convoy {selectedConvoyForCall.id} • {selectedConvoyForCall.vehicleNo}
          </p>
        </div>

        {/* Audio Wave Simulation */}
        <div className="flex items-center gap-1.5 h-8 my-2">
          {[40, 70, 95, 60, 85, 45, 80, 50, 75, 90, 60].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 80}ms`
              }}
            />
          ))}
        </div>

        <div className="font-mono text-sm font-bold text-on-surface">
          {formatTime(callDuration)}
        </div>

        <p className="text-[11px] text-on-surface-variant">
          Encrypted State Emergency Telematics Network (NavIC-GSM Channel 4)
        </p>

        {/* Action Controls */}
        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMuted ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <span className="material-symbols-outlined text-xl">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-error hover:bg-error/90 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="End Call"
          >
            <span className="material-symbols-outlined text-2xl">call_end</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Priority Signal Sent', 'Horn beacon ping sent to driver console.', 'secondary')}
            className="w-12 h-12 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-highest flex items-center justify-center transition-colors cursor-pointer"
            title="Send Emergency Ping"
          >
            <span className="material-symbols-outlined text-xl">notifications_active</span>
          </button>
        </div>
      </div>
    </div>
  );
};
