# Patitas Reactivas

Aplicación web para la gestión de mascotas en clínica veterinaria, construida con React + TypeScript (frontend) y Express + JSON Server + JWT (backend).

## Autor

- **Nombre:** Maria Pastrana Moreno 
- **Repositorio:** `patitasReactivas2`

## Tecnolog�as

- Frontend: React 19, TypeScript, Vite, React Router
- Backend: Express, JSON Server, JWT, bcrypt
- Comunicaci�n: Fetch API

## Estructura del proyecto

```text
PatitasReactivas/
  src/                # Frontend
  backend/            # API + base de datos mock (db.json)
  docker-compose.yml  # Levantar backend en contenedor
```

## Pasos de instalaci�n

### 1) Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd patitasReactivas2/PatitasReactivas
```

### 2) Instalar dependencias del frontend

```bash
npm install
```

### 3) Instalar dependencias del backend

```bash
cd backend
npm install
cd ..
```

### 4) Ejecutar backend

Opci�n A (recomendada con Docker):

```bash
docker compose up -d
```

Opci�n B (local sin Docker):

```bash
cd backend
node server.js
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

Ejemplo (`backend/.env`):

```env
PORT=3000
JWT_SECRET=mi-codigo-secreto
```

Nota: actualmente el frontend consume la API en `http://localhost:3000` (configurado en servicios).

## Usuario de prueba

Si se usa la base `backend/db.json` incluida en el proyecto, puedes probar con:

- **Email:** `hola2@gmail.com`
- **Password:** `2345`

Si ese usuario fue modificado, puedes crear uno nuevo desde `/register`.

## Checklist final de requisitos m�nimos cumplidos

- [X] P�gina p�blica de inicio/presentaci�n (`/`)
- [X] P�gina p�blica de login para obtener JWT (`/login`)
- [X] Almacenamiento del JWT de forma adecuada (`localStorage`, clave `auth`)
- [X] Rutas protegidas (dashboard, alta y perfil)
- [X] Bloqueo de acceso a p�ginas privadas sin autenticaci�n
- [X] Redirecci�n al login cuando corresponde
- [X] P�gina 404 para rutas inexistentes (`*`)
- [X] Listado de elementos de la entidad (GET mascotas por usuario)
- [X] Consulta de detalle de un elemento (GET `/animals/:id`)
- [X] Alta de nuevo elemento (POST `/animals`)
- [X] Edici�n de elemento existente (PUT `/animals/:id`)
- [X] Eliminaci�n de elementos (DELETE `/animals/:id`)
- [X] Gesti�n visible de errores de API (toasts y mensajes)
- [X] Estados de carga (loading en dashboard, detalles y acciones)
- [X] Estados vac�os (mensaje cuando no hay mascotas)

## Scripts �tiles

Frontend (`/`):

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Backend (`/backend`):

```bash
node server.js
```
