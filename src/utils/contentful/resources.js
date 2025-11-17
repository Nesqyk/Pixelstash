import { contentfulClient } from './client';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const RESOURCE_TYPE = 'pixelstash';

// Extract first URL from rich text
const extractUrl = (richText) => {
  if (!richText?.content) return '';
  
  const findUrl = (nodes) => {
    for (const node of nodes) {
      if (node.nodeType === 'hyperlink' && node.data?.uri) {
        return node.data.uri;
      }
      if (node.content) {
        const url = findUrl(node.content);
        if (url) return url;
      }
    }
    return '';
  };
  
  return findUrl(richText.content);
};

// Transform  entry to clean resource object
const transformResource = (entry) => {
  const { fields } = entry;
  const { sys } = entry;
  
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';
  
  return {
    id: fields.id || sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    tagline: fields.tagline || '',
    description: fields.description || null,
    descriptionPlainText: fields.description ? documentToPlainTextString(fields.description) : '',
    resourceType: fields.resourceType || '',
    categoryTags: fields.categoryTags || [],
    creator: fields.creator || 'Community',
    price: fields.price || null,
    license: fields.license || null,
    skillLevel: fields.skillLevel || 'All Levels',
    platforms: fields.platforms || [],
    languages: fields.pixelStatshResourceMetadataStructure || fields.languages || [],
    officialWebsite: fields.officialWebsite ? extractUrl(fields.officialWebsite) : '',
    officialWebsiteRichText: fields.officialWebsite || null,
    socialMedia: fields.socialMedia ? Object.entries(fields.socialMedia).map(([platform, url]) => ({
      platform,
      url: url || ''
    })) : [],
    icon: fields.icon?.fields?.file?.url ? `https:${fields.icon.fields.file.url}` : '',
    screenshots: (fields.screenshots || [])
      .map(asset => asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : null)
      .filter(Boolean),
    isVerified: fields.isVerified || false,
    lastUpdated: formatDate(fields.lastUpdated),
    dateAdded: formatDate(fields.dateAdded),
    lastUpdatedInCMS: sys.updatedAt || '',
  };
};

const baseQuery = {
  content_type: RESOURCE_TYPE,
  order: '-sys.createdAt'
};

// Fetch all resources
export const getAllResources = async (skip = 0, limit = 100) => {
  try {
    const response = await contentfulClient.getEntries({ ...baseQuery, skip, limit });
    return {
      resources: response.items.map(transformResource),
      total: response.total
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// Fetch resource by slug
export const getResourceBySlug = async (slug) => {
  try {
    const response = await contentfulClient.getEntries({
      ...baseQuery,
      'fields.slug': slug,
      limit: 1
    });
    return response.items.length > 0 ? transformResource(response.items[0]) : null;
  } catch (error) {
    console.error('Error fetching resource by slug:', error);
    throw error;
  }
};

// Search resources
export const searchResources = async (query = '', filters = {}, skip = 0, limit = 100) => {
  try {
    const queryParams = { ...baseQuery, skip, limit };
    
    if (query) queryParams.query = query;
    if (filters.resourceType && filters.resourceType !== 'All Categories') {
      queryParams['fields.resourceType'] = filters.resourceType;
    }
    if (filters.categoryTags?.length) {
      queryParams['fields.categoryTags[in]'] = filters.categoryTags;
    }
    if (filters.price) queryParams['fields.price'] = filters.price;
    if (filters.platforms?.length) {
      queryParams['fields.platforms[in]'] = filters.platforms;
    }

    const response = await contentfulClient.getEntries(queryParams);
    return {
      resources: response.items.map(transformResource),
      total: response.total
    };
  } catch (error) {
    console.error('Error searching resources:', error);
    throw error;
  }
};

// Get all slugs for static generation
export const getAllResourceSlugs = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: RESOURCE_TYPE,
      select: 'fields.slug',
      limit: 1000
    });
    return response.items.map(item => item.fields.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching resource slugs:', error);
    throw error;
  }
};