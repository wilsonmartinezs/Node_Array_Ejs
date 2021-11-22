const express= require("express"); //Se importa el modulo de express para crear el servidor
const bodyparser= require("body-parser"); //Se importa el modulo body-parser para recivir parametros

const Servidor = express();//Se crea na instancia del modulo express

Servidor.use(bodyparser.json());//Se configura para recibir parametros json
Servidor.use(bodyparser.urlencoded({extended:false}));// Se configura para recibir parametros de formularios

Servidor.set('view engine','ejs');//Se cofigura el motor de plantillas ejs
Servidor.set('views',__dirname+'/views');//Se cofigura la carpeta contenedora de las vistas

Servidor.use(express.static(__dirname+'/public'));//Se configura la carpeta publica


var estudiante=[];// se crea el arreglo para almacenar estudiantes

Servidor.get('/',(peticion, respuesta)=>{ // Se atiende peticiones get y se rederiza la pagina index
    respuesta.render('index',{listado:estudiante});
});
Servidor.post('/Registrar',(peticion, respuesta)=>{// Se atiende peticiones post "Registrar"
    estudiante.push(peticion.body);
    respuesta.redirect('/');
});
Servidor.get('/Eliminar/:id',(peticion, respuesta)=>{// Se atiende peticiones get "Eliminar"
      var id = peticion.params.id;
      estudiante.splice(id,1);
      respuesta.redirect('/');  
});
const port=process.env.port || 3000;
Servidor.listen(port,()=>{//Se asigna el puerto al servidor
console.log(`El servidor inicio en el puerto ${port}`);

});