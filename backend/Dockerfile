# Use uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto dos arquivos da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 4000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
