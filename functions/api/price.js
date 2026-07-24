export async function onRequest() {
  return new Response(JSON.stringify({ price: 125000 }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
