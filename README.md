# SIGA Plus

Aplicación movil para ver tu cursada, notas y recibir notificaciónes desde tu celular.

<img  width="180" src="https://github.com/nicomigueles/siga-plus/blob/master/assets/home_screen.jpg">
<img  width="180" src="https://github.com/nicomigueles/siga-plus/blob/master/assets/cursada_screen.jpg">

## Server

Backend API Documentation still in progress.

## App

Aplicación movil desarrollada con React native.

## Tracking

La aplicación utiliza una instancia de [SIGA Tracker](https://github.com/NicoMigueles/siga-tracker) en Heroku que detecta cambios en el siga y dispara webhooks cuando ocurren. Estos estan relacionados a un usuario mediante los siguientes endpoints:

- Nueva nota: `<backend_url>/api/v1/detected-new/grade/<id>` donde `id` es el identificador único del usuario.
- Nuevo curso: `<backend_url>/api/v1/detected-new/course/<id>` donde `id` es el identificador único del usuario.

La app emite una notificación y guarda la información para que dicho usuario pueda consumirla desde la aplicación.
