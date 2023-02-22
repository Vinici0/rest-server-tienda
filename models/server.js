const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    // this.app(cors());

    this.port = process.env.PORT;

    /*Se recomienda se forma ordenada*/
    this.path = {
      buscaPath: "/api/buscar",
      categoriaPath: "/api/categorias",
      productoPath: "/api/productos",
      usuarioPath: "/api/usuarios",
      usthPath: "/api/auth",
    };

    //Conectar a base de datos
    this.ConectorDB();

    // Middlewares
    this.middleware();

    //Rutas de mi aplicación
    this.router();
  }

  async ConectorDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public")); //-> Para que el servidor pueda servir archivos estáticos
  }

  router() {
    this.app.use(this.path.categoriaPath,   require("../routes/categorias.js"));
    this.app.use(this.path.buscaPath,       require("../routes/buscar.js"));
    this.app.use(this.path.productoPath,    require("../routes/productos.js"));
    this.app.use(this.path.usthPath,        require("../routes/auth.js"));
    this.app.use(this.path.usuarioPath,     require("../routes/usuarios.js"));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
}

module.exports = Server;
