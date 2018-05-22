.. index:: API de turnos

*****************************
API para la gestión de turnos
*****************************

La app provee una interfaz para interactuar con el módulo de gestión
de turnos del hospital.

La API se encuentra en la URL :code:`grupo47.proyecto2017.linti.unlp.edu.ar/api/turnos`.

.. index:: métodos API de turnos

Métodos de la API
=================

A continuación se muestran los métodos disponibles en la API así como
las consultas a ejecutar para probar el correcto funcionamiento de los
mismos utilizando el comando :code:`curl`.

-   Obtener turnos para la fecha actual

Permite obtener los turnos disponibles para la fecha actual.

    GET /

Respuesta correcta con turnos disponibles,

    $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos


.. code-block::
    HTTP/1.1 200 OK
    {
        "appointments": [
            "10:00:00",
            "13:30:00",
            "14:00:00",
            "15:30:00"
        ]
    }
