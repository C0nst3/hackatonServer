//server.js
var express 	= require('express');
var app 		= express();
var path = require('path');
var bodyParser = require("body-parser");
var path = require('path');
var csvParser = require('./src/parser/csvParser');

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.get('/api/saveImg', function(req, res) {				//save an image on the server
	//var img=dataUriToBuffer(req.param('imageToConvert'));
	var img=req.param('imageToConvert');
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buffer = new Buffer(data, 'base64');
	var filename=randomImgNameGenerator();
	var filePath='tmp/divToShare/'+filename+'.png';
	
});*/

//può tornare utile un generatore di numeri casuali random, per ora lo lascio qui
function randomNameGenerator(sName){
		var date = new Date();
		var filename=""+date.yyyymmddhh();
		filename+=create10DigitRandomLetter(); 
		filename+=sName;
		return filename;
}

function create10DigitRandomLetter() {
    var letters = 'qwertyuiopasdfghjklzxcvbnm';
    var digit = '';
    for (var i = 0; i < 10; i++ ) {
        digit += letters[Math.floor(Math.random() * 26)];
    }
    return digit;
}

//questo faceva le query nel DB
/*app.get('/api/todos', function(req, res) {				// get of all the methods
	if(req.param('tsme_psIdOfItems')==''){
		Todo.find({}).sort({datetime: -1}).limit(10)
			.exec(function(err, todos) {
				if(err) {
					res.send(err);
				}else{
					res.json(todos);
				}
		});
	}else{
		//get 10 item from itm with id=param, sorted by datetime
		Todo.find({}).where('_id').lt(req.param('tsme_psIdOfItems')).sort({datetime: -1}).limit(10)
			.exec(function(err, todos) {
				if(err) {
					res.send(err);
				}else{
					res.json(todos);
				}
		});
	}
});*/

app.get('/api/store', function(req,res){
	//in teoria nel req del body dovremmo andare a contenere il nome del file da storare
	csvParser.parse('./tmp/csv/orig_prove.csv','./tmp/csv/orig_materials.csv',res)
});

//Servo la pagina quando mi viene richiesta
app.get('*', function(req, res) {						
	res.sendFile(path.join(__dirname + '/app/index.html'));				
});

//Mi metto in ascolto sulla porta 80
app.listen(3000, function() {
	console.log('App listening on port 3000');
});

//non mi ricordo assolutamente cosa faccia ma mi sembra utile, se non erro mi 
//restituisce la data corrente nel formato yyyymmddhh
Date.prototype.yyyymmddhh = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getTime();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          (hh>9 ? '' : '0') + hh
         ].join('');
};
