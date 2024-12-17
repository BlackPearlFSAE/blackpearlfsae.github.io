self.addEventListener('fetch', async (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.endsWith('.woff2') || url.pathname.endsWith('.woff')) {
    try {
      // Try to get the cached response first
      const cachedResponse = await caches.match(event.request);

      // If cache hit, return the cached response, else fetch and cache it
      if (cachedResponse) {
        return cachedResponse;
      }

      // If no cache, fetch the request
      const response = await fetch(event.request);

      // Open cache and store the fetched response
      const cache = await caches.open('font-cache');
      cache.put(event.request, response.clone());

      return response;
    } catch (error) {
      console.error('Error fetching font:', error);
      return await fetch(event.request); // Fall back to network fetch if an error occurs
    }
  }
});
