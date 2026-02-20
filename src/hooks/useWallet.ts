import { useCallback } from 'react';
import { useWalletStore } from '@/store';
import { connectFreighter, signFreighterMessage, createAuthMessage } from '@/lib/freighter';

/**
 * Enhanced wallet hook that integrates with centralized state management
 * Provides wallet connection, authentication, and user management
 */
export function useWallet() {
  const {
    status,
    session,
    error,
    setStatus,
    setSession,
    setError,
    signOut,
    isAddressRegistered,
    registerAddress,
    getRegisteredUser,
    startConnection,
    completeConnection,
    failConnection,
  } = useWalletStore();

  const connectWallet = useCallback(async () => {
    if (session) return session; // Already connected
    
    try {
      startConnection();
      
      // Connect to Freighter wallet
      const address = await connectFreighter();
      
      // Auto-register address if not registered (for demo purposes)
      if (!isAddressRegistered(address)) {
        registerAddress(address, {
          createdAt: Date.now(),
          email: undefined
        });
      }
      
      // Create and sign authentication message
      const { message } = createAuthMessage(address);
      setStatus('signing');
      
      const signed = await signFreighterMessage(address, message);
      
      const newSession = {
        address,
        signedMessage: signed.signedMessage,
        signerAddress: signed.signerAddress,
        authenticatedAt: Date.now(),
      };
      
      completeConnection(newSession);
      return newSession;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wallet connection failed';
      failConnection(errorMessage);
      throw err;
    }
  }, [
    session,
    startConnection,
    isAddressRegistered,
    registerAddress,
    setStatus,
    completeConnection,
    failConnection
  ]);

  const disconnect = useCallback(() => {
    signOut();
  }, [signOut]);

  const isConnected = status === 'connected' && !!session;
  const isConnecting = status === 'connecting' || status === 'signing';

  return {
    // State
    status,
    session,
    error,
    isConnected,
    isConnecting,
    
    // Actions
    connectWallet,
    disconnect,
    setSession,
    
    // User management
    isAddressRegistered,
    registerAddress,
    getRegisteredUser,
    
    // Computed values
    address: session?.address,
    authenticatedAt: session?.authenticatedAt,
  };
}