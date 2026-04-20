Microservicios con Express.js
Objetivo General:

Comprender los fundamentos de la arquitectura de microservicios mediante la creación de dos servicios web independientes que se comunican entre sí de forma síncrona utilizando peticiones HTTP.

Herramientas Necesarias:

Node.js y npm instalados.

Librerías: express, axios (u otra herramienta como node-fetch).

Cliente para pruebas de API (Postman, Thunder Client, o cURL).

Contexto del Proyecto
Ustedes han sido contratados para desarrollar el backend de una nueva librería en línea. Para asegurar que el sistema sea escalable, la arquitectura se dividirá en microservicios. Su tarea es construir los dos primeros: el Servicio de Catálogo y el Servicio de Órdenes.

Requerimientos Técnicos
Deberán inicializar dos proyectos de Node.js en carpetas separadas. Ambos servicios deben ejecutarse simultáneamente en puertos distintos (ej. 3001 y 3002).

Parte 1: El Servicio de Catálogo (Puerto 3001)
Este servicio es responsable de manejar el inventario de libros.

Crea un arreglo en memoria (simulando una base de datos) que contenga al menos 5 libros. Cada libro debe tener: id, titulo, autor, y precio.

Crea un endpoint GET /api/libros/:id que reciba el ID de un libro como parámetro en la URL.

Éxito: Si el libro existe, debe retornar los datos del libro con un código de estado 200 OK.

Error: Si el libro no existe, debe retornar un JSON con un mensaje de error y un código de estado 404 Not Found.

Parte 2: El Servicio de Órdenes (Puerto 3002)
Este servicio es responsable de procesar las compras de los clientes. No tiene acceso a la base de datos de libros, por lo que debe consultar al Servicio de Catálogo.

Crea un arreglo vacío en memoria llamado ordenes para almacenar el registro de ventas.

Crea un endpoint POST /api/ordenes que reciba en el cuerpo (body) de la petición un JSON con los siguientes datos: { "libroId": X, "cantidad": Y, "cliente": "Nombre" }.

Lógica del Endpoint:

El servicio debe utilizar axios para hacer una petición GET al Servicio de Catálogo preguntando por el libroId recibido.

Si el catálogo responde con error (404): El servicio de órdenes debe rechazar la compra y responder al cliente con un código 404 o 400 indicando que el libro no existe.

Si el catálogo responde con éxito (200): El servicio debe calcular el totalAPagar (precio del libro * cantidad), guardar un nuevo objeto en el arreglo ordenes y responder al cliente con un código 201 Created mostrando el resumen de la orden generada.

Parte 3: Reto Extra (Para puntos adicionales)
Modifica el Servicio de Catálogo para que cada libro tenga una propiedad extra llamada stock (ej. 10 unidades).

Cuando el Servicio de Órdenes intente procesar una compra, no solo debe verificar si el libro existe, sino también verificar si hay stock suficiente para la cantidad solicitada. Si no hay suficiente, debe rechazar la orden.

Entregables
Deberás subir a la plataforma educativa (o repositorio de GitHub) lo siguiente:

Código Fuente: Un archivo .zip con las dos carpetas de los servicios (Asegúrate de NO incluir la carpeta node_modules).

Evidencias de Prueba: Capturas de pantalla usando Postman o tu terminal demostrando:

La creación exitosa de una orden.

El intento de compra de un ID de libro que no existe en el catálogo (demostrando el manejo del error).

Criterios de Evaluación (Rúbrica)
Configuración	Ambos servicios se inicializan correctamente en puertos distintos usando Express.	20%
Servicio de Catálogo	El endpoint GET responde correctamente y maneja el error 404 si el libro no existe.	25%
Comunicación HTTP	El Servicio de Órdenes hace uso correcto de Axios/Fetch para consultar al Catálogo.	30%
Manejo de Respuestas	El Servicio de Órdenes calcula el total y responde adecuadamente dependiendo de lo que dictó el Catálogo.	25%

además, añadir los pasos finales para conectar del repositorio una vez subido y conectarlo a Vercel; usando la menor cantidad de recursos para usar sin problemas el plan gratuito de esa plataforma.
