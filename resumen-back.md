# ELECTRON [electronjs.org]

Electron permite crear apps de escritorio utilizando tencnologias web como HTML, CSS y JavaScript.

---

# EXPRESS [express.js]

Express es un framework muy sensillo. Nos permite tener un back pero sin hacerlo desde cero.\
Es un framework minimalista para Node.js que facilita la creacion de aplicaciones web.

## Caracteristicas principales de Express.js

- Rutas: Define como responder a diferentes URLs (ej.: /, /usuarios, /productos)
- Middleware: Funciones que se ejecutan antes o despues de los controladores, son intermediarios (ej.: autenticacion, registro)

---

# SERVIDORES WEB

Customers (Clientes) <-> Front-End (HTML, CSS, JS) <-> Server-Side (JS) <-> Database (MySQL)\
Un servidor web es un programa que escucha peticiones HTTP y envia respuestas.

## Peticiones HTTP

- Metodos:

  - GET: obtener datos
  - POST: enviar datos
  - PUT: actualizar datos
  - DELETE: eliminar datos

- URL: La direccion que identifica el recurso solicitado (ej.: /productros/123)

- Headers (Cabeceras): Informacion adicional sobre la peticion (ej.: tipo de contenido, autenticacion)

- Body (Cuerpo): Es opcional, y refiere a los datos que se envian en la peticion (ej.: formularios, JSON)

## Respuestas HTTP

- Status Code (Codigo de Estado): Indica el resultado de la peticion (ej.: 200 OK, 404 Not Found, 204 No Content)
  Los podemos encontrar en la URL http.cat

- Headers (Cabeceras): Informacion adicional sobre la respuesta (ej.: tipo de contenido)

- Body (Cuerpo): Los datos que se envian de vuelta al cliente (ej.: JSON, HTML)

---

# API & API REST

Es como un mesero para un restautrante.

Customers (Clientes) <-> Front-End (HTML, CSS, JS) <-> _API_ <-> Server-Side (JS) <-> Database (MySQL)

Definicion:
Interfaz de Programacion de Aplicaciones, un conjuntoi de reglas para que las aplicaciones interactuen.

## REST

Es un estilo de arquitectura para diseñar APIs web, basado en unos princpios.

- Recursos identificados por URLs

- Uso de metodos HTTP estandar (GET, POST, PUT, DELETE)

- Comunicacion sin estado (cada peticion es independiente)

- Respuestas en formatos comunes (JSON, XML)

! Existen otro tipo de APIs como GraphQL, que sigue siendo una API pero tiene otro tipo de arquite3ctura de comunicacion.

---

# RECORDATORIO

Todo esto es del lado del servidor, no esperemos ver cosas en nuestro navegador mas que cuando hagamos get.\
Luego todo sera de nuestro lado, por mas que interactuemos con la app, todo sera del lado del servidor.\
Cuando hagamos app.post() y dentro tenga un console.log() saldra por la terminal donde estemos corriendo el back.\
Tener presente las _promesas_ (.then(), etc) y los _async/await_ en el fetch y axios.

# FETCH Y AXIOS (Envia Request y Recive Response) Y ASYNC

Todo lo que hagamos con fetch (nativo) y Axios (libreria) sera del lado del cliente.\
Desde ahi el cliente enviara sus peticiones al servidor.

## PROMISE: Inventadas para solucionar los callBack hells

- Tiene un estado que es el pendiente hasta que se resuelva donde tomara uno de dos estados:

  1. fulfilled (procesada con exito)
  2. rejected (rechazada, error)

### RESPONSE: Es un objeto enorme

response.json() === JSON.parse(response.body)

```javascript
// POST FETCH VS AXIOS WITH AWAIT

try {
    const { res } = await /* CODE */;
    console.log(res);
} catch (error) {
    console.error(error);
};

// FETCH
const { res } = await fetch(url, {
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    name: "pepe",
    age: 21,
  }),
  method: "POST",
});

// AXIOS
const { res } = await axios.post(`http://localhost:3000/todos`, JSON.stringify(newTask));



// EJEMPLOS PROMISE VS ASYNC
function fetchData() {
  fetch(url, { method: "GET" }) // No hace falta aclarar el metodo si es un get, lo toma como default
    .then((response) => {
      return response.json(); // extract JSON from response
    })
    .then((data) => {
      console.log(data); // process/print data
    })
    .catch((error) => {
      console.log("Error fetching data: ", error);
    });
}

async function fetchDataAW() {
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json(); // extract JSON from response ---- > ANTES: response.json() === JSON.parse(response.body)
    console.log(data);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

// CREANDO ASYNC

function fetchData() {
  return new Promise((resolve, reject) => {
    //Simulating an asynchronous operation with setTimeOut()
    setTimeout(() => {
      const data = { name: "pepe", age: 12 };
      //If all went good and you want to resolve promise
      resolve(data);

      //If there is some kind of error here you can reject promise
      reject(new Error("Something went wrong..."));
    }, 1000);
  });
};


// CREANDO PROMISES Y ASYNC

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = { name: "Pepe", age: 30 };
      resolve(data);
    }, 1000);
  });
};

async function getData() {
  try {
    const result = await fetchData();
    console.log("Result: ", result);
  } catch (error) {
    console.log("Error: ", error);
  }
};
```

## SERIALIZAR/DESERIALIZAR

```javascript
const obj = { nombre: "Nombre", edad: 21 };
const serializedObject = JSON.stringify(obj);
const originalObject = JSON.parse(serializedObject);
```

---

# EXPRESS (Envia Response y Recive Requests)

Luego todo lo que hagamos con _express_ sera del lado del backend y como manejaremos las peticiones que nos haga el client.

---

## PROTOCOLOS

Los servicios de backend utilizan ciertos protocolos de comunicacion para compartir info entre clientes (cualquier dispositivo que se conecte a internet)

Las apis estan basadas en un protocolo llamado _TCP_

### TCP

Este protocolol hace parte de la definicion de las redes de internet, el cual se utiliza para comunicar paquetes de datos por internet.

Muy por encima de los protocolos TCP estan diferentes modelos de APIs que se pueden crear

- PROTOCOLOS (ej.: TCP) son de bajo nivel
- APIs (ej.: tipo REST) son de alto nivel

## APIs

### RPC

Es un metodo para crear APIs no muy utilizado, se utiliza mas que nada en Java y C++, y es la forma de llamar funciones a un servidor. Por su traduccion Remote Procedure Call.

### SOAP

Son protocolos bastante robustos y sus contratos deben ser muy bien definidos. Tambien utilizan XML, y por su solides son muy utilizados en Apps de Bancos.

### REST API

Utiliza JSON y aprovecha las ventajas del HTTP.

## HTTP

Es otro protocolo por encima del _TCP_ que se utiliza por internet para comunicar datos.

Tiene 3 particularidades:\
 [1] - Cuenta con un codigo de estado (Status Code) que nos indica el estado de la comunicacion (si fue exitosa, tuvo algun error, o algun otro tipo de info)\
 [2] - Estructura, compuesta por un encabezado (header: donde va info sobre la consulta), un cuerpo (body: donde esta la info de la respuesta en si) y unos metadatos (donde hay un monton de datos de paquetes, etc.).\
 [3] - Metodos, que indican el proposito de la comunicacion, ejemplo:
Post: para la creacion
Patch: para editar
Get: para listar o para traer datos

## EXPRESS

Utilizaremos la libreria express para manejar todo esto.

```bash
npm install express
```

La libreria de express nos va a facilitar todo lo que es comunicacion a travez de una API REST utilizando el protocolo http.

Y nos va a facilitar el trabajo de creacion de APIs en JS.

Esta libreria tiene una serie de metodos que podemos utilizar para crear llamados a la API.
Hay muchas cosas que se pueden hacer antes de la API, por ejemplo:

- Podemos agregar middleware
- Podemos agregar filters
- Podemos agregar muchas cosas
  En principio estamos interesados en crear servicios, luego agregaremos complejidad, en primer lugar utilizaremos estos metodos:
- app.get()
- app.post()
- app.put()
- app.patch()
- app.delete()

GET: Leer datos.
POST: Crear nuevos datos.
PUT: Reemplazar datos completos.
PATCH: Modificar datos parcialmente.
DELETE: Eliminar datos.

```javascript
// Para utilizarla hacemos el import
const express = require('express')

// La asignamos a una constante, por norma llamada app
const app = express()

// Luego la utilizamos, esto es lo que se llama servicio
app.metodo( puerto , funcion(req,res,next){} )

// Visto de otra manera
app.get('/', (req, res) => { /* Cuerpo de la funcion */ })\
```

### METODOS DE HTTP EN EXPRESS

```javascript
app.get("/", function (req, res) {
  res.send("Hello World!");
});
```

### EL PUERTO

Recordar siempre de setear el puerto, por ejemplo:

```javascript
app.listen(3000);
```

Estan compuestos de:

1. Ruta: '/'

2. Funcion: con 3 parametros (request, response, next)

- Request: tiene la info que el cliente nos esta enviando, ejemplo un metadato, o el cuerpo de una peticion en metodos diferentes al get.
- Response: aca va a ir todo lo que le vamos a responder al cliente, ejemplo aqui res.send() es lo que le enviamos al cliente.
- Next: pasa el control al siguiente middleware o ruta

> RESPUESTA DE CHAT GPT
>
> [req (Request)]: Representa la solicitud HTTP que hizo el cliente. Contiene toda la información sobre la solicitud, como los parámetros de la URL, los cuerpos de las solicitudes POST, los encabezados, las cookies, etc.
>
> [res (Response)]: Representa la respuesta HTTP que se enviará al cliente. Con res puedes configurar el código de estado, los encabezados y el cuerpo de la respuesta.
>
> [next (Next Function)]: Este es el que tal vez te resulta confuso. Es una función que se utiliza para pasar el control al siguiente middleware en la cadena de ejecución. Si no usas next(), el flujo de la solicitud se detendrá y no llegará a la siguiente función de middleware o ruta.
>
> Resumen:
>
> - req: Solicitud.
> - res: Respuesta.
> - next: Función que pasa el control al siguiente middleware o ruta.

## ENVIO DE DATOS

```javascript
app.get("/usuario", (req, res) => {
  res.json({
    name: "El Nombre",
    lastName: "El Apellido",
    age: 27,
  });
});
```

## NODEMON

Sirve como un npm run dev pero permanece escuchando, como un --watch

```bash
npm install --save-dev nodemon
```

Cambiamos nuestro escript para que quede ewscuchando los cambios como el --watch, tenemos que hacer el cambio en el package.json

## NPM INIT

```bash
npm init
```

Crea el archivo package.json

Todos los proyectos de Node.js que utilizan librerias, estan basados en el archivo de descripcion llamado package.json

Este comando crea un archivo que es un JSON que internamente puede manejar todos los scripts y paquetes que puede ejecutar este proyecto.

Alli podemos configurar ciertos comandos ejecutables. Por ejemplo: para que un servidor arranque, o podemos utilizar para agregar dependencias cosa que si nosotros subimos un proyecto a un repositorio despues llegue otra persona y simplemente escriba un > npm install, y se actualicen todas las dependencias que se habian creado.

## CREACION DE UN PAQUETE

Cuando creemos un paquete por ejemplo:

```bash
npm install express
```

Se nos creaara la carpeta node_modules y luego se puede hacer referencia a el paquete cuando se quiera hacer un require o un import o el metodo que se queira utilizar para importar paquetes, no hace falta hacer "./node_modules/package_name" sino que con "package_name" alcanza para hacer referencia.

---

# INICIO DE UN PROYECTO EN BLANCO (pasos)

1. Creamos nuestro directorio del proyecto, en este caso "my-server"
2. Abrimos una terminal en la direccion del proyecto .../my-server y ejecutamos el siguiente comando

   ```bash
   npm init
   ```

3. Seteamos los datos basicos del proyecto, por lo general le damos enter a todo y al final le damos yes
4. Se nos crea el archivo package.json con los datos que nos pidio el comando npm init
5. Ejecutamos el siguiente comando para utilizar la libreria express

   ```bahs
   npm install express
   ```

6. Creamos un script llamado dev que va a ejecutar el proyecto cuando nosotros lo escribamos:

   ```json
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "dev": "node index.js"
   }
   ```

   Lo vemos agregado en "dev".\
    Para correrlo ejecutamos el siguiente comando:

   ```bahs
   npm run dev
   ```

7. Luego creamos el archivo index.js y lo probamos con el siguiente codigo. La idea es que cuando consumamos la API REST a travez del metodo get con la ruta '/', el nos devuelva el texto 'Hello World!'.

   ```javascript
   const express = require("express");
   const app = express();

   app.length("/", function (req, res) {
     res.send("Hello World!");
   });

   app.listen(3000);
   ```

8. Probamos el script que creamos con el comando

   ```bash
   npm run dev
   ```

   Tenemos creado nuestro primer End-Point (recurso o servicio)

---

# SERVIDORES

Los servidores necesitan de un puerto.

## PUERTO

Es por donde escucha la computadora normalmente.

En el paso 7, descrito arriba, le decimos a nuestra app de node que escuche en el puerto 3000. Y le mandamos un metodo GRT.

Nos devuelve un status code 304 ya que no modifico nada.

## STATUS CODES

Hay 5 tipos, los mas utilizados son:

- 200's: Estados que recive el usuario/cliente
- 300's: Informacion de como fue la peticion. Normalmente cuando se hace la peticion parcialmente. Para hacer redirex. Que una pagina fue permanentemente removida de un lugar. Etc. En el caso de arriba nada fue modificado entonces recibimos un 304.
- 400's: Relacionados con autentificacion y autorizacion. 400 peticion erronea. 401 no tiene autorizacion. 403 estas autenticado pero sin permisos suficientes. 404 not found.
- 500's: Enfocados en el servidor. 500 error interno del servidor. 502 problema de comunicacion entre servidor y cliente (puerta de enlace invalida).

(<https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)\>
Informational responses (100 – 199)\
Successful responses (200 – 299)\
Redirection messages (300 – 399)\
Client error responses (400 – 499)\
Server error responses (500 – 599)

## ENDPOINTS - SERVICIOS - RECURSOS

Hacemos referencia a la peticion que vamos a consumir del backend.

A todos los procesos que hacemos en el back-end se le suelen llamar endpoints, servicios o recursos.

Endpoints es porque son terminales que uno va a consumir.

### POSTMAN

Es una aplicacion que se suele utilizar para trabajar con estos recursos y peticiones.

# MIDDLEWARE

Es el intermediario entre la peticion y el servidor.

Para utilizar un middleware hacemos uso del metodo .use():

```javascript
const express = require("express");
const app = express();
app.use(middleware);
```

Un middleware muy utilizado es el siguiente, y es para leer los bodys de las request como formato JSON.

```javascript
const express = require('express');
const app = express();
app.use(express.json());
```

Como al parecer esta en desuso utilizamos el Body-Parser

## BODY - PARSER

Instalamos el paquete

```bash
npm install body-parser
```

Importamos el paquete

```javascript
const bodyParser = require('body-parser')
```

Insertamos el middleware en app (se supone creada ya)

```javascript
app.use(bodyParser.json());
```

# CRUD (create: post - read: get - update: put(total)/patch(parcial) - delete: delete )

```javascript
// Importamos express y body-parser
const express = require("express");
const bodyParser = require("body-parser");

// Seteamos app y el bodyParser
const app = express();
app.use(bodyParser.json());

// Simulamos una base de datos
const users = [
  { name: "Adrian", lastName: "Nario", age: 48, id: 1 },
  { name: "Andres", lastName: "Unknown", age: "Unknown", id: 2 },
  { name: "Peter", lastName: "Parker", age: 34, id: 3 },
];

// CRUD

// CREATE - Post Method
app.post("/users", (req, res) => {
  const user = {
    ...req.body,
    id: users.length + 1,
  };
  users.push(user);
  const response = {
    user: user,
    message: "User created successfully",
    created: true,
  };
  res.json(response);
  console.log(response.message);
  console.log(users.length, users);
});

// READ - Get Method
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});

// UPDATE - Put Method
app.put("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const { id, ...user } = req.body; // Esto para sacar el id y que no nos lo cambien.
  const updatedUser = {
    ...users[userIndex],
    ...user, // De esta forma seteamos todos los valores de user menos el id si es que lo tenia.
  };
  const exUser = users[userIndex];
  users[userIndex] = updatedUser;
  const response = {
    exUser: exUser,
    updatedUser: updatedUser,
    message: "User updated successfully",
    updated: true,
  };
  res.json(response);
  console.log("MESSAGE:", response.message);
  console.log("EX-USER:", exUser);
  console.log("UPDATED-USER:", users[userIndex]);
  console.log("USER-COUNT:", users.length);
  console.log("USER-LIST:", users);
});

// DELETE - Delete Method
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const exUser = users[userIndex];
  users.splice(userIndex, 1);
  const response = {
    exUser: exUser,
    message: "User deleted successfully",
    deleted: true,
  };
  res.json(response);
  console.log("MESSAGE:", response.message);
  console.log("EX-USER:", exUser);
  console.log("USER-COUNT:", users.length);
  console.log("USER-LIST:", users);
});

