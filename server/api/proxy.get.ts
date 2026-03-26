export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const externalApiUrl = config.public.externalApiUrl as string;
  const apiSecret = config.apiSecret as string;

  try {
    // In a real scenario, you might pass the apiSecret in headers
    const data = await $fetch(externalApiUrl, {
      headers: {
        'Authorization': `Bearer ${apiSecret}`
      }
    });

    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  } catch (error: unknown) {
    let statusCode = 500;
    
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as { response: { status?: number } }).response;
      if (response && typeof response.status === 'number') {
        statusCode = response.status;
      }
    }

    throw createError({
      statusCode,
      statusMessage: 'Failed to fetch data from external API'
    });
  }
}, {
  maxAge: 60 * 60, // Cache for 1 hour
  name: 'proxyCache',
  getKey: (event) => event.path
});
