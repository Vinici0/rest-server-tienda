
const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      //Error personalizado que se muestra en el json de la respuesta
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado`);
    //   return res.status(400).json({
    //     msg: "El correo ya existe",
    //   });
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    //   return res.status(400).json({
    //     msg: "El correo ya existe",
    //   });
    }
}

const existeCategoriaPorId  = async (id) => {
    //Verificar si el correo existe
    console.log("id:" ,id);
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    //   return res.status(400).json({
    //     msg: "El correo ya existe",
    //   });
    }

}

const existeProductoPorId  = async (id) => {
    //Verificar si el correo existe
    console.log("id:" ,id);
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    //   return res.status(400).json({
    //     msg: "El correo ya existe",
    //   });
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
