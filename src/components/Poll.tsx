import { Loader2 } from "lucide-react";
import { useState } from "react";

interface PollProps {
  totalVotes: number;
  yesPercentage: number;
  publicKey: string | null;
  voteLoading: boolean | null;
  handleVote: (choice: boolean) => void;
}

export function Poll({ totalVotes, yesPercentage, publicKey, voteLoading, handleVote }: PollProps) {
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const noPercentage = totalVotes > 0 ? 100 - yesPercentage : 50;

  return (
    <section id="poll" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Option A */}
        <div 
          onClick={() => (!voteLoading && publicKey) && setSelectedChoice(true)}
          className={`bg-surface rounded-3xl shadow-puffy p-6 transition-all duration-300 border relative overflow-hidden group 
            ${(!publicKey || voteLoading !== null) ? 'opacity-50 cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-puffy-hover hover:border-white-muted'}
            ${selectedChoice === true ? 'border-primary ring-2 ring-primary ring-opacity-50 scale-[1.02] shadow-puffy-hover' : 'border-transparent'}
          `}
        >
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary-fixed rounded-full blur-xl group-hover:bg-magic-teal/50 group-hover:scale-150 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
              Option A 
              {voteLoading === true && <Loader2 className="animate-spin w-5 h-5 text-primary" />}
            </h3>
            <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-label-sm font-bold shadow-inner-puffy">
              {yesPercentage.toFixed(0)}%
            </div>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-6 relative z-10">
            Upgrade to Protocol 22 (Soroban enhancements).
          </p>
          <div className="h-4 w-full bg-surface-container-high rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] overflow-hidden relative z-10">
            <div 
              className="h-full magic-gradient rounded-full animate-fill-bar motion-reduce:animate-none transition-all duration-1000" 
              style={{ width: `${yesPercentage}%` }}
            />
          </div>
        </div>

        {/* Option B */}
        <div 
          onClick={() => (!voteLoading && publicKey) && setSelectedChoice(false)}
          className={`bg-surface rounded-3xl shadow-puffy p-6 transition-all duration-300 border relative overflow-hidden group 
            ${(!publicKey || voteLoading !== null) ? 'opacity-50 cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-puffy-hover hover:border-white-muted'}
            ${selectedChoice === false ? 'border-secondary ring-2 ring-secondary ring-opacity-50 scale-[1.02] shadow-puffy-hover' : 'border-transparent'}
          `}
        >
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-secondary-fixed rounded-full blur-xl group-hover:bg-magic-purple/50 group-hover:scale-150 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-headline-md font-headline-md text-secondary flex items-center gap-2">
              Option B
              {voteLoading === false && <Loader2 className="animate-spin w-5 h-5 text-secondary" />}
            </h3>
            <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm font-bold shadow-inner-puffy">
              {noPercentage.toFixed(0)}%
            </div>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-6 relative z-10">
            Delay upgrade (Focus on network stability and testing).
          </p>
          <div className="h-4 w-full bg-surface-container-high rounded-full shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] overflow-hidden relative z-10">
            <div 
              className="h-full magic-gradient rounded-full animate-fill-bar motion-reduce:animate-none transition-all duration-1000" 
              style={{ width: `${noPercentage}%`, animationDirection: 'reverse', animationDelay: '100ms' }}
            />
          </div>
        </div>

      </div>

      {/* Primary CTA */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => {
            if (selectedChoice === null) {
              alert("Please select an option (Yes or No) first!");
              return;
            }
            if (publicKey && !voteLoading) {
              handleVote(selectedChoice);
            }
          }}
          disabled={voteLoading !== null}
          className={`bg-primary text-on-primary text-headline-md font-headline-md px-10 py-4 rounded-full shadow-puffy animate-pulse-soft motion-reduce:animate-none hover:bg-surface-tint hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3
            ${voteLoading !== null ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {voteLoading !== null ? (
            <>
              Casting Vote...
              <Loader2 className="animate-spin w-6 h-6" />
            </>
          ) : (
            <>
              {publicKey ? 'Cast Your Vote' : 'Connect Wallet to Vote'}
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 1" }}>front_hand</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