app.listen(3000);
```

---

# UUID - ID GENERATOR

Es una libreria que genera ids de forma aleatoria

La instalamos

```bash
npm install uuid
```

Luego la importamos para utilizar y la utilizamos

```javascript
const { v4: uuid } = require("uuid");
const miId = uuid();
```

---

# DATA BASE / BASE DE DATOS

Se parece mucho a un exel.\
Vamos a utilizar el lenguaje SQL para trabajar estas bases de datos relacionales, este lenguaje sireve para hacer consultas a las bases de datos.

Con SQL podemos crear tablas, propiedades dentro de esas tablas y esas propiedades las podemos relacionar con propiedades de otras tablas.

## EJECMPLO DE TABLA EN BASE DE DATOS

**_NOMBRE DE LA TABLA: usuario_**

| PROPIEDAD | TIPO DE DATO | KEYS |
| --------- | ------------ | ---- |
| id        | string       | PK   |
| name      | string       |      |
| lasName   | string       |      |
| age       | number       |      |

**_NOMBRE DE LA TABLA: dispositivo_**

| PROPIEDAD  | TIPO DE DATO | KEYS            |
| ---------- | ------------ | --------------- |
| id         | string       | PK              |
| userId     | string       | FK (on usuario) |
| plataforma | string       |                 |
| referencia | string       |                 |

### PK - Primary Key

Es una llave primaria y se utiliza para poder identificar cualquier elemento en una tabla.

### FK - Foreign Key

Es una llave foranea y sirve para referenciar a una llave de otra tabla.

# SQL

Ejemplo de codigo en SQL:

Con este codigo nos traeremos todos los usuarios de la base de datos cuyo nombre es Andres

```SQL
SELECT * FROM usuario WHERE name = 'Andres'
```

Tenemos otro tipo de sentencias ademas del SELECT, como son el CREATE Y EL UPDATE.\
Pero nosotros trabajaremos con el ORM.

# SEQUELIZE

Es una libreria para gestionar la coneccion a diferentes bases de datos.\
Esto se llama un ORM (Object Relational Model / Modelo de Objeto Relacional).\
Sirve para poder modelar bases de datos.

Para instalar Sequelize (ademas vamos a tener que instalar sqlite3) se hace con el siguiente comando:

```bash
npm install sequelize sqlite3
```

#### PARA MEJORAR LA ARQUITECTURA DEL PROYECTO CREAMOS UNA CARPETA DONDE TRABAJAREMOS CADA TABLA DE FORMA SEPARADA (models)

#### Y CREAMOS UNA CARPETA DONDE TRABAJAREMOS CON CADA LIBRERIA (libs)

## EJEMPLO - TABLA USUARIO EN JS

Creamos nuestra carpeta models y creamos un archivo **_usuario.js_** con el codigo que SEQUELIZE nos siguiere:

```javascript
// usuario.js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define("User", {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});
```

Como base, luego iremos modificando todo esto.

Luego creamos nuestra carpeta libs donde contendremos las librerias, y dentro de ella cremamos nuestro archivo sequelize.js\
Hacemos esto para traernos la libreria SEQUELIZE y no tener que estar creando cada vez que lo vayamos a utilizar.

Dentro de **_sequelize.js_** dropeamos el siguiente codigo:

```javascript
// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory");
module.exports = sequelize;
```

De esta forma podemos sustituir en nuestro **_usuario.js_** la parte de arriba por la parte de abajo:

```javascript
// usuario.js
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define("User", {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});
```

```javascript
// usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../libs/sequelize");

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});
```

Vemos que sequelize lo importamos de otro lado ya trabajado **(const sequelize = require('../libs/sequelize');)** y vemos que **_(const sequelize = new Sequelize('sqlite::memory:');)_** se borra.

Ahora veremos como modificamos el codigo de **usuario** para que nos sirva a nuestro proyecto:

```javascript
// usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../libs/sequelize");

const User = sequelize.define("User", {
  id: DataTypes.STRING,
  username: DataTypes.STRING,
  lastName: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

module.exports = User;
```

Ahora setearemos nuestro archivo **_sequelize.js_** para que se amolde a nuestro proyecto, indicando que va a utilizar **sqlite** como base de datos yt que va a guardar los archivos en **../database.sqlite**.

```javascript
// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../database.sqlite",
});

// Indicamos que vamos a utilizar sqlite como base de datos y que guarde los achivos en database.sqlite

// Sqlite es la base de datos mas sensilla que podemos utilizar, y no necesita instalarse en el sistema operativo

module.exports = sequelize;
```

### AHORA VAMOS A UTILIZAR LO CREADO EN NUESTRO PROYECTO

Primero debemos crear la porcion de codigo que sincroniza la base de datos y hace que se actualicen los datos.\
Y luego meter dentro el cuerpo de codigo que tenia el index.js. Desde el const app() = express() hasta el app.listen(3000).\
Luego al final corremos nuestra App()

Primero importamos sequelize y luego sincronizamos

```javascript
// index.js

const sequelize = require("./libs/sequelize");

async function App() {
  await sequelize.sync({ force: false }); // Si seteamos true se reinicia la base de datos cada vez que cambiemos algo en el archivo index.js

  // ACA VA A IR TODO EL CODIGO QUE TENIAMOS EN NUESTRO ARCHIVO index.js
  // Desde const app = express();
  // ...
  // Hasta app.listen(3000);
}

App();
```

Segundo debemos hacer un import de User

```javascript
// index.js
const User = require("./models/usuario");
```

Ahora devemos convertir todas las funciones que teniamos del estilo:

```javascript
app.get("/", () => {});
```

En funciones asincronas (async/await), ejemplo:

```javascript
// index.js

// CREATE - Post Method
app.post("/users", async (req, res) => {
  const user = {
    ...req.body,
    id: uuid(),
  };
  // users.push(user); Ya no utilizaremos el array local sino que pasaremos a utilizar la base de datos
  const usuario = await User.create(user);
  const response = {
    //"user": user,
    user: usuario,
    message: "User created successfully",
    created: true,
  };
  res.json(response);
  console.log(response.message);
  // console.log(users.length, users) Ya no utilizaremos el array local sino que pasaremos a utilizar la base de datos
});
```

Y pasar a utilizar la base de datos que creamos y dejar de utilizar el array local.

#### Ahora crearemos una carpeta llamada api, donde le daremos un nombre a todas estas funciones para poder exportarlas y utilizarlas dentro de nuestro proyecto

#### Dejaremos en index-aux.js el codigo completo con los detalles a modo teorico y en index.js es donde crearemos nuestro proyecto. Alli importaremos las funciones creadas en la carpeta api dentro de usuarios.js

# CREAR CONSULTAS EN LA BASE DE DATOS

Pondremos el siguiente ejemplo:

```javascript
const IniciarSesion = async (req, res) => {
  const usuario = await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  if (!usuario) {
    res.status(404).json({
      message: "Usuario o contraseña invalidos",
    });
    return;
  }

  res.json(usuario);
};
```

Vemos que la consulta a la base de datos en el metodo .findOne es un archivo JSON.

---

# URL

**<https://rickandmortyapi.com/api/character>**

> <https://rickandmortyapi.com/>

Esta primera parte es la direccion en si

> /api/character

Esta segunda parte es el PATH o "camino, caminito" que sigue

# INTERNET

Se basa en cierto conceptos basicos:

- Nodos (nodes)
- Enrutamientos (router)
- protocolos
- Redes y Puertos
- Direcciones IP
- Dominios y DNS

## NODOS

Dispositivos conectados a internet (computadoras, servidores, telefonos, etc.)

## ENRUTAMIENTO

Proceso de dirigir los datos a travez de la red, de un nodo a otro, hasta llegar a su destino

## PROTOCOLO HTTP

Es el protocolo que permite la comunicacion entre navegadores web y servidores

### CANALES DE COMUNICACION DENTRO DE UN DISPOSITIVO (DENTRO DE UN NODO)

Cada servidor utiliza un puerto especifico:

- HTTP: 80
- HTTPS: 443
- FTP: 21
- SSH: 22
- Telnet: 23

## IP

Es un numero unico que identifica a cada dispositivo conectado a internet

URL de ayuda: whatismyip.com

### DOMINIO

Es un nombre facil de recordar asociado a una direccion IP, ej.: <https://www.google.com> asociado con la ip de google

### DNS (Dominian Name System)

Sistema que traduce los nombdres de dominio a sus direcciones IP correspondientes

---

# DATABASE

Almacenamiento persistente de datos, organizados y estructurados.

## SQL Vs. NoSQL

| SQL              | NoSQL                |
| ---------------- | -------------------- |
| Tablas           | Colecciones          |
| Registros        | Documentos           |
| Campos           | Campos o propiedades |
| Claves Primarias | Clave primaria o ID  |

### MongoDB

Base de datos NoSQL, orientada a documentos, flexibilidad y escalabilidad.

Almacenamiento de datos en formato JSON.

### PostgreSQL

Base de datos Relacional Robusta, gran integridad de datos y transacciones.

Lenguaje SQL para consultas.

## MODELADO DE DATOS

Es el proceso de diseñar la estructura de una base de datos antes de crearla. Es como crear un plano arquitectonico antes de construir un edificio.

**Ventajas:**

- Permite organizar la informacion de manera eficiente y logica
- Facilita la busqueda, recuperacion y actuializacion de datos
- Evita redundancias e inconsistencias en la informacion
- Garantiza la integrabilidad y seguriudad de los datos

### ENTIDADES

Son los objetos o conceptos del mundo real que queremos representar en la base de datos.

Ej.: clientes, productos, pedidos, empleados.

### ATRIBUTOS

Son las caracteristicas o propiedades de las entidades.

Ej.: nombre del cliente, precio del producto, fecha del pedido, salario del empleado.

### relacionales

Describen como se conectan las entidades entre si.

Ej.: un cliente puede realizar varios pedidos, un pedido contiene varios productos.

## DIAGRAMAS ENTIDAD-RELACION (ER)

Son herramientas visuales para representar el modelo de datos. Utilizan simbolos para representar entidades, atributos y relaciones.

---

# PASSPORT JS

> URL: passportjs.org

Es una libreria para gestionar sesiones en Node.JS y tiene interacciones con Express.JS que estamos utilizando.

Tiene multimples **sistemas** que se le llaman **estrategias**.

## ESTRATEGIAS

Son los los diferentes tipos de autenticacion que se utilizan (FB, LinkedIn, Microsoft, Basic, SAS).

### ESTRATEGIA BASIC AUTHENTICATION

Es la que vamos a estar utilizando nosotros, hay otro llamado bitter? que tambien vamos a estar utilizando.

Basic solo es un Usuario y una Constraseña.

Se basa en crear un metodo de comunicacion entre un cliente y un servidor, donde se envia un usuario y una contraseña, y eso nos tiene que devolver *

1) Vamos hacer una peticion a un servidor
2) El servidor nos va a solicitar un user y una password
3) Se envia el user y el password
4) Se retornar la info solicitada

________________________________________________________________

# PAQUETES A INSTALAR

Para esto vamos a necesitar los siguientes paquetes para instalar:

- Passport
- Passport local (es un middleware de los mas basicos)
- Express session
- Bcrypt (la utilizaremos para cifrar la contraseña y para que sea unica, si alguien se roba la info no va a poder desifrarla ya que no tendra la llave privada para desencriptarla)

```bash
npm install passport passport-local express-session bcrypt
```

## Autenticacion (basic/passport-local) Vs. Autorizacion(jwt)

**Autenticacion - (vamos a usar estrategia basic usando local):** Es el proceso por el cual nos vamos a identificar frente al servidor, le diremos quienes somos mediante un user y una password. Y el no va a decir si la identidad que le entregamos es valida o invalida.

**Autorizacion - (utilizaremos jwt):** Es cuando intento acceder a un recurso y el servidor me dice si estoy o no autorizado.

## Passport Local

Este middleware va a tomar la peticion y a travez de una funcion que nos proveen van a entregarnos el user y la password que el usuario envia en la peticion, y con eso vamos a validar en la base de datos si existe ese usuario y en caso de exisitir lo dejamos continuar y le regresamos la info del usuario. Y si no existe le retornamos user y/o password invalidos.

### CREAMOS LA ESTRATEGIA

```javascript
// Importamos la libreria passport
const passport = require('passport');
// Creamos nuestra estrategia basic
const LocalStrategy = require('passport-local').Strategy;
// Cargamos la ruta a la base de datos para traer los datos de nuestra DB
const Usuario = require('../models/usuario');


// Pasport es una libreria de sesiones, y puede utilizar multiples estrategias, por eso vamos a especificar que estrategia vamos a usar
passport.use(new LocalStrategy(
  // Automaticamente llama local a esto, ver en '../routes/sesion.js' funcion Routes en app.post('/login', ... )
  async (username, password, done) => {
    // Este codigo lo copiamos de './api/sesion.js'
    const usuario = await Usuario.findOne({
      where: {
        // Cambiamos el contenido de email y de password luego de copiar
        email: username,
        password: password
      }
    });

    if (!usuario) {
      done(null, false, { message: 'Usuario y/o contraseña invalidos' });
      return;
    };

    done(null, usuario);

  }
));
```

### USAMOS LA ESTRATEGIA

```javascript
const passport = require('../libs/passport');

app.post('/login', passport.authenticate('local', {
 successRedirect: '/profile',
 failureRedirect: '/unauthorized'
}));
```

# EXPRESS GENERATOR

> URL: <https://expressjs.com/es/starter/generator.html>

Es un generador de proyectos utilizando express.\
Se aconseja utilizar un generador y no hacerlo desde cero como lo hicimos nosotros.

## EXPRESS SESSION

Nos entrega la info de la session cuando ya logramos iniciarla.

# APP DE BACKEND CON EXPRESS

Cuenta de 3 partes fundamentales:

1) Crear la app de expres

```javascript
const app = express(/*Aqui podemos agregar configuraciones iniciales de express*/);
```

2) Montar todos los middlewares (nos ayudaran a procesar la info antes de que llegue a nuestro codigo, va a manipoular la informacion) que se necesiten, y tambien las rutas (routers):

```javascript
// MIDDLEWARES
app.use(bodyParser.json()); // El body puede tener muchos datos, por eso utilizamos el bodyParser, si no indicamos como queremos la info el boddy sera undefined.
app.use(session({
 secret: "mi-secreto",
 resave: false,
 saveUninitialized: true
}))
app.use(passport.initialize()); // Inicializa dentro de express todas las dependencias que necesita passport para funcionar.
app.use(passport.session());
// ROUTERS
UserRutes(app);
SesionRutes(app);
```

3) Cargar la base de datos e indicar en que puerto va a escuchar la app:

El puerto es un lugar virtual de nuestro computador. Hace referencia a un lugar donde estan ocurriendo eventos en la web.\
Para desarrollo se suele utilizar el puerto 3000.\
HTTP: port 80\
HTTPS: port 443

```javascript
await sequelize.sync({ force: false });
app.listen(3000);
```

## CODIGO COMPLETO DEL INDEX

```javascript
// Importamos express y body-parser
const express = require('express');
const bodyParser = require('body-parser');

const UserRutes = require('./routes/user');
const SesionRutes = require('./routes/sesion');

const sequelize = require('./libs/sequelize')

// NEW
const passport = require('./libs/passport');
const session = require('express-session')
// NEW

async function App() {

 const app = express();

 app.use(bodyParser.json());

 // New
 // Usamos un middleware
 app.use(session({
  secret: "mi-secreto",
  resave: false,
  saveUninitialized: true
 }))
 // Inicializamos passport
 app.use(passport.initialize());
 // Sesion Strategy
 app.use(passport.session());
 // New

 UserRutes(app);
 SesionRutes(app);

 await sequelize.sync({ force: false });
 app.listen(3000);
};

App();
```

## RES (Responses)

**Aca cargamos la base de datos y modelamos nuestro tipo de dato**

```javascript
// USUARIO
// proyect/server/models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const User = sequelize.define('User', {
    // id: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
});

module.exports = User;
```

**Ejemplo de uso de res.**

```javascript
// USUARIOS
// proyect/server/api/usuarios.js
const User = require('../models/usuario');

const ListarUsuarios = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};
```

### USOS DEL RES

**.status()**: Es para agregar un estado a una peticion. Vease los status-code que estan bastante estandarizados.\
El status-code 200 es el por defecto y si no se especifica uno, este sera el que se envie.

```javascript
res.status();
res.status(/*codigo del estado, ejemplo 404 que es un not-found*/);
res.status(404);
```

**.send() o .json()**: Se envia info junto al status-code.\
Puede ser:

- .send(): Envia cualquier cosa, un json, texto plano, un binario, lo que sea.
- .json(): Envia solo un json.

```javascript
// .send()
res.status(401).send("Usuario no autorizado");
// .json()
res.status(401).juson({
  message: "Usuario no autorizado"
});
```

**.header()**: Con esto podemos establecer un header de nuestra propia preferencia, ejemplo:

```javascript
res.header("set-cookie", "Hola soy una cookie!");
```

## REQ (Request)

Cada vez que se utiliza un middleware, el middleware normalmente va inyectando informacion al request.\
En nuestro caso nosotros inyectamos el req.user cuando iniciamos sesion y esta es valida, y al ser valida nos redirige al /profile:

```javascript
// SESION
// proyect/server/routes/sesion.js
const { RegistrarUsuario } = require('../api/sesion');
const passport = require('../libs/passport');

const Routes = (app) => {
 app.post("/register", RegistrarUsuario);

 // Aca usamos el passport.serializeUser()
 app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/unauthorized'
 }));
 app.get('/profile', (req, res) => {
  res.json(req.user); // Aca usamos el passport.deserializeUser()
 });
 app.get('/unauthorized', (req, res) => {
  res.status(404).send({ message: 'Unautorizado' });
 });
};

module.exports = Routes;
```

Aca aprovechamos a retornar en nuestra respuesta parte de la request (de la consulta).

Este .user fue inyectado por passport en la libreria de passport, cuando creamos el proceso de inicio de sesion.

En el codigo de abajo vemos cuando hacmeos el :

```javascript
done(null, usuario);
```

Estamos inyectando el usuario.

```javascript
// SESION
// proyect/server/libs/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await Usuario.findOne({
      where: {
        email: username,
        password: password
      };
    });

    if (!user) {
      done(null, false, { message: 'Usuario y/o contraseña invalidos' });
      return;
    };
    // else
    done(null, user); // Este done y el de arriba son los usados en passport.deserializeUser
  };
));

// Aca manejamos la info cuando llega al inicio de sesion por ejemplo
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Aca manejamos la info cuando vuelve, por ejemplo en /profile
passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findByPk(id);
  done(null, usuario);
});

module.exports = passport;
```

## PETICIONES A LA BASE DE DATOS

```javascript
// SEQUELIZE
//proyect/server/libs/sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.sqlite',
});

module.exports = sequelize;
```

### MODELO

```javascript
// MODEL
// proyect/server/models/usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const User = sequelize.define('User', {
    // id: DataTypes.STRING, el id lo coloca el gestor solo.
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
});

