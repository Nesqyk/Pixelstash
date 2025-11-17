'use client'

import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'

export default function SearchBar({ onSearch, placeholder = "Search for a tool, tutorial, palette, or asset..." }) {
  const [query, setQuery] = useState('')
  const debounceTimer = useRef(null)

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query])

  return (
    <div className={style.searchBar}>
      <div className={style.searchIcon}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 23L17 17" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input
        type="text"
        className={style.searchInput}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

