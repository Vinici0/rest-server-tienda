const jwt = require("jsonwebtoken");// Sirve para generar un token de prueba para probar el login en postman

const generarJWT = (uid = "") => {
  console.log("Hola hola");
  console.log("uid", uid);
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,// -> Para que el servidor pueda servir archivos estáticos
      {
        expiresIn: "4h",// Tiempo de expiración
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {  
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
