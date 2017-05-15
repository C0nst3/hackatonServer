//server.js
var express 	= require('express');
var app 		= express();
var path = require('path');
var bodyParser = require("body-parser");
var path = require('path');
var csvParser = require('./src/parser/csvParser');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/api/store', function(req,res){
	//in teoria nel req del body dovremmo andare a contenere il nome del file da storare
	csvParser.parse('./tmp/csv/orig_prove.csv','./tmp/csv/orig_materials.csv',res)
});

//Servo la pagina quando mi viene richiesta
app.get('*', function(req, res) {						
	res.sendFile(path.join(__dirname + '/app/index.html'));				
});


app.post('/api/upload', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/tmp/csv');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);

});

//Mi metto in ascolto sulla porta 8080
app.listen(8080, function() {
	console.log('App listening on port 8080');
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

/*app.get('/api/saveImg', function(req, res) {				//save an image on the server
	//var img=dataUriToBuffer(req.param('imageToConvert'));
	var img=req.param('imageToConvert');
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buffer = new Buffer(data, 'base64');
	var filename=randomImgNameGenerator();
	var filePath='tmp/divToShare/'+filename+'.png';
	
});*/