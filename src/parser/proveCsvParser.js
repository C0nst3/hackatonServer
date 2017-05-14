var ProveCsvParser = function(){};
const Material=0,Usura_mat_mm=1,Usura_mat_g=2,Usura_disco_g=3,Raggio=17,Durezza=4; 
var parse = require('csv-parse');
//Constructor 		
/*function materialCsvParser(parObj){		
	// always initialize all instance properties
	// we don't need this
}*/		
// class methods		
ProveCsvParser.prototype.parse = function(arrToParse){
	var arr_jsonToStore=[];
	arrToParse.forEach(function(data, i){
		var data={
			Material:data[0],
			Usura_mat_mm:data[1],
			Usura_mat_g:data[2],
			Usura_disco_g:data[3],
			Raggio:data[17],
			Durezza:data[4]
		}
		arr_jsonToStore[i]=data;
	});
	return arr_jsonToStore;
};
// export the class 
module.exports = new ProveCsvParser();
