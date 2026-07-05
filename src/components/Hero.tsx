"use client";

export function Hero({ totalVotes }: { totalVotes: number }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-bubble shadow-puffy overflow-hidden border-2 border-white/50 glass-panel flex items-center justify-center animate-float motion-reduce:animate-none transform-gpu group">
      
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
        <div className="w-full h-full magic-gradient"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center p-8 backdrop-blur-sm bg-white/10 rounded-[30%] border border-white/20 shadow-puffy-sm transition-all duration-500 hover:shadow-inner-puffy group-hover:scale-105">
        <span className="material-symbols-outlined text-5xl md:text-6xl text-on-primary drop-shadow-md mb-2 transition-transform duration-500 group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
        <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-primary drop-shadow-lg mb-2">Active Proposal</h1>
        <p className="text-body-md md:text-body-lg font-body-lg text-white font-medium max-w-xs drop-shadow-md">
          {totalVotes > 0 ? `${totalVotes} votes cast so far.` : "Be the first to vote on this network proposal."}
        </p>
      </div>
    </div>
  );
}