module.exports = User;
```

# JWT

Es un estandar RFC 7519 que consiste en crear una firma para un elemento, y la firma va a ir embebida dentro de la misma peticion.

Un **JWT** esta dividido en 3 partes:

1) Header
2) Pay Load o Body
3) Firma

Cualquier cosa que yo haga si la firma cambia automataicamente voy a poder saber que informacion hay en el Pay Load pero no voy a poder continuar con el proceso porque no es un usuario verificado.

> URL: <https://jwt.io/>

Esta url es para crear un jwt

Ejemplo:

_**JWT**_:

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

La primera linea es el header, la segunda el payload y la tercera la firma.

**HEADER**: ALGORITHM & TOKEN TYPE

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**PAYLOAD**: DATA

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

VERIFY SIGNATURE

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
  your-256-bit-secret

) [checkbox] secret base64 encoded (true/false dependiendo del checkbox que se marque en la pagina)
```

_**your-256-bit-secret**_ esta es la firma, si la modificamos, podremos acceder a la info pero no podemos hacer nada si modifican algo. Sirve por ejemplo para cuando tenemos un admin y este intenta cambiarse a super admin, el puede saber su info, pero no la puede modificar si no tiene la firma.

## PASSPORT Y JWT

Passport tiene una estrategia para poder utilizarla que se llama jwt tambien.

### INSTALACIONES

```bash
npm install passport-jwt jsonwebtoken bcryptjs
```

1) passport-jwt: es para utilizar JWT
2) jsonwebtoken: es para desencriptar el jsonwebtoken
3) bcryptjs: ya teniamos bcrypt y no la usamos, para que queremos esta?

### CREACION DE LA ESTRATEGIA JWT EN PASSPORT

Creamos un archivo de constantes donde guardaremos en principio solo nuestra llave secreta:

```javascript
// proyect/constants.js
const SECRET_KEY = "mi-super-secreto";

module.exports = { SECRET_KEY };
```

> Utilizaremos bearer, que es una forma de token.

```javascript
// PASSPORT
// proyect/server/libs/passport.js

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { SECRET_KEY } = require("../constants");

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}, (payload, done) => {
  done(null, payload);
}));
```

Ahora encriptamos la contraseña al momento del registro

```javascript
// SESION
// proyect/server/api/sesion.js

const bcrypt = require('bcryptjs');

// El salt es un valor aleatorio que agrega una capa mas de seguridad, es un token aleatorio que se guarda en la misma cadena.
// Cuando quieramos utilizarlo va a utilizar ese numero aleatorio que dentro tiene otra informacion y junto a la llave secreta poder desifrar.
// Es como tener una llave privada y una secreta, y aumenta la complejidad del token.
const salt = await bcrypt.genSalt();
// Ahora si encriptamos la contrasenia junto al salt
req.body.password = await bcrypt.hash(req.body.password, salt);
```

Ahora debemos desencriptar la contraseña

```javascript
// SESION
// proyect/server/libs/passport.js

const bcrypt = require('bcryptjs');

// Vamos a comparar la constrasenia que nos envia el usuario con la que esta en la base de datos
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    done(null, false, { message: 'Contraseña invalida' });
    return;
  };
```

_**COMPAREMOS COMO SE CREA UNA PASSWORD Y COMO SE COMPRUEBA LUEGO**_

```javascript
// Ambas utilizaran la misma libreria
const bcrypt = require('bcryptjs');

// REGISTRO (proyect/server/api/sesion.js)
const User = require('../models/usuario');
const salt = await bcrypt.genSalt();
req.body.password = await bcrypt.hash(req.body.password, salt);
const usuario = await User.create(req.body);

// LOGIN (proyect/server/libs/passport.js)
const isValid = await bcrypt.compare(password, user.password);
// Donde password es la contrasenia ingresada al iniciar sesion y user es el usuario encontrado en la base de datos.
```

Ahora devolveremos el usuario pero sin la contrasenia:

```javascript
// protyect/server/libs/passport.js

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findByPk(id);

 // Mandamos solo el usuario sin la contrasenia
  const { password, ...userPasswordless } = usuario.dataValues
  done(null, userPasswordless);
});


// proyect/server/api/sesion.js

const RegistrarUsuario = async (req, res) => {

 const usuarioExistente = await User.findOne({
  where: { email: req.body.email }
 });

 if (usuarioExistente) {
  res.status(403).json({ "message": "El email ya está registrado" });
  return;
 };

 // El salt es un valor aleatorio que agrega una capa mas de seguridad, es un token aleatorio que se guarda en la misma cadena.
 // Cuando quieramos utilizarlo va a utilizar ese numero aleatorio que dentro tiene otra informacion y junto a la llave secreta poder desifrar.
 // Es como tener una llave privada y una secreta, y aumenta la complejidad del token.
 const salt = await bcrypt.genSalt();
 // Ahora si encriptamos la contrasenia junto al salt
 req.body.password = await bcrypt.hash(req.body.password, salt);

 const usuario = await User.create(req.body);

 const { password, ...userPasswordless } = usuario

 // Mandamos solo el usuario sin la contrasenia
 res.json(userPasswordless);
};
```

### AHORA GENERAMOS NUESTRO JWT

```javascript
// proyect/server/routes/sesion.js

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../constants");

app.get('/profile', (req, res) => {
 // jwt.sing(json_string de id y email de usuario, llave secreta como string, json con el tiempo de expitracion)
 const token = jwt.sign(
  JSON.stringify({
   id: req.user.id,
   email: req.user.email
  }),
  SECRET_KEY,
   { expiresIn: '1h' }
 );
 res.json({
  usuario: req.user,
  token: token,
 });
});
```

---

# NODE (by Michel)

Node es un entorno de ejecucion fuera del browser para ejecutar codigo javascript.

## COMO CREAR UN PROYECTO CON NODE Y UTILIZANDO EXPRESS

1) Ejecutar los siguientes comandos en orden

    ```bash
    mkdir [app-name]
    ```

    ```bash
    cd [app-name]
    ```

    ```bash
    npm init -y
    ```

    ```bash
    npm install express
    ```

2) Crear un archivo llamado `index.js` que sera el archivo principal de nuestra app (siempre y cuando sea ese el nombre que le demos al main dentro del `package.json`).

## IMPORT / EXPORT

En el archivo `package.json` devemos poner lo siguiente (no va dentro de ningun atributo, es el package.json entero al iniciar):

```json
{
  "type": "module",
  "name": "nombre-de-la-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js"
}
```

**CONSIDERACIONES:**

_**En el caso de expecificar `"type": "module"` en el `package.json` el sistema `vanilla va a fallar`.\
En cambio si no expecificamos el type funcionara pero con una advertencia de que no especificamos el tipo.**_

_**Por lo que se recomienda usar el sistema `ES6 junto al package.json` o usar el `vanilla sin package.json`.\
El `package.json` esta hecho para la version `ES6` no para la `vanilla`.**_

_**Esto hace imposible `mezclar ambos sistemas`, aunque podemos usar vanilla sin especificar `"type": "module"` bajo la advertencia que nos dara nodejs `pudiendo hacer importaciones de modulos propios de node`. Pero no podemos usar `ES6` sin especificar `"type": "module"`**_

_**Podemos utilizar el `main` dentro de otra direccion dentro del proyecto, ejemplo: `./src/index.js`, incluso cambiarle el nombre y llamarlo app.js**_

### IMPORT

Podemos utilizar el metodo `vanilla: const modulo = require('dir_del_modulo')` o con o el `ES6: import {algo, una funcion, objeto, variable, etc} from 'dir_del_modulo'`.

**VANILLA**

```javascript
// Vanilla
const express = require('express'); // Metodo antiguo (vanilla)
// Utilizable con package.json sin especificar "type": "module", incluso habilita utilizar modulos propios de nodejs
```

**ES6**

```javascript
// ES6
import express from 'express';
import { soloEste } from 'algunArchivo'; // Para importar solo un atributo de un objeto, cuando se exporta un objeto y trae uno o varios atributos, para no tener que hacer referencia al objeto y luego al atributo, ejemplo: obj.soloEste
```

### EXPORT

<!-- Podemos utilizar el metodo `vanilla: module.exports = modulo` o el `ES6: export default {algo, una funcion, objeto, variable, etc}  o varios export const`. -->

**VANILLA**

```javascript
// Vanilla
const myFunc = () => {};
module.exports = myFunc;

// Para renombrar aca tenemos que exportar un objeto { "funcion": myFunc };
```

```javascript
// Vanilla
const myVarVan = "mi-variable-vanilla";
const myFunVan = () => console.log("Soy una funcion vanilla");

// Este no lo exporta
// module.exports = {
//   "texto": "Soy un texto",
// };

// Solo exporta el ultimo
module.exports = {
  "textVan": "Soy un texto vanilla", // Definimos mismo en la exportacion
  "varVan": myVarVan, // Renombramos
  myFunVan // Exportamos sin renombrar
};
```

**ES6:**

Tenemos dos formas de exportar aca:

1) Hacemos varios `export const` ...
2) Hacemos un solo `export default` con todo lo que vayamos a exportar

```javascript
// ES6
// Aca no tenemos forma de cambiar el nombre
export const fun1 = () => console.log("Soy funcion ES6");
export const fun2 = () => console.log("Soy funcion ES6");
```

```javascript
// ES6
const myVar1 = 'mi-valor1';
const myVar2 = 'mi-valor2';

// En este caso no nos dejara hacer mas de un export default {algo}, como en el vanilla donde nos dejaba hacer mas de un module.export pero nos tomaba el ultimo
export default {
  myVar1, // Sin renombrar
  'valor2': myVar2, // Renombrando
  'funcion': () => console.log('Aloja') // Definiendo al exportar
};
```

## CORRER LA APP

Hay varias formas:

1) Corriendo el archivo principal:

    Recordemos que devemos setear el archivo principal como main en el package.json (como vimos en el apartado `IMPORT/EXPORT`):

    ```bash
    node index.js
    ```

    Esta es la forma _"normal"_ de correr el server.

    A continuacion veremos una forma de dar un `alias` al `script` y utilizar `npm run`, asi podemos complejisar la forma de correr el server.

2) Usando scripts y el comando `npm run [alias-del-script]`:

    ```bash
    npm run [alias-del-script]
    ```

    - **npm run `dev`** para correr como desarrolladores, que por lo general corre `node index.js`.

    Recordemos que podemos setear scripts para correr en el package.json, a modo de alias para usar con npm run:

    ```json
    {
      "name": "my-server",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon index.js",
        "init-server": "npx json-server db.json"
      }
    }
    ```

En el ejemplo de arriba vemos como seteamos `nodemon index.js` para correr el archivo, a diferencia de `node index.js`.

### NODEMON

**Nodemon** es una dependencia de nodejs.

Nodemon es similar a `node --watch index.js` (o node index.js --watch, no recuerdo el orden) y sirve para ver los cambios hechos en el servidor en tiempo real y no tener que estar dando de baja al servidor y volviendolo a correr para ver los cambios.

Nodemon a diferencia de --watch, revisa los cambios en todos los archivos del directorio y no solo en el principal o el que corra node solo.

    En resumen:

      $ node --watch index.js
    
    Corre el server y revisa los cambios del archivo index.js en tiempo real.
    
      $ nodemon index.js
    
    Hacemos lo mismo pero revisando los cambios hechos en todo el directorio y no solo en el index.js.

#### INSTALAR Y SETEAR NODEMON

Instalamos nodemon en el proyecto:

```bash
npm install --save--dev nodemon
```

Agregamos el script al package.json:

```json
"scripts": {
  "start": "nodemon ./src/index.js"
}
```

Suponemos que el index.js es el main.\
Si esta suelto dentro del proyecto solo hacemos: `{ "start": "nodemon index.js" }`

**!!! Si el archivo principal esta en src, el main lo debemos setear asi:**

```json
{
  "main": "./src/index.js"
}
```

_**!!! EN ESTE CASO, NODEMON ESTARA "VIGILANDO" SOLO EL DIRECTORIO SRC**_

# EXPRESS

Es un framework que nos permite de una manera mas sensilla poder construir una api para que otros ( por ejemplo: otros front-ends, u otros sistemas ) puedan consumir ciertos datos y cosas que tenga la app nuestra, que estamos creando.

- Permitiendonos interactuar directamente con la base de datos
- Manejando autenticacion
- Validando las entradas de las cosas que se quieren tratar de poner (algo muy importante para mantener la consistencia y homogeneidad en las colecciones)
- Definir campos opcionales

## PASOS PARA CREAR EL PROYECTO

_**VISTA GENERAL DEL PROYECTO**_

