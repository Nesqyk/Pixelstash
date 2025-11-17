import { createClient } from 'contentful';

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful space ID and access token must be provided via environment variables'
  );
}

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
});

