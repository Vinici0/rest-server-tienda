const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria, categoriaPut, categoriaDelete } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

//const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/:id",[
  check('id').custom(existeCategoriaPorId),
  validarCampos,
],obtenerCategoria);

// Obteniendo todas las categorias - publico
router.get("/",obtenerCategorias);

// Crear categoria - privado - cualquier persona con un token válido 
router.post("/",[
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("nombre", "El nombre debe ser de 4 a 20 caracteres").isLength({ min: 4, max: 20 }),
  validarCampos
], crearCategoria);

// Actualizar - privado - cualquier persona con un token válido
router.put("/:id",[
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("id", "No es un ID válido").isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,  
],categoriaPut);

// Borrar una categoria - Admin
router.delete("/:id",[
  validarJWT,
  esAdminRole,
  check('id').custom(existeCategoriaPorId),
  check("id", "No es un ID válido").isMongoId(),
  validarCampos,
], categoriaDelete);

module.exports = router;
