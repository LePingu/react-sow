# Use a lightweight Debian-based image with Node.js 22
FROM node:22-bookworm-slim

# Set environment variables for non-interactive installs
# ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies for Node.js installation and common tools
# Switch to root to install packages
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    # Clean up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
