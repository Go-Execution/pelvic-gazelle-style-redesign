const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://darkgreen-llama-758963.hostingersite.com/graphql';

export async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Next.js caching: revalidate every 60 seconds.
      // You can change this to 'no-store' during development if you want instant updates.
      next: { revalidate: 60 }, 
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch API');
    }
    
    return json.data;
  } catch (error) {
    console.error('Error fetching WordPress API:', error);
    return null;
  }
}

// Example function to fetch pages
export async function getPageContent(uri: string) {
  const data = await fetchAPI(`
    query GetPageByUri($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        content
      }
    }
  `, {
    variables: {
      uri
    }
  });

  return data?.page;
}
