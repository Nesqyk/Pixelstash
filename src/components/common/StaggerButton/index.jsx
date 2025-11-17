'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './style.module.scss'

export default function StaggerTextButton({ children, onClick, index = 0, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  const letterVariants = {
    rest: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    hover: (i) => ({
      y: -10,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
        delay: i * 0.02
      }
    })
  }

  const letters = children.split('')

  return (
    <button
      className={styles.staggerButton}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          custom={i}
          className={styles.letter}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </button>
  )
}
