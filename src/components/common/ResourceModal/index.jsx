'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom' 
import ResourceDetail from '../ResourceDetail'
import style from './style.module.scss'

const setScrollLock = (isLocked, scrollPosition) => {
  const htmlEl = document.documentElement
  const bodyEl = document.body

  if (isLocked) {

    htmlEl.style.overflow = 'hidden'
    bodyEl.style.overflow = 'hidden'
    
    htmlEl.style.position = 'fixed'
    bodyEl.style.position = 'fixed'
    
    htmlEl.style.top = `-${scrollPosition}px`
    bodyEl.style.top = `-${scrollPosition}px`
    
    htmlEl.style.width = '100%'
    bodyEl.style.width = '100%'
    
    htmlEl.style.touchAction = 'none'
    bodyEl.style.touchAction = 'none'
  } else {

    htmlEl.style.overflow = ''
    bodyEl.style.overflow = ''

    htmlEl.style.position = ''
    bodyEl.style.position = ''

    htmlEl.style.top = ''
    bodyEl.style.top = ''

    htmlEl.style.width = ''
    bodyEl.style.width = ''

    htmlEl.style.touchAction = ''
    bodyEl.style.touchAction = ''

    window.scrollTo(0, scrollPosition)
  }
}


export default function ResourceModal({ isOpen, onClose, resourceSlug, resourceData }) {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const scrollPositionRef = useRef(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop
      setScrollLock(true, scrollPositionRef.current)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      setScrollLock(false, scrollPositionRef.current)
    }
  }, [isOpen, onClose]) 

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen || !isMounted) return null

  return createPortal(
    <div
      ref={overlayRef}
      className={style.modalOverlay}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={style.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <ResourceDetail
          resource={resourceData}
          resourceSlug={resourceSlug}
          onClose={onClose}
          isModal={true}
        />
      </div>
    </div>,
    document.body
  )
}