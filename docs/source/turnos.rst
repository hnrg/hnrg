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
mismos utilizando el comando :code:`curl` o :code:`wget`.

-   Obtener turnos para la fecha actual

Permite obtener los turnos disponibles para la fecha actual.

    GET /

Respuesta correcta con turnos disponibles,

.. code-block:: bash

    $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos


.. code-block:: js

    HTTP/1.1 200 OK
    {
        "appointments": [
            "10:00:00",
            "13:30:00",
            "14:00:00",
            "15:30:00"
        ]
    }

-   Obtener turnos para la fecha dada

Permite obtener los turnos disponibles para la fecha dada.

    GET /:date

Respuesta correcta con turnos disponibles,

.. code-block:: bash

    $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/YYYY-MM-DD


.. code-block:: js

    HTTP/1.1 200 OK
    {
        "appointments": [
            "10:00:00",
            "13:30:00",
            "14:00:00",
            "15:30:00"
        ]
    }

Respuesta erronea por fecha vencida,

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/2017-MM-DD

.. code-block:: js

    HTTP/1.1 204 NO CONTENT

Respuesta erronea por error genérico,

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/una-frase

.. code-block:: js

    HTTP/1.1 500 Internal Server Error

-   Reservar un turno

Permite reservar un turno para una fecha y hora dada, para un nro de documento dado.

    GET /turnos/:documentNumber/fecha/:date/hora/:time

Donde:
  - documentNumber: número de documento del paciente a atender.
  - date: fecha del turno (se puede comprobar existencia en la ruta de :code:`turnos disponibles`)
  - time: hora del turno (se puede comprobar existencia en la ruta de :code:`turnos disponibles`)

Respuesta correcta con turno reservado,

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/40000000/fecah/YYYY-MM-DD/hora/HH:mm

.. code-block:: js

    HTTP/1.1 201 Created
    {
        "appointment": {
            "documentNumber": 40000000,
            "date": "DD MM YYYY HH:mm:ss TZ"
        }
    }

Respuesta erronea por falta de parámetros, o fecha/hora inválida

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/no-doc/fecah/una-frase/hora/

.. code-block:: js

    HTTP/1.1 400 BAD REQUEST

Respuesta erronea por turno ya tomado

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/40000000/fecah/YYYY-MM-DD/hora/HH:mm

.. code-block:: js

    HTTP/1.1 422 UNPROCESSABLE ENTITY


Respuesta erronea por error genérico,

.. code-block:: bash

  $ curl grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/una-frase

.. code-block:: js

    HTTP/1.1 500 Internal Server Error


-   Eliminar un turno dado un id

Permite eliminar un turno dado su id

    DELETE /turnos/:id

Respuesta correcta con un turno eliminado,

.. code-block:: bash

  $ curl -XDELETE grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/id

.. code-block:: js

    HTTP/1.1 200 OK

Respuesta erronea por error genérico,

.. code-block:: bash

  $ curl -XDELETE grupo74.proyecto2017.linti.unlp.edu.ar/api/turnos/id

.. code-block:: js

    HTTP/1.1 500 Internal Server Error
