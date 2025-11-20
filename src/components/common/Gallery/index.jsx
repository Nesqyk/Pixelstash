'use client'

import { useState } from 'react'
import style from './style.module.scss'

export default function Gallery({ screenshots, title = 'Screenshots' }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (!screenshots || screenshots.length === 0) return null

  const handleImageClick = (index) => {
    setSelectedImage(index)
  }

  const handleCloseLightbox = () => {
    setSelectedImage(null)
  }

  const handlePrevious = (e) => {
    e.stopPropagation()
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setSelectedImage((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))
  }

  return (
    <>
      <div className={style.gallerySection}>
        {title && <h3 className={style.galleryTitle}>{title}</h3>}
        <div className={style.galleryGrid}>
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={style.galleryItem}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={screenshot}
                alt={`${title} ${index + 1}`}
                className={style.galleryImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className={style.lightbox} onClick={handleCloseLightbox}>
          <button
            className={style.lightboxClose}
            onClick={handleCloseLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={style.lightboxPrev}
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={style.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={screenshots[selectedImage]}
              alt={`${title} ${selectedImage + 1}`}
              className={style.lightboxImage}
            />
            <div className={style.lightboxCounter}>
              {selectedImage + 1} / {screenshots.length}
            </div>
          </div>
          <button
            className={style.lightboxNext}
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

