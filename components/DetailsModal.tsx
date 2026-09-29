"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Terminal, X } from "lucide-react";
import { renderCustomMarkdown } from "../lib/markdown";

interface DetailsModalProps {
  activeModal: any;
  closeModal: () => void;
  campaignsView: "campaigns" | "threat_intel";
  setCampaignsView: (view: "campaigns" | "threat_intel") => void;
  switchView: (view: "business" | "technical") => void;
}

export default function DetailsModal({
  activeModal,
  closeModal,
  campaignsView,
  setCampaignsView,
  switchView,
}: DetailsModalProps) {
  if (!activeModal) return null;

  const isCustomRoadmap = activeModal.id === "my-custom-feature";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          className="bg-slate-950/90 border border-purple-500/40 rounded-2xl p-8 w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden text-left max-h-[85vh] overflow-y-auto"
        >
          <div className="absolute top-0 right-0 w-48 h-42 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex justify-between items-start mb-4 border-b border-purple-950/20 pb-4">
            <div>
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase font-bold">
                {activeModal.isDataFlow ? "// DATA_FLOW" : `// ${activeModal.tag}`}
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">{activeModal.title}</h2>
            </div>
            <button
              onClick={closeModal}
              className="p-2 rounded-xl bg-purple-950/10 border border-purple-950/30 text-slate-400 hover:text-purple-400 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {activeModal.isDataFlow ? (
            <div className="bg-slate-900/60 border border-purple-955/30 rounded-xl p-6">
              <p className="text-slate-300 text-base leading-relaxed font-light">
                {activeModal.technical}
              </p>
            </div>
          ) : isCustomRoadmap ? (
            /* AWS platform roadmap layout - Single unified view without tabs */
            <div className="bg-slate-900/60 border border-purple-955/20 rounded-xl p-6 space-y-6">
              {renderCustomMarkdown(activeModal.business)}
              {renderCustomMarkdown(activeModal.technical)}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-purple-950/10 pb-3">
                {activeModal.id === "campaigns" && (
                  <button
                    onClick={() => setCampaignsView(campaignsView === "campaigns" ? "threat_intel" : "campaigns")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      campaignsView === "threat_intel"
                        ? "bg-purple-600/30 border border-purple-400/50 text-purple-300"
                        : "bg-slate-900/50 border border-purple-950/30 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {campaignsView === "threat_intel" ? "Threat Intel Scenarios" : "Campaign Clustering"}
                  </button>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => switchView("business")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeModal.view === "business"
                        ? "bg-indigo-600/30 border border-indigo-400/50 text-indigo-300"
                        : "bg-slate-900/50 border border-purple-955/30 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => switchView("technical")}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeModal.view === "technical"
                        ? "bg-purple-600/30 border border-purple-400/50 text-purple-300"
                        : "bg-slate-900/50 border border-purple-955/30 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Technical Engineering View
                  </button>
                </div>
              </div>

              <div>
                {activeModal.id === "campaigns" ? (
                  activeModal.view === "business" ? (
                    <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-6">
                      <h4 className="text-xs font-mono font-black text-indigo-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Overview</span>
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed font-medium whitespace-pre-line">
                        {campaignsView === "campaigns" ? activeModal.business_campaigns : activeModal.business_threat_intel}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/60 border border-purple-955/30 rounded-xl p-6">
                      <h4 className="text-xs font-mono font-black text-purple-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Technical Engineering View</span>
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed font-light whitespace-pre-line">
                        {campaignsView === "campaigns" ? activeModal.technical_campaigns : activeModal.technical_threat_intel}
                      </div>
                    </div>
                  )
                ) : (
                  activeModal.view === "business" ? (
                    <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-6">
                      <h4 className="text-xs font-mono font-black text-indigo-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Overview</span>
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed font-medium whitespace-pre-line">
                        {activeModal.business}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/60 border border-purple-955/30 rounded-xl p-6">
                      <h4 className="text-xs font-mono font-black text-purple-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Technical Engineering View</span>
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed font-light whitespace-pre-line">
                        {activeModal.technical}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-purple-950/10 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-slate-900 hover:bg-slate-850 border border-purple-950/30 text-slate-300 font-extrabold text-xs px-5 py-3 rounded-xl transition-colors"
            >
              Dismiss Document
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
