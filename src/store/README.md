# State Management Documentation

## Overview

This application uses **Zustand** for centralized state management, providing predictable state updates, time-travel debugging, and reduced prop drilling.

## Architecture

### Stores

1. **WalletStore** (`walletStore.ts`) - Wallet connection and authentication
2. **UIStore** (`uiStore.ts`) - Modal management, loading states, sidebar
3. **FilterStore** (`filterStore.ts`) - Search, filters, and pagination
4. **FormStore** (`formStore.ts`) - Form state management

### Hooks

1. **useWallet** - Enhanced wallet connection with centralized state
2. **useModal** - Modal management with centralized state
3. **useFilters** - Filter and pagination management
4. **useForm** - Form state management with async submission

## Usage Examples

### Wallet Connection

```tsx
import { useWallet } from '@/hooks/useWallet';

function WalletButton() {
  const { isConnected, isConnecting, connectWallet, disconnect, address } = useWallet();
  
  if (isConnected) {
    return (
      <div>
        <span>Connected: {address}</span>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }
  
  return (
    <button onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
```

### Modal Management

```tsx
import { useModal } from '@/hooks/useModal';

function PolicyCard() {
  const modal = useModal('policy-purchase');
  
  return (
    <div>
      <button onClick={() => modal.open('purchase', { policyId: '123' })}>
        Buy Policy
      </button>
      
      {modal.isOpen && (
        <PurchaseModal 
          policyId={modal.data?.policyId}
          onClose={modal.close}
        />
      )}
    </div>
  );
}
```

### Filter Management

```tsx
import { usePoliciesFilters } from '@/hooks/useFilters';

function PoliciesPage() {
  const {
    searchQuery,
    activeTab,
    currentPage,
    setSearch,
    setTab,
    setPage
  } = usePoliciesFilters();
  
  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search policies..."
      />
      
      <TabBar activeTab={activeTab} onTabChange={setTab} />
      
      <Pagination 
        currentPage={currentPage}
        onPageChange={setPage}
      />
    </div>
  );
}
```

### Form Management

```tsx
import { useForm } from '@/hooks/useForm';

function SignUpForm() {
  const form = useForm('signup');
  
  const handleSubmit = async (formData: SignUpData) => {
    const result = await form.submitForm(async () => {
      return await signUpUser(formData);
    });
    
    if (result) {
      // Success - form.status is now 'success'
      router.push('/dashboard');
    }
    // Error handling is automatic - form.error contains the error message
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {form.error && <div className="error">{form.error}</div>}
      
      <button type="submit" disabled={form.isLoading}>
        {form.isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

## DevTools

### Redux DevTools Integration

All stores include Redux DevTools integration for debugging:

1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. View state changes, time-travel debug, and inspect actions

### Time-Travel Debugging

- View all state changes in chronological order
- Jump to any previous state
- Replay actions to debug issues
- Export/import state for testing

## Migration Guide

### From Context API

**Before:**
```tsx
const { session, setSession } = useAuth();
```

**After:**
```tsx
const { session, connectWallet, disconnect } = useWallet();
```

### From Local State

**Before:**
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);
```

**After:**
```tsx
const { searchQuery, currentPage, setSearch, setPage } = usePoliciesFilters();
```

### From Prop Drilling

**Before:**
```tsx
// Parent
<ChildComponent 
  isModalOpen={isModalOpen}
  onModalClose={() => setIsModalOpen(false)}
/>

// Child
function ChildComponent({ isModalOpen, onModalClose }) {
  return <Modal isOpen={isModalOpen} onClose={onModalClose} />;
}
```

**After:**
```tsx
// Parent
<ChildComponent />

// Child
function ChildComponent() {
  const modal = useModal('my-modal');
  return <Modal isOpen={modal.isOpen} onClose={modal.close} />;
}
```

## Best Practices

1. **Use specific hooks** - Prefer `useWallet()` over direct store access
2. **Namespace modals** - Use descriptive modal IDs like `'policy-purchase-123'`
3. **Reset forms** - Call `form.reset()` when component unmounts
4. **Batch updates** - Zustand automatically batches state updates
5. **Avoid deep nesting** - Keep store state flat for better performance

## Testing

### Unit Testing Stores

```tsx
import { renderHook, act } from '@testing-library/react';
import { useWalletStore } from '@/store';

test('wallet connection flow', () => {
  const { result } = renderHook(() => useWalletStore());
  
  act(() => {
    result.current.startConnection();
  });
  
  expect(result.current.status).toBe('connecting');
  
  act(() => {
    result.current.completeConnection(mockSession);
  });
  
  expect(result.current.status).toBe('connected');
  expect(result.current.session).toEqual(mockSession);
});
```

### Integration Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { useWalletStore } from '@/store';

// Reset store before each test
beforeEach(() => {
  useWalletStore.getState().reset();
});
```

## Performance

- **Selective subscriptions** - Components only re-render when used state changes
- **Computed values** - Use selectors for derived state
- **Persistence** - Critical state (wallet, theme) persists across sessions
- **DevTools** - Only enabled in development builds

## Troubleshooting

### Common Issues

1. **State not persisting** - Check if store has `persist` middleware
2. **Components not updating** - Ensure you're using the hook, not direct store access
3. **DevTools not working** - Install Redux DevTools extension
4. **TypeScript errors** - Ensure all store types are properly exported

### Debug Commands

```tsx
// Reset all stores
useWalletStore.getState().reset();
useUIStore.getState().reset();
useFilterStore.getState().reset();
useFormStore.getState().reset();

// Inspect current state
console.log('Wallet:', useWalletStore.getState());
console.log('UI:', useUIStore.getState());
```