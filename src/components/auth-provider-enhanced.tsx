"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useWallet } from "@/hooks/useWallet";
import { AuthSession, RegisteredUser } from "@/store/types";

// Maintain backward compatibility with existing AuthContext interface
type AuthContextValue = {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  signOut: () => void;
  isAddressRegistered: (address: string) => boolean;
  registerAddress: (address: string, user?: RegisteredUser) => void;
  getRegisteredUser: (address: string) => RegisteredUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Enhanced AuthProvider that uses centralized state management
 * Maintains backward compatibility with existing useAuth() hook
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet();

  // Sync with cookies for middleware access (maintain existing behavior)
  useEffect(() => {
    if (wallet.session) {
      // Set session cookie for middleware
      document.cookie = `stellar_insured_session=${JSON.stringify(wallet.session)}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict`;
    } else {
      // Clear session cookie
      document.cookie = 'stellar_insured_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }, [wallet.session]);

  // Create backward-compatible context value
  const contextValue = useMemo<AuthContextValue>(() => ({
    session: wallet.session,
    setSession: (session) => {
      if (session) {
        // Use the store's setSession method directly
        wallet.setSession(session);
      } else {
        wallet.disconnect();
      }
    },
    signOut: wallet.disconnect,
    isAddressRegistered: wallet.isAddressRegistered,
    registerAddress: wallet.registerAddress,
    getRegisteredUser: wallet.getRegisteredUser,
  }), [
    wallet.session,
    wallet.setSession,
    wallet.disconnect,
    wallet.isAddressRegistered,
    wallet.registerAddress,
    wallet.getRegisteredUser,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Backward-compatible useAuth hook
 * Components can continue using this without changes
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Enhanced useAuthState hook that provides additional state information
 * Use this for new components that need more detailed state
 */
export function useAuthState() {
  const wallet = useWallet();
  const auth = useAuth();
  
  return {
    // Backward compatibility
    ...auth,
    
    // Enhanced state
    status: wallet.status,
    error: wallet.error,
    isConnected: wallet.isConnected,
    isConnecting: wallet.isConnecting,
    address: wallet.address,
    authenticatedAt: wallet.authenticatedAt,
    
    // Enhanced actions
    connectWallet: wallet.connectWallet,
  };
}