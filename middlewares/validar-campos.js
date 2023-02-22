
const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {//Si hay errores en la validación de los campos del body del request entonces... 
      return res.status(400).json(error);
    }
    //Si no hay errores entonces se ejecuta el siguiente middleware
    next();
}

module.exports = { validarCampos };