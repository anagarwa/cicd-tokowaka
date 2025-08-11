/**
 * Cloudflare Worker to proxy requests from cicdtokowaka.aem-screens.net to frescopa.aem-screens.net
 */

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the URL from the request
      const url = new URL(request.url);
      
      // Construct the origin URL (frescopa.aem-screens.net)
      const originUrl = new URL(url.pathname + url.search, 'https://frescopa.aem-screens.net');
      
      // Create a new request to the origin
      const originRequest = new Request(originUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow'
      });
      
      // Fetch the response from the origin
      const response = await fetch(originRequest);
      
      // Create a new response with the origin's content
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      
      // Add CORS headers if needed
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return newResponse;
      
    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}; 