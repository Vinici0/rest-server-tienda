const { Router } = require("express");
const { check } = require("express-validator");
const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const reuter = Router();

reuter.get("/", usuariosGet);

reuter.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos, //middleware
  ],
  usuariosPut
);

//Realizando validaciones con express-validator (https://express-validator.github.io/docs/)
reuter.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    //custom sirve para hacer validaciones personalizadas
    //check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"],
    //Se comprueba el nombre del rol que se intenta validar
    check("rol").custom(esRolValido),
  ],
  validarCampos, //Se ejecuta el middleware de validación de campos
  usuariosPost
);

//En caso algun un middleware con next no se ejecute, se ejecutará el middleware de error
reuter.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole, A fuerza tiene que ser un administrador para poder eliminar un usuario
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),//custos sirve para hacer validaciones personalizadas
    validarCampos, //middleware
  ],
  usuariosDelete
);

reuter.patch("/", usuariosPatch);

module.exports = reuter;
