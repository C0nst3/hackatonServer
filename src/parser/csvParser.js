var CsvParser = function(){};
var materialCsvParser = require('./materialCsvParser');
var proveCsvParser = require('./proveCsvParser');
var parse = require('csv-parse');
var fs = require('fs');

//Parte del db
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/hackatondb');
mongoose.connect('mongodb:446c3bc0-0cc5-46cf-bab3-b902fe53565e-bluemix:dedba9abc7f867ad54be29f5e3116e762ab008fd671a59546e35b6c8266d64a3@446c3bc0-0cc5-46cf-bab3-b902fe53565e-bluemix.cloudant.com:443/hackatondb');
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("OK");
});*/

// definition of the model
var prove = mongoose.model('prove',
	{
			IdMaterial:Number,
			Usura_mat_mm:Number,
			Usura_mat_g:Number,
			Usura_disco_g:Number,
			Raggio:Number,
			Durezza:Number,
			List: [{
				Materia_prima: Number,
				Quantità: Number,
				Gruppo: Number
			}]
	}
);


/*
var Todo = mongoose.model('material', {
	text: String,
	sex : Boolean,
	age : { type: Number, min: 4, max: 125 },
	point:{type: Number, default: 0},
	datetime: { type: Date, default: Date.now }
});*/

CsvParser.prototype.parse = function(proveCsvPath,materialCsvPath,res){
	
	var arr_csvReaded=[], arr_jsonProveToStore=[], arr_jsonMaterialToStore=[];
	fs.readFile(proveCsvPath, 'utf-8',function(err,data){
		if (!err){
			parse(data, {delimiter: ';'}, 
				function(err, output){
					if(output[0][0]=='Material'){
						arr_jsonProveToStore=proveCsvParser.parse(output);
					}
					fs.readFile(materialCsvPath, 'utf-8',function(err,data){
						if (!err){
							parse(data, {delimiter: ','}, 
								function(err, output){
									//arr_jsonMaterialToStore=materialCsvParser.parse(output);
									arr_jsonProveToStore.forEach(function(prova, index){
										arr_jsonProveToStore[index]=

											arr_jsonMaterialToStore;
										arr_jsonMaterialToStore
										arr_jsonProveToStore
									});
									console.log("arr: "+arr_jsonProveToStore);
									//QUI FACCIO LO STORE IN DB 
									/*

										var mat = new material(arr_jsonMaterialToStore);
																			mat.save(function(err, data){
																				if(err){
																					console.log("KO|"+err);
																					res.json("KO|"+err);
																				}else{
																					console.log("OK");
																					res.json("OK");
																				}
																			});

									*/
								});
						}
					});
			});
		}
	});
	
	//return true;
};

// export the class 
module.exports = new CsvParser();