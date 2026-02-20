import { useCallback } from 'react';
import { useFormStore } from '@/store';
import { FormStatus } from '@/store/types';

/**
 * Form state management hook
 * Provides form state management with loading, success, and error states
 */
export function useForm(formId: string) {
  const {
    setFormStatus,
    setFormError,
    setFormData,
    setFormState,
    getFormState,
    resetForm,
    startSubmission,
    completeSubmission,
    failSubmission,
  } = useFormStore();

  const formState = getFormState(formId);

  const setStatus = useCallback((status: FormStatus) => {
    setFormStatus(formId, status);
  }, [formId, setFormStatus]);

  const setError = useCallback((error: string | undefined) => {
    setFormError(formId, error);
  }, [formId, setFormError]);

  const setData = useCallback((data: any) => {
    setFormData(formId, data);
  }, [formId, setFormData]);

  const setState = useCallback((state: Partial<typeof formState>) => {
    setFormState(formId, state);
  }, [formId, setFormState]);

  const reset = useCallback(() => {
    resetForm(formId);
  }, [formId, resetForm]);

  const startLoading = useCallback(() => {
    startSubmission(formId);
  }, [formId, startSubmission]);

  const setSuccess = useCallback((data?: any) => {
    completeSubmission(formId, data);
  }, [formId, completeSubmission]);

  const setFailure = useCallback((error: string) => {
    failSubmission(formId, error);
  }, [formId, failSubmission]);

  // Async form submission helper
  const submitForm = useCallback(async <T>(
    submitFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      startLoading();
      const result = await submitFn();
      setSuccess(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Submission failed';
      setFailure(errorMessage);
      return null;
    }
  }, [startLoading, setSuccess, setFailure]);

  return {
    // State
    status: formState.status,
    error: formState.error,
    data: formState.data,
    
    // Computed
    isLoading: formState.status === 'loading',
    isSuccess: formState.status === 'success',
    isError: formState.status === 'error',
    isIdle: formState.status === 'idle',
    
    // Actions
    setStatus,
    setError,
    setData,
    setState,
    reset,
    startLoading,
    setSuccess,
    setFailure,
    submitForm,
  };
}

/**
 * Multiple forms management hook
 * Useful for components that manage multiple forms
 */
export function useForms(formIds: string[]) {
  const { getFormState, resetAllForms } = useFormStore();

  const forms = formIds.reduce((acc, formId) => {
    acc[formId] = getFormState(formId);
    return acc;
  }, {} as Record<string, ReturnType<typeof getFormState>>);

  const isAnyLoading = Object.values(forms).some(form => form.status === 'loading');
  const hasAnyError = Object.values(forms).some(form => form.status === 'error');
  const areAllSuccess = Object.values(forms).every(form => form.status === 'success');

  return {
    forms,
    isAnyLoading,
    hasAnyError,
    areAllSuccess,
    resetAll: resetAllForms,
  };
}