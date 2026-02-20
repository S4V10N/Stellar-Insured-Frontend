import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ModalState } from './types';

interface UIState {
  // Modal management
  modals: Record<string, ModalState>;
  
  // Loading states
  loadingStates: Record<string, boolean>;
  
  // Sidebar/Navigation
  sidebarOpen: boolean;
  
  // Actions
  openModal: (id: string, type?: string, data?: any) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;
  getModalData: (id: string) => any;
  
  // Loading management
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;
  
  // Sidebar
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  modals: {},
  loadingStates: {},
  sidebarOpen: false,
};

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Modal management
      openModal: (id, type, data) => set((state) => ({
        modals: {
          ...state.modals,
          [id]: { isOpen: true, type, data }
        }
      }), false, 'openModal'),
      
      closeModal: (id) => set((state) => ({
        modals: {
          ...state.modals,
          [id]: { ...state.modals[id], isOpen: false }
        }
      }), false, 'closeModal'),
      
      closeAllModals: () => set((state) => {
        const closedModals = Object.keys(state.modals).reduce((acc, key) => {
          acc[key] = { ...state.modals[key], isOpen: false };
          return acc;
        }, {} as Record<string, ModalState>);
        
        return { modals: closedModals };
      }, false, 'closeAllModals'),
      
      isModalOpen: (id) => {
        const { modals } = get();
        return modals[id]?.isOpen || false;
      },
      
      getModalData: (id) => {
        const { modals } = get();
        return modals[id]?.data;
      },
      
      // Loading management
      setLoading: (key, loading) => set((state) => ({
        loadingStates: {
          ...state.loadingStates,
          [key]: loading
        }
      }), false, 'setLoading'),
      
      isLoading: (key) => {
        const { loadingStates } = get();
        return loadingStates[key] || false;
      },
      
      // Sidebar
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      }), false, 'toggleSidebar'),
      
      setSidebarOpen: (open) => set({ 
        sidebarOpen: open 
      }, false, 'setSidebarOpen'),
      
      // Reset
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'UIStore' }
  )
);