```javascript
import express from "express";

//----------------------------------------------------------------
import { requestLogger } from "./middlewares/request-logger.mjs";
import tasksRouter from "./routes/tasks.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
//----------------------------------------------------------------

const app = express();
const port = 3000;

//----------------------------------------------------------------
app.use(express.json());
app.use(requestLogger);
app.use("/api", tasksRouter);
app.use(errorHandler);
//----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

1) Instalar e importar la dependencia de express:

    Instalamos desde la terminal

    ```bash
    npm install express
    ```

    Importamos la aplicacion

    ```javascript
    import express from 'express'; // O const express = require('express');
    ```

2) En una variable creamos lo que seria algo asi como el 'servidor' y seteamos el puerto donde va a correr el servidor:

    ```javascript
    const app = express();
    const port = 3000;
    ```

3) Corremos el servidor:

    ```javascript
    app.listen(port, () => { console.log(`Server is running on port ${port}`) })
    // Como segundo parametro podemos pasar una funcion que imprima un mensaje en la consola indicando en que puerto esta corriendo el servidor.
    ```

4) Que sucede con el _**.use()**_?:

    El `.use()` sirve para utilizar `middlewares`.

    ```javascript
    import { requestLogger } from "./middlewares/request-logger.mjs";
    import tasksRouter from "./routes/tasks.mjs";
    import errorHandler from "./middlewares/error-handler.mjs";

    app.use(express.json());
    app.use(requestLogger);
    app.use("/api", tasksRouter);
    app.use(errorHandler);
    ```

    Entre el punto 2 (`app = express()`) y el 3 (`app.listen()`) estan los middleware introducidos utilizando el .use().

    Que por mas que esten en el medio de esos dos puntos, se crean al final, son el desarrollo en si, por lo que los puntos 1, 2 y 3 son un pre-set de la app para empezar a desarrollar su interior _**(los .use(middlewares))**_.

    **Pertenecen a express pero son programadas en javascript, aunque no son nativas del lenguaje.**

## MIDDLEWARES y .USE() [app.use(middleware)]

Diferentes definiciones e info. sobre los middlewares:

- [DEF] Son funcionalidades intermedias entre el cliente y el servidor, que sirven para manejar la info que nos pasa el cliente entre otras cosas.

- [DEF] Funciones que se ejecutan antes o despues de los controladores, son intermediarios (ej.: autenticacion, registro).

- [DEF] Es el intermediario entre la peticion y el servidor. Para utilizar un middleware hacemos uso del metodo .use().

- [DEF] Tienen la siguiente forma:

  ```javascript
  app.use((req, res, next) => {
    // Logica
    next(); // Pasamos el middleware al siguiente app.use(middleware).
  });
  ```

  Algunas veces se puede pasar un `path`, porlo general cuando trabajamos con `routers`

  ```javascript
  app.use('/api',(req, res, next) => {
    // Logica
    next(); // Pasamos el middleware al siguiente app.use(middleware).
  });
  ```

  - req: Es la reques que nos llega (de afuera o desde otro middleware) y se va procesando.
  - res: Es lo que respondemos, es lo que vamos devolviendo (hacia afuera o hacia otro middleware?).
  - next: Es la funcion que se ejecuta para dar paso al request al sigueinte middleware.

- Un middleware muy utilizado es el siguiente, y es para leer los bodys de las request como formato JSON.

  ```javascript
  const express = require('express');
  const app = express();
  app.use(express.json());
  ```

- Cada vez que se utiliza un middleware, el middleware normalmente va inyectando informacion al request.

### NODE, BACKEND & BASE DE DATOS

"Las apps de Node.js devemos imaginarlas como cintas transportadoras" - Prof. Michel Sampli

Haciendo referencia a cuando llega un `request` y este tiene que ser procesado.

A diferencia de un `json-server` que es una herramienta para salir del apuro, un backend muy rustico, express y base de datos da otra solides a travez de los middlewares.

Maneja un archivo json como un database simple, incluso el solo le agrega id's a las cosas si no le mandamos uno, etc.

Recordamos: `npm install json-server`, `json-server --watch db.json`

#### SERVIDOR BACKEND

    CLIENTE <-> SERVIDOR BACKEND <-> BASE DE DATOS

El `servidor backend` esta entre el medio del cliente y de la base de datos, para que el cliente no interactue de manera directa con la base de datos (porque tiene seguridad, comprobaciones, etc, etc... ).

Para nuestro BACK-END los clientes pueden ser un monton de cosas, algunos ejemplos:

- Front-End (Javascript, React, php o lo que sea)
- Browser: Mozzilla, Chrome, Safari
- Postman
- Curl: es una especie de comando que representa como esta armado de forma sintetica el http-request
- Otro Back-End

La forma de comunicarse `CLIENTE / SERVIDOR BACKEND` es:

                    REQUEST
            (HTTP VERB, header, body)
          --------------------------->
    CLIENTE                         SERVIDOR
          <---------------------------
                    RESPONSE

El cliente SIEMPRE inicia TODAS y CADA UNA de las comunicaciones en este tipo de arquitectura.

Sinembargo los `WebSocket` crean un `canal bidireccional`, si bien _la primer comunicacion la hace siempre el cliente_, en los websockets se crea este tipo de canal.

**EJEMPLO: "cinta transportadora"**

    (Nos llega)     (En el medio tenemos la cinta trasnportadora)     (Devolvemos)
    HTTP Request ===>     () ->     () ->     () ->     ()      ====> HTTP Response

Las `RESPONSES` no siempre son para el cliente, a veces son para otros `MIDDLEWARES` para que hagan algo.

En este caso el request (va pasando por la cinta) pasa por varios middlewares a travez de los `.use()`

La cinta hace toda la "magia".

**Pasos (middlewares) mas comunes de la cinta (a modo de ejemplo):**

1) Anotamos en un `log` el `HTTP Request` que llega:\
Nos sirve de control y para saber que nos llega, para enfrentar posibles errores y caidas del sistema.

2) `Deserializar el body` y extraer los headers:\
Para ver a detalle que nos llega.\
Utilizar los `tokens` y autenticar luego, ya que los `token` y otras cosas nos llegan en los headers por ejemplo.

3) Verificamos la `autenticacion y/o autorizacion`:\
Que el ``token`` sea valido.\
Que haya sido alterado.\
Ver la info adicional que nos llega dentro del `token`, como por ejemplo a que usuario pertenece el `token`, en caso de que luego quieramos implementar ademas de autenticacion la autorizacion:\
Sin saber a que usuario pertenece el `token`, si ademas de querer tener acceso, puede hacer lo que quiere hacer.\
Ejemplo: entro a facebook y me da un `token`, luego veo a que endpoint se le "pega" para cambiar una historia de otro usuario, utilizo el `token` que tengo que es valido para cambiar una historia que no nos pertenece. Desde el punto de vista de la app tengo un `token` valido, ahora ese `token` tiene permisos para cambiar los datos? Eso va por el lado de la autorizacion. Con el `token` podemos autenticar y autorizar en una misma "jugada" sin saber a que usuario pertenece el `token`, pero pudiendo saber quien es si lo deseamos.

Los `TOKEN` podemos actualizar sus tiempos en cad interaccion, como hacen los bancos por ejemplo, que al recibir la request, toman el token y le alargan el tiempo que dira, asi mientras usas la app el el token parece "infinito" pero si no recibe actividad, luego de cierto tiempo el token vence y la app te fuerza a volver a autenticarte.

4) `Rutear` ese reques para saber a donde tiene que ir:\
Para tal ruta, tal logica, pera otra ruta, otra logica, y asi suscesivamente.\
Recordar utilizar plurales si son recursos vario: ejemplo, si son tareas utilizar /tasks y no /task.\
Enruta para la siguente "maquina".

5) Finalmente tenemos otro middleware (u otro modulo si lo queremos ver asi) que procesa lo que pidio el usuario y se lo devuelve.

#### MIDDLEWARE COMUNES

El siguiente middleware extrae la info que viene del body. Convierte el HTTP Request para que sea mas procesable.

```javascript
app.use(express.json());
// Con este middleware podemos simplemente hacer req.body y obtener el body, no hay que deszerializarlo a mano.
```

El siguiente middleware lo construimos nosotros:\

```javascript
import { requestLogger } from "./middlewares/request-logger.mjs";
app.use(requestLogger);
```

En ete middleware que construimos nos llega una request, hacemos un log de algunos datos y con next() damos paso al siquiente middleware, que si vemos el codigo de arrba es: app.use("/api", tasksRouter);

```javascript
export const requestLogger = (req, res, next) => {
  console.log(`👉 [${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
};
```

## ROUTERS

Los routers manejados con express tambien son middlewares

```javascript
// Ejemplos de routers con express

import express from "express";
const router = express.Router();

// Simula un DataBase muy simple copn un array
let tasks = [
  { id: "1", title: "Task 1", description: "Description for Task 1" },
  { id: "2", title: "Task 2", description: "Description for Task 2" },
  { id: "3", title: "Task 3", description: "Description for Task 3" },
];

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const task = req.body;
  task.id = (tasks.length + 1).toString();
  tasks.push(task);
  res.status(201).json(task);
});

router.delete("/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  tasks = tasks.filter((task) => task.id !== taskId);
  res.sendStatus(204);
});
```

## PETICIONES EN LA URL (QUERIES PARAMS)

Suelen ser opcionales.

**TENEMOS LOS REQUEST PRAMS (:param) Y LOS REQUEST QUERIES (?key=value)**

_**utl/path/params?key1=value1&key2=value2**_

Ejemplo:

```
http://miweb.com/route1/data/all?isTrue=true
```

Vemos que aca en la url estamos mandando info para traer data cuyo parametro isTrue es true.\
Como ejemplo podemos utrilizar un todo-list:
> <http://todolist.com/`tasks?isCompleted=true`>

Aca el `/tasks?isCompleted=true` enviamos info preguntando por tareas completadas.

```javascript
import { Router } from "express";

let todos: Todo[] = [
  { id: "t0", text: "do something...🦑", isCompleted: true },
  { id: "t1", text: "do something amazing ... 🦑⭐️", isCompleted: false },
  { id: "t2", text: "do nothing... 💤", isCompleted: false },
];

const router = Router();
router.get("/todos", (req, res, next) => {
  const params = req.query; // Linea importante
  const { isCompleted, searchTerm } = params;

  let todoList = todos;

  if (searchTerm) {
    todoList = todos.filter((e) => e.text.includes(searchTerm));
  } else {
    todoList = todos;
  }

  if (isCompleted) {
    let searchedState = isCompleted.toLowerCase() === "true";
    todoList = todoList.filter((e) => e.isCompleted === searchedState);
  }

  res.status(200).json({ todos: todoList });
});
```

# TYPESCRIPT EN EL PROYECTO

Debemos agregar typescript al proyecto

```bash
npm install typescript
```

```bash
npm install ts-node --save--dev
```

Instalamos `nodemon`

```bash
npm install nodemon --save--dev
```

Creamos un archivo llamado `nodemon.json` con el siguiente contenido:

```json
{
  "watch": ["src"],  // Revisa que hay en la carpeta src y es la que va a tomar como guia para ver si hay cambios y se debe actualizar
  "ext": "ts", // Especifica que extencion se utiliza
  "exec": "ts-node", // Especifica que comando ejecutar cuando hay cambios
  "delay": 500, // El delay para refrescar los cambios
  "legacyWatch": true
}
```

Actualizamos el `script` para correr la app en el `package.json`

```json
"scripts": {
  "start": "nodemon ./src/app.ts"
}
```

Luego lo corremos:

Hacemos un `npm install` para instalar las dependencias y luego un `npm run start` para correrlo.

```bash
npm install
```

```bash
npm run star
```

---
---
---

# DOCKER

Es un "superpoder" para el desarrollo moderno.

No es una maquina virtual tradicional, los contenedores son mas ligeros y rapidos.

```
DEFINICION: Es una plataforma de virtualizacion que permite empaquetar tus aplicaciones y sus dependencias en contenedores.
```

**DOCKER**: Manaeja contenedores Doker.

**CONTENEDOR**: Maquina virtual, con un OS cualquiera (puede ser distinto a de nuestro pc local), con servicios dentro (programas, etc) corriendo dentro de nuestro computador local con sus propios puertos.\
Un pc aparte pero dentro del nuestro.

**IMAGEN**: Receta para crear contenedores. Al ejecutarlas en Docker nos crea un contenedor docker.\
Son como DVD's con todo un sistema pre-creado, pre-seteado dentro, que nosotros instalamos o copiamos en un contenedor para empezar a trabajar, luego empezamos hacer las modificaciones.\
Nosotros tomamos esa imagen, copiamos su contenido en un contenedor, dejamos la imagen intacta y de lado, y empezamos a laburar en nuestro contenedor.\
Es como una foto, nosotros la pasamos por una fotocopiadora y trabajamos con la copia, la foto queda de base, intacta. (Bueno... de alguna manera, esa imagen, ese molde, esa receta se puede modificar, pero estariamos modificando el molde para crear algo, no lo que vamos a crear)

Para correr un contenedor docker debemos "prenderlo" como un pc real, darle a RUN y asi empieza a correr y a enviar/recibir info por sus propios puertos.

**VIRTUALIZACION:**

Con WSL tenemos una maquina virtual donde corremos GNU/Linux.

Crear un etorno virtual donde poder hacer cosas que en windows (u otros OS) no podriamos, como por jemplo crear una maquina virtual donde correr juegos de PS2 por ejemplo.

**Docker va a necesitar un puerto para compartir con nosotros la informacion**\
En docker estamos manejando instancias de un computador, por lo que va a tener un puerto ahi dentro, por el cual va a compartir la informacion.\
Pero nuestro computador local no tiene ni idea de los puertos que docker esta corriendo ni que esta corriendo por cada uno de ellos.

        Docker - Viertual (port: X) < - > (port : Y) Maquina Local

## POR QUE UTILIZAR DOCKER?

1) Tiene `consistencia`, garantiza que `tu app se ejecute de la misma manera en cualquier lado`.

    Docker funciona como un contenedor (capsula) donde metemos un monton de cosas:

    - Codigo
    - Servicios
    - Database
    - Librerias

    Esto nos permite transportar el contenedor de un lugar a otro. Por ejmplo, las casas hechas en contenedores hoy en dia, es facil levantarla e irse a vivir a otro lado, la idea aca es la misma.

    Entonces, como hacemos eso con docker?

    1) `Instalamos docker donde sea` (win, linux (cualqueir distro), donde sea que se pueda instalar)
    2) Le `pasamos el contenedor, lo monta y se termino`

    Esa es la ventaja de docker, `todo lo que este dentro de docker va a sobrevivir donde sea`, sea win, linux, mac... `mientras este en docker se va a correr dondesea sin ningun problema`.

2) Tiene `aislamiento`, cada contenedor `es un entorno aislado`, lo que `evita conflicotos entre apps` y `facilita la gestion de dependencias`.

3) Simplifica la `escalabilidad horizontal`, permitiendo `replicar contenedores` para manejar cargas de `trabajo crecientes`.\
**Por ejemplo**, si tenemos 100 clientes normalmente pero de repente empiezan aparecer mas y tenemos 500, nuestro contenedor esta diseniado y programado para soportar 100 clientes, por lo que replicamos 5 contenedores y cada contenedor se encara de 100 clientes.\
Esto lo poermite `AWS` y `Autoescaling` y `Api-Getaway`, y el concepto de `Load-Balancer` (<https://aws.amazon.com/es/autoscaling/>), (<https://aws.amazon.com/es/api-gateway/>) y (<https://www.f5.com/glossary/load-balancer>)

4) Es `eficiente`, los contenedores `son mas ligeros y rapidos que las maquinas virtuales tradicionales`, lo que `optimiza el uso de recursos`.\
`Tienen solo lo fundamental`, por lo que `correran en OS super chiquitos` como GNU/Linux. Algunos incluso tienen versiones de linux super `super light que pesan solo 200Mb`, ejemplo: la distro `Alpine`.

5) Tiene una `comunidad vibrante` y un `vasto ecosistema de herramientas y recursos`.\
Posee imagenes certificadas por el mismo docker y mismo la comunidad las va arreglando y haciendo mas pequenias y optimizando.

_**Veremos como monetar una base de datos relacional en docker**_

## BASE DE DATOS RELACIONALES (Conceptos Clave)

- **TABLAS**: Almacenan datos en `filas` y `columnas` tal cual lo hace exel.

- **CAMPOS (Columnas)**: Describen los `tipos de datos` que se almacenan (nombre, edad, direccion, etc.).

- **REGISTROS (Filas)**: Representan un `elemento` individual de datos (una persona, un producto, etc.).

- **RELACIONES**: `Conectan` tablas entre si para organizar la informacion de manera significativa.\
Describen como se conectan las entidades entre si. Ejemplo: un cliente puede realizar varios pedidos, un pedido contiene varios productos y a su vez pertenece a un solo cliente.\
To-Do: Tenemos varios usuarios, cada usuario tiene varias tareas, pero una tarea solo puede tener un usuario.

        task(id, name, description, status) <= [n] - tiene - [1] => users()
                                                      n:1
                                                      
        Esto se lea asi: - Una tariea tiene 1 usuario.
                         - Un usuario tiene n tareas.
- **CONSULTAS (SQL)**: `Lenguaje` para interactuar con la base de datos relacionales (buscar, insertar, actualizar y elimnar datos).

    Ejemplo de lenguaje SQL:

    ```sql
    SELECT column1, AGG(column2) AS alias_name, column1
    FROM table_name1 AS t1
    WHERE WHERE_condition
    GROUP BY column1
    HAVING HAVING_condition
    ORDER BY AGG(column2) DESC
    JOIN table_name2 AS t2
    ON t1.column2 = t2.column3;
    ```

    TRADUCCION: Seleccionamos unas columnas de unas tablas.\
    Seleccionamos estas, estas y estas columnas (as es para renombrar).\
    De la tabla tal (as es para renombrar).\
    Donde se cumpla esta condicion.\
    Quiero agruparlos por el tal columna.\
    Teniendo en cuenta que tal condicion.\
    Ordenandolas por la columna tal de manera ascendiente/descendiente.\
    Que se una con tal tabla.\
    Y que me traiga informacion adicional.

## COMIENZO CON DOCKER

Podemos utilizar la interfaz grafica o utilizar los comando docker desde la consola.\
En este caso comenzaremos con la interfaz grafica de docker.\

1) Buscamos `postgres`, vamos que tiene una `medallita` indicando que es `oficial`, le damos a `pull` y esperamos que `traiga ese contenedor`.\
Si observamos bien vemos que trae una `imagen`

    _**IMAGENES**_: Es como una "foto" que le tomamos a un `sistema operativo completo`. Le tomamos la foto a nuestro `contenedor` y lo `subimos a la nube`, luego con la palabra `pull` lo `jalamos` (por traduccion) a nuestro Docker.\
    _**SON SISTEMAS OPERATIVOS COMPLETOS**_

    En este caso alguien le tomo una "foto" a un OS con una base de datos en postgres y nosotros la estamos trayendo.

    _**Las `imagenes` son `recetas` para `crear un contenedor` con un `sistema operativo` con `servicios` (en este caso con un solo servicio que es una base de datos postgres)**_

2) Queremos que esa `imagen se convierta en un contenedor`, queremos montar en ese contenedor todo lo que tiene esa imagen.\
Para esto vamos al `apartado imagenes`, buscamos nuestra imagen, en este caso postgres y le damos a `run`.\
Ahora nos aparecera una ventana para setear todo:

    - **Nombre**: le damos un nombre, en este caso `todo-list-db-postgres`

    - **PORTS** (local):

        En esta parte le vamos a decir "quiero que mi computador comparta por X puerto que tiene mi computador lo que este contenedor va a estar pasando o corriendo por el puerto especifico de ese contenedor".

        Hacmos un puente entre computadores.

        **Docker va a necesitar un puerto para compartir con nosotros la informacion**\
        En docker estamos manejando instancias de un computador, por lo que va a tener un puerto ahi dentro, por el cual va a compartir la informacion.\
        Pero nuestro computador local no tiene ni idea de los puertos que docker esta corriendo ni que esta corriendo por cada uno de ellos. Por eso seteamos un puerto en nuestro pc local para compartir la informacion sin saber que hace docker con los puertos, simplemente ponemos a disponibilidad uno para que el llegue y "desembarque" lo que esta haciendo.

        Ejemplo: yo quiero que en el puerto 5432, que yo se que ese contenedor tiene corriendo alla por ese mismo puerto un servicio postgres, quiero que tambien lo comparta en mi computador en ese mismo puerto 5432. Entonces hacemos un puente de una torre a otra torre. Ambas tienen la misma puerta y queremos que pase info de una a la otra. Nosotros especificamos el numero de puerta, de puerto, para que docker nos pase la misma info por ese puente.

        **No va haber conflico si tienen el mismo `numero de puerto` ya que `no son la misma maquina`, una es la local y la otra es la virtual.**

        **`En el seteo nos indica que puerto va a usar el contenedor en la maquina virtual`, por lo que si nosotros ponemos el mismo numero no va a pasar nada.**

    - **VOLUMES**:

        (Es para agregar por parejas)

        - Host path
        - Container path

    - **ENVIRONMNETS VARIABLES**:

        _**Las `variables de entorno` nos permiten tener una variable con un valor dentro de nuestro computador**_

        (Es para agregar por parejas)

        - Variable:
        - Value:

        Esta imagen en particular va a tomar unas variables de entorno especificas, que necesitan de un nombre especifico:

        ```
        POSTGRES_USER = admin
        POSTGRES_PASSWORD = admin1234
        POSTGRES_DB = db-todo
        ```

        Esto porque cuando le demos RUN, el va a neceistar esta info, que usuario va a utilizar, la contrasenia y que base de datos va a crear de primera.

## CONECTAR CON LA BASE DE DATOS (Docker, DBeaver y PostgreSQL)

**Con esto no necesitamos descargar postgres y setear todo en nuestro navegador, solo utilizamos el contenedor. Y si necesitamos un cambio de version, traemos otro conentedor cargamos la base ahi y listo**

