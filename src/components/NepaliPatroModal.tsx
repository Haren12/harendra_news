import React from 'react';
import { X, Calendar as CalendarIcon, Clock, Sparkles, Sun, Moon, Award } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface NepaliPatroModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const NepaliPatroModal: React.FC<NepaliPatroModalProps> = ({ isOpen, onClose, currentLanguage }) => {
  if (!isOpen) return null;

  // Ashad 2083 BS calendar data (32 days)
  // Today is Ashad 26, 2083 (July 10, 2026 is Friday -> Ashad 26)
  const daysInAshad = 32;
  // Ashad 1, 2083 started on a Monday (Day index 1 in Sun-Sat)
  const startingDayIndex = 1; // 0=Sun, 1=Mon

  const weekDays = ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि'];

  const gridItems = [];
  // Empty slots for start offset
  for (let i = 0; i < startingDayIndex; i++) {
    gridItems.push({ dayNumber: null, isCurrent: false });
  }

  for (let d = 1; d <= daysInAshad; d++) {
    gridItems.push({
      dayNumber: d,
      isCurrent: d === 26, // Today is Ashad 26
      event: d === 15 ? "धान दिवस" : d === 26 ? "आजको मिति" : d === 29 ? "गुरु पूर्णिमा" : null
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl shadow-cyan-950/60 font-mono animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-cyan-950/50 to-slate-950 px-6 py-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                नेपाली पात्रो २०८३ <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/40">विक्रम संवत्</span>
              </h3>
              <p className="text-xs text-slate-400">Nepal Official Calendar & Panchang</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Current Highlight Banner */}
          <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>आजको मिति (Current Date)</span>
              </div>
              <h2 className="text-xl font-bold text-white">असार २६, २०८३, शुक्रबार</h2>
              <p className="text-xs text-slate-300 mt-0.5">English: July 10, 2026 (Friday)</p>
            </div>
            <div className="text-right sm:border-l sm:border-cyan-500/30 sm:pl-4">
              <div className="text-xs text-slate-400">ऋतु: वर्षा ऋतु</div>
              <div className="text-xs text-cyan-300 font-bold mt-1">सूर्योदय: ०५:१४ | सूर्यास्त: ०७:०२</div>
            </div>
          </div>

          {/* Month Header */}
          <div className="flex items-center justify-between bg-slate-950/60 px-4 py-2.5 rounded-xl border border-cyan-500/20 text-sm">
            <span className="font-bold text-cyan-400">असार २०८३ (June 15 - July 16, 2026)</span>
            <span className="text-xs text-slate-400">पक्ष: शुक्ल पक्ष</span>
          </div>

          {/* Calendar Grid */}
          <div className="bg-slate-950/40 rounded-xl p-4 border border-cyan-500/20">
            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDays.map((wd, i) => (
                <div key={wd} className={`text-xs font-bold py-1 ${i === 6 ? 'text-red-400' : 'text-cyan-300'}`}>
                  {wd}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {gridItems.map((item, idx) => {
                if (item.dayNumber === null) {
                  return <div key={`empty-${idx}`} className="h-10"></div>;
                }
                return (
                  <div
                    key={`day-${item.dayNumber}`}
                    className={`h-11 rounded-lg flex flex-col items-center justify-center relative transition-all ${
                      item.isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/40 border border-cyan-300 scale-105'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-cyan-500/10'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.dayNumber}</span>
                    {item.event && (
                      <span className={`text-[8px] truncate max-w-full px-1 rounded ${item.isCurrent ? 'bg-slate-950 text-cyan-300' : 'text-cyan-400 bg-cyan-500/10'}`}>
                        {item.event}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panchang Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400">तिथि:</span> <strong className="text-white">षष्ठी (Shashthi)</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-400">नक्षत्र:</span> <strong className="text-white">उत्तराफाल्गुनी</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer shadow-md shadow-cyan-500/20"
          >
            बन्द गर्नुहोस् (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
