FROM node:18

# Create app directory
WORKDIR /app

# Copy only package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies inside container (Linux environment)
RUN npm install

# Copy app source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
