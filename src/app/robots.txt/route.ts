// app/robots.txt/route.ts
export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://your-temp.vercel.app";
  const body = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain" } });
}

