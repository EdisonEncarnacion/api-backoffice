#BUILD
FROM node:20.19-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci
COPY . .
RUN npm run build \
 && npm prune --omit=dev
FROM node:20.19-alpine AS production
WORKDIR /app
RUN adduser --disabled-password --uid 1001 --gecos "" appuser \
 && chown -R appuser /app

USER appuser
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist  ./dist
COPY  ./package*.json .
                  
ENTRYPOINT ["node" , "dist/main.js"]