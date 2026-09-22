export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url", { status: 400 });
    }

    try {
      const response = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const headers = new Headers(response.headers);
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "public, max-age=86400");

      return new Response(response.body, {
        status: response.status,
        headers
      });
    } catch (error) {
      return new Response("Proxy error", { status: 502 });
    }
  }
};
