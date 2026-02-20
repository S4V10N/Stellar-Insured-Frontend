import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FilterState, PaginationState } from './types';

interface FilterStoreState {
  // Policies filters
  policies: FilterState & {
    priceOrder: 'asc' | 'desc' | null;
    coverageRange: [number, number];
    selectedPlan: string | null;
  };
  
  // Claims filters
  claims: FilterState;
  
  // Pagination states
  pagination: Record<string, PaginationState>;
  
  // Actions for policies
  setPoliciesSearch: (query: string) => void;
  setPoliciesStatus: (status: string) => void;
  setPoliciesTab: (tab: string) => void;
  setPoliciesPage: (page: number) => void;
  setPoliciesPriceOrder: (order: 'asc' | 'desc' | null) => void;
  setPoliciesCoverageRange: (range: [number, number]) => void;
  setPoliciesSelectedPlan: (plan: string | null) => void;
  resetPoliciesFilters: () => void;
  
  // Actions for claims
  setClaimsSearch: (query: string) => void;
  setClaimsStatus: (status: string) => void;
  setClaimsTab: (tab: string) => void;
  setClaimsPage: (page: number) => void;
  resetClaimsFilters: () => void;
  
  // Pagination actions
  setPagination: (key: string, pagination: Partial<PaginationState>) => void;
  getPagination: (key: string) => PaginationState;
  resetPagination: (key: string) => void;
  
  // Reset all
  reset: () => void;
}

const defaultFilterState: FilterState = {
  searchQuery: '',
  statusFilter: 'all',
  activeTab: 'all',
  currentPage: 1,
  itemsPerPage: 10,
};

const defaultPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0,
};

const initialState = {
  policies: {
    ...defaultFilterState,
    itemsPerPage: 9,
    priceOrder: null as 'asc' | 'desc' | null,
    coverageRange: [0, 100000] as [number, number],
    selectedPlan: null,
  },
  claims: {
    ...defaultFilterState,
  },
  pagination: {},
};

export const useFilterStore = create<FilterStoreState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Policies actions
      setPoliciesSearch: (query) => set((state) => ({
        policies: { ...state.policies, searchQuery: query, currentPage: 1 }
      }), false, 'setPoliciesSearch'),
      
      setPoliciesStatus: (status) => set((state) => ({
        policies: { ...state.policies, statusFilter: status, currentPage: 1 }
      }), false, 'setPoliciesStatus'),
      
      setPoliciesTab: (tab) => set((state) => ({
        policies: { ...state.policies, activeTab: tab, currentPage: 1 }
      }), false, 'setPoliciesTab'),
      
      setPoliciesPage: (page) => set((state) => ({
        policies: { ...state.policies, currentPage: page }
      }), false, 'setPoliciesPage'),
      
      setPoliciesPriceOrder: (order) => set((state) => ({
        policies: { ...state.policies, priceOrder: order }
      }), false, 'setPoliciesPriceOrder'),
      
      setPoliciesCoverageRange: (range) => set((state) => ({
        policies: { ...state.policies, coverageRange: range }
      }), false, 'setPoliciesCoverageRange'),
      
      setPoliciesSelectedPlan: (plan) => set((state) => ({
        policies: { ...state.policies, selectedPlan: plan }
      }), false, 'setPoliciesSelectedPlan'),
      
      resetPoliciesFilters: () => set((state) => ({
        policies: { ...initialState.policies }
      }), false, 'resetPoliciesFilters'),
      
      // Claims actions
      setClaimsSearch: (query) => set((state) => ({
        claims: { ...state.claims, searchQuery: query, currentPage: 1 }
      }), false, 'setClaimsSearch'),
      
      setClaimsStatus: (status) => set((state) => ({
        claims: { ...state.claims, statusFilter: status, currentPage: 1 }
      }), false, 'setClaimsStatus'),
      
      setClaimsTab: (tab) => set((state) => ({
        claims: { ...state.claims, activeTab: tab, currentPage: 1 }
      }), false, 'setClaimsTab'),
      
      setClaimsPage: (page) => set((state) => ({
        claims: { ...state.claims, currentPage: page }
      }), false, 'setClaimsPage'),
      
      resetClaimsFilters: () => set((state) => ({
        claims: { ...initialState.claims }
      }), false, 'resetClaimsFilters'),
      
      // Pagination actions
      setPagination: (key, pagination) => set((state) => ({
        pagination: {
          ...state.pagination,
          [key]: { ...defaultPagination, ...state.pagination[key], ...pagination }
        }
      }), false, 'setPagination'),
      
      getPagination: (key) => {
        const { pagination } = get();
        return pagination[key] || defaultPagination;
      },
      
      resetPagination: (key) => set((state) => ({
        pagination: {
          ...state.pagination,
          [key]: defaultPagination
        }
      }), false, 'resetPagination'),
      
      // Reset all
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'FilterStore' }
  )
);