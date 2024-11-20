import { useEffect } from 'react';

export function usePreventTextSearch() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'F3' || (e.key === 'f' && e.ctrlKey)) {
        e.preventDefault();
        window.alert(
          'Warning: you should never enter your seed phrase words in any electronic device. Make sure to look up your words by scrolling the list manually.'
        );
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
