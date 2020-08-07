# SIGA Plus

Aplicación movil para ver tu cursada, notas y recibir notificaciónes desde tu celular.

<p align="middle">
<img  width="32%" src="https://github.com/nicomigueles/siga-plus/blob/master/assets/home_screen.jpg">
<img  width="32%" src="https://github.com/nicomigueles/siga-plus/blob/master/assets/cursada_screen.jpg">
</p>

## Server

Backend API Documentation still in progress.

## App

Aplicación movil desarrollada con React native.

## Tracking

La aplicación utiliza una instancia de [SIGA Tracker](https://github.com/NicoMigueles/siga-tracker) en Heroku que detecta cambios en el siga y dispara webhooks cuando ocurren. Estos estan relacionados a un usuario mediante el siguiente endpoint:

`<backend_url>/api/v1/tracker/event/<user_id>` donde `user_id` es el identificador único del usuario.

La app emite una notificación mediante expo y guarda la información del evento para que dicho usuario pueda consumirla desde la aplicación.
