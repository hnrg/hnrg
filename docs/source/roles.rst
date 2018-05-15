.. index:: roles y permisos

****************
Roles y Permisos
****************

En la aplicación se definen 3 roles básicos con permisos para acceder a
diferentes secciones del sistema.

.. index:: roles básicos

Roles básicos
=============

A continuación se describiran los roles y sus permisos asociados:

- Administrador:
    - usuario_index
    - usuario_show
    - usuario_new
    - usuario_update
    - usuario_destroy
    - paciente_index
    - paciente_destroy
    - rol_index
    - rol_show
    - rol_new
    - rol_update
    - rol_destroy
    - control_salud_destroy
- Recepcionista:
    - paciente_index
    - paciente_show
    - paciente_new
    - paciente_update
- Pediatra:
    - paciente_index
    - paciente_show
    - paciente_new
    - paciente_update
    - control_salud_index
    - control_salud_show
    - control_salud_new
    - control_salud_update

A modo de proveer una manera de recorrer  más facilmente el sistema para busqueda
de errores, o simplemente para conocer el sitio, se provee un rol más, denominado su
el cual cuenta con **todos** los permisos disponibles en el sistema.
Si bien con contar con el rol Administrador y cualquiera de los roles restantes
ya se cuenta con todos los permisos, se creo a modo de abstraerse de dicha asignación,
ya que esta puede cambiar con el tiempo.

 - Su:
    - usuario_index
    - usuario_show
    - usuario_new
    - usuario_update
    - usuario_destroy
    - paciente_index
    - paciente_show
    - paciente_new
    - paciente_update
    - paciente_destroy
    - rol_index
    - rol_show
    - rol_new
    - rol_update
    - rol_destroy
    - control_salud_index
    - control_salud_show
    - control_salud_new
    - control_salud_update
    - control_salud_destroy
    - debug_index
    - log_index


Usuarios
========

Conociendo los roles, se cuenta con 5 usuarios básicos.

- Administrador:
    - rol: Administrador
    - usuario: admin
    - contraseña: admin
- Recepcionista:
    - rol: Recepcionista
    - usuario: recepcionista
    - contraseña: recepcionista
- Pediatra:
    - rol: Pediatra
    - usuario: pediatra
    - contraseña: pediatra
- Super Administrador:
    - rol: Administrador y Su
    - usuario: su
    - contraseña: su

Se decidió asignar el rol admninistrador al *Super Administrador* debido a que
ciertas secciones requiren no de un permiso especifico, sino del rol **Administrador**.

.. index:: errores de permisos

Errores
=======

El sistema esta preparado para mostrar pantallas de error con los
siguientes códigos:

- 403: Esto significa que su usuario no cuenta con el permiso necesario
  para acceder a la página solicitada. Normalmente bastaría con asignar
  un rol que cuente con el permiso necesario.

- 404: Esto significa, como todos sabemos, que el recuerso buscado no
  se encuentra disponible.

- 500: Este error es el mostrado cuando el sistema se encuentra en *Mantenimiento*
  y va a ser el inicial durante estas semanas a modo de ilustración (ya que nos
  encontramos en mantenimiento del sitio cerrando ciertos módulos, ¿no?).
  Para poder acceder al sitio libremente, se debe ingresar como **Administrador**
  o como **Super Administrador** y desactivar el modo mantenimiento.

*Todos los errores cuentan con un pequeño texto descriptivo para orientar al
usuario del sistema la causa del error.*
