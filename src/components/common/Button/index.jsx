"use client"

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import styles from "./style.module.scss"

export default function Button({ children, cta = false, onClick, className = '' }) {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
  const timeline = useRef(null);

  const hoverFillLightColor = cta ? 'var(--color-mustard)' : 'var(--color-dark-mustard)';
  const hoverFillDarkColor = 'var(--color-charcoal)';
  const textColorOnDark = cta ? 'var(--color-mustard)' : 'var(--color-mustard)';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      timeline.current = gsap.timeline({ paused: true })
        .to(buttonRef.current, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(fillRef.current, {
          duration: 0.25,
          scaleX: 1,
          backgroundColor: hoverFillLightColor,
          ease: 'power2.out',
        }, '-=0.1')
        .to(fillRef.current, {
          duration: 0.25,
          backgroundColor: hoverFillDarkColor,
          ease: 'power2.inOut',
        }, '-=0.15')
        .to(buttonRef.current, {
          color: textColorOnDark,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.3');

    }, buttonRef);

    return () => ctx.revert(); 
    
  }, [cta, hoverFillLightColor, hoverFillDarkColor, textColorOnDark]);

  const handleMouseEnter = () => {
    timeline.current.play();
  };

  const handleMouseLeave = () => {
    timeline.current.reverse();
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.customButton} ${cta ? styles.ctaButton : styles.defaultButton} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.buttonText}>{children}</span>
      <span
        ref={fillRef}
        className={styles.buttonFill}
      ></span>
    </button>
  );
}