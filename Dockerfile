# Build the React client
FROM node:14 as client-build
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build the Express server
FROM node:14 as server-build
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Final image with both client and server
FROM node:14
WORKDIR /usr/src/app

# Copy React build
COPY --from=client-build /usr/src/app/client/build ./client/build

# Copy Express server
COPY --from=server-build /usr/src/app/server ./server

# Install PM2 to manage processes
RUN npm install pm2 -g

# Copy a process file to run both client and server
COPY ecosystem.config.js ./

# Expose the ports for the client and server
EXPOSE 3000 3001

# Start both client and server using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]

