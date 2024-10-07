import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({ cuit: '' });
  const [errors, setErrors] = useState({});

  // Función de validación para asegurarse de que el valor sea numérico
  const isNumeric = (value) => {
    return /^\d*$/.test(value);
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para el campo CUIT
    if (name === 'cuit') {
      if (!isNumeric(value)) {
        return;
      }
      if (value.length > 11) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Función de validación del formulario
  const validateForm = () => {
    const newErrors = {};

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      // Aquí puedes manejar el envío del formulario, como enviar a una API
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">CUIT</label>
        <input
          type="text"
          name="cuit"
          value={formData.cuit}
          onChange={handleChange}
          placeholder="Ingrese su CUIT (11 dígitos)"
          maxLength={11}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.cuit ? 'border-red-500' : ''
          }`}
        />
        {errors.cuit && <p className="mt-1 text-sm text-red-500">{errors.cuit}</p>}
        <p className="mt-1 text-xs text-gray-500">
          Formato: 11 dígitos sin guiones ni espacios
        </p>
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Enviar
      </button>
    </form>
  );
};

export default MyForm;
