import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Square, RefreshCw, Save, ShieldAlert, Sparkles } from 'lucide-react';
import { BrandConfig } from '../lib/types';

interface LaunchDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  configs: BrandConfig[];
  onUpdateConfig: (key: string, val: string) => Promise<void>;
}

export const LaunchDashboard: React.FC<LaunchDashboardProps> = ({
  isOpen,
  onClose,
  configs,
  onUpdateConfig,
}) => {
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    const map: Record<string, string> = {};
    configs.forEach((c) => {
      map[c.config_key] = c.config_value;
    });
    setEditingValues(map);
  }, [configs]);

  if (!isOpen) return null;

  const handleSave = async (key: string) => {
    setSavingKey(key);
    await onUpdateConfig(key, editingValues[key] || '');
    setSavingKey(null);
  };

  const completedCount = configs.filter((c) => !c.is_placeholder).length;
  const progressPct = configs.length > 0 ? Math.round((completedCount / configs.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#08080c] border border-zinc-800 text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> BRIEF PAGE 23 — LAUNCH READINESS DASHBOARD
            </div>
            <h2 className="text-xl font-extrabold uppercase">MISSING INFORMATION & PLACEHOLDERS</h2>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-2 shrink-0">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Launch Configuration Readiness</span>
            <span className="text-amber-400 font-bold">{progressPct}% Complete ({completedCount}/{configs.length})</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Placeholder List & Inputs */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {configs.map((item) => (
            <div
              key={item.config_key}
              className="bg-zinc-950 border border-zinc-800/80 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 font-mono">
                {item.is_placeholder ? (
                  <Square className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-white">[{item.config_key}]</div>
                  <div className="text-[10px] text-zinc-500 uppercase">{item.category}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <input
                  type="text"
                  value={editingValues[item.config_key] ?? item.config_value}
                  onChange={(e) => setEditingValues({ ...editingValues, [item.config_key]: e.target.value })}
                  placeholder={`Set real ${item.config_key.toLowerCase()}...`}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={() => handleSave(item.config_key)}
                  disabled={savingKey === item.config_key}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold rounded-xl flex items-center gap-1 shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingKey === item.config_key ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