**Para vizualizar la base de datos y ver que lo que hacemos esta bien de una forma grafica es que vamos a descargar el programa `DBeaver version Community` (<https://dbeaver.io/>), este progama permite ver los diagramas ER (entidad/relacion) por lo que optaremos por ello.\
Tambien podemos utilizar la `extencion de VSCode Database Client JDBC` com complemento**

**Para conectar la base de datos con nuestro visualizador/gestor debemos indicar unos datos basicos, los mismos que seteamos en COMIENZO CON DOCKER - Punto 2:**

```
PORT: 5432 (recordemos que es localhost porque es puerto de nuestro pc)
NOMBRE: `todo-list-db-postgres` (en caso de dar un nombre desde este lado)

Los datos que importan son:

POSTGRES_USER = admin
POSTGRES_PASSWORD = admin1234
POSTGRES_DB = db-todo
```

### DBeaver

Nueva conexion -> PostgreSQL

En pestana General:

Server -> Connect by: Host
Server -> Host: localhost
Server -> Port: 5432
Server -> Database: db-todo

Authentication -> Authentication: Database Native
Authentication -> Nombre de usuario: admin
Authentication -> Contraseña -> admin1234
Authentication -> Save password: [opcional]

Luego le damos a Test Connection o Probar Conexion

### Extencion VSCode Database Client JDBC

Name (Connection Name): todo-list-db-postgres
Server Type: PostgreSQL o Docker (no probe Docker)
Host: 127.0.0.1
Port: 5432
Username: admin
Password: admin1234
Database: db-todo

Le damos a: +Connect

### RESUMEN

_**Listo! Ya tenemos nuestra `base de datos PostgreSQL`, en un `contenedor en Docker`, que montamos a travez de una `imagen de Docker` llamada `postgres`, en este caso el OS de la imagen es debian (`imagen = receta para crear un contenedor con un OS con servicios`, en este caso el servicio es PostgreSQL).\
Accedemos a ella, nos conectamos a esa instancia a ese computador virtual a esa DB, como vimos arriba, con un visualizador externo o gestor (`programa externo DBeaver` o `extencion de VSCode Database Client JDBC`).\
`Y si la queremos mover` simplemente nos llevamos el contenedor de Docker, o `si queremos cambiar la version de Postgre` creamos un nuevo contenedor actualizado y nos llevamos la info de la base de datos.**_

# DATA BASE

- PK (`Primary Key`): son las llaves primarias, unicas y de identificacion, son por convencion los id de los elementos. Sirven para diferencias elementos que a priori podrian parecer el mismo.

    Suele ser comun utilizar un numero entero que se autoincremente para manejar esto, se autocomplete cada vez que agreguemos un elemento a una tabla.\
    Por lo general cada vez que creamos una consulta de creacion en la tabla se asigna un valor incrementaddo al anterior, y si esta consulta es erronea, este valor no se mantiene, a la proxima consulta de creacion se le asignara otro id incrementado. Por lo que si corresponde darle el valor n a un id de un elemento, pero en la consulta se repite un valor en un campo unico, a lasiguiente consulta se le asignara el id n+1 aunque el id n parezca estar libre.\
    Lo mismo sucede si eliminamos el ultimo elemento de la tabla (o uno en el medio) dejando libre a priori un id, en este caso no se vuelve a utilizar ese id, y se sigue incrementando, sigue el orden pre-establecido sin importar si se borro un elemento y dejo libre a priori un id o si una consulta fue erronea y no se asigno el id, el autoincrementado sigue su rumbo sin mirar atras, ni siquiera a consultas erroneas.

    Existe otro sistema de asignacion de id de 128-bit como UUID (Unique User ID) donde se asignan id un poco mas largos, si no me equivoco un numero (o string?) de 11 digitos aprox. que se genera de manera automatica. Aqui ya se involucra un lenguaje de programacion que le pasa el id.

- UK (`Unique Key`): son valores unicos que toman ciertos campos de un elemento, el cual no puede repetir en ningun otro elemento.

Aca dentro de la base de datos ya tenemos un tipo de verificacion de datos, si queremos poner el mismo docuemtno de identidad a diferentes personas por ejemplo, algo que es unico, nos da error.

---

---

---

### MANEJAR VARIOS CONTENEDORES Y PROYECT

Con Railway <https://railway.app/> vamos a poder montar varios contenedores, y se va hacer muy facil porque tiene la coneccion directa con GitHub.\
Entonces nosotros subimos el repo directamente.

Recomendacion: estudiar AWS (Amazon Web Services), es un mundo grande y muy utilizado.

### CREAR UN CONTENEDOR SEGUN LEARNING DE DOCKERS

Vamos al directorio de nuestro proyecto, con los datos seteados, el Dockerfile seteado:

Seteo comun:

```dockerfile
# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "build" ]
```

Luego en la direccion del proyecto ejecutamos:

```bash
docker build -t welcome-to-docker .
```

Seteamos todo como vimos en el apartado de `COMIENZO CON DOCKER - Punto 2`

Para ver el front-end vamos a <https://localhost/numero_de_puerto_seteado>

---

---

---

# CREACION DEL PROYECTO

1) `Creamos la carpeta` de nuestro poyecto
2) `Abrimos la terminal` dentro de la carpeta del proyecto
3) Creamos el `package.json` con el siguiente comando y lo seteamos:

    ```bash
    npm init
    ```

    Nos pedira setear varias cosas, pero por lo general le damos que si a todo.
    - El `nombre del proyecto`, nos sugiere el del directorio del mismo, le damos enter o lo cambiamos, es a gusto, pero por lo general es el mismo.
    - Nos sugiere la `version` 1.0.0, le damos enter.
    - **Nos pide una `descripcion` del proyecto, aqui la solemos dar.**
    - **El archivo principal: `entry point` o el `main`, que nos sugiere es `index.js` pero podemos cambiarlo ahora (suel ser cambiado por `app.js`, `App.js` en `React`, `main.js`, etc, incluso podriamos darle `./src/app.js`), `esto no crea el directorio src ni el archivo app.js, o index.js si no lo seteamos`.**
    - El `test command`, que no lo seteamos, aunque podriamos.
    - El `repositorio de git`, que no lo seteamos.
    - Las `keywords` que tampoco las seteamos.
    - **El `autor` que lo seteamos.**
    - **La `licencia` que tambien la seteamos como `MIT` a priori.**

    Al finalizar digitamos `yes` y le damos `enter`.

    Sale todo lo de abajo por consola (cambia el `(node:numero)` por cada ejecucion nada mas, lo demas tiene la misma consistencia, dentro de las variantes de nombres que setamos).

    ```log
    (node:6373) ExperimentalWarning: CommonJS module /home/andres/.nvm/versions/node/v23.2.0/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /home/andres/.nvm/versions/node/v23.2.0/lib/node_modules/npm/node_modules/supports-color/index.js using require().
    Support for loading ES Module in require() is an experimental feature and might change at any time
    (Use `node --trace-warnings ...` to show where the warning was created)
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.
    
    See `npm help init` for definitive documentation on these fields
    and exactly what they do.
    
    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.
    
    Press ^C at any time to quit.
    package name: (todo-backend) 
    version: (1.0.0) 
    description: This is a backend project for a to-do list application.
    entry point: (index.js) ./src/app.js
    test command: 
    git repository: 
    keywords: 
    author: Andres Auguchenco
    license: (ISC) MIT
    About to write to /home/andres/Desktop/11-15-migel/todo-backend/package.json:
    
    {
      "name": "todo-backend",
      "version": "1.0.0",
      "description": "This is a backend project for a to-do list application.",
      "main": "./src/app.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "Andres Auguchenco",
      "license": "MIT"
    }
    
    
    Is this OK? (yes) yes
    ```

    Esto creara un documento `package.json` dentro del directorio del proyecto con el siguiente contenido:

    ```json
    {
      "name": "todo-backend",
      "version": "1.0.0",
      "description": "This is a backend project for a to-do list application.",
      "main": "./src/app.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "Andres Auguchenco",
      "license": "MIT"
    }
    ```

    Ahora debemos crear el directorio `src` dentro del proyecto, y dentro de src el archivo `app.js`.

    ---

    _**CREACION DEL PROYECTO POR DEFECTO**_

    El siguiente comando `setea todo por default` y ejecuta el yes final (vemos que lo hacemos en un directorio llamado prueba).

    ```bash
    npm init -y
    ```

    Crea el siguiente `package.json`. Recordemos, tampoco crea el archivo `index.js`.

    ```json
    {
      "name": "prueba",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "description": ""
    }
    ```

    Y sale lo siguiente por consola

    ```bash
    (node:19842) ExperimentalWarning: CommonJS module /home/andres/.nvm/versions/node/v23.2.0/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /home/andres/.nvm/versions/node/v23.2.0/lib/node_modules/npm/node_modules/supports-color/index.js using require().
    Support for loading ES Module in require() is an experimental feature and might change at any time
    (Use `node --trace-warnings ...` to show where the warning was created)
    Wrote to /home/andres/Desktop/11-15-migel/prueba/package.json:
    
    {
      "name": "prueba",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "description": ""
    }
    ```

    Ahora debemos crear el archivo `index.js`.

    ---

### NPM INSTALL

Ahora, si ejecutamos:

```bash
npm install
```

Se crea otro archivo llamado package-lock.json con el siguiente contenido:

```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "todo-backend",
      "version": "1.0.0",
      "license": "MIT"
    }
  }
}
```

### INSTALAR CUALQUIER DEPENDENCIA

Y si instalamos una dependencia, por ejemplo nodemon:

```bash
npm install --save--dev nodemon
```

Se creara una carpeta llamada `node-modules` dentro del directorio del proyecto con `todos los modulos nativos de nodejs` y los que le indiquemos en el `npm install --save--dev nodemon`

El archivo `package-lock.json` se ve modificado por esto, alli se listaran todos los modulos y sus versiones y otros atributos. Alcanzando cientos de lineas.

Mientras que el `package.json` agrega:

```json
{
  "dependencies": {
    "nodemon": "^3.1.7"
  }
}
```

Tal que queda asi:

```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "description": "This is a backend project for a to-do list application.",
  "main": "./src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Andres Auguchenco",
  "license": "MIT",
  "dependencies": {
    "nodemon": "^3.1.7"
  }
}
```

## INSTALLACION DE EXPRESS

Para instalar express y comenzar con el proyecto backend ejecutamos

```bashc
npm install express
```

#### NODEMON

Tambien es recomendable instalar `nodemon`.

Nodemon corre el proyecto y `actualiza los cambios en tiempo real`, sin tener que dejar de ejecutar la aplicacion y volver a ejecutarla para actualizar los cambios.\
Es como `node --watch index.js` pero en lugar de estar pendientes de los cambios del archivo `index.js`, esta pendientes de los `cambios en el total del proyecto`.\
_Queda corroborar si solo esta pendiente de la carpeta src, o del proyecto entero_.\
Queda pendiente del proyecto entero si! Si no lo seteamos para que no.

```
[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
```

Nodemon se ejecuta asi: `nodemon ./src/app.js` en este caso (default: `nodemon index.js`)

```bash
npm install --save--dev nodemon
```

Y setear un script en el `package.json` para correr la app:

```json
{
  "scripts": {
    "start": "nodemon ./src/app.js"
  }
}
```

Quedando nuestro `package.json` asi:

```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "description": "This is a backend project for a to-do list application.",
  "main": "./src/app.js",
  "scripts": {
    "start": "nodemon ./src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Andres Auguchenco",
  "license": "MIT",
  "dependencies": {
    "express": "^4.21.1",
    "nodemon": "^3.1.7"
  }
}
```

Y con `express` listo para ser utilizado, y `nodemon` para ejecutar el proyecto.

Ejecutamos con el siguiente comando gracias al `script` seteado:

```bash
npm run start
```

Podemos comenzar el desarrollo!

---

**CONSIDERACIONES PREVIAS**:

- Tener instalado y seteado `nodemon` para trabajar en desarrollo. Si no lo seteamos escucha todo el proyecto entero.

  ```
  [nodemon] 3.1.7
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,cjs,json
  ```

- La diferencia entre `npm run dev` (nodemons ./src/spp.js) y `npm run start` (node ./src/app.js) es que `dev` es para la parte de `desarrollo` (escuchando cambios) y `start` para la parte de `poruccion` (sin escuchar cambios).

# EXPRESS

Lo instalamos, desde la terminal y en el directorio del proyecto ejecutando:

```bash
npm install express
```

Lo `importamos`, creamos una variable (`app`) con toda la `instancia express` para empezar a utilizarlo y definimos un `puerto` por el cual la app va a estar `escuchando` (recibiendo las `request` y mandando las `response`), ademas de decirle a la instancia que `escuche` por ese puerto:

```javascript
// RUTA: ./src/app.js (Archivo principal)

import express from "express"; // Mucho utilizarn: const express = require('express'); para importar express
const PORT = 3000; // Declaramos el puerto por el cual la app va a estar escuchando. Recibiendo y mandando (por convencion suele ser el 3000 o 5000)
const app = express(); // Creamos nuestra instancia express en app

/* ACA VA A ESTAR EL CUERPO DEL PROYECTO */

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
}); // Le decimos a la app el puerto que va a usar, y si queremos le damos un mensaje o algo.
```

Ya tenemos todo listo, seteado, para comenzar a utilizar express y `crear nuestra aplicacion backend entre app = espress() y app.listen(PORT)`.

**Ahora vamos a empezar a usar nuestra instancia de applicacion, nuestrop "pedazo" de express para que funcione nuestra app. Ya importamos express, creamos una instancia express en app, definimos un puerto por el cual va a estar escuchando y le decimos a esta instancia app que escuche por ahi.**

**RECORADTORIO:**

- MIDDLEWARE: Son `intermediarios`, son `acciones` que vamos haciendo sobre la `request` a medida que `va pasando por la app` antes de devolverla al cliente.

  Los middleware son funciones que reciben tres parametros: reques, response y next:

  Request (objeto) es lo que nos llega del cliente.
  Response (objeto) es lo que le devolvemos al cliente (y tambien al siguiente middleware?)
  Y next (funcion) hace saltar la reques al siguiente middleware.

- .use(): Son para `insertar nuestros middlewares` en la app.

## PASOS PARA DESARROLAR LA APP BACKEND CON EXPRESS (teniendo preseteado el entorno)

1. **Parseamos los resultados de nuestra api (la request) a json: [`app.use(express.json())`]**

   Vemos el `primer`, mas utilizado y siempre importante y facilitador `middleware (express.json())` `insertado` en app mediante el `.use()`.\
    Este middleware `parsea toda la reques a json` para que sea mas facil trabajar con ella, y lo hace de una, para que no tengamos que hacerlo de forma manual.

   ```javascript
   app.use(express.json()); // Esto es para que los resultados de nuestra api sean parseados a json
   ```

   Veamos como va quedando la app para que graficamente le demos sentido a donde se van a ir colocando las cosas a medida que vayamos desarrollando la app luego del pre-set:

   ```javascript
   // RUTA: ./src/app.js (Archivo principal)

   import express from "express";
   const PORT = 3000;

   const app = express(); // INICIO

   app.use(express.json()); // Primera insercion de middleware

   app.listen(PORT, () => {
     console.log(`Listening on http://localhost:${PORT}`);
   }); // FIN
   ```

   Entre la linea `INICIO` y la linea `FIN` vamos a estar introduciendo el `codigo` que vayamos especificando abajo.

```
A esta altura ya tenemos preseteada la app para comenzar a desarrollar y parseado a JSON las request que nos llegan.
Que nos queda? El objetivo principal de la app:

Escuchar las peticiones (request) que nos llegan desde el front u otros lugares (cliente, o los clientes) y responderlas (response) segun lo que nos esta llegando. Todo desde el puerto que definimos.

Para ello tenemos que trabajar con las request que van llegando, mediante middlewares insertados con el .use(), pasarse la request entre ellos (entre middlewares) con next() y devovler las response al cliente.

next() es la funcion que hace saltar la request al siguiente middleware.

Los middleware son funciones que reciben tres parametros: reques, response y next:

Request (objeto) es lo que nos llega del cliente.
Response (objeto) es lo que le devolvemos al cliente (y tambien al siguiente middleware?)
Y next (funcion) hace saltar la reques al siguiente middleware

RECOMENDAMOS utilizar Postman para testear la app a medida que la vamos creando.
```

2. **CREAMOS NUESTRO PRIMERA RESPUESTA A UNA PETICION GET:**

   Las response tienen 2 metodos para enviar info:

   - `res.send(objeto_cualquiera);`
   - `res.json(objeto_json);`

   Trabajamos con nuestro `endpoint` principal. El simple `http://localhost:3000/`.

    ```javascript
    // RUTA: ./src/app.js (Archivo principal)

    app.get('/', (req, res) => {
      res.json({
        "message": "Welcome!"
      });
      console.log(`[GET] Welcome!`)
    });

    // METODOS MAS USADOS DE req
    // console.log('IP:', req.ip);
    // console.log('METHOD:', req.method);
    // console.log('PROTOCOL:', req.protocol);
    // console.log('HOST:', req.hostname);
    // console.log('PATH:', req.path);
    // console.log('URL:', req.url);
    // console.log('PARAMS:', req.params);
    // console.log('QUERY:', req.query);
    ```

