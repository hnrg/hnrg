# Instalación

En este documento se van a especificar todo lo requerido para tener la app del Hospital de Niños Ricardo Gutiérrez funcionando.

## Requerimientos
- Mínimos:
    - [NodeJs](https://nodejs.org/en/) v9.5.0
    - [Npm](https://www.npmjs.com/) 5.6.0
    - [Mongo](https://www.mongodb.com) 3.6.3
    - [direnv](https://github.com/direnv/direnv) 2.4.0 o superior
- Recomendaciones:
    - Usar [nvm](https://github.com/creationix/nvm) para el versionado de npm
- Opcionales:
    - [docker](https://www.docker.com/)
    - [docker-compose](https://docs.docker.com/compose/)
    - [mongodb compass](https://www.mongodb.com/products/compass)

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

## Visualización de los datos

Para poder visualizar los datos de una manera más cómoda, se recomienda la
utilización de Mongodb Compass, una app de los creadores de mongo, que permite
visualización de datos, estadísticas, entre otras funcionalidades interesantes.

Dependiendo como se haya levantado el ambiente, las configuraciones que se van a
tener que ingresar en Mongodb Compass.

Si el ambiente se levantó completamente local (es decir, instalando los
programas directamente en el SO), no va a ser necesario cambios, a menos que se
hayan cambiados las configuraciones por defecto de Mongodb.
Por defecto, son las siguientes:

- Hostname: localhost
- Port: 27017
- Authentication: None
- SSL: off
- SSH Tunel: off

De utilizar el ambiente dockerizado, va a ser necesario especificar el hostname
y puerto especificado al momento de levantar el ambiente.
En los archivos docker-compose se utiliza la siguiente configuración:

- Hostname: 172.17.0.1
- Port: 27017
- Authentication: none
- SSL: off
- SSH Tunel: off

## Manejo del repositorio en desarrollo

Para el manejo del repositorio en etapas de desarrollo, se recomienda la
utilización de `git-flow`, para una mayor organización en el desarrollo.

Además se recomienda también utilizar los `git-flow-hooks`, para una mayor
comodidad. Además de agregar la versión actual del código al archivo "VERSION",
de no utilizar git-flow-hooks, mantener en **todo momento** actualizado dicho
archivo para poder mostrar dicha versión en la app funcionando en producción.

## Extra

Para que las consultas a las apis sean más amigables, se propone utilizar el
gist
[api\_request](https://gist.github.com/lucasdc6/741972836ddff247551e5e8b52277541),
el cual es un wrapper de curl, agregando un beautifier para las respuestas en
JSON.
