const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  //Validadion para saber si estamos llamando correctamente al middleware
  if (!req.usuario) {//proviene del middleware validar-jwt
    return res.status(500).json({
      //500 es un error interno del servidor
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      //401 es un error de autenticación
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    console.log(req.usuario.rol);
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    //includes es un método de los arreglos que nos permite saber si un elemento existe en el arreglo
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
