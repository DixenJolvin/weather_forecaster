# Use Node.js base image (small Alpine variant)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
