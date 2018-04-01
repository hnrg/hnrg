## Levantar ambiente de desarrollo

Para levantar el ambiente de desarrollo completamente local, hace falta contar
con un programa extra llamado [ngrok](https://ngrok.com/), o algún programa
similar para completar el funcionamiento del bot de telegram.

En primera instancia es necesario compilar los js, utilizando npm o yarn.

```bash
# con npm
$ npm run build:dev
# o con yarn
$ yarn build:dev
```

Luego es necesario abrir un túnel al localhost para que el webhook del bot de
telegram se pueda comunicar con nuestra app localmente, para esto corremos el
siguiente comando:

```bash
$ ngrok http localhost:8000
```

En este caso se utilizó el puerto utilizado por la app, tener en cuenta
cambiarlo en el comando si se utiliza otro.

Luego es necesario setear la variable `URL_BASE` en la **misma** terminal que se
va a correr el servidor localmente, con la url asignada por ngrok, de la siguiente manera:

```bash
$ export URL_BASE=<url https de ngrok>
```

Tener en cuenta que se debe utilizar la versión **https** provista por ngrok.

Luego solo hace falta correr el docker-compose de la siguiente manera:

```bash
$ docker-compose -f docker-compose-development.yml up --build
```

Con esto se debería contar con todo el ambiente levantado, listo para atender
consultas en el bot de telegram.
