FROM node:22.13
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
CMD ["npm","start"]
