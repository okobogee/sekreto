import { useEffect } from 'react';

export function usePreventTextSearch() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'F3' || (e.key === 'f' && e.ctrlKey)) {
        e.preventDefault();
        window.alert('Ctrl+F and Cmd+F are disabled for safety reasons. Please scroll the list manually.');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
