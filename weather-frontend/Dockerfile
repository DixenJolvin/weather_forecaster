# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build production-ready frontend
RUN npm run build

# Install lightweight static server
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
