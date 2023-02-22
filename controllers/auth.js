const { response } = require("express");
const Usuario = require("../models/usuario");
const bycryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { verifyGoogle } = require("../helpers/google-verify");
const { DefaultTransporter } = require("google-auth-library");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    //Verificar la contraseña
    const validPassword = bycryptjs.compareSync(password, usuario.password); //Lo hace de forma sincrona
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

//response solo es para que ayude con el autocompletado
const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;


  try {

    const {correo,nombre,img} = await verifyGoogle(id_token)

    //Verificar si el correo existe
    let usuario = await Usuario.findOne({correo})
    if(!usuario){
      //Tengo que crearlo
      const data = {
        nombre,
        correo,
        rol: DefaultTransporter,
        password:':P',  
        img,
        google:true
      }
      
      usuario = new Usuario(data)
      await usuario.save()
    }

    //Si el usuario en DB
    if(!usuario.estado){
      return res.status(401).json({
        msg:'Hable con el administrador, usuario bloqueado'
      })
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);
    console.log(token);

    res.json({
      usuario,
      token
    });
    
  } catch (error) {
    res.status(400).json({
      msg: "Token de google no es valido",
    });
    
  }


};

module.exports = {
  login,
  googleSignIn
};
