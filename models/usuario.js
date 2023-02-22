const { Schema, model } = require("mongoose");

const UsuarioShema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//Se elimina la contraseña del objeto que se retorna al cliente
UsuarioShema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject(); 
  usuario.uid = _id;
  return usuario;
};

module.exports = model('Usuario', UsuarioShema);
