var MaterialCsvParser = function(){};
var parse = require('csv-parse');

MaterialCsvParser.prototype.parse = function(arrToParse){
	var arr_jsonToStore=[];
	arrToParse.forEach(function(data, i){
		var dataToStore=new Object();
		dataToStore["Formula"]=data[0];
		dataToStore["List"]=[];
		for(var j=1; j<data.length; j=j+3){
			dataToStore["List"].push({
				Materia_prima:data[j],
				Quantita:data[j+1],
				Gruppo:data[j+2]
			});
		}
		arr_jsonToStore.push(dataToStore);
	});
	return arr_jsonToStore;
};
// export the class 
module.exports = new MaterialCsvParser();