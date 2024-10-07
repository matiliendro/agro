import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button"
import { validateCuit } from '@/components/validateCuit';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    cuit: '',
    email: '',
    password: '',
    provincia: '',
    localidad: '',
    barrio: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    rol: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones requeridas
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastname.trim()) newErrors.lastname = 'El apellido es requerido';
    if (!formData.cuit.trim()) newErrors.cuit = 'El cuit es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!formData.provincia.trim()) newErrors.provincia = 'La provincia es requerida';
    if (!formData.localidad.trim()) newErrors.localidad = 'La localidad es requerida';
    if (!formData.calle.trim()) newErrors.calle = 'La calle es requerida';
    if (!formData.numero.trim()) newErrors.numero = 'El número es requerido';
    if (!formData.rol) newErrors.rol = 'El rol es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, corrija los errores del formulario'
      });
      return;
    }

    try {
      const response = await fetch('/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setSubmitStatus({
          type: 'success',
          message: 'Usuario registrado exitosamente'
        });
      } else {
        throw new Error('Error en el registro');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error al registrar el usuario'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Registro de Usuario</h2>
      
      {submitStatus.message && (
        <Alert className={`mb-4 ${submitStatus.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <AlertDescription>
            {submitStatus.message}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.lastname ? 'border-red-500' : ''
              }`}
            />
            {errors.lastname && <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CUIT</label>
            <input
              type="int"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.cuit && <p className="mt-1 text-sm text-red-500">{errors.cuit}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Provincia</label>
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.provincia ? 'border-red-500' : ''
              }`}
            />
            {errors.provincia && <p className="mt-1 text-sm text-red-500">{errors.provincia}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Localidad</label>
            <input
              type="text"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.localidad ? 'border-red-500' : ''
              }`}
            />
            {errors.localidad && <p className="mt-1 text-sm text-red-500">{errors.localidad}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Barrio (opcional)</label>
            <input
              type="text"
              name="barrio"
              value={formData.barrio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Calle</label>
            <input
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.calle ? 'border-red-500' : ''
              }`}
            />
            {errors.calle && <p className="mt-1 text-sm text-red-500">{errors.calle}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.numero ? 'border-red-500' : ''
              }`}
            />
            {errors.numero && <p className="mt-1 text-sm text-red-500">{errors.numero}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Piso (opcional)</label>
            <input
              type="text"
              name="piso"
              value={formData.piso}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Departamento (opcional)</label>
            <input
              type="text"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.rol ? 'border-red-500' : ''
              }`}
            >
              <option value="">Seleccione un rol</option>
              {/* <option value="Administrador">Administrador</option> */}
              <option value="Productor">Productor</option>
              <option value="Consumidor">Consumidor</option>
            </select>
            {errors.rol && <p className="mt-1 text-sm text-red-500">{errors.rol}</p>}
          </div>
        </div>

        <div className="flex justify-end">
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Registrar Usuario
              </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;