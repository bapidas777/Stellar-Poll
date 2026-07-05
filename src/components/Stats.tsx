export function Stats({ totalVotes, yesPercentage = 50 }: { totalVotes: number; yesPercentage?: number }) {
  return (
    <div className="glass-panel shadow-puffy rounded-puffy p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-magic-teal" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
        <h2 className="text-headline-md font-headline-md text-primary">Stellar Stats</h2>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-surface rounded-2xl p-4 shadow-puffy-inset flex flex-col items-center text-center hover:shadow-puffy transition-shadow duration-300">
          <p className="text-label-lg font-label-lg text-tertiary mb-1 uppercase tracking-wider">Total XLM Pledged</p>
          <p className="text-headline-xl font-headline-xl text-primary font-black">2.4M</p>
        </div>
        <div className="bg-surface rounded-2xl p-4 shadow-puffy-inset flex flex-col items-center text-center hover:shadow-puffy transition-shadow duration-300">
          <p className="text-label-lg font-label-lg text-tertiary mb-1 uppercase tracking-wider">Unique Voters</p>
          <p className="text-headline-lg font-headline-lg text-secondary font-bold">{totalVotes}</p>
        </div>
        
        {/* Vote Distribution Donut Chart */}
        <div className="bg-surface rounded-2xl p-6 shadow-puffy-inset flex flex-col items-center text-center hover:shadow-puffy transition-shadow duration-300 relative group overflow-hidden">
          <p className="text-label-lg font-label-lg text-tertiary mb-4 uppercase tracking-wider">Vote Distribution</p>
          
          <div className="relative w-32 h-32 rounded-full shadow-puffy flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
               style={{
                 background: `conic-gradient(#add8e6 0%, #add8e6 ${yesPercentage}%, #ffb6c1 ${yesPercentage}%, #ffb6c1 100%)`
               }}>
            <div className="w-24 h-24 bg-surface rounded-full shadow-inner-puffy flex items-center justify-center flex-col z-10">
              <span className="text-headline-md font-bold text-primary leading-none">{Math.round(yesPercentage)}%</span>
              <span className="text-[10px] text-tertiary font-bold uppercase tracking-wider mt-1">Option A</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6 w-full justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-container shadow-sm"></div>
              <span className="text-label-sm font-bold text-tertiary">Opt A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary-container shadow-sm"></div>
              <span className="text-label-sm font-bold text-tertiary">Opt B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
