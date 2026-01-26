export function validarCedula(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;

  let total = 0;
  for (let i = 0; i < 9; i++) {
    let dig = parseInt(cedula[i]);
    if (i % 2 === 0) {
      dig *= 2;
      if (dig > 9) dig -= 9;
    }
    total += dig;
  }

  const verificador = (10 - (total % 10)) % 10;
  return verificador === parseInt(cedula[9]);
}
