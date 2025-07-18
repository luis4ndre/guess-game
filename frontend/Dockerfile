# Use uma imagem base do Nginx
FROM nginx:1.25-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nossa configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do frontend (HTML, CSS, JS)
COPY ./public /usr/share/nginx/html
