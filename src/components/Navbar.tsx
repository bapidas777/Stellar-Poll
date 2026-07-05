import { useState } from "react";
import { Loader2 } from "lucide-react";

interface NavbarProps {
  publicKey: string | null;
  balance: string | null;
  loading: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

export function Navbar({ publicKey, balance, loading, connectWallet, disconnectWallet }: NavbarProps) {
  const [isHoveringWallet, setIsHoveringWallet] = useState(false);

  return (
    <header className="bg-surface/80 backdrop-blur-md top-0 z-50 border-b border-border-glass shadow-puffy-sm sticky w-full">
      <div className="flex justify-between items-center w-full px-container-padding py-4 max-w-7xl mx-auto">
        
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
          <span className="text-headline-md font-headline-md font-black tracking-tight text-primary">Stellar Poll</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
          </div>
          
          {publicKey ? (
            <button 
              onClick={disconnectWallet} 
              onMouseEnter={() => setIsHoveringWallet(true)}
              onMouseLeave={() => setIsHoveringWallet(false)}
              className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full shadow-puffy-sm hover:scale-105 transition-all duration-300 active:scale-95 ease-in-out font-label-lg text-label-lg flex items-center gap-2"
              style={{
                background: isHoveringWallet ? 'rgba(186, 26, 26, 0.1)' : undefined,
                color: isHoveringWallet ? '#ba1a1a' : undefined,
              }}
            >
              {isHoveringWallet ? (
                <>
                  <span className="material-symbols-outlined text-sm">logout</span> Disconnect
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-sm font-bold">{publicKey.slice(0, 4)}...{publicKey.slice(-4)}</span>
                    {balance && <span className="text-[10px] opacity-80 font-normal">{balance} XLM</span>}
                  </div>
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={connectWallet} 
              disabled={loading} 
              className="bg-primary-container text-on-primary-container px-4 py-2 md:px-6 md:py-2 rounded-full shadow-puffy-sm hover:scale-105 hover:text-primary transition-all duration-300 active:scale-95 ease-in-out font-label-lg text-label-sm md:text-label-lg flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <span className="material-symbols-outlined text-sm">account_balance_wallet</span>}
              Connect
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
