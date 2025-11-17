'use client'

import { useState, useRef, useEffect } from 'react'
import { RESOURCE_TYPES } from '@/utils/contentful/constants'
import style from './style.module.scss'

export default function CategoryFilter({ onFilterChange, selectedCategory = 'All Categories' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (category) => {
    onFilterChange(category)
    setIsOpen(false)
  }

  return (
    <div className={style.categoryFilter} ref={dropdownRef}>
      <button
        className={style.filterButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={style.filterText}>{selectedCategory}</span>
        <svg
          className={`${style.chevron} ${isOpen ? style.chevronOpen : ''}`}
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4L5.5 7.5L9 4"
            stroke="#212121"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className={style.dropdown}>
          <button
            className={`${style.dropdownItem} ${selectedCategory === 'All Categories' ? style.active : ''}`}
            onClick={() => handleSelect('All Categories')}
          >
            All Categories
          </button>
          {RESOURCE_TYPES.map((type) => (
            <button
              key={type}
              className={`${style.dropdownItem} ${selectedCategory === type ? style.active : ''}`}
              onClick={() => handleSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

