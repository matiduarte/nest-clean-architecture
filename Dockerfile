# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
