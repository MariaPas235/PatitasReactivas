# Patitas Reactivas

Aplicación web para la gestión de mascotas en clínica veterinaria, construida con React + TypeScript (frontend) y Express + JSON Server + JWT (backend).

## Autor

- **Nombre:** Maria Pastrana Moreno
- **Repositorio:** https://github.com/MariaPas235/PatitasReactivas.git 

## Tecnologías

- Frontend: React 19, TypeScript, Vite, React Router
- Backend: Express, JSON Server, JWT, bcrypt
- Comunicación: Fetch API

## Estructura del proyecto

```text
PatitasReactivas/
  src/                # Frontend
  backend/            # API + base de datos (db.json)
  docker-compose.yml  # Levantar backend en contenedor
```

## Pasos de instalación

### 1) Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd PatitasReactivas
```

### 2) Instalar dependencias del frontend

```bash
npm install
```

### 3) Ejecutar backend

Opción recomendada con Docker:

```bash
docker compose up --build
```

El backend queda disponible en: `http://localhost:3000`

### 5) Ejecutar frontend

```bash
npm run dev
```

Frontend en: `http://localhost:5173`

## Variables de entorno

Este proyecto usa variables de entorno en el backend:

| Variable       | Descripci�n          | Valor por defecto     |
| -------------- | --------------------- | --------------------- |
| `PORT`       | Puerto de la API      | `3000`              |
| `JWT_SECRET` | Clave para firmar JWT | `tu-secreto-seguro` |

## Usuario de prueba

Si se usa la base `backend/db.json` incluida en el proyecto, puedes probar con:

- **Email:** `prueba3@gmail.com`
- **Password:** 1234

Si no, puedes crear uno nuevo desde `/register`.

## Checklist final de requisitos mínimos cumplidos

- [X] Página pública de inicio/presentación (`/`)
- [X] Página pública de login para obtener JWT (`/login`)
- [X] Almacenamiento del JWT de forma adecuada (`localStorage`, clave `auth`)
- [X] Rutas protegidas (dashboard, alta y perfil)
- [X] Bloqueo de acceso a páginas privadas sin autenticación
- [X] Redirección al login cuando corresponde
- [X] Página 404 para rutas inexistentes (`*`)
- [X] Listado de elementos de la entidad (GET mascotas por usuario)
- [X] Consulta de detalle de un elemento (GET `/animals/:id`)
- [X] Alta de nuevo elemento (POST `/animals`)
- [X] Edición de elemento existente (PUT `/animals/:id`)
- [X] Eliminación de elementos (DELETE `/animals/:id`)
- [X] Gestión visible de errores de API (toasts y mensajes)
- [X] Estados de carga (loading en dashboard, detalles y acciones)
- [X] Estados vacíos (mensaje cuando no hay mascotas)
