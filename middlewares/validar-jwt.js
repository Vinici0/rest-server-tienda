//Um middleware es una función que tiene acceso al objeto request (req), al objeto response (res) y al siguiente middleware en el ciclo de solicitud/respuesta de la aplicación. La siguiente función es un ejemplo de middleware, añadiendo una nueva propiedad al objeto request llamada requestTime.
const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

//next es una función que se ejecuta cuando el middleware termina
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //En javascript se paso todo por referencia, por lo que se puede modificar el objeto req
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    const usuario = await Usuario.findById(uid);

    //Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    //Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.usuario = usuario;
    console.log(req.usuario);


    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
