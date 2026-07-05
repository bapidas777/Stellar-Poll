import { motion, AnimatePresence } from "framer-motion";
import { VoteEvent } from "@/lib/stellar";

interface ActivityFeedProps {
  recentVotes: VoteEvent[];
}

export function ActivityFeed({ recentVotes }: ActivityFeedProps) {
  return (
    <div id="history" className="bg-surface-container-low rounded-[32px] p-6 shadow-puffy-inset h-full border border-white-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay"></div>
      
      <div className="relative z-10 flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-secondary animate-pulse-soft" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
        <h2 className="text-headline-md font-headline-md text-on-surface">Live Pulse</h2>
      </div>
      
      <div className="space-y-4 relative z-10">
        <AnimatePresence>
          {recentVotes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="text-center p-6 text-tertiary border border-dashed border-outline-variant rounded-2xl"
            >
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              <p className="text-label-lg font-semibold text-on-surface mb-1">No recent pulses</p>
              <p className="text-[11px] opacity-80 leading-relaxed">Testnet nodes only retain events for the last few hours.</p>
            </motion.div>
          ) : (
            recentVotes.map((vote, idx) => (
              <motion.a
                key={`${vote.ledger}-${vote.voter}-${idx}`}
                href={`https://stellar.expert/explorer/testnet/tx/${vote.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-bright/50 shadow-inner-puffy border border-white/40 hover:bg-white/80 transition-colors group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-puffy-sm ${vote.choice.toLowerCase() === 'yes' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                  {vote.voter.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-label-sm font-label-sm font-semibold text-on-surface truncate">
                    {vote.voter.substring(0, 4)}...{vote.voter.substring(vote.voter.length - 4)}
                  </p>
                  <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                    Voted {vote.choice} 
                    <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-tertiary font-medium">L: {vote.ledger}</span>
                </div>
              </motion.a>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
