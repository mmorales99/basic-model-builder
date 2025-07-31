#!/bin/bash
# Construye la imagen
podman build -t mi-servidor-web .

# Ejecuta el contenedor
podman run --name servidor-web -d -p 8080:80 mi-servidor-web
