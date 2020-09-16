# KOKOMO 🌴
<hr>

# Developers

Natalia López / Claudi Sánchez

# La aplicación

--
Backend: https://github.com/natalia-nly/kokomo-backend/

## Descripción

Facilitar la reserva en locales con aforo limitado. Así, hay una parte de la aplicación dedicado a los Propietarios (owners) de locales (properties), a su gestión y explotación (a través de disponibilidad horaria (schedules) y de espacio), y otra dedicada a los clientes que hacen reservas en dichos locales.

El razonamieto de desarrollo de la parte FrontEnd se ha basado en los principios siguientes: Mobile First, sobretodo porque los Clientes, quienes reservarán plaza en los chiringuitos lo harán a través de un móvil. No ha sido Mobile only ya que en acciones futuras se podrían crear dashboards de gestión para los propietarios de locales, pensando más en un uso Desktop, aunque se prevé que su uso principal sea en tablet (por ejemplo en la recepción del local para chequear reservas).

Se ha buscado ser lo más completo a nivel de funcionalidad, permitiendo a los propietarios la gestión completa (Creación, Actualización y Eliminación) de los Locales y de las Reservas en las mismas, permitiendo a los clientes poder cancelar la reserva y un sistema de notificaciones permitiend saber si el propietario ha cancelado una reserva. A fin de evitar problemas, asimismo, no se permite a un propietario borrar un local si existen reservas activas en el mismo.

Por último, no se ha obviado la parte del valor social y de evaluación de la aplicacón, y mediante servicios dedicados se pueden guardar locales favoritos, evaluarlos de 0 a 5 y enviar un comentario para el propietario y el resto de usuarios de la aplicación.

MVP → chiringuitos

## User Stories

[Notion Link](https://www.notion.so/1e08243224c842e29a9b44db892fec01?v=609e57e9cefd4931b2a8eead1ed3812b)

## Backlog

[Notion Link](https://www.notion.so/1e08243224c842e29a9b44db892fec01?v=609e57e9cefd4931b2a8eead1ed3812b)

## Componentes

### Auth

- Login: Encargado de renderizar la página de Login
- Logout: Encargado de renderizar la página de Logout
- Signup: Encargado de renderizar la página de registro
- Signup: Encargado de renderizar la página de registro en el caso de un propietario

### Error

- Error 404
- Error 500


### Profile

En la estructura de Profile y Reservas, se basa en la sección de Profile y todos los componentes que la conforman/completan

- Profile: Componente Principal
    - Local: Componente que renderiza cada uno de los Locales que posee un Propietario
    - Messages: Componente que renderiza las notificaciones activas que tiene el usuario

- My-bookings: Componente principal que contiene todas las reservas del usuario (propias o en sus locales)
    -Bookings: Componente dedicado a las reservas propias
        - Booking Details: Componnte que renderiza los deatalles de la reserva y permite que sea compartida por Whatsapp y visualizada por un usuario anónimo
    -OwnerLocal: Componente dedicado a las reservas en los locales del usuario
        -SendMessage: Componente que permite enviar una notificación al cliente de una reserva en un local de un propietario en el caso de que vaya a ser cancelada.


### Properties

Todos los componentes que permiten renderizar los locales y sus gestiones. Estos son los principales:

-  CreateProperty/EditProperty: Permiten crear y actualizar un local
    - StepperKokomo: Permite rellenar los formularios en varias etapas.
- CarouselProperties: Visión en carousel de todos los locales en BBDD.
    - Categories: Renderiza las diferentes Categorías de locales.
    - PropertyDetails: Renderiza una Property y todos sus detalles.
        - AvailableTimes: Renderiza los horarios disponibles para su reserva
        - DetailedMap: Mapa detallado de su ubicación.
        - ActualRating: Nota actual del local
        - AddRating: Permite añadir una nota y un comentario

### Search

Componentes que permiten realizar una búsqueda en la totalidad de locles disponibles en BBDD

- Search: Permite hacer la búsqueda.
    - AvailablePlaces: Permite retornar los locales disponibles para su reserva.
    - GeneralMap: Permite visulaizar en un mapa todos los locales en BBDD.


### OtrosComponentes


- LandingPage: Página de inicio para usuarios no logeados.
- Home: Página de inicio para usuarios logeados.
- NavbarKokomo: barra de navegación para usuaros logeados.


## Links

### Git

https://github.com/natalia-nly/kokomo-frontend/
https://github.com/natalia-nly/kokomo-backend/

### Deploy

https://kokomo-react.herokuapp.com/

### Slides

[Slides Link](--)