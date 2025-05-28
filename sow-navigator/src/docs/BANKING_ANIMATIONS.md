# Banking Animation Implementation Guide

## Overview

This document outlines the implementation of professional, banking-appropriate animations using Framer Motion in the SOW Navigator application. The animations are designed to meet the conservative visual standards required for financial applications while providing smooth, accessible user experiences.

## Key Design Principles

### 1. Conservative Timing
- **Maximum duration**: 0.5 seconds for any animation
- **Standard duration**: 0.3 seconds for most interactions
- **Quick interactions**: 0.2 seconds for buttons and micro-interactions

### 2. Professional Easing
- **Primary easing**: `cubic-bezier(0.165, 0.84, 0.44, 1)` (easeOutQuart)
- **Subtle easing**: `cubic-bezier(0.19, 1, 0.22, 1)` (easeOutExpo)
- **Material Design**: `cubic-bezier(0.4, 0, 0.2, 1)` for familiarity

### 3. Banking Color Compliance
- **Primary**: Red (#dc3545) for critical actions
- **Secondary**: Dark grey (#6c757d) for secondary actions
- **Neutral**: Light greys (#f8f9fa, #dee2e6) for backgrounds
- **Text**: Black (#000) for high contrast

## Implementation Structure

### Core Files

```
src/
├── utils/
│   └── motionPresets.ts          # Animation variants and transitions
├── hooks/
│   └── useAccessibleMotion.ts    # Accessibility-aware motion hook
├── features/
│   └── pkr-status/
│       ├── SummaryReport.tsx     # Main implementation example
│       └── SummaryReport.less    # Banking-appropriate styles
└── components/
    ├── MotionTest.tsx           # Animation showcase
    └── PerformanceTest.tsx      # Performance validation
```

## Motion Presets (`motionPresets.ts`)

### Banking Transitions
```typescript
export const BANKING_TRANSITIONS = {
  overlay: { duration: 0.3, ease: [0.165, 0.84, 0.44, 1] },
  modal: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  button: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  fadeIn: { duration: 0.3, ease: [0.165, 0.84, 0.44, 1] },
  slideUp: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
  stagger: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};
```

### Professional Variants
- **overlay**: Fade in/out with backdrop blur
- **slideUp**: Smooth upward slide for modals
- **staggerContainer**: Container for staggered child animations
- **staggerItem**: Individual staggered elements
- **fadeIn**: Simple fade with scale
- **scaleIn**: Subtle scale animation for buttons

## Accessibility Features (`useAccessibleMotion.ts`)

### Reduced Motion Support
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

### High Contrast Support
```typescript
const prefersHighContrast = useMediaQuery('(prefers-contrast: high)');
```

### Dynamic Transition Adjustment
- Reduces animation duration by 70% when reduced motion is preferred
- Removes complex easing curves for accessibility
- Maintains functionality while respecting user preferences

## Implementation Example: SummaryReport

### Before (Custom setTimeout Animation)
```typescript
// Old approach with manual timing
useEffect(() => {
  if (isVisible) {
    setAnimationStage('overlay');
    setTimeout(() => setAnimationStage('slideUp'), 300);
    setTimeout(() => setAnimationStage('sections'), 600);
  }
}, [isVisible]);
```

### After (Framer Motion)
```typescript
// Professional Framer Motion implementation
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      variants={PROFESSIONAL_VARIANTS.overlay}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="summary-report-overlay"
    >
      <motion.div
        variants={PROFESSIONAL_VARIANTS.slideUp}
        transition={getTransition(BANKING_TRANSITIONS.modal)}
        className="summary-report-container"
      >
        {/* Content */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

## Performance Optimizations

### CSS Enhancements
```less
.summary-report-overlay {
  // Hardware acceleration
  will-change: opacity, backdrop-filter;
  transform: translate3d(0, 0, 0);
  
  // Banking-appropriate backdrop
  backdrop-filter: blur(4px);
  
  // Accessibility support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
}
```

### Key Performance Features
1. **Hardware acceleration**: `transform3d` and `will-change`
2. **Efficient animations**: GPU-accelerated properties only
3. **Memory management**: Proper cleanup and exit animations
4. **60fps targeting**: Conservative timing for smooth performance

## Testing & Validation

### Performance Test Routes
- `/motion-test` - Animation showcase and basic testing
- `/performance-test` - Comprehensive performance validation

### Key Metrics
- **Target FPS**: 60 fps minimum
- **Memory usage**: No memory leaks during animations
- **Accessibility**: Full compliance with reduced motion preferences
- **Banking compliance**: Conservative timing and professional aesthetics

## Integration Guidelines

### 1. Import Motion Presets
```typescript
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../utils/motionPresets';
import { useAccessibleMotion } from '../hooks/useAccessibleMotion';
```

### 2. Use Accessibility Hook
```typescript
const { getTransition } = useAccessibleMotion();
```

### 3. Apply Banking-Appropriate Animations
```typescript
<motion.div
  variants={PROFESSIONAL_VARIANTS.slideUp}
  transition={getTransition(BANKING_TRANSITIONS.modal)}
  initial="hidden"
  animate="visible"
  exit="hidden"
>
  {/* Content */}
</motion.div>
```

### 4. Style with Banking Guidelines
```less
.component {
  // Use banking colors
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  
  // Performance optimization
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  
  // Accessibility
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
}
```

## Best Practices

### Do's
- ✅ Use conservative timing (≤ 0.5s)
- ✅ Apply professional easing curves
- ✅ Implement accessibility support
- ✅ Use banking color scheme
- ✅ Optimize for 60fps performance
- ✅ Test with reduced motion preferences

### Don'ts
- ❌ Use flashy or attention-grabbing animations
- ❌ Exceed 0.5 second animation duration
- ❌ Ignore accessibility preferences
- ❌ Use non-banking colors for critical elements
- ❌ Create memory leaks with animations
- ❌ Block user interactions during animations

## Browser Support

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Strategy
- Graceful degradation for older browsers
- CSS-based fallbacks for unsupported features
- Accessibility-first approach

## Future Enhancements

### Planned Improvements
1. **Animation Preloading**: Preload complex animations
2. **Performance Monitoring**: Real-time FPS monitoring
3. **A/B Testing**: Test animation effectiveness
4. **Advanced Accessibility**: Enhanced screen reader support

## Conclusion

This implementation provides a professional, banking-appropriate animation system that:
- Maintains conservative visual standards
- Ensures 60fps performance
- Supports full accessibility requirements
- Uses industry-standard tooling (Framer Motion)
- Provides comprehensive testing and validation

The system is designed to be maintainable, performant, and compliant with banking industry standards while providing a modern, smooth user experience.
