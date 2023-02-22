const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId, //Se indica que es un id de mongo
    ref: "Usuario", //Se indica que hace referencia a la colección de usuarios
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId, //Se indica que es un id de mongo
    ref: "Categoria", //Se indica que hace referencia a la colección de categorias
    required: true,
  },
  descripcion: {
    type: String, 
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

//Se elimina la contraseña del objeto que se retorna al cliente
ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);
