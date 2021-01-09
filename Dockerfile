# first build frontend
FROM node:alpine as build-stage

WORKDIR /usr/app
COPY frontend .
RUN npm install && npm run build

# once completed, make new image node.js

FROM node:alpine

WORKDIR /usr/app
COPY backend .
RUN npm install

# and copy the frontend from previous image
COPY --from=build-stage /usr/app/build /usr/app/static

# our server is running at port 5000
EXPOSE 5000

# and finally run our server
CMD ["node", "/usr/app/server.js"]
