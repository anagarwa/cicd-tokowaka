/**
 * Cloudflare Worker to proxy requests from cicdtokowaka.aem-screens.net to frescopa.aem-screens.net
 */

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the URL from the request
      console.log('Request URL:', request.url);
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
      // add one <div> in response body which is hidden and has a class name "cicd-tokowaka-debug"
      const body = await response.text();
      const newBody = body.replace('</body>', '<div class="cicd-tokowaka-debug">Debug</div></body>');

      // Create a new response with the origin's content
      const newResponse = new Response(newBody, {
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