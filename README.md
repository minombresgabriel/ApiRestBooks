# 📚 Books API

API RESTful para la gestión de libros con autenticación mediante JWT, roles de usuario (admin/usuario), y documentación Swagger.

---

## 🚀 Características

- CRUD de libros con validaciones.
- Autenticación y autorización con JWT.
- Middleware para proteger rutas y validar roles (admin/usuario).
- Sistema de usuarios: registro, login, cambio de contraseña, y roles.
- Documentación interactiva con Swagger.
- Arquitectura limpia (routes, controllers, models, middlewares).
- Base de datos MongoDB.
- Variables de entorno con `.env`.

---

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Swagger UI** para documentación
- **dotenv**, **morgan**, **cors**

---

## 📁 Estructura del proyecto
books-api/
├── config/
│ └── db.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── docs/
│ └── swagger.yaml
├── tests/
│ └── userRoutes.test.js
├── .env
├── app.js
├── server.js
├── README.md
└── package.json


---

## 🔐 Rutas principales

### 📘 Libros (`/api/books`)
- `GET /api/books`: Obtener todos los libros
- `GET /api/books/:id`: Obtener un libro por ID
- `POST /api/books`: Crear nuevo libro *(requiere login)*
- `PUT /api/books/:id`: Actualizar libro *(requiere admin)*
- `DELETE /api/books/:id`: Eliminar libro *(requiere admin)*

### 👤 Auth (`/api/auth`)
- `POST /api/auth/register`: Registrar nuevo usuario
- `POST /api/auth/login`: Iniciar sesión
- `POST /api/auth/logout`: Cerrar sesión
- `PUT /api/auth/:id/password`: Cambiar contraseña

### 🛡️ Admin (`/api/admin`)
- `GET /api/admin/admin-data`: Ruta protegida solo para admins

### 👥 Usuarios (`/api/users`)
- `GET /api/users`: Listar usuarios *(admin)*
- `PUT /api/users/:id`: Actualizar usuario
- `PATCH /api/users/:id/role`: Cambiar rol *(admin)*
- `DELETE /api/users/:id`: Eliminar usuario *(admin)*

---
📄 Documentación Swagger
Una vez el servidor esté corriendo, abre en tu navegador:

http://localhost:5000/api-docs

▶️ Instalación y uso
Clona el repositorio:
git clone https://github.com/minombresgabriel/ApiRestBooks.git
cd ApiRestBooks

-Instala las dependencias:
npm install

-Crea un archivo .env en la raíz y añade:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/books_db
JWT_SECRET=tu_clave_secreta_super_segura

Ejecuta el servidor:
npm run dev

📌 Notas
Este proyecto está pensado para usarse como base para APIs con autenticación.
Puedes integrarlo fácilmente con un frontend en React o cualquier otro framework.

✨ Autor
Gabriel
💼 Técnico Informático | 💻 Desarrollador Backend
🔗 GitHub: @minombresgabriel
