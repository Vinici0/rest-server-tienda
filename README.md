
## Pendiente:
https://github.com/Vinici0/rest-server-nodejs.git

## Instalaciones necesarias npm
npm install express 
npm install cors -> para que el servidor pueda ser accedido desde cualquier lugar sin problemas de seguridad 
npm install dotenv 
npm install mongoose 
npm install bcryptjs -> Sirve para encriptar las contraseñas 

npm install express-validator -> Sirve para validar los datos que se envian al servidor

npm install jsonwebtoken -> Sirve para crear los token de autenticacion



git tag
git tag -a v0.1 -m "Fin del curso de NodeJS 4_particionesHTTP"
git push --tags

## Importante para subir el proyecto a producccion en heroku
**Especificar las variables de entorno**
MONGODB_AUTH: mongo<br>
GOOGLE_CLIENT_ID: <br>

 heroku config -> para ver las variables de entorno<br>

GOOGLE_CLIENT_ID: <br>
MONGODB_AUTH: <br>


**Que es un middleware?**
Es una funcion que se ejecuta cuando se ejecuta una peticion HTTP y se ejecuta antes de que llegue al controlador de la peticion HTTP.


**mongoose**
Sire para conectar con la base de datos de MongoDB
https://mongoosejs.com/docs/

**MongoDB Compas**
Fue un paso neceasario para poder ver los datos de la base de datos de MongoDB

**Comandos neceasrios para Heroku**
heroku git:remote -a rest-reserver-vinicio
git push heroku main

**rest server**
Sirve para crear un servidor de rest server para poder hacer peticiones http desde cualquier lugar del mundo 
Su funcionalidad es la de crear un servidor que pueda recibir peticiones http y poder responder a esas peticiones.

npm install express <br>
npm install cors <br>
npm install dotenv <br>
<br>
git tag<br>
git tag -a v0.1 -m "Fin del curso de NodeJS 4_particionesHTTP"<br>
git push --tags<br>
<br>
**Comandos neceasrios para Heroku**<br>
heroku git:remote -a rest-reserver-vinicio<br>
git push heroku main <br>
<br>
**rest server**
Sirve para crear un servidor de rest server para poder hacer peticiones http desde cualquier lugar del mundo <br>
Su funcionalidad es la de crear un servidor que pueda recibir peticiones http y poder responder a esas peticiones <br>

<br>
**nodeJs** <br>
No olvidar realizar las exportaciones de las variables de entorno<br>
<br>


**nodeJs**
No olvidar realizar las exportaciones de las variables de entorno.

**dotenv**<br>
Sirve para poder crear variables de entorno en el proyecto de nodeJs<br>

**express**<br>
Sirve para poder crear un servidor de rest server<br>


**dotenv**
Sirve para poder crear variables de entorno en el proyecto de nodeJs.

**express**
Sirve para poder crear un servidor de rest server.


**cors**
Sirve para poder realizar peticiones http desde cualquier lugar del mundo.

**Comando para crear variables de entorno en heroku**
heroku config: set nombre="" -> Sirve para crear variables de entorno en heroku
heroku config:unset nombre="" -> para eliminar una variable de entorno

**Subir proyecto en heroku**
git push heroku main.

**Por que usar Token?**
Porque es una forma de autenticacion mas segura que las cookies.


**MIddlewares**
Solo son una simple funcion<br>

Cualquier milddware que se ejecute primero se tiene acceso a la req
para usar con otros milddware<br>

al apuntar al index.js se ejecuta el milddware que se encuentra en el index.js<br>


**cors**<br>
Sirve para poder realizar peticiones http desde cualquier lugar del mundo.<br>

