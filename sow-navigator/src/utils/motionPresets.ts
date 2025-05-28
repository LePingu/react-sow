import type { Variants, Transition } from 'framer-motion';

// Banking industry appropriate easing and timing
export const BANKING_TRANSITIONS: Record<string, Transition> = {
    subtle: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart - professional, not bouncy
    },
    smooth: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo - elegant entry
    },
    precise: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // Material Design easing - crisp
    }
};

// Conservative animation variants for banking UX
export const PROFESSIONAL_VARIANTS: Record<string, Variants> = {
    overlay: {
        hidden: {
            opacity: 0,
            backdropFilter: 'blur(0px)',
        },
        visible: {
            opacity: 1,
            backdropFilter: 'blur(8px)',
            transition: BANKING_TRANSITIONS.smooth
        },
        exit: {
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: BANKING_TRANSITIONS.precise
        }
    },

    slideUp: {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.96
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: BANKING_TRANSITIONS.smooth
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.98,
            transition: BANKING_TRANSITIONS.precise
        }
    },

    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Subtle stagger timing
                delayChildren: 0.2
            }
        }
    },

    staggerItem: {
        hidden: {
            opacity: 0,
            x: -20,
            filter: 'blur(4px)'
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: BANKING_TRANSITIONS.subtle
        }
    },

    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: BANKING_TRANSITIONS.subtle
        }
    },

    scaleIn: {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: BANKING_TRANSITIONS.smooth
        }
    },

    // Phase 2 additional banking-appropriate variants
    slideInLeft: {
        hidden: {
            opacity: 0,
            x: -30,
            filter: 'blur(4px)'
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: BANKING_TRANSITIONS.smooth
        }
    },

    tableRow: {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(2px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: BANKING_TRANSITIONS.subtle
        }
    },

    buttonCTA: {
        hidden: {
            opacity: 0,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: BANKING_TRANSITIONS.precise
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
            transition: BANKING_TRANSITIONS.precise
        },
        tap: {
            scale: 0.98,
            transition: BANKING_TRANSITIONS.precise
        }
    }
};
