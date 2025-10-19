import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

export const useScrollToForm = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis if not already initialized
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    return () => {
      // Don't destroy Lenis here as it might be used elsewhere
    };
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement && lenisRef.current) {
      lenisRef.current.scrollTo(formElement, {
        offset: -100, // Offset to show the form nicely
        duration: 1.5,
      });
    }
  };

  return { scrollToForm };
};
