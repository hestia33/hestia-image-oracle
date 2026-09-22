export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url", {
        status: 400
      });
    }

    try {
      const targetUrl = new URL(target);

      if (targetUrl.protocol !== "https:") {
        return new Response("Only HTTPS URLs are allowed", {
          status: 400
        });
      }

      const response = await fetch(targetUrl.toString(), {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
        }
      });

      const headers = new Headers(response.headers);

      headers.set(
        "Access-Control-Allow-Origin",
        "*"
      );

      headers.set(
        "Cache-Control",
        "public, max-age=86400"
      );

      return new Response(
        response.body,
        {
          status: response.status,
          headers
        }
      );

    } catch (error) {
      return new Response(
        "Proxy error",
        { status: 502 }
      );
    }
  }
};