3. **CREAMOS MAS GETS**

   A efectos practicos creamos un `array` llamado `todos` simulando datos que ya son traidos de una base de datos, para ahorrarnos esa parte primero y tabajar esto.\
    En un futuro los datos estaran almacenados en una base de datos y los llamaremos de ahi, ahora no es momento para complicarla.

   Creamos nuestro siguiente GET:

    ```javascript
    // RUTA: ./src/app.js (Archivo principal)

    app.get('/todos', (req, res) => {
      res.json(todos);
      console.log(`[GET] To-Do's: ${JSON.stringify(todos)}`)
    });
    ```

   Veamos una vista general de como va nuestro proyecto:

   ```javascript
   // RUTA: ./src/app.js (Archivo principal)

   import express from "express";
   const PORT = 3000;

   const app = express();
   app.use(express.json());

   const todos = [
     { id: 1, title: "Task 1", completed: false },
     { id: 2, title: "Task 2", completed: true },
     { id: 3, title: "Task 3", completed: false },
   ];

   app.get('/', (req, res) => {
     res.json({
       "message": "Welcome!"
     });
     console.log(`[GET] Welcome!`)
   });

   app.get('/todos', (req, res) => {
     res.json(todos);
     console.log(`[GET] To-Do's: ${JSON.stringify(todos)}`)
   });

   app.listen(PORT, () => {
     console.log(`Listening on http://localhost:${PORT}`);
   });
   ```

3) **CREAMOS NUESTRO PRIMER POST.**

    Creamos un post para agregar to-do's:

    ```javascript
    // RUTA: ./src/app.js (Archivo principal)

    app.post('/todos', (req, res) => {
      const newTodo = {
        id: Date.now(),
        ...req.body
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      console.log(`[POST] New To-Do: ${JSON.stringify(newTodo)}`);
    });
    ```

4) **AHORA VAMOS CON EL METODO PUT (Actualizamos)**

    Vamos a actualizar una tarea de la lista de tareas.

    ```javascript
    // RUTA: ./src/app.js (Archivo principal)

    app.put('/todos/:id', (req, res) => {
      const id = req.params.id;
      // const { id } = req.params;
      const index = todos.findIndex(todo => todo.id === Number(id));
      if (index === -1) {
        res.status(404).json({ "message": "To-Do not found" });
        console.log(`[PUT] To-Do id ${id} not found`);
        return;
      };
      todos[index] = {
        ...todos[index],
        ...req.body
      };
      res.json(todos[index]);
      console.log(`[PUT] Updated To-Do: ${JSON.stringify(todos[index])}`);
    });
    ```

5) **FINALMENTE VAMOS CON EL METODO DELETE**

    Vamos a eliminar una tarea de la lista de tareas.

    ```javascript
    // RUTA: ./src/app.js (Archivo principal)

    app.delete('/todos/:id', (req, res) => {
      const id = req.params.id;
      // const { id } = req.params;
      const index = todos.findIndex(todo => todo.id === Number(id));
      if (index === -1) {
        res.status(404).json({ "message": "To-Do not found" });
        console.log(`[DELETE] To-Do id ${id} not found`);
        return;
      };
      const todoDeletedList = todos.splice(index, 1);
      res.json(todoDeletedList[0]);
      console.log(`[DELETE] Deleted To-Do: ${JSON.stringify(todoDeletedList[0])}`);
    });
    ```

**SOLO QUEDA PERSISTIR LOS DATOS**

## PERSISTENCIA DE DATOS (Postgre y Docker)

Luego de tener la `logica` de nuestro programa debemos hacer que `persistan` los `datos`.\
Recordemos la base de datos `PostgreSQL` que teniamos en `Docker`.

1) **Para trabajar con `PostgreSQL` debemos `intalar` la dependencia `pg` en nuestro `proyecto`**

```bash
npm install pg
```

2) **Ahora toca importarlo a nuestro proyecto y conectar la base de datos:\
Recordemos la base de datos que creamos la clase anterior.**

NOMBRE DEL CONTENEDOR DOCKER: `todo-list-db-postgres` (en caso de dar un nombre desde este lado, podemos darle esto)

```
Los datos que importan son:\
POSTGRES_USER = admin\
POSTGRES_PASSWORD = admin1234\
POSTGRES_DB = db-todo

HOST: localhost\
PORT: 5432 (recordemos que es localhost porque es puerto de nuestro pc)
```

Ahora en nuestro archivo principal seteamos la coneccion a la base de datos.

```javascript
// RUTA: ./src/app.js (Archivo principal)

// Hacemos esto porque no soportan la nueva forma de import/export
// De la manera vanilla alcanza con la siguiente linea: const { Pool } = require('pg');
import pg from 'pg';
const { Pool } = pg;

const database = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'db-todo',
  password: 'admin1234',
  port: 5432,
});
```

3) **Ahora toca modificar la logica para que funcione con la base de datos y no con el array que simulaba la base de datos al principio**

Las funciones pasan a ser `async`.

Cambiamos el codigo viejo del segundo get:

Antiguo GET

```javascript
app.get('/todos', (req, res) => {
  res.json(todos);
  console.log(`[GET] To-Do's: ${JSON.stringify(todos)}`)
});
```

Nuevo GET

```javascript
// RUTA: ./src/app.js (Archivo principal)

app.get('/todos', async (req, res) => { // La funcion se vuelve asincrona
  try {
    const data = await database.query(`SELECT * FROM todos`); // Hacemos la consulta a la base de datos, ya manejamos lenguaje SQL
    res.json(data.rows); // Le devolvemos las filas de los datos traidos de la DB
  } catch (error) {
    // Recordemos el error 500 es error en la base de datos
    res.status(500).json({ "message": "Error on Data Base - Can not get data" });
    console.log(`[GET] Error: ${error}`);
  }
});
```

---
---
---
---
---

# ORM

Es una herramienta que nos permite `modelar` (como se van armar las tablas y bases de datos) y hacer `consultas` a una `base de datos`. Sin que nosotros mismos armemos las `consultas SQL`.

# BASES DE DATOS (Relacionales [SQL] y No Relacionales [NoSQL])

Las `relacionales` son las mas comunes y antiguas, son mas robustas y poco flexibles. Aunque actualmente esta cambiando la tendencia hacia bases de datos `no relacionales`.

**Nosotros utilizaremos la base de datos no relacional mas popular, `MongoDB`.**

## MongoDB - NoSQL (No Relacional)

-> _Para usarlo hay que crearse una cuenta en `mongo atlas` ya que nos permite usar la nube y es mas facil que usar el servidor local_

Es un sistema de gestion de bases de datos NoSQL orientado a documentos.

**No utilizan el sistema de tablas.**

Es:

- Flexible: Almacena datos en documentos flexibles `similares a JSON`, por lo que los campos pueden variar entre documentos y la estructura de datos puede cambiarse con el tiempo.

- Escalable: Es una DB distribuida en su nucleo, por lo que la `alta disponibilidad`, la `escalabilidad horizontal` y la `distribucion geografica` estan integradas y son faciles de usar. La escalabilidad es un punto criticado en las DB NoSQL. Las DB SQL suelen tener mejor escalabilidad.

- Potente: Las consultas `ad hoc`, la `indexacion` y la `agregacion en tiempo real` ofrecen maneras potentes de acceder a los datos y analizarlos.

### Conceptos Claves

**DOCUMENTOS**:

Almacena datos en documentos tipo `JSON` (DSON ?).\
Cada documento es un `conjunto de pares clave-valor`, similar a un objeto JavaScript o un diccionario Python.

```json
{
  name: "Sue",                      <- field: value
  age: 26,                          <- field: value
  status: "A",                      <- field: value
  groups: [ "news", "sports" ]      <- field: value
}
```

**COLECCION**:

Los documentos se `agrupan` en colecciones. Las colecciones son `analogas a las tablas` de las DB SQL, pero `no tienen esquemas`, lo que _permite que los documentos tengan diferentes estructuras dentro de la misma coleccion_.

**BASE DE DATOS**:

Las colecciones estan organizadas dentro de la DB.\
Un servidor MongoDB puede alojar varias DB y cada una de ellas puedem contener varias colecciones.

```
MongoDB (tiene 1o+ colecciones)
  -> Coleccion (tiene 1o+ documentos)
    -> Documentos (tiene 1o+ pares clave:valor)
```

### Modelado de Datos

Es el proceso de disenar la estructura de una DB.\
Las DB SQL tienen esquemas fijos, mientras que MongoDB ofrece un alto grado de flexibilidad.

- Flexibilidad: Puede incluir varios tipos de datos dentro de un solo documento, como cadenas, numeros, matrices y documentos anidados, lo que facilita la representacion de datos jerarquicos complejos.

- Esquema Dinamico: MongoDB permite agregar o eliminar campos de documentos sin afectar otros documentos en la misma coleccion, brindando adaptabilidad a medida que su aplicacion evoluciona.

- Normalizacion: Puede decidir si normalizar los datos (almacenar los datos relacionados en colecciones separadas y hacer referencia a ellos) o desnormalizar los datos (incrustar datos relacionados en un solo documento) segun los requicitos de su app.

#### NORMALIZADO vs. NO NORMALIZADO

**NO NORMALIZADO**

```json
// Coleccion de clientes
[
  {
    id: 1,
    nombre: "Pepe",
    auto: {
      matricula: "ABC1234",
      anio: 2000,
      marca: "ford",
      modelo: "fiesta",
      color: "negro"
    }
  },
  ...
]
```

```json
// Coleccion de autos
[
  ...
  {
    id: 123,
    matricula: "ABC1234",
    anio: 2000,
    marca: "ford",
    modelo: "fiesta",
    color: "negro"
  },
  ...
]
```

Vemos la `info duplicada`.

**NORMALIZADO**

```json
// Coleccion de clientes
[
  {
    id: 1,
    nombre: "Pepe",
    auto: 123
  },
  ...
]
```

```json
// Coleccion de autos
[
  ...
  {
    id: 123,
    matricula: "ABC1234",
    anio: 2000,
    marca: "ford",
    modelo: "fiesta",
    color: "negro"
  },
  ...
]
```

Vemos que ahora el `auto` de `pepe` esta `relacionado` a la coleccion de autos mediante un `id` que se le asigna automaticamente la base de datos MongoDB.

`Duplicar la info tiene ventajas y desventajas`. Por un lado es mas veloz acceder a los datos, por el otro ocupa mas lugar y es mas dificil mantener la consistencia en los datos ya que hay que actualizar en varios documentos o colecciones.

**El gran dilema en la computacion es: ganar `espacio o rendimiento` a cambio de perder el otro**

## MongoDB - Atlas - Compass

1) Instalamos `MongoDB` (<https://www.mongodb.com/try/download/community>).\
Descargamos el archiv `msi` que es el instalador, lo instalamos pero no le damos a que sea un servicio ya que nos consumira recursos. Luego de instalado vamos a la carpeta donde se instalo, mas precisamente a donde este el archivo mongod.exe y copiamos esa direccion, la tenemos que agregar al path en las partiables de entorno. Luego vamos a archivos de programa y ahi dentro creamos una carpeta llamada data y dentro una llamada db y ya tendriamos listo nuestro mongo sin consumir recursos, solo cuando nosotros lo indiquemos.
Luego de instalarlo, chequeamos que este instalado ejecutando en la terminal `mongod`, si esta instalado nos abrira la terminal de mongo.

2) Creamos una `cuenta` en `MongoDB Atlas`, o entramos con Google.\
Esto nos permitira `levantar instancias de bases de datos en la nube`, `servicios cloud` (en la nube).\
Para usarlo es tan facil como crear un `Cluster` y dentro de ese cluster creamos una `Base de Datos` donde vamos a poner nuestras colecciones. (<https://account.mongodb.com/account/login>)

3) Instalamos `MongoDB Compass`, que es un GUI para MongoDB (<https://www.mongodb.com/products/tools/compass>).

### ARQUITECTURAS

#### ARQUITECTURA 3 CAPAS

Es la vista global del sistema.

```
FE: Frontend (cliente)\
BE: Backend (servidor/cliente)\
DB: Database (servidor)

FE - BE - DB
```

1) El `frontend` hace la `request`.

2) El `backend` la `maneja` (autenticacion y autorizacion).\
Segun lo que `resuelve` el backend, este `pide` (`o no`, y saltamos al paso numero 4) `info` a la `base de datos`.

3) La `base de datos` `procesa la solicitud` del backend y `le da la info si todo sale bien`.

4) El `backend` `devuelve` la `response` al `frontend`.

#### ARQUITECTURA CLIENTE-SERVIDOR

Siempre en esta arquitectura, el cliente inicia todas y cada una de las "conversaciones".

A priori tenemos:

```
FE: Cliente es el Frontend
BE: Servidor es el Backend

FE - BE

El FE manda la request
El BE devuelve la response
```

**Hay otras arquitecturas que soportan la comunicacion bidireccional (websocket o streaming) donde el servidor manda la info primero al cliente. Ejemplo es en los chats donde un cliente manda un mensaje, este llega al servidor y el servidor se lo manda al otro cliente.\
La primer request la hace el cliente siempre, no vas a tener wsp porque wsp te obliga, despues que te conectas por propia voluntad se genera esta coneccion bidireccional.**

_**Pero hay otra perspectiva:**_

```
BE: Cliente es el Backend
DB: Servidor es la Database

BE - DB

El BE manda la query
El DB devuelve la data
```

Aca es el `BE el que hace de cliente` y hace la consulta, y la `DB la que hace de servidor` y maneja la respuesta.

Para ello el `BE` debe tener un `Cliente DB`.\
Un caso de Cliente DB, pero que no esta dentro de ningun BE es el caso del `MongoDB Compass`.

Asi es como la arquitectura de 3 capas es en realidad una doble arquitectura de 2 capas girando entorno al BE donde se "switchea" su rol de cliente a servidor y biseversa segun la etapa en la que estemos.

### COMPASS

Es un Cliente DB.

Es un GUI. Nos ofrece una interfaz grafica para manejar y consultar una base de datos MongoDB.

Asigna id a cada elemento de un documento, por su propia cuenta.

### CONFIGUARAR UNA BASE DE DATOS CON MONGODB

Luego de `instalado mongo`, comprobamos que este instalado mediante el comando `mongod` en el `shell`, el cual nos tirara info y nos dejara escuchando a por comandos.

Seguimos los siguientes pasos para configurar una base de datos en MongoDB.

1) Nos creamos la cuenta en MongoDB Atlas (<https://account.mongodb.com/account/login>), nosotros entramos con nuestra cuenta de Google (auguchencomorales).

2) Creamos una `base de datos` y un `Free Shared Cluster` dentro.

3) Debemos ingresar el nombre de usuario y la contrasenia (NO EL DE MONGO ATLAS).\
Creamos el primer Cluster (despues podemos agregar mas):

```
NOMBRE de DB: my-node-db (se ingresa al crear la base de datos, despues se puede cambiar)
NOMBRE del CLUSTER: my-cluster
USER: admin
PASSWORD: admin1234
MONGO DB ROLES: AtlasAdmin (atlasAdmin@admin)
AUTHENTICATION METHOD: SCRAM
RESOURCES: All Resources
```

Tambien podemos agregar mas usuarios con roleses.

4) Luego, nos pedira un ip especifica para poder entrar, esto por temas de seguridad, si ponemos nuestra ip, como cambia cada cierto tiempo vamos a tener problemas por lo que a priori seteamos la ip en Network Accesss y le damos el valor:`0.0.0.0/0.`\
El cliente por lo general no se entera de como entrar a la database, por eso esta el BE en el medio, pero no esta libre de ataques por eso se usan otros mecanismos como filtrar por IP con white-list, etc.

5) Concectarse a la Base de Datos con Node.js

Vamos al apartado Clusters, ahi buscamos el cluster y y le damos a Connect

Primero instalamos la dependencia mongodb

```bash
npm install mongodb
```

Atlas nos sugiere un string base para conectarnos

MONGO URI

```
mongodb+srv://<db_username>:<db_password>@my-cluster.b70ro.mongodb.net/?retryWrites=true&w=majority&appName=my-cluster
```

Solo debemos cambiar <db_username> y <db_password> por nuestros datos y nos quedaria algo asi en este caso:

```
mongodb+srv://admin:admin1234@my-cluster.b70ro.mongodb.net/?retryWrites=true&w=majority&appName=my-cluster
```

O directamente el codigo para Node.js

```javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin1234@my-cluster.b70ro.mongodb.net/?retryWrites=true&w=majority&appName=my-cluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 }); // ACA admin NO TIENE NADA QUE VER CON EL USUARIO
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
```

Vemos que uri lo seteamos con el string que nos da mongo.

6) En el apartado Database Access tendremos el apartado par agregar usuarios que pueden conectarse, con roles. Les debemos asignar un nombre de usuario y contrasenia.

7) Abrimos Compass y en CONNECTIONS le damos a +:

Nos pide el URI, que sera el mismo que setamos arriba, con el string que nos dio Atlas modificado con nuestros datos de usuario.

Ya tenemos nuesra database conectada a compass y seteada. Vamos ahora con Node.js.

## MONGODB Y PROYECTO NODE.JS

Utilizaremos `mongoose` como ORM (para crear y gestionar consultas a la base de datos).

Lo instalamos

```bash
npm install mongoose
```

Lo usamos

```javascript
import mongoose from "mongoose";
mongoose.connect(mongoUri); //mongoUri es el URI que nos da mongo como vimos arriba
const db = mongoose.connection; // Para utilizar la DB con la variable bd
// En caso de error
db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
// En caso de conexion exitosa
db.once("open", () => {
  console.log("Connected to MongoDB");
});
```

## INTERACCION ENTRE EL PROYECTO Y MONGODB

La funcion es async porque espera una response de la base de datos.

```javascript
import UserModel from '../models/userModel';

