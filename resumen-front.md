EXTTENCIONES DE VSCODE
Atom One Dark Theme
Better C++ Syntax
C/C++ Themes
Dev Containers
Error Lens
ES7 + React/Redux/React-Node (permite hacer rafce y rfce)
Excalidraw
GithubTheme
Material Icon ThemeOne Dark Pro
Palenight Theme
Remote - SSH
Remote - SSH : Editing Configuration
Remote - Tunnels
Remote Development
Remote Explorer
Spanish Language Pack for Visual
Svg Preview
vscode-pdf
WSL
Code Runner
Docker
ESLint
GitLens
Image Preview
JavaScript and TypeScript Nightly
JavaScript Debugger (Nightly)
Live Server
Prettier - Code formatter
Prettier ESLint
Pylance
Python
Python Debugger
Tabine: AI Chat & Autocomplete
npm Intellisense
GitHub Copilot



INSTALAT NODE para npm y nvm

-----------------------------------------------------------------
-----------------------------------------------------------------

-> LEVANTAR JSON SERVER: json-server --watch db.json

-> VER EJECUCION EN TERMINAL: > node index.js --watch
> npx tsc ./index.ts --watch

------
-----------------------------------------------------------------

-> NATIVE ASYNC FUNCTIONS:
	- setTimeOut() / clearTimeOut()
	- setInterval() / clearInterval()
     EJ:
	const fun = setInterval(()=>{/* codigo a ejecutar */}, timeOnMiliSeconds)
	.
	.
	clearInterval(fun)

----
-----------------------------------------------------------------

-> PROMISE: Inventadas para solucionar los callBack hells
	- Tiene un estado que es el pendiente hasta que se resuelva donde tomara uno de dos estados:
		1) fulfilled (procesada con exito)
		2) rejected (rechazada, error)

-> RESPONSE: Es un objeto enorme.
response.json() === JSON.parse(response.body)

-> POST
fetch(url, {
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    name: "pepe",
    age: 21,
  }),
  method: "POST",
})

EJEMPLOS PROMISE VS ASYNC

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

CREANDO ASYNC

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
}


CREANDO PROMISES Y ASYNC

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = { name: "Pepe", age: 30 };
      resolve(data);
    }, 1000);
  });
}

async function getData() {
  try {
    const result = await fetchData();
    console.log("Result: ", result);
  } catch (error) {
    console.log("Error: ", error);
  }
}

------
-----------------------------------------------------------------

-> SERIALIZAR/DESERIALIZAR
const obj = { nombre: "Nombre", edad: 21 }
const serializedObject = JSON.stringify(obj)
const originalObject = JSON.parse(serializedObject)

-------
-----------------------------------------------------------------

-> IMPORT/EXPORT
Tenemos que crear el archivo package.json con el comando:
npm innit
Seteando el nombre del directorio, el main que sera el archivo principal, el type que sera module y listo
Exportamos con:
1) COMMON
EXPORT
module.exports = {
    sum,
    res,
    pro,
    div,
}
IMPORT
const {sumar, restar, multiplicar, dividir} = require("./utils/operations_common")


2) ES6 (npm innit y package.json)
EXPORT
export const sum = (a,b) => a+b;
IMPORT
import { sum, res, pro, div } from "./utils/operations_es6.js";


------
-----------------------------------------------------------------

-> REACT
-> VITE: Para crear proyectos mas rapido
npm create vite@latest
npm install (va a instalar todo lo que esta en el package.json)
npm install axios (para usar el fetch)
npm install sass (agrega sass)
npm run dev
Para crear el proyecto, nos tirara opciones para configurar js o ts y luego el framework que utilizaremos, en este caso React, instalamos npm y luego corremos como developers.
Al hacer npm install creara una carpeta llamada node_modules con todas las dependencias que necesite y se le hayan indicado en package.json, creando tambien package-lock.json con el registro de todo lo instalado.
El archivo eslin.config.js es para configurar como escribimos codigo, la indentacion, si hacemos arrow function o function comunes, etc..
Instalamos el manejador de rutas reat router
> npm install react-router-dom

# RENDERIZAR UN COMPONENTE
 - La primera vez que se renderiza
 - Se renderiza uno de sus ancestros
 - Cambian las props del componente
 - Cambia el estado

