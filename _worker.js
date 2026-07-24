export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // اینجا API قیمت رو می‌سازیم
    if (url.pathname === '/api/price') {
      return new Response(JSON.stringify({ price: 125000 }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // اینجا هم کاری می‌کنه سایتت (HTML/CSS) درست لود بشه
    return env.ASSETS.fetch(request);
  }
};
