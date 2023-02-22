const { response, request } = require("express");
const bycrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  //const { q, nombre = "Sin nombre", apikey } = req.query;

  const query = { estado: true };

  const { limite = 5, desde = 0 } = req.query;
  //Solo muestra los campos que se le indiquen
  // const usuarios = await Usuario.find( query )
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  console.log(total, usuarios);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res) => {
  //const {nombre, edad} = req.body;
  //const { goolle, ...retosDeArgumentos} = req.body;
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //const { nombre, edad } = req.body;
  //----------------------------------------------------

  //Encriptar la contraseña
  const salt = bycrypt.genSaltSync();
  usuario.password = bycrypt.hashSync(password, salt);

  //-> Guarda en la base de datos
  await usuario.save();

  //Se le envio todo el objeto usuario con los capos eliminados en la base de datos
  res.json({
    //Se guarda en la base de datos y devuleve el usuario guardado
    usuario,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    //Encriptar la contraseña
    const salt = bycrypt.genSaltSync();

    resto.password = bycrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // Se recupera uid del middleware validar-jwt
  const uid = req.uid;
  // const usuarioAutenticado = req.usuario;

  //Borrado fisico
  //const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({usuario});
};

module.exports = {
  usuariosDelete,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
};
