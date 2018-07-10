# Entrega Final

## Alumnos

-   Ulises Jeremias Cornejo Fandos, 13566/7, ulisescf.24@gmail.com

-   Lucas Di Cunzolo, 13572/5, lucasdicunzolo@gmail.com   

## Evaluación

El código a evaluar se encuentra en la rama _master_ del repositorio.

En el informe final de la entrega se profundiza respecto de las tecnologías
utilizadas, aspectos de seguridad y routing, y aspectos relacionados a
la infraestructura del mismo.

## Instalación y ambiente de desarrollo

Para ver información respecto de como levantar el ambiente de desarrollo,
se puede consultar la wiki del repositorio o la
[documentación del proyecto](http://hnrg.readthedocs.io/). En este último
link se pueden observar distintos aspectos de la aplicación en general tales
como sistema de roles y permisos, API de turnos, entre otros.

Para instalar rapidamente el ambiente de desarrollo, puede ejecutarse
en linea de comando las siguiente instrucciones. Nuevamente, la explicación
de cada una de ellas se encuentra detallada en la documentación.

```sh
$ yarn
$ yarn build:dev
$ ngrok http localhost:8000
$ export URL_BASE=<url https de ngrok>
$ docker-compose -f docker/docker-compose-development.yml up --build
```

Con esto se debería contar con todo el ambiente levantado, listo para atender
consultas en el bot de telegram.
