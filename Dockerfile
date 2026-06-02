# The Rylkova Method — static site served by nginx.
# Coolify builds this image from the repo and runs it behind its proxy
# (TLS + the Cloudflare-pointed domain are handled by Coolify, not here).
FROM nginx:1.27-alpine

# Serve config (gzip, cache headers, clean URLs)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The site lives in Website/ — copy it to the web root
COPY Website/ /usr/share/nginx/html/

EXPOSE 80

# Basic container healthcheck Coolify can read.
# Use 127.0.0.1 (not "localhost"): localhost can resolve to IPv6 ::1, but nginx
# listens on IPv4 only — wget would then get "connection refused" on a healthy app.
# -O /dev/null keeps it busybox-wget safe (no reliance on --spider).
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
