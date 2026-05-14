# Preparcial 2 — Sistema de Usuarios y Roles

API en NestJS con autenticación JWT, autorización por roles y persistencia en PostgreSQL para el parcial 2 de web :D



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

Usuarios de prueba:

| Email           | Password   | Roles          |
| --------------- | ---------- | -------------- |
| admin@test.com  | Admin123!  | admin, student |
| doctor@test.com | Doctor123! | doctor         |
| user@test.com   | User123!   | student        |

## Iniciar el servidor
```bash
npm run start:dev
