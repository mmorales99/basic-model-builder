# Utiliza la imagen oficial de Nginx
FROM nginx:alpine

# Copia el contenido de la carpeta html local a la carpeta estándar de Nginx
COPY html /usr/share/nginx/html

EXPOSE 80