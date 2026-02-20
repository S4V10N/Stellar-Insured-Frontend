import { useCallback } from 'react';
import { useUIStore } from '@/store';

/**
 * Modal management hook with centralized state
 * Provides modal opening, closing, and state management
 */
export function useModal(modalId: string) {
  const {
    openModal,
    closeModal,
    isModalOpen,
    getModalData,
  } = useUIStore();

  const open = useCallback((type?: string, data?: any) => {
    openModal(modalId, type, data);
  }, [modalId, openModal]);

  const close = useCallback(() => {
    closeModal(modalId);
  }, [modalId, closeModal]);

  const toggle = useCallback((type?: string, data?: any) => {
    if (isModalOpen(modalId)) {
      close();
    } else {
      open(type, data);
    }
  }, [modalId, isModalOpen, open, close]);

  return {
    isOpen: isModalOpen(modalId),
    data: getModalData(modalId),
    open,
    close,
    toggle,
  };
}

/**
 * Global modal management hook
 * Provides access to all modal operations
 */
export function useGlobalModal() {
  const {
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    getModalData,
  } = useUIStore();

  return {
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    getModalData,
  };
}