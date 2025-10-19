import { keyframes } from '@emotion/react';

export const flipAnimation = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  50% {
    transform: perspective(1000px) rotateY(90deg);
  }
  100% {
    transform: perspective(1000px) rotateY(180deg);
  }
`;

export const flipBackAnimation = keyframes`
  0% {
    transform: perspective(1000px) rotateY(180deg);
  }
  50% {
    transform: perspective(1000px) rotateY(90deg);
  }
  100% {
    transform: perspective(1000px) rotateY(0deg);
  }
`;

export const flipCardStyles = {
  container: {
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform',
  },
  front: {
    backfaceVisibility: 'visible' as const,
    transform: 'rotateY(0deg)',
  },
  back: {
    backfaceVisibility: 'visible' as const,
    transform: 'rotateY(180deg)',
  },
  flipped: {
    transform: 'rotateY(180deg)',
  },
};
