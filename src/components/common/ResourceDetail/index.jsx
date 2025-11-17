'use client'

import { useState, useEffect } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { getResourceBySlug } from '@/utils/contentful/resources'
import Button from '../Button'
import Tag from '@/components/ui/Tag'
import style from './style.module.scss'

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
    [BLOCKS.HR]: () => <hr />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}


const DetailRow = ({ label, value }) => (
  <div className={style.detailRow}>
    <span className={style.detailLabel}>{label}</span>
    <span className={style.detailValue}>{value}</span>
  </div>
)

const Section = ({ title, children, className = '' }) => (
  <div className={className}>
    {title && <h3 className={style.sectionTitle}>{title}</h3>}
    {children}
  </div>
)

const CloseButton = ({ onClose }) => (
  <button
    className={style.closeButton}
    onClick={onClose}
    aria-label="Close modal"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
)

export default function ResourceDetail({ resource, resourceSlug, onClose, isModal = false }) {
  const [resourceData, setResourceData] = useState(resource)
  const [loading, setLoading] = useState(!resource && !!resourceSlug)

  useEffect(() => {
    const fetchResource = async () => {
      if (!resource && resourceSlug) {
        try {
          const data = await getResourceBySlug(resourceSlug)
          setResourceData(data)
        } catch (error) {
          console.error('Error fetching resource:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchResource()
  }, [resource, resourceSlug])

  // Early returns
  if (loading) return <div className={style.loading}>Loading...</div>
  if (!resourceData) return null
  if (!isModal) return <div>Page view not implemented</div>

  const { currentResource } = { currentResource: resourceData }

  // Data configuration for reusable rendering
  const detailSections = [
    {
      condition: currentResource.creator,
      content: <DetailRow label="Creator:" value={currentResource.creator} />
    },
    {
      condition: currentResource.skillLevel,
      content: <DetailRow label="Skill Level:" value={currentResource.skillLevel} />
    },
    {
      condition: currentResource.platforms?.length > 0,
      content: <DetailRow label="Platforms:" value={currentResource.platforms.join(', ')} />
    },
    {
      condition: currentResource.languages?.length > 0,
      content: <DetailRow label="Languages:" value={currentResource.languages.join(', ')} />
    },
    {
      condition: currentResource.license,
      content: <DetailRow label="License:" value={currentResource.license} />
    },
    {
      condition: currentResource.isVerified,
      content: <DetailRow label="Status:" value="✓ Verified" />
    }
  ]

  const additionalInfoSections = [
    {
      condition: currentResource.dateAdded,
      content: <DetailRow label="Date Added:" value={currentResource.dateAdded} />
    },
    {
      condition: currentResource.lastUpdated,
      content: <DetailRow label="Last Updated:" value={currentResource.lastUpdated} />
    }
  ]

  const badgeItems = [
    { condition: currentResource.resourceType, value: currentResource.resourceType?.toUpperCase(), variant: 'dark' },
    { condition: currentResource.price, value: currentResource.price?.toUpperCase(), variant: 'light' },
    { condition: currentResource.license, value: currentResource.license, variant: 'light' },
    { condition: currentResource.categoryTags?.length > 0, value: '...', variant: 'light' }
  ]

  return (
    <>
      {/* Left Sidebar - Sticky */}
      <div className={style.leftSidebar}>
        <div className={style.sidebarContent}>
          {currentResource.icon && (
            <div className={style.iconContainer}>
              <img
                src={currentResource.icon}
                alt={currentResource.title}
                className={style.iconImage}
              />
            </div>
          )}

          <div className={style.sidebarHeader}>
            <h1 className={style.title}>{currentResource.title}</h1>
            
            <div className={style.badgesRow}>
              <div className={style.badges}>
                {badgeItems.map((item, index) => 
                  item.condition && (
                    <Tag key={index} variant={item.variant}>
                      {item.value}
                    </Tag>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {currentResource.officialWebsite && (
          <a
            href={currentResource.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className={style.visitButton}
          >
            <Button cta={false} className={style.visitButtonInner}>
              VISIT WEBSITE
            </Button>
          </a>
        )}
      </div>

      {/* Right Content - Scrollable */}
      <div className={style.rightContent}>
        <CloseButton onClose={onClose} />

        <div className={style.scrollableContent}>
          {/* Description Section */}
          {currentResource.description && (
            <Section className={style.descriptionSection}>
              {documentToReactComponents(currentResource.description, richTextOptions)}
            </Section>
          )}

          {/* Details Section */}
          <Section className={style.detailsSection}>
            {detailSections.map((section, index) => 
              section.condition && <div key={index}>{section.content}</div>
            )}
          </Section>

          {/* Category Tags Section */}
          {currentResource.categoryTags?.length > 0 && (
            <Section title="Tags" className={style.tagsSection}>
              <div className={style.tagsList}>
                {currentResource.categoryTags.map((tag, index) => (
                  <Tag key={index} variant="light">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Section>
          )}

          {/* Additional Info Section */}
          <Section className={style.additionalInfoSection}>
            {additionalInfoSections.map((section, index) => 
              section.condition && <div key={index}>{section.content}</div>
            )}
          </Section>

          {/* Social Media Links */}
          {currentResource.socialMedia?.length > 0 && (
            <Section title="Social Media" className={style.socialSection}>
              <div className={style.socialLinks}>
                {currentResource.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.socialLink}
                  >
                    <Button>{social.platform}</Button>
                  </a>
                ))}
              </div>
            </Section>
          )}

          {/* Screenshots Gallery */}
          {currentResource.screenshots?.length > 0 && (
            <Section title="Screenshots" className={style.screenshotsSection}>
              <div className={style.screenshotsGrid}>
                {currentResource.screenshots.slice(0, 2).map((screenshot, index) => (
                  <div key={index} className={style.screenshotItem}>
                    <img
                      src={screenshot}
                      alt={`${currentResource.title} screenshot ${index + 1}`}
                      className={style.screenshotImage}
                    />
                  </div>
                ))}
                {currentResource.screenshots.length > 2 && (
                  <div className={style.screenshotItem}>
                    <div className={style.moreScreenshots}>
                      <span className={style.moreCount}>+{currentResource.screenshots.length - 2}</span>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}
        </div>
      </div>
    </>
  )
}