------
-----------------------------------------------------------------
-> GRID


EN EL PRINCIPAL
display: grid;
grid-template-areas:
	"header header"
	"main aside"
	"footer footer"

EN EL COMPONENTE (no importa si el archivo esta en otro .scss no hace falta importarlos ni nada, quiza si haga falta incluir el .scss principal en los secundarios como con los @mixin)
grid-area: header (sin comillas)

TEMPLATE COLUMNS
grid-template-columns: repeat(2, 1fr); // QUIERO 2 COLUMNAS CON UNA MEDIDA DE 1fr


------
-----------------------------------------------------------------
SASS
-> .class {
	.
	.
	class_2 {
		.
		.
	}
}
-> __reset.scss (Archivo para resetear todos los estilos, se utiliza el __ para indicar que es global y se importa en el main.tsx)

->
$breakpoint-mobile: 479px;
.
.
@media (max-width: $breakpoint-mobile)

->
@mixin section-style($bg-color) {
    background-color: $bg-color;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

{
	@include section-style(yellow);
}

@import '../../pages/home/styles.module.scss';
Este import es para usar el @include section-style(color_de_fondo)
Se importa en el .jsx que se quiera, puede ser el main en caso de los __global o en el main en caso de algun otro.

-> IMPORTAR GOOGLE FONTS
Vamos a Google Fonts y seleccionamos la fuente, le damos a get font, luego get embeded code, y tenemos las opciones <link> y @import, seleccionamos import y copiamos la parte de import, la pegamos donde la vayamos a usar y queda pronto, en este caso creamos un archivo __global.scss.
Tenemos la opcion de copiar el codifo con las etiquetas <styles> pero es para pegar en el HTML no en el .scss

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

-> ICONOS
URL: font awesome icons
Podemos hacer lo mismo de las fuentes pero con los iconos
Buscamos la forma de copiar un codigo html asi:
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
Lo sacamos de https://cdnjs.com/libraries/font-awesome
Luego buscamos el icono en https://fontawesome.com/v6/icons

-> ARCHIVOS
Componente.tsx (import styles from './componente.styles.module.scss')
componente.styles.module.scss (@import '../../styles.module.scss para importar los @mixin)
------
-----------------------------------------------------------------
REACT-USE

-> USE STATE
const money = (initialValue) => {
    value = initialValue;

    const add = (amount) => {
        value += amount;
    };

    const howMany = () => {
        return value;
    };

    return [add, howMany];
};

const [agregarPlata, cuantaPlata] = money(5)
console.log(cuantaPlata())
agregarPlata(2)
console.log(cuantaPlata())


EJEMPLO:

const [value, setValue] = useState(initalValue) // El valor inicial puedeser un objeto
setValue(initialValue + 1)


-> USE STATE Y USE EFFECT
El useState no actualiza el estado de inmediato, por lo que si tenemos que actualizar un valor cuando se actualiza el estado de otro valor vamos a utilizar useEffect, ya que el useEffect espera a que se actualice el estado de un valor para ejecutarse
Ejemplo:
const [a, setA] = useState(1);
const [b, setB] = useState(2);
const [c, setC] = useState(a + b);

useEffect(() => {
  setC(a + b);
}, [a, b]);
 
Aca setC se ejecutara si o si cuando el estado de a o de b se actualiza, si utilizamos setA y/o setB y enseguida setC corresmos el riesgo de que no funcione (y no va a funcionar) ya que el set setteado en un useState funciona de manera similar a una funcion asyncronica, por lo que cuando ejecutemos setC no se habran  actualizado ni setA ni setB por mas que de hayan ejecutado.


-> USE EFFECT

useEffect(() => { cuerpo a ejecutar }, [ variable_o_funcion, ... , .... ])
Se ejecuta la funcion (el cuerpo de la funcion, que es el primer parametro) cuadno una de las variables o funciones dentro del array del segundo parametro se ve actualizada.

useEfect(fn)	=> Se ejecuta la primera vez que se renderiza el componente y (ALL TIMES) cada vez que se vuelva a renderizar el componente
useEfect(fn, [])	=> Se ejecuta la primera vez que se renderiza el componente y (FIRST TIME) solo la primera vez
useEfect(fn, [var])	=> Se ejecuta la primera vez que se renderiza el componente y (UPDATE STATE) cuando se actualiza el estado de var

Al actualizar una variable con un setVariable seteada utilizando useState te vuelve a renderizar todo el componente y se ejecuta todo de nuevo, pero sin setear los valores iniciales de las funciones y sin ejecutar nuevamente el useEffect.

En cambio con useEffect se ejecuta solo la funcion que tiene como parametro cuadndo inicia por primera vez el componente y cuando se actualiza una de las variables que tiene en el array.


-> USE CALL BACK
const myFunc = useCallback( (par1, par2, ... , parn) => { cuerpo de mi funcion }, [variable_o_funcion , ... , ... ])

Es igual que el useEffect pero en este caso le asigna la funcion que le pasamos en el primer parametro a la constante que hayamos definido, en este caso myFunc, siempre y cuando cambie una de las variables o funciones del segundo parametro, tambien se asigna la funcion la primera vez que se renderiza el componente.


-> USE REDUCER

const [state, dispatch] = useReducer(reducer, {...})

"Tenemos un estado que representa cosas, y el estado va a rercibir ciertos cambios. La funcion reductora va a procesar esos cambios que necesita tener el estado, combinarlos con el estado actual y devolver un estado actualizado"

useReducer recibe dos parametros, el primero una funcion reductora, y el segundo un estado inicial.
useReduce devuelve dos cosas, el primero es el estado en si (como el useState), y la segunda es una funcion llamada dispatch que despacha una ACCION

FUNCION REDUCTORA (reducer)
La funcion reductora va a tomar dos parametros, un estado y una ACCION (una accion es un objeto con un type y un payload {action: ..., payload: ...})
Dado el estado y la accion el reducer va a tener que devolver un estado actualizado como salida.

Creamos la constante
> const nameRef = useRef('');

Dentro del manejador del formulario asignamos el valor (nameRef.current.value)
> const nameValue = nameRef.current.value;

Dentro del HTML (ref={})
> <input type="text" id="email" ref={emailRef} />


RESUMEN DE useReducer
______________________________________________
[state, dispatch] = useReduce( (someState,someAction)=>{/*switch*/} , initialState ) // Aqui podemos simplificar haciendo reducer = (someState,someAction)=>{/*switch*/} y pasar reducer como valor
.
.
.
dispatch(myAction) // SIMPLIFICANDO: dispatch({type: 'do something', payload: 'more info'})


- "state" es mi variable, y "dispatch" la funcion con la que voy a cambiar su estado, como setState en useState ([state, setState] = useState(initialValue)).

- La diferencia es que "dispatch" depende de otra funcion, una funcion "reductora" la cual recibe dos valores, "someState" que equivale a "state" (como la variable en torno a cual gira) y "someAction" como el objeto que marcara la accion que tomara la funcion reductora y la cual sera el parametro nominal de "dispatch" y en este caso corresponde a "myAction".

- "myAction" es un objeto con un "type" y un "payload", el type define que accion tomara la funcion reductora dentro del dispatch y el payload es un parametro auxiliar que sirve para agregar informacion al despacho.
_______________________________________________









Es similar al useState

El primer valor (state) es el nombre de la variable, el segundo (dispatch) es el nombre de la funcion reductora, con useReducer lo seteamos, reducer seria la funcion reductora y {...} el estado inicial.
En una forma simplificada y reducida seria:
  state = {...}
  dispatch = reduce

  dispatch recibe un parametro action (action) que es un objeto que suele ser {type: 'fgdf', payload: var}
  reduce la creamos nosotros y le debemos pasar 2 parametros cuando la creamos ya que useReduce le pasa 2 parametros cuadno la llama, seria state, que es el state y action que es lo que se le pasa al dispatch


-> USE REF
Sirve para que no se re-renderice el dom cada vez que editamos un input, es util en ciertas ocaciones, o no, cuando por ejemplo se quiere comprobar letra por letra lo que ingresa el usuario
Es similar a un useStatus


-> ROUTERS
import { BrowserRouter, Route, Routes } from "react-router-dom"

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="characters" >
          <Route index element={<Characters />} />
          <Route path=":characterId" element={<DetailCharacter/>} />
        </Route>


        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>




-> PRIVATE ROUTERS

Lo haremos mediante condicional-rendering de forma simple, o de forma pro con los archivos private.routes.tsx y public.routes.tsx creadnolos en la carpeta routes en src.
Luego cada componente que creemos debera estar entre etiquetas <Routes></Routes> ya que ira dentro de un <BrowserRouter></BrowserRouter>




-> USE PARAMS se importa de 'react-router-dom'

[App.jsx]
<Route path="characters" >
  <Route index element={<Characters />} />
  <Route path="info/:id" element={<DetailCharacter/>} />    [ó  <Route path=":id" element={<DetailCharacter/>} /> para hacer .../characters/id_number ]
</Route>

[DetailCharacter.jsx]
import { useParams } from 'react-router-dom';
.
.
const params = useParams(); // Devuelve un objeto
const { id } = useParams(); // Desestructuramos el objeto que devuelve
console.log('Params:', params)
console.log('Params:', id)



-> USE NAVIGATE
Se utiliza para navegar con rutas relativas, ejemplo: (chequear lo de rutas relativas)
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()
navigate(`/characters/${id}`);

Recordar utilizar location.reload() para regargar la pagina



-------
-> FORMS AND REACT
-> onChange={(event) => {console.log(event.target.value)}} // Nos sirve para escuchar de forma activa como varia un input


------
-----------------------------------------------------------------
-> FIREBASE

Nos permite utilizar funcionalidales de un SDK o una Suit de Desarrollo

Para enviar informacion de una pagina a otra, como por ejemplo luego de autenticar cambiar el valor de una variable en la pagina de routers para cambiar el rendering condicional

Creamos nuestro firebase en: https://console.firebase.google.com/?hl=es-419

Luego instalamos firebase en nuestro proyecto con
> npm install firebase
O de forma global 
> npm install -g firebase 

Creamos una carpeta firebase con el archivo firebase-config.js en src
Importamos la funcion getAuth para trabajar
> import { getAuth } from "firebase/auth";
Luego le cargamos la app inicializada y la dejamos lista para trabajar bajo el nombre de auth
> export const auth = getAuth(app);

Luego desde nuestra pagina de Login la importamos para trabajar con ella
> import { auth } from "../../../firebase/firebase-config";

Luego de que el usuario introdusca su userName y su password podremos intentar obtener las credenciales del usuario de la siguien forma:
> signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
		console.log(userCredential);
	});

