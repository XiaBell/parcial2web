# Preparcial 2 — Sistema de Usuarios y Roles

API en NestJS con autenticación JWT, autorización por roles y persistencia en PostgreSQL.

## Requisitos
- Node.js 18+
- PostgreSQL

## Instalación
```bash
npm install
cp .env.example .env   # ajustar valores si es necesario
```

## Crear la base de datos
```bash
psql -U postgres -c "CREATE DATABASE parcial2web;"
```

## Ejecutar migraciones
```bash
npm run migration:run
```

## (Opcional) Cargar datos de prueba
```bash
psql -U postgres -d parcial2web -f sql/seed.sql
```

Usuarios de prueba:

| Email           | Password   | Roles          |
| --------------- | ---------- | -------------- |
| admin@test.com  | Admin123!  | admin, student |
| doctor@test.com | Doctor123! | doctor         |
| user@test.com   | User123!   | student        |

## Iniciar el servidor
```bash
npm run start:dev
```

Servidor en `http://localhost:3000`.

## Endpoints

| Método | URI                | Acceso      |
| ------ | ------------------ | ----------- |
| POST   | /auth/register     | público     |
| POST   | /auth/login        | público     |
| POST   | /roles             | admin       |
| GET    | /roles             | admin       |
| PATCH  | /users/:id/roles   | admin       |
| GET    | /users/me          | autenticado |
| GET    | /users             | admin       |

El token va en `Authorization: Bearer <token>`.

## Variables de entorno

`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`.
