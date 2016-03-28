var express = require('express');
var router = express.Router();
var core = require('../app/core');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/buscar/:nombre/:apellido/:dominio', function(req, res, next) {

	core.peticion('guest',req.ip,req.params.nombre,req.params.apellido,req.params.dominio,res,next);
});

router.post('/buscar', function(req, res, next) {
	//console.log(req.body);

	if (req.body.apellido==null){
		nombres=req.body.nombre.trim().split(" ");
	if (nombres.length>1){		
 		req.body.apellido = nombres[1];
 		req.body.nombre = nombres[0];
 		}else{
 			req.body.apellido = "";
 			req.body.nombre=nombres[0];

 		}

	}
	core.peticion(req.body.userType,req.ip,normalize(req.body.nombre),normalize(req.body.apellido),normalize(req.body.dominio),res,next);
});

router.post('/consultas', function(req, res, next) {

	core.consultasDisponibles(req.body.userType,req.ip,res,next);
});

/**
* funcion que normaliza el texto, elimina tildes y Ñ y los sustituye
*/

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();


module.exports = router;
