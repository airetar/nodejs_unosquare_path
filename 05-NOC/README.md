# Proyecto NOC

El objetivo es crear un NOC usando arquitectura limpia con Typescript

# dev

1. Clonar archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
```docker compose up -d```
5. Ejecutar el comando
```npx primsa migrate dev```
7. Ejecutar ```npm run dev```

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```


