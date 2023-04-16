// next.config.js

const securityHeaders = [
  // Prevent the browser from MIME-sniffing the response.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Enable cross-site scripting (XSS) protection in the browser.
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
