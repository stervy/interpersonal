/** @type {import('next').NextConfig} */
const COMING_SOON_PASSWORD = process.env.COMING_SOON_PASSWORD ?? "stervy"

const comingSoonEnabled = Boolean(COMING_SOON_PASSWORD)

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    if (!comingSoonEnabled) {
      return []
    }

    return [
      {
        source: "/coming-soon",
        has: [
          {
            type: "cookie",
            key: "comingSoonAuthorized",
            value: "true",
          },
        ],
        destination: "/",
        permanent: false,
      },
      {
        source: "/((?!coming-soon|api/coming-soon-auth|_next|static|favicon\.ico).*)",
        missing: [
          {
            type: "cookie",
            key: "comingSoonAuthorized",
            value: "true",
          },
        ],
        destination: "/coming-soon",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
