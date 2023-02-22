const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  productoPost,
  obtenerProducto,
  productoPut,
  productoDelete,
} = require("../controllers/productos");
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

//const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get(
  "/:id",
  [check("id").custom(existeProductoPorId), validarCampos],
  obtenerProducto
);

// Obteniendo todas las categorias - publico
router.get("/", obtenerProductos);

//Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  productoPost
);

// // Actualizar - privado - cualquier persona con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoPut
);

// // Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id").custom(existeProductoPorId),
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  productoDelete
);

module.exports = router;
