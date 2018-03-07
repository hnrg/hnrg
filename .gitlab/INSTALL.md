# Instalación

En este documento se van a especificar todo lo requerido para tener la app del Hospital de Niños Ricardo Gutiérrez funcionando.

## Requerimientos
- Mínimos:
    - [NodeJs](https://nodejs.org/en/) v8.10.0
    - [Npm](https://www.npmjs.com/) 5.6.0
    - [Mongo](https://www.mongodb.com) 3.6.3
    - [direnv](https://github.com/direnv/direnv) 2.4.0 o superior
- Recomendaciones:
    - Usar [nvm](https://github.com/creationix/nvm) para el versionado de npm
- Opcionales:
    - [docker](https://www.docker.com/)
    - [docker-compose](https://docs.docker.com/compose/)

## Instalación del ambiente
_si le falta cumplir alguno de los requerimientos, seguir a la siguiente sección_

Instalación de los componentes necesarios usando npm:
```bash
$ npm install
$ npm build:dev
```

Con esto, se procederá a crear la carpeta node-modules, y algunos archivos extra
de configuración.

### Generación de las imágenes docker development y production

_Nota: Se recomienda agregar su usuario al grupo de docker para evitar la necesidad de ejecutar docker con sudo. Esto se puede hacer ejecutando:_

```bash
$ sudo usermod -a -G docker $USER
```


Para esto, podemos seguir 2 diferentes caminos, usando docker y docker-compose, o usando
simplemente docker

#### Docker + Docker-compose (recomendable)

Para esto, se van a utilizar los archvios Dockerfile y docker-compose.yml (para
producción) o Dockerfile-development y docker-compose-development.yml (para
desarrollo) **No eliminar dichos archivos!**

##### Ambiente Desarrollo

```bash
$ docker-compose -f docker-compose-development.yml build
$ docker-compose -f docker-compose-development.yml up
```

Con esto se va a generar la imagen docker, y se va a arrancar a correr tanto el
servidor node, como mongodb.

##### Ambiente Producción

```bash
$ docker-compose build
$ docker-compose up
```

#### Usando npm start

Para esta opción, vamos a necesitar tener todos los servicios (mongo por
ejemplo), corriendo en nuestra maquina al momento de iniciar la aplicación,
ademas de contar con las variables de ambiente seteadas correctamente con la
dirección de host, puerto, y las credenciales necesarias para acceder al
servicio.

## Parametrización del ambiente

Para evitar futuros problemas, se va a evitar en todo momento escribir las
credenciales utilizadas para los diferentes servicios en los archivos de
configuración. En su lugar, se va a utilizar variables de ambiente.

Para facilitar el uso de las mismas, se recomienda utilizar _direnv_ exportando
todas las variables necesarias en el archivo _.envrc_

Eso se hace de la siguiente mantera:

```bash
export TU_CREDENCIAL=CREDENCIAL
```

_Recordar nunca quitar el archivo .envrc del gitignore_

_Para el correcto funcionamiento del archivo .envrc es necesario contar con [**direnv**](https://github.com/direnv/direnv)_

_Notar que se debe agregar la linea eval en el archivo de configuracion de su shell_

_En bash por ejemplo, se agrega la siguiente linea en el .bashrc_

```bash
eval "$(direnv hook bash)"
```

_Para conocer más sobre que línea agregar y como configurarlo en las diferentes_
_shell, se recomienda leer el [repositorio](https://github.com/direnv/direnv) en github_

_Ademas, **cada vez que se modifique** se debe ejecutar:_

```bash
$ direnv allow
```