import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPlato, obtenerCategorias, obtenerEspecialidades, subirImagen } from '../../services/platoService';
import type { Categoria, Especialidad, CrearPlatoRequest } from '../../types/plato.type';

const CrearPlatoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  // Estados para manejar imagen (URL o Archivo)
  const [tipoImagen, setTipoImagen] = useState<'url' | 'archivo'>('url');
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [vistaPreviaImagen, setVistaPreviaImagen] = useState<string>('');

  const [formData, setFormData] = useState<CrearPlatoRequest>({
    nombre: '',
    descripcion: '',
    precio: 0,
    idCategoria: 0,
    idEspecialidad: 0,
    imagenUrl: '',
    disponible: true,
    esDestacado: false,
    tiempoPreparacion: 0,
    rangoPrecio: 'MEDIO'
  });

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const [categoriasData, especialidadesData] = await Promise.all([
        obtenerCategorias(),
        obtenerEspecialidades()
      ]);
      setCategorias(categoriasData);
      setEspecialidades(especialidadesData);
    } catch {
      setError('Error al cargar categorías y especialidades');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'precio' || name === 'tiempoPreparacion' || name === 'idCategoria' || name === 'idEspecialidad') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        return;
      }

      setArchivoImagen(file);
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setVistaPreviaImagen(readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const procesarSubidaImagen = async (file: File): Promise<string> => {
    try {
      console.log('📤 Subiendo archivo:', {
        nombre: file.name,
        tamaño: file.size,
        tipo: file.type
      });

      const fileUrl = await subirImagen(file);
      console.log('✅ URL obtenida del servidor:', fileUrl);
      
      // Verificar que la URL es accesible
      try {
        const response = await fetch(fileUrl);
        console.log('🔍 Verificación de URL:', {
          url: fileUrl,
          status: response.status,
          ok: response.ok
        });
      } catch (fetchError) {
        console.error('❌ La URL no es accesible:', fileUrl, fetchError);
      }
      
      return fileUrl;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al subir imagen';
      
      console.error('❌ Error completo al subir imagen:', error);
      throw new Error('Error al subir la imagen: ' + errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.nombre.trim()) {
        throw new Error('El nombre es obligatorio');
      }
      if (formData.precio <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      if (!formData.idCategoria) {
        throw new Error('Debe seleccionar una categoría');
      }
      if (!formData.idEspecialidad) {
        throw new Error('Debe seleccionar una especialidad');
      }

      let imagenUrlFinal = formData.imagenUrl;

      // Si se seleccionó un archivo, subirlo
      if (tipoImagen === 'archivo' && archivoImagen) {
        imagenUrlFinal = await procesarSubidaImagen(archivoImagen);
      }

      // Si no hay imagen ni URL
      if (!imagenUrlFinal && !archivoImagen) {
        throw new Error('Debes proporcionar una imagen (URL o archivo)');
      }

      const datosEnvio: CrearPlatoRequest = {
        ...formData,
        imagenUrl: imagenUrlFinal
      };

      await crearPlato(datosEnvio);
      alert('Plato creado exitosamente');
      navigate('/admin/platos');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error al crear el plato';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/platos')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
          >
            ← Volver a Gestión de Platos
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Plato</h1>
          <p className="text-gray-600 mt-2">Agrega un nuevo plato al menú del restaurante</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Plato *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                placeholder="Ej: Lomo Saltado"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                placeholder="Describe el plato..."
              />
            </div>

            {/* Precio y Tiempo Preparación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (S/) *
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo Preparación (min)
                </label>
                <input
                  type="number"
                  name="tiempoPreparacion"
                  value={formData.tiempoPreparacion}
                  onChange={handleChange}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                />
              </div>
            </div>

            {/* Categoría y Especialidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="idCategoria"
                  value={formData.idCategoria}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                >
                  <option value={0}>Seleccionar categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad *
                </label>
                <select
                  name="idEspecialidad"
                  value={formData.idEspecialidad}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                >
                  <option value={0}>Seleccionar especialidad</option>
                  {especialidades.map((esp) => (
                    <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                      {esp.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rango de Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Precio
              </label>
              <select
                name="rangoPrecio"
                value={formData.rangoPrecio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
              >
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>

            {/* Selección de tipo de imagen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Imagen del Plato
              </label>
              
              {/* Pestañas para elegir tipo de imagen */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  type="button"
                  onClick={() => setTipoImagen('url')}
                  className={`px-4 py-2 font-medium text-sm ${
                    tipoImagen === 'url'
                      ? 'border-b-2 border-[#E56767] text-[#E56767]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  URL de Imagen
                </button>
                <button
                  type="button"
                  onClick={() => setTipoImagen('archivo')}
                  className={`px-4 py-2 font-medium text-sm ${
                    tipoImagen === 'archivo'
                      ? 'border-b-2 border-[#E56767] text-[#E56767]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Subir Archivo
                </button>
              </div>

              {/* Contenido según el tipo seleccionado */}
              {tipoImagen === 'url' ? (
                <div>
                  <input
                    type="url"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa la URL completa de la imagen
                  </p>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleArchivoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceptados: JPG, PNG, WEBP. Tamaño máximo: 5MB
                  </p>
                  
                  {/* Vista previa de la imagen */}
                  {vistaPreviaImagen && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                      <img
                        src={vistaPreviaImagen}
                        alt="Vista previa"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="disponible"
                  checked={formData.disponible}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#E56767] focus:ring-[#E56767]"
                />
                <span className="text-sm text-gray-700">Disponible</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="esDestacado"
                  checked={formData.esDestacado}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#E56767] focus:ring-[#E56767]"
                />
                <span className="text-sm text-gray-700">Destacado</span>
              </label>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/platos')}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-[#B23A3A] text-white rounded-lg hover:bg-[#9f3535] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creando...' : 'Crear Plato'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearPlatoPage;