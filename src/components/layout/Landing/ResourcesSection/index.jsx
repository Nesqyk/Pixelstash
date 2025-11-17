'use client'

import { useState, useEffect, useCallback } from 'react'
import { searchResources } from '@/utils/contentful/resources'
import ResourceCard from '@/components/common/Card'
import ResourceModal from '@/components/common/ResourceModal'
import SearchBar from '@/components/common/SearchBar'
import CategoryFilter from '@/components/common/CategoryFilter'
import Pagination from '@/components/common/Pagination'
import style from './style.module.scss'

const ITEMS_PER_PAGE = 9

export default function ResourcesSection() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)

  const fetchResources = useCallback(async () => {
    setLoading(true)
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE
      const filters = {
        resourceType: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
      }

      const result = await searchResources(searchQuery, filters, skip, ITEMS_PER_PAGE)
      
      setResources(result.resources)
      setTotalItems(result.total)
      setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE))
    } catch (error) {
      console.error('Error fetching resources:', error)
      setResources([])
      setTotalItems(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, selectedCategory])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleViewClick = (resource) => {
    setSelectedResource(resource)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedResource(null)
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

  return (
    <section className={style.resourcesSection}>
      <div className={style.filters}>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onFilterChange={handleCategoryChange}
        />
      </div>

      <div className={style.content}>
        <p className={style.count}>
          Showing {totalItems > 0 ? `${startIndex}-${endIndex}` : '0'} out of {totalItems}
        </p>

        {loading ? (
          <div className={style.loading}>Loading resources...</div>
        ) : resources.length === 0 ? (
          <div className={style.empty}>
            No resources found. Try adjusting your search or filters.
          </div>
        ) : (
          <>
            <div className={style.grid}>
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onViewClick={() => handleViewClick(resource)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        resourceSlug={selectedResource?.slug}
        resourceData={selectedResource}
      />
    </section>
  )
}

