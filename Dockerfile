# # build environment
# FROM node:12.18.3 as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# COPY .npmrc ./

# # COPY package-lock.json ./

# RUN npm i --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./

# COPY .env ./
# COPY .env.staging ./
# COPY .env.production ./
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# # new
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
#=============================================
# FROM node
# # FROM node:12.18.3
# # FROM alpine:3.10

# RUN mkdir -p /usr/src/app

# COPY / /usr/src/app

# WORKDIR /usr/src/app

# RUN npm install --production
# # RUN npm run build --max-old-space-size=8192

# EXPOSE 3000

# CMD npm start

# FROM node:current-alpine
FROM node:12.18.3
# FROM alpine:3.10

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/package.json
# COPY .npmrc /usr/src/app/.npmrc
#COPY yarn.lock /usr/src/app/yarn.lock
WORKDIR /usr/src/app

RUN npm install --production

COPY / /usr/src/app

EXPOSE 3000

CMD npm start

# ==========================================

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/n


# FROM node:13-alpine

# EXPOSE 3000

# # Set environment variables
# ENV APP_ROOT /usr/src/app

# # Update & Set timezone
# RUN apk --update add tzdata && \
#     cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
#     apk del tzdata && \
#     rm -rf /var/cache/apk/*

# # Provides cached layer for node_modules
# ADD .npmrc /tmp/.npmrc
# ADD package.json /tmp/package.json
# RUN cd /tmp && yarn install --production --max-old-space-size=4096
# RUN mkdir -p ${APP_ROOT} && cp -a /tmp/node_modules ${APP_ROOT}/

# # Define working directory
# WORKDIR ${APP_ROOT}
# ADD . ${APP_ROOT}

# # Bundle app source
# RUN yarn build

# CMD yarn start
