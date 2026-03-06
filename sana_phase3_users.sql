-- SANA Phase 3 Schema Update Script: User Approvals
-- Este script actualiza la tabla profiles para incluir un bloqueo de aprobación por defecto.

-- 1. Agregar el campo is_approved a los perfiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

-- 2. Aprobar a TODOS los usuarios existentes para evitar bloquear a quienes ya usan el sistema
-- (Los nuevos registros a partir de ahora sí entrarán como is_approved = false)
UPDATE public.profiles
SET is_approved = true;
