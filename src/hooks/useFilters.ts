import { useCallback, useMemo } from 'react';
import { useFilterStore } from '@/store';

/**
 * Policies filter management hook
 */
export function usePoliciesFilters() {
  const {
    policies,
    setPoliciesSearch,
    setPoliciesStatus,
    setPoliciesTab,
    setPoliciesPage,
    setPoliciesPriceOrder,
    setPoliciesCoverageRange,
    setPoliciesSelectedPlan,
    resetPoliciesFilters,
  } = useFilterStore();

  const setSearch = useCallback((query: string) => {
    setPoliciesSearch(query);
  }, [setPoliciesSearch]);

  const setStatus = useCallback((status: string) => {
    setPoliciesStatus(status);
  }, [setPoliciesStatus]);

  const setTab = useCallback((tab: string) => {
    setPoliciesTab(tab);
  }, [setPoliciesTab]);

  const setPage = useCallback((page: number) => {
    setPoliciesPage(page);
  }, [setPoliciesPage]);

  const setPriceOrder = useCallback((order: 'asc' | 'desc' | null) => {
    setPoliciesPriceOrder(order);
  }, [setPoliciesPriceOrder]);

  const setCoverageRange = useCallback((range: [number, number]) => {
    setPoliciesCoverageRange(range);
  }, [setPoliciesCoverageRange]);

  const setSelectedPlan = useCallback((plan: string | null) => {
    setPoliciesSelectedPlan(plan);
  }, [setPoliciesSelectedPlan]);

  const reset = useCallback(() => {
    resetPoliciesFilters();
  }, [resetPoliciesFilters]);

  return {
    // State
    searchQuery: policies.searchQuery,
    statusFilter: policies.statusFilter,
    activeTab: policies.activeTab,
    currentPage: policies.currentPage,
    itemsPerPage: policies.itemsPerPage,
    priceOrder: policies.priceOrder,
    coverageRange: policies.coverageRange,
    selectedPlan: policies.selectedPlan,
    
    // Actions
    setSearch,
    setStatus,
    setTab,
    setPage,
    setPriceOrder,
    setCoverageRange,
    setSelectedPlan,
    reset,
  };
}

/**
 * Claims filter management hook
 */
export function useClaimsFilters() {
  const {
    claims,
    setClaimsSearch,
    setClaimsStatus,
    setClaimsTab,
    setClaimsPage,
    resetClaimsFilters,
  } = useFilterStore();

  const setSearch = useCallback((query: string) => {
    setClaimsSearch(query);
  }, [setClaimsSearch]);

  const setStatus = useCallback((status: string) => {
    setClaimsStatus(status);
  }, [setClaimsStatus]);

  const setTab = useCallback((tab: string) => {
    setClaimsTab(tab);
  }, [setClaimsTab]);

  const setPage = useCallback((page: number) => {
    setClaimsPage(page);
  }, [setClaimsPage]);

  const reset = useCallback(() => {
    resetClaimsFilters();
  }, [resetClaimsFilters]);

  return {
    // State
    searchQuery: claims.searchQuery,
    statusFilter: claims.statusFilter,
    activeTab: claims.activeTab,
    currentPage: claims.currentPage,
    itemsPerPage: claims.itemsPerPage,
    
    // Actions
    setSearch,
    setStatus,
    setTab,
    setPage,
    reset,
  };
}

/**
 * Generic pagination hook
 */
export function usePagination(key: string) {
  const { setPagination, getPagination, resetPagination } = useFilterStore();

  const pagination = useMemo(() => getPagination(key), [getPagination, key]);

  const setPage = useCallback((page: number) => {
    setPagination(key, { currentPage: page });
  }, [key, setPagination]);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setPagination(key, { itemsPerPage, currentPage: 1 });
  }, [key, setPagination]);

  const setTotalItems = useCallback((totalItems: number) => {
    const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
    setPagination(key, { totalItems, totalPages });
  }, [key, setPagination, pagination.itemsPerPage]);

  const reset = useCallback(() => {
    resetPagination(key);
  }, [key, resetPagination]);

  return {
    ...pagination,
    setPage,
    setItemsPerPage,
    setTotalItems,
    reset,
  };
}