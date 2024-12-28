import { useEffect } from 'react';

function handleEvent(e: BeforeUnloadEvent) {
  e.preventDefault();
}

function addEvent() {
  window.addEventListener('beforeunload', handleEvent);
}

function removeEvent() {
  window.removeEventListener('beforeunload', handleEvent);
}

export function useConfirmExit(isSaved: boolean | undefined) {
  useEffect(() => {
    if (isSaved === true || isSaved === undefined) {
      removeEvent();
    } else {
      addEvent();
    }
    return () => {
      removeEvent();
    };
  }, [isSaved]);
}
