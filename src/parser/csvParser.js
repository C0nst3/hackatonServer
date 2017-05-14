var CsvParser = function(){};
var materialCsvParser = require('./materialCsvParser');
var proveCsvParser = require('./proveCsvParser');
var parse = require('csv-parse');
var fs = require('fs');
//Parte del db
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hackatondb');

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
									arr_jsonMaterialToStore=materialCsvParser.parse(output);
									arr_jsonProveToStore.forEach(function(proveToStore, iProve){
										arr_jsonProveToStore[iProve].List=arr_jsonMaterialToStore[proveToStore.IdMaterial];
										
									});
									var tmpProva = new prove(arr_jsonMaterialToStore);
										tmpProva.save(function(err, data){
											if(err){
												res.json("KO|"+err);
											}else{
												res.json("OK");
											}
									});
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