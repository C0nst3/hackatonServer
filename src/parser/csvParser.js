var CsvParser = function(){};
var materialCsvParser = require('./materialCsvParser');
var proveCsvParser = require('./proveCsvParser');
var parse = require('csv-parse');
var fs = require('fs');
var Schema = mongoose.Schema;

//Parte del db
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hackatondb');

// definition of the model
var material = mongoose.model('material',{
	Formula: Number,
	List: [{
		Materia_prima: Number,
		Quantità: Number,
		Gruppo: Number
	}]
})

var prove = mongoose.model('prove',{
	Formula: Number,
	List: [{
			Material:Number,
			Usura_mat_mm:Number,
			Usura_mat_g:Number,
			Usura_disco_g:Number,
			Raggio:Number,
			Durezza:Number
		}]
});
/*
var Todo = mongoose.model('material', {
	text: String,
	sex : Boolean,
	age : { type: Number, min: 4, max: 125 },
	point:{type: Number, default: 0},
	datetime: { type: Date, default: Date.now }
});*/

CsvParser.prototype.parse = function(csvPath){
	var arr_csvReaded=[], arr_jsonToStore=[];
	fs.readFile(csvPath, 'utf-8',function(err,data){
		if (!err){
			parse(data, {delimiter: ';'}, 
				function(err, output){
					var indexFinObj=0;
					if(output[0][0]=='Material'){
						arr_jsonToStore=proveCsvParser.parse(output);
						arr_jsonToStore.forEach(function(data, i){
							prove.save(function(err, data){
								if(err){
									return false;
									//res.json("KO|"+err);
								}else{
									return true;
									//res.json("OK");
								}
							});
						});
						
					}else{
						output.forEach(function(arrData,i){
							arr_csvReaded[i]=arrData[0].split(',');
						});
						arr_jsonToStore=materialCsvParser.parse(arr_csvReaded);
						material.save(function(err, data){
							if(err){
								return false;
								//res.json("KO|"+err);
							}else{
								return true;
								//res.json("OK");
							}
						});
					}
					//stora nel DB
					console.log(arr_jsonToStore[0]);
				}
			);
		}
	});
	
	//return true;
};

// export the class 
module.exports = new CsvParser();



/*
HOW TO STORE IN THE DB

//inserimento nel DB
app.post('/api/todos', function(req, res) {
	if(req.body.text && req.body.text.length<905 && req.body.sex && req.body.age){
		var newSecret = new Todo();
		newSecret.text=req.body.text;
		newSecret.sex= req.body.sex;
		newSecret.age= req.body.age;

		newSecret.save(function(err, newSecret){
			if(err){
				res.json("KO|"+err);
			}else{
				res.json("OK");
			}
		});
}});
*/