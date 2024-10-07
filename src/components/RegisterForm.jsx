import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout'

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

  // Función de validación para CUIT
  const isNumeric = (value) => {
    return /^\d*$/.test(value);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validaciones requeridas
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastname.trim()) newErrors.lastname = 'El apellido es requerido';
    if (!formData.cuit.trim()) newErrors.cuit = 'El CUIT es requerido';
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

    // Validación específica para CUIT
    if (formData.cuit) {
      if (!isNumeric(formData.cuit)) {
        newErrors.cuit = 'El CUIT debe contener solo números';
      } else if (formData.cuit.length !== 11) {
        newErrors.cuit = 'El CUIT debe tener exactamente 11 dígitos';
      }
    }

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
        message: 'Ocurrió un error al registrar el usuario, intentalo nuevamente más tarde'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el campo CUIT
    if (name === 'cuit') {
      // Solo permite números y limita a 11 dígitos
      if (!isNumeric(value)) {
        return;
      }
      if (value.length > 11) {
        return;
      }
    }

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
    <Layout>
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
              type="text"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              maxLength={11}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.cuit ? 'border-red-500' : ''
              }`}
              placeholder="Ingrese su CUIT (11 dígitos)"
            />
            {errors.cuit && <p className="mt-1 text-sm text-red-500">{errors.cuit}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Formato: 11 dígitos sin guiones ni espacios
            </p>
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
            <label className="block text-sm font-medium text-gray-700">Barrio</label>
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
            <label className="block text-sm font-medium text-gray-700">Piso</label>
            <input
              type="text"
              name="piso"
              value={formData.piso}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Departamento</label>
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
              <option value="producer">Productor</option>
              <option value="consumer">Consumidor</option>
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
    </Layout>
  );
  
};

export default RegisterForm;