signInWithEmailAndPassword nos devuelve una promesa, esta promesa de ser validada nos devuelve las credenciales del usuario.

CREDENCIALES DE USUARIO
Si todo esta bien nos devuelve un objeto "credenciales del usuario" con un atributo "user" y uno "_tokenResponse" entre otros atributos
_UserCredentialImpl {user: _UserImpl, providerId: null, _tokenResponse: {…}, operationType: 'signIn'}
En user vamos a encontrar un accessToken y otros atributos del usuario y en _tokenResponse vamos a encontar informacion sobre le token
! De lo contrario nos da error 400 en consola y nos da invalid/email o invalid/password o algun otro error de acceso para ese usuario

Esta informacion la podemos manejar solo en nuestro componente login. Para manejarla en otros componentes debemos utilizar useContext y useReducer














Luego iniciamos el firebase con el siguiente comadno si instalamos firebase de forma local
> npx firebase init
O con el siguiente si lo instalamos de forma global
> firebase init












------
-----------------------------------------------------------------
GIT

> git config --global user.email "auguchencomorales@gmail.com"
> git config --global user.name "Andres Auguchenco"
> git init
> sudo rm -r .git
> .gitignore (https://www.toptal.com/developers/gitignore)
> git checkout -b branch_name
> git push --set-upstream origin branch_name
	Esto crea una rama de desarrollo, luego en github el reviewer aprueba el pull request y hace un merch a la rama main que es la principal, pero todo desde el navegador.
> git checkout branch_name
> git branch -M new_branch_name
> git branch
> git status
> git log
> git add .gitignore
> git add .
> git commit -m 'Mensaje del commit, se suele explicar el cambio en pocas palabras para recordar que tiene esta version'
> git remote add origin https://github.com/user_name/proyect_name.git (protocolo https)
> git remote add origin git@github.com:user_name/proyect_name.git (protocolo ssh)
> git remote remove origin
> git remote -v
> git push -u origin branch_name
> git pull
> git pull origin dev (Trae el repo con el merch hecho, actualizado, buena practica cuando arrancamos a trabajar con el proyecto)
> git fetch (Trae todas las ramas, pero no hace el merch)
> ssh-keygen -t rsa -b 4096 -C "user_mail@mail.com"
Volvemos a la raiz con cd
Vizualisamos con cd -lha para ver los ocultos como .ssh
Hacemos cd .ssh
Hacemos un:
> cat id_rsa.pub
Copiamos el contenido
Vamos a github, entramos en settings general de la cuenta
Vamos a SSH and GPG keys
Vamos a agregar SSH
Seteamos nuestra nueva SSH dandole un nombre y en el cuerpo pegamos el contenido del archivo id_rsa.pub


------
-----------------------------------------------------------------
TYPESCRIPT

------Tipos de Datos-------

import axios from "axios"

type Language = 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'C++'

enum MovementEnumES {
  ARRIBA = 'up',
  ABAJO = 'down',
  IZQUIERDA = 'left',
  DERECHA = 'right',
}

interface Repository {
  name: string,
  description: string,
  html_url: string,
}
______________________________________________


CONFIG

.editorconfig

Se configura un archivo con dicho nombre (.editorconfig) luego de tner instalada la extencion EditorConfig for VS Code.
En este archivo guardaremos lo siguien y otras posible configuraciones que estan en el siguiente link: https://editorconfig.org
_______________________________________
root = true
 
[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
 
[*.ts]
quote_type = single
 
[*.md]
max_line_length = off
trim_trailing_whitespace = false
______________________________________

Luego creamos el .gitignore utilizanod la pagina : https://www.toptal.com/developers/gitignore
Con las etiquetas: Linux, macOS, Windows, Node.

Luego configuramos el package.json para luego agregar el typescript
> npm init -y (le da todo que si automaticamente, sin el flag -y tenemos que configurarlo a mano)
Esto nos creara el archivo package.json con la info del proyecto
Configuracion manual:
_____________________
npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (proyecto) typescript
version: (1.0.0) 
description: This is a project with typescript for BIOS class
entry point: (index.js) 
test command: 
git repository: 
keywords: Typescript, node, learning
author: Andres Auguchenco
license: (ISC) MIT
About to write to /home/andres/Escritorio/clases-bios-2/10-12-type-script/proyecto/package.json:

{
  "name": "typescript",
  "version": "1.0.0",
  "description": "This is a project with typescript for BIOS class",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "Typescript",
    "node",
    "learning"
  ],
  "author": "Andres Auguchenco",
  "license": "MIT"
}


Is this OK? (yes) yes
____________________

> npm install typescript --global
Instala de manera global para todo el PC
> npm install typescript -D
Lo instala solo para el proyecto

> npx tsc --version
Nos dira la version de typescript que tengamos

OJO! En typescript si tenemos archivos diferentes pero declaramos variables con nombres iguales, aunque esten en distintos archivos nos puede dar un error.

> Para solucionar un posible error de esto corremos el archivo .ts asi

> npx tsc ./index.ts

Y si da error debemos crear un archivo tsconfig.json y configurarlo:
_______________
{
  "compilerOptions": {
    "target": "ESNext", // Es la ultima version de ecma script (un es6)
    "module": "CommonJS",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
  },
}
_______________



------
-----------------------------------------------------------------

NODE

Cuando trabajemos con Node es buena practica tener el archivo .nvmrc

> node -v
> node --version

Para sacar la version y asi como la sacamos la pegamos sin mas en el archivo

El package-lock.json no se toca para nada, solo se actualiza si instalamos nuevas dependencias

------
-----------------------------------------------------------------

FETCH vs AXIOS

> npm install axios
Con este comando instalamos axios

Axios nos organiza mejor que fetch



------
-----------------------------------------------------------------
FORMULARIOS


const EDIT_SECTION = document.querySelector("#edit-section")



function saveBook(event) {
    // 1. Cancelar la redirection
    event.preventDefault();

    // 2. Capturar el elemento formulario
    const form = event.target

    // 3. Capturar la información del formulario en forma data
    const formData = new FormData(form)

    // 4. Crear el objeto del libro usando el formData
    let book = {}
    formData.forEach((value, key) => book[key] = value)
    book.id = generateUniqueId()

    // 5. Almacenar el libro en la librería
    const books = getBooksFromMemory()
    const newLibrary = [...books, book]
    saveBookForMemory(newLibrary)

    // 6. Limpiar el formulario
    form.reset()

    // 7. Listar los libros previamente almacenados
    displayBooks(newLibrary)
}



function displayBooks(books) {
    const listBooksElement = document.querySelector("#lista-libros")

    if (!listBooksElement) {
        console.error("No se encontró el elemento `#lista-libros`")
        return
    }

    const listBooksHtml = books.map(book => {
        return `
        <div class="book" id="${book.id}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>${book.year}</p>
          <p>${book.genre}</p>
          <button onclick="deleteBook('${book.id}')">&times;</button>
          <button onclick="editBook('${book.id}')">✏</button>
        </div>
        `
    })

    console.log(listBooksHtml);


    listBooksElement.innerHTML = listBooksHtml.join("")
}



function getBooksFromMemory() {
    const libraryFromMemory = localStorage.getItem("library")

    if (!libraryFromMemory) {
        saveBookForMemory([])
        return []
    }

    return JSON.parse(libraryFromMemory)
}



function saveBookForMemory(books) {
    localStorage.setItem("library", JSON.stringify(books))
}



function deleteBook(idBook) {
    const isConfirm = confirm(`Estas seguro que deseas eliminar el libro?`)
    if (!isConfirm) return
    const books = getBooksFromMemory()
    const booksFiltered = books.filter((book) => book.id != idBook)
    saveBookForMemory(booksFiltered)
    displayBooks(booksFiltered)
}



function editBook(idBook) {

    const books = getBooksFromMemory()
    const book = books.find((book) => book.id === idBook)

    EDIT_SECTION.classList.toggle("show")

    const [idField, titleField, authorField, yearField, genreField] = document.querySelectorAll(["#idEdit", "#tituloEdit", "#autorEdit", "#anioEdit", "#generoEdit"])

    console.log(idField)

    idField.value = book.id
    titleField.value = book.title
    authorField.value = book.author
    yearField.value = book.year
    genreField.value = book.genre

}



function updateBook(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const book = {}
    formData.forEach((value, key) => book[key] = value)
    

    // --- --- --- --- --- --- MI CODIGO --- --- --- --- --- ---
    
    // const books = getBooksFromMemory()
    
    // const idField = document.getElementById("idEdit")
    // const id = idField.value
    
    // const oldBook = books.find((book) => book.id === id)
    // const index = books.indexOf(oldBook)
    
    // books[index] = book
    // saveBookForMemory(books)
    // displayBooks(books)
    
    // form.reset()
    
    // --- --- --- --- --- --- MI CODIGO --- --- --- --- --- ---

    const books = getBooksFromMemory()

    const newBooks = books.map((item) => {
        // Si coincide el libro con el que quiero actualizar se le asigna la constante book
        if (item.id === book.id) {
            // return book
            return {
                ...item,
                ...book
            }
            // Crea un nuevo objeto con las propiedades de los dos.
            // Pero como las prop. coinciden crea un obj. con las prop. de item y sustituye los valores de book.
            // En caso de que book no exista o sea igual no hay cambios, solo los hay si agrega prop. o modifica valores.
        }

        return item
    })



    saveBookForMemory(newBooks)
    displayBooks(newBooks)
    form.reset()

    EDIT_SECTION.classList.toggle("show")
}



function generateUniqueId() {
    return "book-" + Date.now() // Devuelve los ms que pasarons desde no se que fecha, y es un numero unico
}



// Disparador que se dispara cuando la página ya está cargada
document.addEventListener("DOMContentLoaded", () => {
    const books = getBooksFromMemory()
    displayBooks(books)
})