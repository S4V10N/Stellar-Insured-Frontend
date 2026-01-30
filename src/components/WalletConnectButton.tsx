"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WalletInstallationGuide } from "@/components/WalletInstallationGuide";

type WalletStatus = "checking" | "not-installed" | "installed" | "connected";

interface WalletConnectButtonProps {
  onConnect: () => Promise<void>;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function WalletConnectButton({
  onConnect,
  disabled = false,
  className = "",
  children,
}: WalletConnectButtonProps) {
  const [status, setStatus] = useState<WalletStatus>("checking");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showInstallationGuide, setShowInstallationGuide] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window === "undefined") {
        setStatus("checking");
        return;
      }

      try {
        // Check if Freighter is installed
        const { isConnected } = await import("@stellar/freighter-api");
        const result = await isConnected();
        
        if (result.error) {
          setStatus("not-installed");
        } else if (result.isConnected) {
          setStatus("connected");
        } else {
          setStatus("installed");
        }
      } catch (error) {
        setStatus("not-installed");
      }
    };

    checkWallet();
    
    // Re-check every 2 seconds in case wallet is installed/removed
    const interval = setInterval(checkWallet, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    if (disabled || isConnecting) return;
    
    setIsConnecting(true);
    try {
      await onConnect();
    } finally {
      setIsConnecting(false);
    }
  };

  const getButtonContent = () => {
    if (isConnecting) {
      return (
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting Wallet...
        </div>
      );
    }

    switch (status) {
      case "checking":
        return "Checking Wallet...";
      case "not-installed":
        return (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Install Freighter Wallet
          </div>
        );
      case "installed":
        return children || "Connect Wallet";
      case "connected":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            Wallet Connected
          </div>
        );
      default:
        return children || "Connect Wallet";
    }
  };

  const getButtonVariant = () => {
    if (status === "not-installed") {
      return "outline";
    }
    if (status === "connected") {
      return "secondary";
    }
    return "primary";
  };

  const isButtonDisabled = disabled || isConnecting || status === "checking";

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleClick}
        disabled={isButtonDisabled}
        className={className}
      >
        {getButtonContent()}
      </Button>

      {status === "not-installed" && (
        <div className="flex flex-col gap-3">
          <Card className="bg-amber-500/10 border border-amber-500/20 p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-medium text-amber-100 mb-1">Freighter Wallet Required</h4>
                <p className="text-sm text-amber-200">
                  To use this app, please install the Freighter wallet browser extension.
                </p>
                <button
                  onClick={() => setShowInstallationGuide(true)}
                  className="inline-block mt-2 text-sm font-medium text-amber-300 hover:text-amber-200 underline"
                >
                  Show Installation Guide →
                </button>
              </div>
            </div>
          </Card>
          
          {showInstallationGuide && (
            <WalletInstallationGuide />
          )}
        </div>
      )}

      {status === "checking" && (
        <div className="text-center text-sm text-white/60">
          Checking for wallet extension...
        </div>
      )}
    </div>
  );
}