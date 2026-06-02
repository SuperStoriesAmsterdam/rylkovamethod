# The Rylkova Method — static site served by nginx.
# Coolify builds this image from the repo and runs it behind its proxy
# (TLS + the Cloudflare-pointed domain are handled by Coolify, not here).
FROM nginx:1.27-alpine

# Serve config (gzip, cache headers, clean URLs)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The site lives in Website/ — copy it to the web root
COPY Website/ /usr/share/nginx/html/

EXPOSE 80

# Basic container healthcheck Coolify can read
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1
