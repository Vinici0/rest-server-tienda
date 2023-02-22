const { response, request } = require("express");
const {Producto} = require("../models");


//Obtener categorias - paginado - total - populate -> para el nombre de usuario
const obtenerProductos =  async (req = request, res = response) => {
  const query = { estado: true };

  const { limite = 5, desde = 0 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(Number(desde)).limit(Number(limite)).populate("usuario", "nombre"),
  ]);
  
  console.log(total, productos);

  res.json({
    total,
    productos,
  });


}

//Obtener categoria - populate -> solo el objeto de la categoria
const obtenerProducto = async (req = request, res = response) => {
  const {id} = req.params;
  console.log(id);

  try {
    //Verificar si el email existe
    const producto = await Producto.findById(id);  

    res.json({
      producto
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};


const productoPost = async (req, res) => {
  console.log("Hola Mundo");
  //const {nombre, edad} = req.body;
  //const { goolle, ...retosDeArgumentos} = req.body;
  const { precio, categoria, descripcion} = req.body;
  //Nombre el mayusculas
  const nombre = req.body.nombre.toUpperCase();
  
  const data = {
    precio,
    nombre,
    categoria,
    descripcion,
    usuario: req.usuario._id,
  };

  
  const producto = new Producto(data);
  
  console.log("datoss - ",producto);
  //-> Guarda en la base de datos
  await producto.save();
  //Se le envio todo el objeto usuario con los capos eliminados en la base de datos
  res.status(201).json(producto);

};

// actualizar categoria -> solo debe recibir el nombre
const productoPut = async (req, res) => {
  const { id } = req.params;
  const { esstado, usuario, ...resto } = req.body;

  const producto = await Producto.findByIdAndUpdate(id, resto).populate("usuario", "nombre", {new : true});
  res.json({
    producto,
  });
};


const productoDelete = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(id, { estado: false }).populate("usuario", "nombre");

  res.json({producto});
};

//borrarCategoria - estado: false


module.exports = {
    obtenerProductos,
    productoPost,
    obtenerProducto,
    productoPut,
    productoDelete
};