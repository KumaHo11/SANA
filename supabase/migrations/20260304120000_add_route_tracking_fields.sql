-- Agregar tracking_id a los manifiestos
ALTER TABLE manifests
ADD COLUMN IF NOT EXISTS tracking_id varchar(50);

-- Agregar datos del transporte a las rutas
ALTER TABLE routes
ADD COLUMN IF NOT EXISTS driver_name varchar(255),
ADD COLUMN IF NOT EXISTS truck_plate varchar(50),
ADD COLUMN IF NOT EXISTS scheduled_time time;

-- Agregar comentarios para el historial (Opcional, pero util para saber quien hizo que)
COMMENT ON COLUMN manifests.tracking_id IS 'ID de rastreo utilizado por el conductor/planta para este manifiesto';
COMMENT ON COLUMN routes.driver_name IS 'Nombre del conductor asignado al transporte';
COMMENT ON COLUMN routes.truck_plate IS 'Patente o matricula del vehiculo';
COMMENT ON COLUMN routes.scheduled_time IS 'Hora programada para la recoleccion';