router.get('/getAll', async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/post', async (req, res) => {
  try {
    const data = new UserModel({
      name: req.body.name,
      age: req.body.age
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await UserModel.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findByIdAndDelete(id);
    res.send(`Document with ${data?.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
```

Ahora que es UserModel.find(), new UserModel?

```javascript
import { Schema, model } from "mongoose";

const dataSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

const Data = model("User", dataSchema);

export default Data;
```

Resumiendo:

```javascript
import { Schema, model } from "mongoose";

const Data = model("User", new Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
}););

export default Data;
```

---
---
---

# EXPRESS

```javascript
import express from "express";
const app = express();

app.use('/', (req, res, next => {})); // Las request con la ruta '/' usan el middleware indicado

app.get('/', (req, res, next => {})); // Las rutas con el metodo get y las rutas '/' usan el middleware indicado
```

**Manejo de una request con metodo get y direccion /getAll desde otros archivos:**

```javascript
// Archivo princiapl
import express from "express";
import Rutes from 'dir-relativa-de-Rutes'
const app = express();
app.use(express.json()); // Para todas las request
Rutes(app);

// Archivo auxiliar
const Rutes = (app) => {
  app.get('/getAll', (req, res, next) => {});
};
export default Rutes;
```

```javascript
// Archivo princpial
import express from "express";
import Rutes from 'dir-relativa-de-Rutes'
const app = express();
app.use(express.json()); // Para todas las request
app.use('/getAll', Rutes);

// Archivo auxiliar
import express from "express";
const router = express.Router();
router.get('/getAll', (res, res, next) => {}); // Puedo definir varios router.get per o para diferentes rutas
export default router;
```

```javascript
// Request GET /route

// Poner la linea en el archivo principal o llamarla desde una funcion en otro archivo
app.get('/route', myMiddleware);

// Manejar la ruta con un middleware Rutes que utiliza express.Router()
app.use('/route', Rutes);
router.get('/route', myMiddleware); // Similar a app.get() pero como usamos express.Router() es asi
```

---
---
---

# .USE() [ app.use('/route', middleware) ]

Recordemos el formato de los middlewares:

```javascript
(req, res, next) => { /*CODIGO*/ };
```

Los app.use() tienen el siquiente formato:

```javascript
app.use(route, middleware);
```

Si la ruta no se especifica y se hace `app.use(middleware)` se toma por defecto la ruta actual donde se esta trabajando. Se setea por default la ruta `"/"`. Entonces seria: `app.use('/', middleware)`.

Sin embargo si tenemos: `app.use(/route, myMiddleware)`
Los request donde la ruta contenga "`/route`", alli se le aplica el middleware `myMiddleware`.

## ROUTERS app.use(route, middleware) y express.Router()

Sirve para manejar `request` segun la `ruta` que traigan e implementar codigos para los `metodos` que traigan esas rutas.

**Puede darse lo suiguiente:**\
Tener la ruta `/tareas` para la cual hay `2 request` uno para mostrar (`get`) todas las tareas y otro para agregar (`post`) una tarea, por lo que tendremos:

```javascript
// Archivo principal

import myMiddleware from 'ruta-relativa-del-archivo-que-exporta-myMiddleware'; // Importamos myMiddleware

app.use('/tareas', myMiddleware); // Maneja las request que traigan en su interir la ruta /tareas aplicandoles el middleware myMiddleware
```

El reques al llegar a la linea app.use() se le va aplicar el middleware myMiddleware, el cual lleva al request al archivo de donde importamos el middleware `myMiddleware`, y alli va a ser tratado segun el metodo, porque la ruta es la misma. (Cabe aclarar que se pueden tratar otras rutas)

``` javascript
// Archivo de myMiddleware

import express from 'express';
const router = express.Router(); 

router.get('/tareas', (req, res) => {
  // Codigo para mostrar
});

router.post('/tareas', (req, res) => {
  // Codigo para agregar
});

export default router;
```

---

Veamos el siguiente caso

```javascript
import userRoutes from "./routes/userRoutes";
app.use("/api/users", userRoutes);
```

Aca indicamos que los request que la ruta comience con "/api/users" utilicen el middleware userRoutes.

Por ejemplo:

Nuestra reques llega a la siguiente linea y resulta que trae en su interiror la ruta : `"/api/users"`, por lo que va a utilizar el middleware `userRoutes`.

```javascript
app.use("/api/users", userRoutes);
```

Que pasa con el middleware `userRoutes` en este caso?

Veamos el archivo desde el cual importamos el middleware:

```javascript
// ./routes/userRoutes

import express from 'express'; // Importa express
const router = express.Router(); // asigna a router la funcion que trae express llamada Router() que sirve para manejar request segun la ruta que traigan y crear CRUD's segun el metodo que traigan.

// Router() trae sus metodos get, post, put, patch, delete.
router.get('/getAll', (req, res) => {
  // Codigo
});

export default router;
```

Vemos que este middleware crea mas middleware segun el resto de la ruta de la request y segun su metodo.

Por ejemplo, si la request al final traia en su interior la ruta: `"/api/users/getAll"` y el metodo `get` va a pasar por el middleware indicado en router.get, es decir en `router.get("/getAll", middleware)`.

---
---
---

# MIDDLEWARES PARA EXTRAER LA INFO DE LAS REQUEST (Body Parser)

1) EXPRESS:

El primero era usar un middleware que trae express:

Lo instalamos:

``` bash
npm install express
```

Extraccion: Esto comvierte la request directamente. La reasigna dentro de la funcion.

```javascript
import express from "express":
consta app = express();
app.use(express.json()); // Aca exteraemos la info
```

2) BODY PARSER:

Es la forma mas utilizada.\
Este middleware hace lo mismo que app.use(express.json()), lo unico que ahora express introdujo un metodo propio para eso. Pero antes no lo tenia, por lo que body-parser se hizo popular.

Primero lo instalamos:

```bash
npm install body-parser
```

Luego lo usamos:

```javascript
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false })); // Esto no se que hace
app.use(bodyParser.json()); // Este es el que parsea, es similar a express
```

Desde mi punto de vista body-parser es al pedo ahora que express trajo su funcionalidad.

---
---
---

# CORSE MIDDLEWARE

Es para el Backend.

```javascript
app.use(cors());
```

Es un middleware que proporciona seguridad, indicando la forma en la que debe conectarse un cliente.\
`El browser ya tiene esto integrado, pero el backend no.`

---
---
---

# ARCHIVOS .env

Son archivos con varaibles de entorno.\
Una utilidad es darle seguridad a nuestro proyecto.

Ejemplo, si agregamos un mapa de google al proyecto vamos a tener una credencial para usarlo, estas credenciales van en los .env

Son `archivos de desarrollo` y debemos agregarlos al `.gitignore`, en una linea.

```.gitignore
# dotenv environment variables files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local
```

Los .env.algo son ejemplos, tenemos uno para desarrollo, otro para testing, otro para produccion.

Si quedo ignorado por el .gitignore aparecera gris, atenuado en el explorador de archjivos de VSCode.

Para trabajar con estos archivos en Node.js vamos a tener que instalar la libreria `dotenv`.

```bash
npm install dotenv
```

Creamos nuestro archivo .env y le agregamos alguna variable.\
Literalmente se llama .env (como los .gitignore).\
Ejemplo del contenido:

```env
MONGO_URI=mongodb+srv://admin:admin1234@my-cluster.b70ro.mongodb.net/?retryWrites=true&w=majority&appName=my-cluster
PORT=3000
```

Para usarlo tenemos que importarlo y utilisar dotenv:

```javascript
import dotenv from "dotenv";

dotenv.config(); // Para que autosetee las configuraciones

// Hacemos las comprobaciones por si no existe alguna de las variables que vamos a utilizar y las asignamos:

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined.");
}
const mongoUri = process.env.MONGO_URI;

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined.");
}
const port = parseInt(process.env.PORT, 10); // El segundo valor indica en que base esta el numero del primer valor en string.
```

---
---
---
---
---

# VARIABLES DE ENTORNO

```
Actualmente se estan manejando las variables de entorno en AWS Secrets Manager <https://aws.amazon.com/es/secrets-manager/>
Que sirve para remplazar los archivos .env
```

Trabajaremos con la libreria `dotenv`\
Primero debemos instalarla:

```bash
npm install dotenv
```

Ahora devemos importarla y ejecutar su configuracion con `.config()` para usarlo:

```javascript
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});
```

O

```javascript
require('dotenv').config({
  path: '.env.development.local'
});
```

Creamos nuestro archivo .env (en este caso sera: `.env.development.local`)

---

**RECORDEMOS IGNORAR TODOS LOS ARCHIVOS .ENV AL SUBIR LOS REPOS**

Con la pagina web para crear `.gitignore` content file <https://www.toptal.com/developers/gitignore>, si damos la etiqueta `Node` ya nos incluye en el documento lo necesario para ignorar los .env basicos (aunque es buena practica agregar el OS que estamos utilizando ne la etiqueta, ya que nos generara cosas buenas, entre mas info mejor):

.env\
.env.development.local\
.env.test.local\
.env.production.local\
.env.local

Aunque es simple agregar cosas para ignorar, solo hay que listar los documentos a ignorar, uno por fila y listo.\
En caso de directorios se listan asi: `node_modules/`\
Los archivos: `nombre_archivo.extencion`\
Archivos ocultos sin extencion: `.nombre_archivo`\
Todos los archivos de cierta extencion: `*.extencion`

Pero si tenemos dudas, hacemos una prueba con un fake-proyect y vamos probando.

---

## Contenido de un Archivo .env.development.local

Lo vamos a utilizar mucho. Algunos frameworks ya lo tienen implementado.\
Con typescript vamos a necesitar una interfaz.

```.env
API_PORT=3000

DB_NAME_DEFAULT=postgres

DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_list_db
DB_USER=admin
DB_PASSWORD="admin1234"
```

Y para utilizarlas debemos hacer:

```javascript
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});

import pg from 'pg';
const { Pool } = pg;

const connectDb = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
```

---
---
---
---
---

# CONFIGURANDO LA BASE DE DATOS

Creamos un archivo `initDb.js` y le cargamos la coneccion del archivo principal:

```javascript
// ./src/initDb.js

import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});

import pg from 'pg';
const { Pool } = pg;

const conectDb = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default connectDb;
```

Lo importamos desde el archivo principal:

```javascript
import conecctDb from './initDb.js';
```

Y listo, todo sigue igual.

**Ahora nos creamos funciones dentro del archivo initDb.js para crear la base de datos y las tablas en caso de que no esten creadas:**

```SQL
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
```

El `ON DELETE CASCADE` es para que cuando se elimine un usuario, se eliminen todas sus tareas.

**El archivo `initDb.js` nos quedaria asi despues de unas cuantas modificaciones:**

```javascript
// require('dotenv').config({
//   path: '../.env.development.local'
// }); Es para la vanilla, nosotros estamos con {"type":"module"}
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});

import pg from 'pg';
const { Pool } = pg;

const setDb = async (db) => {
  return new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: db,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
};

const createDb = async (db) => {
  try {
    const database = await setDb(process.env.DB_NAME_DEFAULT);
    await database.query(`CREATE DATABASE ${db};`);
    await database.end();
    console.log(`[SUCCESS]: Database ${db} created.`);
  } catch (error) {
    console.log(`[ERROR]: Can not create database ${db}`);
    console.error(`[ERROR]: ${error}`);
  };
};

const createTables = async (db) => {
  const [usersTableName, todosTableName] = ["users", "todos"];
  const tableQueries = `
    CREATE TABLE IF NOT EXISTS ${usersTableName} (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS ${todosTableName} (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  try {
    const database = await setDb(db);
    await database.query(tableQueries);
    await database.end();
    console.log(`[SUCCESS]: Tables ${usersTableName} and ${todosTableName} created if does not exist before.`);
  } catch (error) {
    console.log(`[ERROR]: Can not create tables ${usersTableName} and ${todosTableName}`);
    console.error(`[ERROR]: ${error}`);
  };
};

const initializeDb = async (db) => {
  await createDb(db);
  await createTables(db);
  return await setDb(db);
};

export default initializeDb;
```

# JWT & BCRYPT

JWT: Acronimo de JSON Web Token, es una cadena de caracteres de una longitud arbitraria (por lo general 256?).\
Bcrypt: Es una libreria para encriptar y desencriptar informacion.

Para utilizarlos los instalamos:

```bash
npm install bcrypt jsonwebtoken
```

Creamos una api para hacer un registro con un metodo post a la ruta /register:

```javascript
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {

    const existingUser = (await database.query(`SELECT * FROM users WHERE email = $1`, [email]));
    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0]['email'].replaceAll(`\"`, '');
      console.log(`[POST] Error: failed trying to add user ${user} to users table, user already exists`);
      return res.status(400).json({
        error: `User ${user} already exists`
      });
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await database.query(
      'INSERT INTO users (full_name, email, password) VALUES($1, $2, $3) RETURNING id, full_name, email',
      [fullName, email, hashedPassword]
    );
    
    const newUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '8h'}
    );

    res.status(201).json({
      status: "OK",
      message: 'User created successfully',
      user: newUser,
      token
    });
    console.log(`[POST] New User: ${JSON.stringify(newUser)}`)

  } catch (error) {
    res.status(500).json({ "message": "Error on Data Base - Can not create user" });
    console.log(`[POST] Error: ${error}`);
  };
});
```

---
---
---
---
---

# AUTENTICACION (Authentication)

Es un proceso por el cual nos damos a conocer. Y se nos da permiso.

# AUTORIZACION

Es el proceso por el cualo se nos permite o no hacer cosas.

# JWT

Es una herramienta para crear `tokens` para autenticaciones.\
Es nuestra credencial temporal para poder estar autenticados y obtener la autorizacion para hacer cosas.

## JWT Y TOKENS

Es una llave. Un codigo. Un hash superlargo. Es un estandar.

1) Loguin request
2) Se genera un JWT usando una clave secreta (secret key)
3) Retorna un JWT
4) Further request done with JWT

Estan firmados digitalmente. Nos garantiza que no sea falso.

**Partes de un JWT:**

1) Header: con un type (ejemplo JWT) y un algoritmo de encriptacion (ejemplo RS256).
2) Payload: es informacion (ejemplo JSON file) que queremos guardar, y esta encriptada en los 256 caracteres que componene el JWT, en este caso por usar RS256.
3) Signature: es la firma, es para desencriptar la info, si coincide con el del servidor se desencripta sino no.

Esta informacion encriptada en 256 caracteres, al momento de desencriptarla se conviernte en nuestro header, payload y firma.

## Estructura de JWT

```
HEADER:
{
  "alg": "RS256", // Es el nombre del algoritmo de integracion que le definimos
  "type": "JWT", // Es el tipo de token. Existen varios tipos de token peros nos enfocamos en JWT
  ...
}

PAYLOAD
Tambien llamada carga util
{
  "name": "Richard Thompson",
  "exp": 1703037180,
  "sub": "00000000-0000-0000-0000-111111111111";
  "admin": true,
  ....

}

SIGNATURE: ({...})
<cryptographic signature to ensure integrity>
```

#### Header

Es la cabeza del token, tiene el nombre-type del tipo de algoritmo que va utiliza para ser encriptado/desencriptado. El nopmbre-type del tipo de token que esta utilizando.

#### Payload

Es la info que queremos guardar dentro del token, que sera visible luego de la desencriptacion.

#### Signature

Va encriptada en el token.\
Codigfica el header y el payload, y los firma con el `JWT SECRET` que nosotros creamos y utilizando el algoritmo que el header le especifico.\
Es la firma con la que sellamos el token, y si la firma la tiene el servidor vamos a poder desencriptar.

1. Sirve para desencriptar la informacion, va en el token y cuando el servidor lo recibe, si coincide con la que el tiene va a desencriptar la informacion.\
2. Si no es la misma firma, nunca va a desencriptarla por lo que la info estara protegida.

#### Descripcion del proceso

Llega el token (una cantidad enorme de caracteres) y copn 3 partes encriptadas, HEADER, PAYLOAD y SIGNATURE. Utilizando el algoritmo de desencriptacion y nuestro `JWT_SECRET` validamos la firma y en caso de coincidir con la nuestra desencriptamos la informacion completa.

## BEARER TOKEN

Necesitamos un metodo para autenticarnos. Metodo de autenticacion dentro de HTTP, por HTTP, que utilizo enviando un token en el header.

Utiliza poniendo un barrera.

El `bearer token`, sin importar con que metodo yo este consultando (GET, POST, PUT, DELETE) yo voy a tener protegida mi URL, mi info.

Este metodo consiste en enviar el token a travez de los headers de las request.\
Utiliza el atributo Authorization par mandarlo:

```json
// REQUEST 

{
  header: { "Authorization" : "Bearer abc123" , ...},
}
```

Y utiliza el prefijo Bearer seguido del token, por lo que para obtener el token tenemos que hacer `header.Autorizaion.splice[" "](1)`

# GENERAR UN TOKEN

```javascript
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
};
```

# MODELS (user)

Sirven para modelar el comportamiento de ciertos objetos

```javascript
import initializeDb from './config/db/initDb.js';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});
const database = await initializeDb(process.env.DB_NAME);

export const getUsers = async (email) => {
  const result = await database.query(`SELECT * FROM users`);
  return result.rows;
};

export const getUserByEmail = async (email) => {
  const result = await database.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const createUser = async (fullName, email, hashedPassword) => {
  const result = await database.query(
    'INSERT INTO users (full_name, email, password) VALUES($1, $2, $3) RETURNING id, full_name, email',
    [fullName, email, hashedPassword]
  );
  return result.rows[0];
};
```

# CONTROLLERS (REGISTER)

```javascript
import { generateToken } from "../config/jwt";
import { createUser, getUserByEmail } from "../models/user.model";
import bcrypt from 'bcrypt';


export const registerCtrl = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser.id) {
      const user = existingUser['email'].replaceAll(`\"`, '');
      console.log(`---\n[POST] Error: failed trying to add user ${user} to users table, user already exists`);
      return res.status(400).json({
        error: `User ${user} already exists`
      });
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUser(fullName, email, hashedPassword);

    const token = generateToken(newUser.id, newUser.email);

    res.status(201).json({
      status: "OK",
      message: 'User created successfully',
      user: newUser,
      token
    });
    console.log(`---\n[POST] New User: ${JSON.stringify(newUser)}`)

  } catch (error) {
    res.status(500).json({ "message": "Error on Data Base - Can not create user" });
    console.log(`---\n[POST] Error: ${error}`);
  };
};
```

# ROUTES

```javascript
import express from 'express';
import { registerCtrl } from '../controllers/auth.controller.js';

export const authRoutes = express.Router();

authRoutes.post('/register', registerCtrl);
```

En app.js

```javascript
import { authRoutes } from './routes/auth.routes.js';

app.use('/auth', authRoutes);
```

# VERIFICANDO TOKEN

```javascript
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization?.split(' ')[1]; // "Bearer dsfms8h243ui437y8g3"

  if (!token) { return res.status(403).json({ message: 'Token not provided' }) };

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Mandamos en el request la pregunta decodificada
    next(); // Mandamos que siga tranqui nomas

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  };
};
```

Mandamos en el request la info decodificada, o sea, nos llega el request con la info encriptada, y cuando validamos el token la desencriptamos y la hacemos continuar.

# RUTAS PRIVADAS Y TOKEN

Hasta ahora temos lo siguiente:

```javascript
// imports
// express and routes
import express from 'express';
import { authRoutes } from './routes/auth.routes.js';
import { todosRoutes } from './routes/todos.routes.js';
// .env's
import dotenv from 'dotenv';
import { verifyToken } from './middlewares/auth.middleware.js';
// set environment and config enviroment variables
dotenv.config({
  path: '.env.development.local'
});
const PORT = process.env.API_PORT;

// app init
const app = express();
// parsing request to json
app.use(express.json());

// routes
app.use('/auth', authRoutes);

app.use(verifyToken);
// Las siguientes rutas estaran protegidas, las anteriores no lo estaban

app.use('/todos', todosRoutes);

