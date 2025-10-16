FROM node:20

WORKDIR /app

# COPY <source> <target folder>
# All package.jsons (package and lock package) 
COPY package*.json ./

RUN npm install

# Copies everything like src/, .env ...
COPY . .

CMD [ "npx" , "tsx", "src/index.ts"]