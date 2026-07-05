"use client";

import { useEffect, useState } from "react";
import { StellarHelper, VoteEvent } from "@/lib/stellar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Poll } from "@/components/Poll";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Stats } from "@/components/Stats";
import { Toast } from "@/components/Toast";
import "./globals.css";

export default function Home() {
  const [helper, setHelper] = useState<StellarHelper | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [results, setResults] = useState({ yes: 0, no: 0 });
  const [recentVotes, setRecentVotes] = useState<VoteEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState<boolean | null>(null);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | 'pending'; message: string } | null>(null);
  const [isHoveringWallet, setIsHoveringWallet] = useState(false);

  useEffect(() => {
    const h = new StellarHelper();
    setHelper(h);

    const savedPk = localStorage.getItem('connected_wallet');
    if (savedPk) {
      setPublicKey(savedPk);
    }
    
    let isFetching = false;
    const fetchAll = async () => {
      if (isFetching) return;
      isFetching = true;
      try {
        const [res, events] = await Promise.all([
          h.getResults(),
          h.getRecentVotes()
        ]);
        setResults(res);
        setRecentVotes(events);
      } catch(e) {
        console.error(e);
      } finally {
        isFetching = false;
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (publicKey && helper) {
      localStorage.setItem('connected_wallet', publicKey);
      helper.getBalance(publicKey).then(b => setBalance(parseFloat(b).toFixed(2)));
    } else {
      setBalance(null);
    }
  }, [publicKey, helper]);

  const connectWallet = async () => {
    if (!helper) return;
    try {
      setLoading(true);
      setStatus(null);
      const pk = await helper.connectWallet();
      setPublicKey(pk);
    } catch (e: any) {
      const msg = e?.message || "Failed to connect wallet.";
      if (msg.toLowerCase().includes("not installed")) {
        setStatus({ type: 'error', message: "Wallet not found. Please install Freighter." });
      } else {
        setStatus({ type: 'error', message: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setPublicKey(null);
    localStorage.removeItem('connected_wallet');
    setStatus({ type: 'success', message: "Wallet disconnected successfully." });
  };

  const handleVote = async (choice: boolean) => {
    if (!helper || !publicKey) return;
    try {
      setVoteLoading(choice);
      setStatus({ type: 'pending', message: "Confirming transaction in wallet..." });
      const hash = await helper.vote(publicKey, choice);
      setStatus({ type: 'success', message: `Vote confirmed! Hash: ${hash.substring(0, 8)}...` });
      
      const newResults = await helper.getResults();
      setResults(newResults);
      helper.getRecentVotes().then(setRecentVotes);
    } catch (e: any) {
      let errorMsg = e.message || "An unknown error occurred.";
      if (errorMsg.includes("Already voted") || errorMsg.includes("You have already voted!")) {
        errorMsg = "You have already voted!";
      } else if (errorMsg.includes("rejected")) {
        errorMsg = "Transaction was rejected in the wallet.";
      } else if (errorMsg.length > 80) {
         errorMsg = errorMsg.substring(0, 80) + "...";
      }
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setVoteLoading(null);
    }
  };

  const totalVotes = results.yes + results.no;
  const yesPercentage = totalVotes > 0 ? (results.yes / totalVotes) * 100 : 50;

  useEffect(() => {
    if (status && status.type !== 'pending') {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <Navbar 
        publicKey={publicKey} 
        balance={balance}
        loading={loading} 
        connectWallet={connectWallet} 
        disconnectWallet={disconnectWallet} 
      />
      <main className="flex-grow w-full max-w-7xl mx-auto px-container-padding py-4 relative mt-4">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl animate-float pointer-events-none -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-container/30 rounded-full blur-3xl animate-float pointer-events-none -z-10" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-[rgba(230,230,250,0.4)] rounded-full blur-2xl animate-float pointer-events-none -z-10" style={{ animationDelay: '-1.5s' }}></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          
          {/* Main Content (Poll) - First on mobile, Center on desktop */}
          <section className="md:col-span-6 flex flex-col gap-4 opacity-0 animate-fade-in-up order-1 md:order-2" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <Hero totalVotes={totalVotes} />
            
            <Poll 
              totalVotes={totalVotes}
              yesPercentage={yesPercentage}
              publicKey={publicKey}
              voteLoading={voteLoading}
              handleVote={handleVote}
            />
          </section>

          {/* Left Sidebar - Third on mobile, Left on desktop */}
          <aside className="md:col-span-3 flex flex-col gap-4 opacity-0 animate-fade-in-up order-3 md:order-1" style={{ animationFillMode: 'forwards' }}>
            <ActivityFeed recentVotes={recentVotes} />
          </aside>

          {/* Right Sidebar - Second on mobile, Right on desktop */}
          <aside className="md:col-span-3 flex flex-col gap-4 opacity-0 animate-fade-in-up order-2 md:order-3" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Stats totalVotes={totalVotes} yesPercentage={yesPercentage} />
          </aside>
        </div>

        <Toast status={status} />
      </main>

      <footer className="bg-surface-container-low dark:bg-inverse-surface shadow-inner-puffy w-full rounded-t-[48px] mt-16 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-container-padding py-12 max-w-7xl mx-auto">
          <div className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim mb-4 md:mb-0 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            Stellar Poll
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 md:mb-0">
            <a className="text-on-tertiary-container text-label-sm font-label-sm hover:text-secondary transition-colors duration-200 hover:scale-[1.05]" href="#">Ecosystem</a>
            <a className="text-on-tertiary-container text-label-sm font-label-sm hover:text-secondary transition-colors duration-200 hover:scale-[1.05]" href="#">Governance</a>
            <a className="text-on-tertiary-container text-label-sm font-label-sm hover:text-secondary transition-colors duration-200 hover:scale-[1.05]" href="#">Audit</a>
            <a className="text-on-tertiary-container text-label-sm font-label-sm hover:text-secondary transition-colors duration-200 hover:scale-[1.05]" href="#">Manifesto</a>
          </nav>
          <div className="text-label-sm font-label-sm text-tertiary text-center md:text-right">
            © {new Date().getFullYear()} Stellar Poll. Hand-woven for the Decentralized Web.
          </div>
        </div>
      </footer>
    </>
  );
}
