const { response, request } = require("express");
const {Categoria} = require("../models");

//Obtener categorias - paginado - total - populate -> para el nombre de usuario
const obtenerCategorias =  async (req = request, res = response) => {
  const query = { estado: true };

  const { limite = 5, desde = 0 } = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite)).populate("usuario"),
  ]);
  
  console.log(total, categorias);

  res.json({
    total,
    categorias,
  });


}

//Obtener categoria - populate -> solo el objeto de la categoria
const obtenerCategoria = async (req = request, res = response) => {
  const {id} = req.params;
  console.log(id);

  try {
    //Verificar si el email existe
    const categoria = await Categoria.findById(id);
    console.log(categoria);
  
    res.json({
      categoria
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};


const crearCategoria = async (req = request, res = response) => {

  // Convertimos a mayúsculas
  const nombre = req.body.nombre.toUpperCase();

  // Buscamos si existe una categoría con el mismo nombre 
  const categoriaDB = await Categoria.findOne({ nombre }).populate("usuario", "nombre");

  // Si no existe la categoría la creamos 
  if (categoriaDB) {//!categoriaDB -> Si no existe la categoría la creamos
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar categoria -> solo debe recibir el nombre

const categoriaPut = async (req, res) => {
  const { id } = req.params;
  const { esstado, usuario, ...resto } = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, resto).populate("usuario", "nombre", {new : true});
  res.json({
    categoria,
  });
};


const categoriaDelete = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }).populate("usuario", "nombre");

  res.json({categoria});
};

//borrarCategoria - estado: false


module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  categoriaPut,
  categoriaDelete
};