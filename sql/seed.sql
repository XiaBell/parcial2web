-- Script de prueba: roles y usuarios de ejemplo
-- IMPORTANTE: ejecutar DESPUÉS de aplicar las migraciones (npm run migration:run)

-- Roles base
INSERT INTO roles (role_name, description) VALUES
  ('admin',   'Administrador del sistema'),
  ('doctor',  'Médico con acceso a historias clínicas'),
  ('student', 'Usuario estándar')
ON CONFLICT (role_name) DO NOTHING;

-- Usuarios de ejemplo
-- Los passwords están hasheados con bcrypt cost=10
--   admin@test.com  -> Admin123!
--   doctor@test.com -> Doctor123!
--   user@test.com   -> User123!
INSERT INTO users (email, password, name, phone, is_active) VALUES
  ('admin@test.com',
   '$2b$10$3gdbSNewGW9rtjUsV6/ysuPnmUHrgHec.vc8NgnpsLlkjCO0M/Duy',
   'Admin de prueba',
   '3001112222',
   true),
  ('doctor@test.com',
   '$2b$10$Xi5.R9Inu2uxCtNs4OXN3eymUgQl7yiUIgtE/V1y9/nVXwhgpKc/m',
   'Doctor de prueba',
   '3002223333',
   true),
  ('user@test.com',
   '$2b$10$9JNK7dELMm2Cfd1WSIj8veMWqxAczkqqKsIyLpnDfZ/NF1FSNsBIK',
   'Usuario de prueba',
   NULL,
   true)
ON CONFLICT (email) DO NOTHING;

-- Asignación de roles
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE (u.email = 'admin@test.com'  AND r.role_name IN ('admin', 'student'))
   OR (u.email = 'doctor@test.com' AND r.role_name = 'doctor')
   OR (u.email = 'user@test.com'   AND r.role_name = 'student')
ON CONFLICT DO NOTHING;
