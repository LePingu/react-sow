import { useEffect, useState } from 'react';

export const useAccessibleMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);

    useEffect(() => {
        // Check for motion preferences
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');

        setPrefersReducedMotion(motionQuery.matches);
        setIsHighContrast(contrastQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        const handleContrastChange = (e: MediaQueryListEvent) => {
            setIsHighContrast(e.matches);
        };

        motionQuery.addEventListener('change', handleMotionChange);
        contrastQuery.addEventListener('change', handleContrastChange);

        return () => {
            motionQuery.removeEventListener('change', handleMotionChange);
            contrastQuery.removeEventListener('change', handleContrastChange);
        };
    }, []);

    return {
        prefersReducedMotion,
        isHighContrast,
        // Return modified transition for reduced motion
        getTransition: (transition: any) =>
            prefersReducedMotion ? { duration: 0.01 } : transition
    };
};
