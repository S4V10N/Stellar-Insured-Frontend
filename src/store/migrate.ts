/**
 * Migration utilities for moving from Context API and local state to centralized stores
 */

import { useWalletStore, useUIStore, useFilterStore, useFormStore } from './index';

/**
 * Migrate existing localStorage data to stores
 */
export function migrateLocalStorageData() {
  try {
    // Migrate wallet session data
    const sessionData = localStorage.getItem('stellar_insured_session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      useWalletStore.getState().setSession(session);
    }

    // Migrate registered users data
    const usersData = localStorage.getItem('stellar_insured_users');
    if (usersData) {
      const users = JSON.parse(usersData);
      Object.entries(users).forEach(([address, user]) => {
        useWalletStore.getState().registerAddress(address, user as any);
      });
    }

    // Migrate theme preference (if exists)
    const themeData = localStorage.getItem('theme-preference');
    if (themeData) {
      // Theme is still managed by ThemeProvider, no migration needed
      console.log('Theme data found, keeping in ThemeProvider');
    }

    console.log('✅ LocalStorage data migration completed');
  } catch (error) {
    console.error('❌ LocalStorage migration failed:', error);
  }
}

/**
 * Reset all stores to initial state
 * Useful for testing and development
 */
export function resetAllStores() {
  useWalletStore.getState().reset();
  useUIStore.getState().reset();
  useFilterStore.getState().reset();
  useFormStore.getState().resetAllForms();
  console.log('✅ All stores reset to initial state');
}

/**
 * Export current state for debugging
 */
export function exportStoreState() {
  return {
    wallet: useWalletStore.getState(),
    ui: useUIStore.getState(),
    filter: useFilterStore.getState(),
    form: useFormStore.getState(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Import state for testing/debugging
 */
export function importStoreState(state: ReturnType<typeof exportStoreState>) {
  try {
    // Note: Be careful with this in production
    if (state.wallet) {
      Object.assign(useWalletStore.getState(), state.wallet);
    }
    if (state.ui) {
      Object.assign(useUIStore.getState(), state.ui);
    }
    if (state.filter) {
      Object.assign(useFilterStore.getState(), state.filter);
    }
    if (state.form) {
      Object.assign(useFormStore.getState(), state.form);
    }
    console.log('✅ Store state imported successfully');
  } catch (error) {
    console.error('❌ Store state import failed:', error);
  }
}

/**
 * Development helper to log all store changes
 */
export function enableStoreLogging() {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Store logging should only be enabled in development');
    return;
  }

  // Subscribe to all store changes
  useWalletStore.subscribe((state, prevState) => {
    console.log('🔄 WalletStore changed:', { prev: prevState, current: state });
  });

  useUIStore.subscribe((state, prevState) => {
    console.log('🔄 UIStore changed:', { prev: prevState, current: state });
  });

  useFilterStore.subscribe((state, prevState) => {
    console.log('🔄 FilterStore changed:', { prev: prevState, current: state });
  });

  useFormStore.subscribe((state, prevState) => {
    console.log('🔄 FormStore changed:', { prev: prevState, current: state });
  });

  console.log('✅ Store logging enabled');
}

/**
 * Component migration helpers
 */
export const migrationHelpers = {
  // Replace useState with store
  replaceLocalState: {
    // Before: const [searchQuery, setSearchQuery] = useState('');
    // After: const { searchQuery, setSearch } = usePoliciesFilters();
    searchAndFilter: 'Use usePoliciesFilters() or useClaimsFilters()',
    
    // Before: const [isModalOpen, setIsModalOpen] = useState(false);
    // After: const modal = useModal('modal-id');
    modalState: 'Use useModal(modalId)',
    
    // Before: const [isLoading, setIsLoading] = useState(false);
    // After: const form = useForm('form-id');
    loadingState: 'Use useForm(formId) for form loading states',
    
    // Before: const [currentPage, setCurrentPage] = useState(1);
    // After: const pagination = usePagination('page-key');
    paginationState: 'Use usePagination(key)',
  },

  // Replace prop drilling
  replacePropDrilling: {
    // Before: Pass session through multiple components
    // After: Use useWallet() or useAuth() directly in child components
    authProps: 'Use useWallet() or useAuth() directly in components',
    
    // Before: Pass modal state through props
    // After: Use useModal() with shared modal ID
    modalProps: 'Use useModal() with consistent modal IDs',
    
    // Before: Pass filter state through props
    // After: Use useFilters() directly in components
    filterProps: 'Use usePoliciesFilters() or useClaimsFilters() directly',
  },

  // Context API migration
  contextMigration: {
    // Keep: AuthProvider, ThemeProvider, ToastProvider (well-structured)
    // Migrate: Any custom contexts for UI state, filters, forms
    recommendation: 'Keep existing Context API for auth, theme, toast. Migrate UI state to stores.',
  },
};

/**
 * Performance monitoring for stores
 */
export function monitorStorePerformance() {
  if (process.env.NODE_ENV !== 'development') return;

  const stores = {
    wallet: useWalletStore,
    ui: useUIStore,
    filter: useFilterStore,
    form: useFormStore,
  };

  Object.entries(stores).forEach(([name, store]) => {
    let updateCount = 0;
    let lastUpdate = Date.now();

    store.subscribe(() => {
      updateCount++;
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdate;
      lastUpdate = now;

      if (timeSinceLastUpdate < 16) { // Less than 1 frame (60fps)
        console.warn(`⚠️ ${name}Store updating very frequently (${timeSinceLastUpdate}ms since last update)`);
      }

      if (updateCount % 100 === 0) {
        console.log(`📊 ${name}Store: ${updateCount} updates`);
      }
    });
  });

  console.log('✅ Store performance monitoring enabled');
}