// end app and starting server
app.listen(PORT, () => { console.log(`---\nListening on http://localhost:${PORT}`) });
```

Para usar rutas privadas debemos colocar una authentiocacion verificando el token antes de las rutas.

Usemos en postman la autorizacion que nos da cuando nos registramos con un nuevo usuario, enviemosla en el header, en \`headers.Autorization = \`Bearrer ${token}\`.

# LOGIN

```javascript
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user?.id) {
      console.log(`---\n[POST] Error: failed trying to login user ${email}, invalid email.`)
      return res.status(404).json({ "message": "Invalid email, user not found" });
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(`---\n[POST] Error: failed trying to login user ${email}, invalid password.`)
      return res.status(401).json({ "message": "Invalid password, invalid credentials" });
    };
    const token = generateToken(user.id, user.email);
    console.log(`---\n[GET] User ${user.email} logged in successfully`);
    res.status(201).json({
      status: "OK",
      message: 'User logged in successfully',
      user: {
        name: user.full_name,
        email: user.email,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ "message": "Error on Data Base - Can not log user" });
    console.error(`---\n[POST] Error: can not logged in user ${email}\n${error}`);
  }
};
```

# PRE-SCRIPT POSTMAN

```javascript //???
var headerValue = pm.response.json().token;
pm.environment.set("authToken", headerValue);
```

---
---
---
---
---

# JWT

_Es un mundo complejo, por eso utilizamos librerias auxiliares (como por ejemplo bcrypt, etc)._

Sirve para autenticar y autorizar al usuario.\
Le da una identidad para identificarse ante el backend, para realizar acciones en el sistema segun su tipo de usuario y si este se lo permite.

Es una "llave" que va en el request. Para que el backen sepa quien es.

**Como podriamos identificar un usuario?**

1) Primero lo hacemos con un par username/password:

- Al iniciar session el usuario se "loggea" con su username y su password, a lo que ledevolvemos un token.

2) Luego con el token para que vaya y venga:

- Le devolvemos un token al usuario para que en el proximo request que vuelva mande el token. Verificamos el token y si es valido lo dejamos "actuar".

Este token es un string largo y complejo el cual nosotros tenemos formas de mantenerlo seguro y sea dificil de decifrar.

Esto hace que no se expongan los datos del usuario de forma frecuente (salir a caminar con 100mil dolares en el bolsillo todos los dias a la calle), ademas de que le ahorra poder de computo, ya que loggearse require un sistema mayor de computo que encryptar y desencryptar un token.\
Es como una tarjeta de debito, te la pueden robar facilmente pero no la pueden utiliizar si no tienen el pin.

## Donde se garda el token?

El token se suele guardar el en `localStorage` (Application -> Local storage). Un lugar facil de acceder a todo publico.

---
---
---

## Ventajas de los .env

Sirve para guardar constantes en el lado del desarrollo.\
Pueden contener informacion sensible.\
Se pueden ingnorar los archivos .env con .gitignore para que no sean exportados.

### Archivos .env y DB's

Por ejemplo, en desarrollo se suelen utilizar base de datos de desarollos, por eso hay varios .env que son para cada parte de usuario.\
Hay varios tipos de entorno:

- Desarrollo
- Testing
- Local al programador
- Produccion

---
---
---

# BCRYPT

Es una libreria para encriptar.

Encriptar es un proceso por el cual se toma un mensaje y siguiendo ciertos algoritmos se crea otro, que para desifrarlo se debe obtener la manera exacta de desifrado sino es imposible.\
Ejemplo conocido es la maquina enigma, aunque unos pioneros fueron lo Romanos, corrian una cierta cantidad de lugares las letras que utilizaban. Por ejemplo:

```
  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
  | | | | | | | | | | | | | | | | | | | | | | | | | |
  M N O P Q R S T U V W X Y Z A B C D E F G H I J K L

  Palabra: ATACAR
           ||||||
           MFMOMD
```

Hoy en dia no se utilizan estas "chootadas", se utilizan matematicas y numeros primos.

## CONTRASENIAS, BASES DE DATOS Y LOGGIN

_https hace un cifrado de los request/response por ejemplo, a diferencia de http_

Las guardamos encriptadas por seguridad. Por si nos vulneran la BD y para no verlas nosotros mismo como clientes, etica.

Esto lo hacemos al momento de crear el usuario.

Ahora, que pasa si hay 2 usuarios con la misma contrasenia? Seran iguales en la base de datos?\
Si veo dos contrasenias iguales puedo hacer ingenieria inversa para ver que algoritmo se utilizo para encriptarlas. (Rainbow Tables, son tablas que se utilizan con contrasenias tipicas a las cuales se les aplican algoritmos tipicos de encriptacion y desifrar que algotirmo se utilizo en el caso de que no haya un factor que los diferencie, este metodo no funciona si dos cadenas de caracteres nos devuelven el mismo mensaje encriptado, ya que no hay algo que los diferencias. Para diferncias cosas se utilizan otros algoritmos pseudo-aleatorios).

SALT:

Se crea un hash, se agrega una cadena de caracteres y se vuelve a hashear.

Un algoritmo conocido es el SHA-256, y en este caso tratar de mantenerse actualizados en la ultima version.

Veamos como se crea el usuario y como autenticamos un usuario con bcrypt y jwt.

SING:

Es la firma que se agrega al token.

SCRET KEY:

Nosotros podemos agarrar un token valido, y cambiar el payload para hacerle crer a la pagina que soy otro usuario, pero para que eso no suceda existe la secreat key, es nuestra llave secreta con la que firmamos los token, si nuestra firma no viene en el token es que no es valido.

# SIGNUP / LOGIN / AUTH

Parte del codigo de abajo esta en typescript.

## SIGNUP

```javascript
// ../node-jwt/src/routes/login.ts

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, saveUser } from "../db/Users";

const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }; 
    saveUser(username, hash);
    return res.status(201).json({ message: "User registered successfully" });
  });
});

export default router;
```

## LOGIN

```javascript
// ../node-jwt/src/routes/login.ts

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, saveUser } from "../db/Users";

const router = express.Router();

router.post("/login", async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const { username, password } = req.body;
  const user = findUserByUsername(username);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Authentication failed, invalid user" });
  };

  if (secretKey) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    };
  };

  return res.status(401).json({
    message: "Authentication failed, user and password must match...",
  });
});

export default router;
```

## AUTH

```javascript
// ../node-jwt/src/middleware/auth.ts

import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const authMiddleware: express.RequestHandler = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed, missing token" });
  }

  if (secretKey) {
    try {
      const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed, invalid token" });
    }
  }
};

export default authMiddleware;
```

---
---
---
---
---

# MONGO Y DOCKER

Nos traemos la imagen `mongo` en docker y la corremos.\
Devemos setear el nombre del contenedor y el puerto, por defecto el `27017` y nada mas.

Abrimos nuestro MongoDB Compass y creamos la conexion seteando el nombre y el puerto solamente.\
Luego creamos nuestra db y una coleccion.

Luego podemos utilizar MongoDB Atlas para tener la database en la nube.

# MONGOOSE

Es la dependencia de mongo para utilizar mongo con JS.\

Primero la instalamos:

```bash
npm install mongoose
```

Luego nos conectamos con:

```javascript
import dotenv from "dotenv";
dotenv.config({
  path: ".env.development.local",
});
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // mongodb://localhost:27017/todo_list

export const connectMongoDb = async () => {
  try {
    // mongoose.connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // autoIndex: false,
    // poolSize: 10, -> the default value is 5
    // connectTimeoutMS: 10000 -> the default value is 10000
    // ESTAN TODAS EN DESUSO SOLO ALCANZA CON: mongoose.connect(MONGODB_URI);
    // });
    mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Can not connect MongoDB todo_list", error);
    process.exit(1); // Es para cerrar los procesos
  }
};
```

MongoDB no necesita de un usuario y una contrasenia lo que trae grandes errores de seguridad, luego hay procesos que se pueden implementar para agregar usuarios y formas de autenticarse.

Creamos un modelo para nuestros todos:

```javascript
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    is_completed: { type: Boolean, default: false },
    // Nos ahorramos lo de abajo con el timestamp
    // created_at: { type: Date, default: Date.now },
    // updated_at: Date,
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
```

Ahora creamos un todo para guardar en MongoDB

```javascript
import { Todo } from "../models/todo.model.js";

export const createTodoCtrl = (req, res) => {
  const { title, description, is_completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      is_completed,
    });

    // await newTodo.save(); SE SUPONE ES ASYNC Y FUNCIONA COMO UNA, PERO DA ERROR
    // SOLUCION
    async function saveTodo() {
      await newTodo.save();
    }
    saveTodo();

    console.log(
      `---\n[POST] New To-Do: To-Do ${newTodo.title} created successfully`
    );
    res.status(201).json({
      sratus: "success",
      message: "To-Do ${newTodo.title} created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log(`---\n[POST] New To-Do: Can not create a new To-Do\n${error}`);
    res.status(500).json({
      sratus: "error",
      message: "Error on Data Base - Can not create a new To-Do",
    });
  }
};
```

En nuestras rutas

```javascript
import express from "express";
import { createTodoCtrl } from "../controllers/todos.controller.js";

export const todosRoutes = express.Router();

todosRoutes.post("/", createTodoCtrl);
```

En el principal

```javascript
import { connectMongoDb } from "./config/mongoDb.js";
import express from "express";
import { todosRoutes } from "./routes/todos.routes.js";
import dotenv from "dotenv";
dotenv.config({
  path: ".env.development.local",
});
const PORT = process.env.API_PORT;

// ---
connectMongoDb();

const app = express();
app.use(express.json());

// ---
app.use("/todos", todosRoutes);

app.listen(PORT, () => {
  console.log(`---\nListening on http://localhost:${PORT}`);
});
```

Que pasa con los ID's? En MongoDB son automaticos, se crean de forma automatica.

# FLEXIBILIDAD DE MONGO

En mongo podemos romper los esquemas de los datos al enviarlos, no son rigidos como en las DB relacionales./
Por eso se opta por utilizar sistemas hibridos, es decir, una base de datos relacional como esquema (Schema) para una no relacional.

Por otra parte no se recomienda utilizar DB no relacionales para tipos de datos que si requieran un esquema rigido como un usuario, donde tiene un username y un password, y, aunque no los utilize, simpre va haber un lugar predefinido para ellos.

## Integracion de Mongo y Postgres

```javascript
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  is_completed: { type: Boolean, default: false },
  user_id: { type: Number, required: true } // AGREGAMOS EL ESPACIO PARA EL USER_ID
}, {
  timestamps: true,
});

export const Todo = mongoose.model('Todo', todoSchema);
};
```

Ahora editmaos el controlador

```javascript
export const createTodoCtrl = (req, res) => {
  const { title, description, is_completed } = req.body;
  // Manejamos el token y extraemos el id
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;
  try {
    const newTodo = new Todo({
      title,
      description,
      is_completed,
      user_id: userId // Agregamos el id al todo
    });


    async function saveTodo() {
      await newTodo.save();
    }
    saveTodo();

    console.log(`---\n[POST] New To-Do: To-Do ${newTodo.title} created successfully`);
    res.status(201).json({
      sratus: 'success',
      message: "To-Do ${newTodo.title} created successfully",
      data: newTodo
    });
  } catch (error) {
    console.log(`---\n[POST] New To-Do: Can not create a new To-Do\n${error}`);
    res.status(500).json({
      sratus: 'error',
      message: "Error on Data Base - Can not create a new To-Do"
    });
  }
};
```

Pero recordemos el middleware que creamos, donde al request le agregabamos el token del usuario porque ya se habia autenticado:

```javascript
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer dsfms8h243ui437y8g3"

  if (!token) { return res.status(403).json({ message: 'Token not provided' }) };

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Mandamos en el request la pregunta decodificada
    next(); // Mandamos que siga tranqui nomas

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  };
};
```

Podemos modificar el codigo de arriba y que quede mas sensillo:

```javascript
export const createTodoCtrl = (req, res) => {
  const { title, description, is_completed } = req.body;
  const userId = req.use.id; // SIMPLIFICAMOS A ESTA SOLA LINEA
  try {
    const newTodo = new Todo({
      title,
      description,
      is_completed,
      user_id: userId
    });

    async function saveTodo() {
      await newTodo.save();
    }
    saveTodo();

    console.log(`---\n[POST] New To-Do: To-Do ${newTodo.title} created successfully`);
    res.status(201).json({
      sratus: 'success',
      message: "To-Do ${newTodo.title} created successfully",
      data: newTodo
    });
  } catch (error) {
    console.log(`---\n[POST] New To-Do: Can not create a new To-Do\n${error}`);
    res.status(500).json({
      sratus: 'error',
      message: "Error on Data Base - Can not create a new To-Do"
    });
  }
};
```

---
---
---
---
---

# TODOS con MONGO DB

Para obtener SQL hacemos un:

```SQL
SELECT * FROM todo WHERE todo.id = id
```

Nosotros vamos a utilizar los metodos de mongoose.

```javascript
import { getUsers } from "../models/user.model.js";

export const getAllUsersCtrl = async (req, res) => {
  try {

    const users = await getUsers();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al traer los usuarios', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al traer los usuarios'
    });
  }
};
```

```javascript
import initializeDb from '../config/db/initDb.js';
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.development.local'
});
const database = await initializeDb(process.env.DB_NAME);

export const getUsers = async () => {
  const result = await database.query(`SELECT full_name, email FROM users`);
  return result?.rows;
};
```

```javascript
import express from 'express';
import { getAllUsersCtrl } from '../controllers/users.controller.js';

export const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsersCtrl);
```

```javascript
app.use('/users', usersRoutes);
```

Ahora que tenemos la base vamos con Update y Delete

```javascript
export const updateTodoCtrl = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  console.log(isCompleted);
  try {
    console.log('Todo ID:', id);
    const updateToDo = await Todo.findByIdAndUpdate(
      id,
      { is_completed: isCompleted },
      { new: true } // Devuelve el objeto actualizado
    );
    console.log(updateToDo['is_completed'])
    if (!updateToDo)
      return res.status(404).json({
        "status": "Not Found",
        "message": "To-Do not found"
      });
    res.status(200).json({
      status: "OK",
      message: "ToDo updated successfully",
      data: {
        updateToDo
      }
    });
  } catch (error) {
    console.error('Error al actualizar todo', error);
    res.status(500).json({ "message": "Error on Data Base - Can not update data" });
  }
};

export const deleteTodoCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).json({
        "status": "Not Found",
        "message": "To-Do not found"
      });
    };
    res.status(204).json({
      "status": "OK",
      "message": "To-Do deleted successfully"
    });
  } catch (error) {
    console.error('Error al eliminar todo', error);
    res.status(500).json({ "message": "Error on Data Base - Can not delete data" });
  }
};
```

# QUERYS

```url
{{localUrl}}/todos/1?completed=true&page=1&skip=10
```

```javascript
console.log('Todo ID:', id);
console.log('Is Completed:', completed);
console.log('Page:', page);
console.log('Skip:', skip);
```

# Subir proyecto a Doker

Implementar una imagen personalizada.

Vamos a tener que crear una nueva imagen personalizada utilizando un Dockerfile para crear nuestra imagen de nuestro proyecto, y con docker-compose.yml integramos todos los contenedores.

## Dokerfile

```Dokerfile
# Use la imagen que vamos a declarar (de una imagen node v.23.2.0)

FROM node:23.2.0

# Establecer el directorio de trabajo interno del contenedor

WORKDIR /app

# Copie los archivos de configuracion de node (todos los package .... .json copialos en ./ que es ./app, va a copiar package.json y package-lock.json)

COPY package*.json ./

# Instala las dependencias

RUN npm install

# Copiar todo el codigo de la aplicacion

COPY . .

# Exponer el puerto de la aplicacion

EXPOSE 3000

# Creamos la base de datos

# RUN npm init-db

# Comando para iniciar la aplicacion (npm start)

CMD ["npm", "start"]

```

## Docker compose

Permite orquestar una serie de contenedores, es para integrar el contenedor de la db mongo, db postgres y nuestra app.\
Creamos un documento llamado docker-compose.yml

```yml
version: '3.8'

services:
  app:
    build:
      context: . # Directorio actual
      dockerfile: Dockerfile
    ports:
      - "3000:3000" # Mapea el puerto del host al contenedor
    volumes:
      - .:/app # Monta el código local en el contenedor para desarrollo
      - /app/node_modules # Excluye node_modules del montaje local
    environment:
      - API_PORT=3000
      # PostgreSQL database local configuration
      - DB_NAME_DEFAULT=postgres
      - DB_HOST=localhost # Se refiere al servicio de PostgreSQL
      - DB_PORT=5432
      - DB_NAME=todo_list_db
      - DB_USER=admin
      - DB_PASSWORD="admin1234"
      # MongoDB local configuration
      - MONGODB_URI=mongodb://mongo:27017/todo_list # MongoDB desde el contenedor
      # - MONGODB_URI=mongodb://localhost:27017/todo_list ESTE TENIAMOS NOSOTROS
      - JWT_SECRET=e5a113e4deea3d45fa2b7cc818c08e9d311704f4784cc1ca5bec248fa6321ffa

  mongo:
    image: mongo:6
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db # Persiste los datos en el disco

  postgres:
    image: postgres:15
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin1234
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  mongo_data:
  postgres_data:
```

## Instalamos

```bash
docker-compose up
```

En caso de dar error recordar cambiar el codigo donde se busca en .env.development.local a .env o sacarlo y no setearlo.

# SQL con NoSQL

Se guardan los datos en SQL y una copia o dupla en NoSQL, luego se consulta el dato a la NoSQL y si no esta ahi se consulta en la SQL.\
A grandes rasgos la SQL es como un back-up de la app. Asegura nuestra integridad.

# Principios SOLID

Estan enfocados en la POO.

# Clean Code o Arquitectura Limpia / Onion Arquitecture o Arquitectura de Cebolla

(Importa como entregamos los datos, vemos hacia afuera) Datos > Dominio/Negocio > Servicio > Presentacion (No importa el acceso a los datos, no ven hacia adentro)

## ORM

Aca se utiliza squelice o knex o typeorm, que estandarizan las consultas. Por si cambiamos de DB. Hacemos las consultas de una forma sola.\
Squelice y knex son las mas faciles de implementar.
