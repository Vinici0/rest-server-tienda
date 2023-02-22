const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");


const reuter = Router();

reuter.post("/login",[
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe de ser de 6 caracteres").isLength({min: 6}),
    validarCampos
], login);

reuter.post("/google",[
    check("id_token", "Token de google es necesario").not().isEmpty(),
    validarCampos
], googleSignIn );

module.exports = reuter;