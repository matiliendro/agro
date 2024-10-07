
export const isValidCUIT = (cuit) => {
    if (cuit.length !== 11) return false;
    
    const multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    
    for (let i = 0; i < multiplicadores.length; i++) {
      suma += parseInt(cuit[i]) * multiplicadores[i];
    }
    
    const resto = suma % 11;
    const digitoVerificador = parseInt(cuit[10]);
    
    if (resto === 0) {
      return digitoVerificador === 0;
    } else if (resto === 1) {
      if (digitoVerificador === 9) {
        return true;
      }
      return false;
    } else {
      return digitoVerificador === (11 - resto);
    }
  }
  
  // Y en la validación:
  if (formData.cuit && !isValidCUIT(formData.cuit)) {
    newErrors.cuit = 'CUIT inválido';
  }