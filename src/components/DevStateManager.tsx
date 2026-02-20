"use client";

import { useEffect, useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useModal } from '@/hooks/useModal';
import { usePoliciesFilters } from '@/hooks/useFilters';
import { useForm } from '@/hooks/useForm';
import { 
  exportStoreState, 
  resetAllStores, 
  enableStoreLogging,
  migrateLocalStorageData 
} from '@/store/migrate';

/**
 * Development component to demonstrate and test state management
 * Only renders in development mode
 */
export function DevStateManager() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  const wallet = useWallet();
  const modal = useModal('dev-modal');
  const filters = usePoliciesFilters();
  const form = useForm('dev-form');

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="font-bold mb-2">🔧 Dev State Manager</h3>
      
      {/* Wallet State */}
      <div className="mb-2">
        <strong>Wallet:</strong> {wallet.status}
        {wallet.isConnected && <span> ({wallet.address?.slice(0, 8)}...)</span>}
      </div>
      
      {/* Filter State */}
      <div className="mb-2">
        <strong>Search:</strong> "{filters.searchQuery}"
        <br />
        <strong>Tab:</strong> {filters.activeTab}
        <br />
        <strong>Page:</strong> {filters.currentPage}
      </div>
      
      {/* Form State */}
      <div className="mb-2">
        <strong>Form:</strong> {form.status}
        {form.error && <span className="text-red-400"> (Error)</span>}
      </div>
      
      {/* Modal State */}
      <div className="mb-2">
        <strong>Modal:</strong> {modal.isOpen ? 'Open' : 'Closed'}
      </div>
      
      {/* Actions */}
      <div className="space-y-1">
        <button 
          onClick={() => filters.setSearch('test search')}
          className="block w-full text-left text-xs bg-blue-600 px-2 py-1 rounded"
        >
          Set Search
        </button>
        
        <button 
          onClick={() => modal.toggle()}
          className="block w-full text-left text-xs bg-green-600 px-2 py-1 rounded"
        >
          Toggle Modal
        </button>
        
        <button 
          onClick={() => form.startLoading()}
          className="block w-full text-left text-xs bg-yellow-600 px-2 py-1 rounded"
        >
          Start Form Loading
        </button>
        
        <button 
          onClick={() => {
            console.log('Current State:', exportStoreState());
          }}
          className="block w-full text-left text-xs bg-purple-600 px-2 py-1 rounded"
        >
          Log State
        </button>
        
        <button 
          onClick={resetAllStores}
          className="block w-full text-left text-xs bg-red-600 px-2 py-1 rounded"
        >
          Reset All
        </button>
        
        <button 
          onClick={enableStoreLogging}
          className="block w-full text-left text-xs bg-gray-600 px-2 py-1 rounded"
        >
          Enable Logging
        </button>
        
        <button 
          onClick={migrateLocalStorageData}
          className="block w-full text-left text-xs bg-indigo-600 px-2 py-1 rounded"
        >
          Migrate Data
        </button>
      </div>
      
      {/* Demo Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-4 rounded-lg">
            <h3 className="font-bold mb-2">Demo Modal</h3>
            <p>This modal is managed by centralized state!</p>
            <button 
              onClick={modal.close}
              className="mt-2 bg-gray-200 px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}