# ModuloUsuariosRespirAR-Front

ModuloUsuariosRespirAR-Front es un proyecto front-end realizado con React JS para la administración de usuarios y roles.

## Características

- CRUD de usuarios
- CRUD de roles
- Asignación de roles
- Envío de emails para activación de cuentas
- Reseteo de contraseñas

## Requisitos

- Node.js: [Descargar e instalar Node.js](https://nodejs.org/en)
- npm: npm se instala automáticamente junto con Node.js

## Estructura del proyecto
- src/: Contiene el código fuente de la aplicación.
- src/components/: Componentes reutilizables de React.
- src/pages/: Páginas principales de la aplicación.
- src/services/: Módulos de servicios para comunicarse con los servicios de Mailer y KeyRock.
- public/: Archivos públicos del proyecto.

## Instalación

1. Clona el repositorio: `git clone https://github.com/ModuloUsuariosRespirAR/ModuloUsuariosRespirAR-Front.git`
2. Instala las dependencias: `npm install`

## Configuración y uso

1. Antes de ejecutar el proyecto, asegurarse de ejecutar los proyectos ModuloUsuariosRespirAR-Back y ModuloUsuariosRespirAR-Mailer-Back presentes en la orgenización ModuloUsuariosRespirAR.
2. Inicia la aplicación: `npm start`
3. En la aplicación podrás realizar las siguientes acciones:
    - Agregar un nuevo usuario.
    - Ver la lista de usuarios existentes.
    - Editar la información de un usuario.
    - Asignar roles a usuarios.
    - Eliminar un usuario.
    - Agregar un nuevo rol.
    - Ver la lista de roles existentes.
    - Editar la información de un rol.
    - Eliminar un rol.

## Recursos adicionales
- Documentación de [React](https://legacy.reactjs.org/docs/getting-started.html)
- Documentación de [npm](https://docs.npmjs.com/)
