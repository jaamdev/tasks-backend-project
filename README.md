# Tasks Project | Backend

El backend del proyecto de gestión de tareas y usuarios.

Para la parte frontend clic [aquí](https://github.com/jaamdev/tasks-frontend-project).

[![Despliegue](https://img.shields.io/static/v1?label=&message=ver%20sitio&color=00A50C&style=for-the-badge)](https://tasks-frontend-project.vercel.app)
[![Repo en Github](https://img.shields.io/static/v1?label=&message=repo%20github&color=000000&style=for-the-badge&logo=github&logoColor=white)](https://github.com/jaamdev/tasks-backend-project)

## Tecnologías usadas

![NodeJS](https://img.shields.io/static/v1?label=&message=nodejs&color=09f&style=for-the-badge)
![Express](https://img.shields.io/static/v1?label=&message=express&color=09f&style=for-the-badge)
![Cors](https://img.shields.io/static/v1?label=&message=cors&color=09f&style=for-the-badge)
![Dotenv](https://img.shields.io/static/v1?label=&message=dotenv&color=09f&style=for-the-badge)
![MongoDB](https://img.shields.io/static/v1?label=&message=mongodb&color=09f&style=for-the-badge)
![Mongoose](https://img.shields.io/static/v1?label=&message=mongoose&color=09f&style=for-the-badge)
![Zod](https://img.shields.io/static/v1?label=&message=zod&color=09f&style=for-the-badge)
![Jose](https://img.shields.io/static/v1?label=&message=jose&color=09f&style=for-the-badge)
![BCrypt](https://img.shields.io/static/v1?label=&message=bcrypt&color=09f&style=for-the-badge)

## Descripción

### Gestor de tareas _(ToDo)_, con registro de usuarios, _backend_, base de datos en _mongo_, Tokens con JWT y cifrado de contraseñas

## Cómo usarlo

Para entrar solo hay que registrarse con una cuenta de correo electrónico que puede ser uno inventado como _hola@hola.com_, un nombre cualquiera y una contraseña.

Luego iniciar sesión con el correo electrónico registrado y contraseña. Y ya se puede acceder a crear tareas, editarlas y borrarlas.

También el usuario puede editar su cuenta para cambiar su correo electrónico y contraseña o puede también eliminar su cuenta.

Si se elimina la cuenta las tareas asociadas a esa cuenta serán eliminadas de la base de datos de forma automática.

## Por qué lo hice

El típico _**ToDo**_ que todos hacen pero quise darle más complejidad y hacerlo diferente añadiendo tanto base de datos como una API propia, ya que no tenía ni idea de cómo hacer un proyecto con esas tecnologías.

## Lo que aprendí

Ayudó mucho a mejorar mi comprensión sobre el funcionamiento del framework [Express](https://expressjs.com), [MongoDB](https://mongodb.com) y [Mongoose](https://mongoosejs.com), [NodeJS](https://nodejs.org), validación de datos con [Zod](https://zod.dev), el cifrado de contraseñas con [BCrypt](https://github.com/kelektiv/node.bcrypt.js) y el uso de tokens con Jason Web Token con la librería [Jose](https://github.com/panva/jose).

## Documentación

### Vídeos

| Nombre | Vídeo |
| -: | :- |
| Desarrollo Útil | [Curso NodeJS](https://youtube.com/playlist?list=PL3aEngjGbYhnrRfZKMxzn79qdgPxL7OWM&si=_LAMW0hbw-zPEgXM) |
|  | [Curso ReactJS](https://youtube.com/playlist?list=PL3aEngjGbYhkg3AR-cytsvQIIGp1JgrY_&si=KBJI1oRKG6BpvCeE) |
| Midudev | [Curso NodeJS](https://youtube.com/playlist?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&si=_XkHQqml-Rq6fhAf) |
|  | [Curso ReactJS](https://youtube.com/playlist?list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29&si=-6eJ_DfGQZSYLa53) |
| Fazt Code | [CRUD NodeJS](https://youtu.be/NmkY4JgS21A?si=lTsI4rDnl_2II-Wd) |

### Info

| Nombre | Info |
| -: | :- |
| NodeJS | [https://nodejs.org](https://nodejs.org) |
| ExpressJS | [https://expressjs.com](https://expressjs.com) |
| Cors | [https://github.com/expressjs/cors](https://github.com/expressjs/cors) |
| Dotenv | [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) |
| MongoDB | [https://mongodb.com](https://mongodb.com) |
| Mongoose | [https://mongoosejs.com](https://mongoosejs.com) |
| Jose | [https://github.com/panva/jose](https://github.com/panva/jose) |
| BCrypt | [https://github.com/kelektiv/node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) |
| Zod | [https://zod.dev](https://zod.dev) |

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/jaamdev/tasks-backend-project.git
```

2. Instalar las dependencias

```bash
npm install
```

3. Iniciar servidor de desarrollo

- Importante configurar las variables de entorno

```bash
npm run dev
```
