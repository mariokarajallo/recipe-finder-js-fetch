# Buscador de Recetas

Aplicación web interactiva construida con HTML5, Bootstrap 5 y JavaScript (ES6+) que consume la API de TheMealDB para buscar y explorar recetas de cocina. Permite filtrar por categorías, ver instrucciones e ingredientes detallados, y gestionar una lista de favoritos persistente mediante LocalStorage, ofreciendo una experiencia de usuario fluida y responsiva.

## Demo

Para mirar la demo del proyecto visita: [Recipe Finder](https://mariokarajallo.github.io/recipe-finder-javascript/)

![preview](recipe-finder.gif)

## Características

- **Búsqueda por Categorías**: Filtra recetas según su categoría (ej. Beef, Chicken, Dessert).
- **Detalle de Receta**: Visualiza imagen, instrucciones e ingredientes de cada plato.
- **Gestión de Favoritos**: Guarda tus recetas preferidas para acceder a ellas rápidamente.
- **Persistencia de Datos**: Tus favoritos se guardan en el navegador (LocalStorage).
- **Interfaz Responsiva**: Adaptable a diferentes tamaños de pantalla gracias a Bootstrap.

## Tecnologías utilizadas

- **HTML5**: Estructura semántica.
- **CSS3 (Bootstrap 5)**: Diseño y componentes responsivos.
- **JavaScript (ES6+)**: Lógica de la aplicación y manipulación del DOM.
- **API Fetch**: Consumo de datos externos.
- **TheMealDB API**: Fuente de datos de las recetas.
- **LocalStorage**: Almacenamiento local de favoritos.

## Instalación y requisitos

No requiere instalación de dependencias (Node.js, etc.).

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  Abre el archivo `index.html` en tu navegador web preferido.

## Cómo funciona

1.  Al cargar la página, se obtienen las categorías disponibles desde la API.
2.  Selecciona una categoría del menú desplegable.
3.  Se mostrarán las recetas disponibles en tarjetas.
4.  Haz clic en "Ver receta" para abrir un modal con los detalles.
5.  En el modal, puedes agregar o eliminar la receta de tus favoritos.
6.  Visita la sección "Mis Favoritos" para ver tu colección guardada.

### Validaciones

- Verificación de existencia de elementos del DOM antes de asignar eventos.
- Manejo de respuestas de la API.
- Comprobación de recetas duplicadas en favoritos.
- Alertas visuales (Toasts) al guardar o eliminar favoritos.

## Estructura de archivos

```bash
.
├── css
│   └── bootstrap.min.css
│   └── custom.css
├── js
│   ├── app.js
│   └── bootstrap.bundle.min.js
├── favoritos.html
├── index.html
├── LICENSE
└── README.md
```

- `index.html`: Página de inicio con el buscador y listado de recetas.
- `favoritos.html`: Página para visualizar las recetas marcadas como favoritas.
- `js/app.js`: Contiene toda la lógica de negocio, llamadas a la API y gestión del DOM.
- `css/bootstrap.min.css`: Archivo de estilos minificado de Bootstrap.
- `css/custom.css`: Archivo de estilos personalizados.

## Contribuciones

¡Las contribuciones son bienvenidas!

### Pasos a seguir

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu funcionalidad (`git checkout -b feature/NuevaFuncionalidad`).
3.  Realiza tus cambios y haz commit (`git commit -m 'Agrega NuevaFuncionalidad'`).
4.  Haz push a la rama (`git push origin feature/NuevaFuncionalidad`).
5.  Abre un Pull Request.

### Sugerencias

- Mejorar el diseño de las tarjetas.
- Agregar un buscador por nombre de receta.
- Implementar paginación si hay muchos resultados.

## Créditos

- **Juan Pablo De la Torre Valdez** - Instructor y autor del contenido del curso - [Codigo Con Juan](https://codigoconjuan.com/).
- **Mario Karajallo** - Implementación del proyecto y mantenimiento - [Mario Karajallo](https://karajallo.com).

## Licencia

Este proyecto está bajo la licencia MIT. Véase `LICENSE.md` para más detalles.

---

⌨️ con ❤️ por [Mario Karajallo](https://karajallo.com)
