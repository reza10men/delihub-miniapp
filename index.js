export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // API قیمت
    if (url.pathname === '/api/price') {
      return new Response(JSON.stringify({ price: 125000 }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // لود کردن سایت
    return env.ASSETS.fetch(request);
  }
};
