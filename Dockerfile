# Use the official Node.js image as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json ./


# Copy the rest of your application files
COPY . .

# Install dependencies
RUN npm install

# build page
RUN npm run build

# Start the application
CMD ["npm", "start"]
