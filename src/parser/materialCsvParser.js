var MaterialCsvParser = function(){};

MaterialCsvParser.prototype.parse = function(arrToParse){
	var arr_jsonToStore=[];
	arrToParse.forEach(function(data, i){
		var dataToStore=new Object();
		dataToStore=[];
		IdMaterial:data[0]
		for(var j=1; j<data.length; j=j+3){
			if(data[j+1]>0){
				dataToStore.push({
					Materia_prima:data[j],
					Quantita:data[j+1],
					Gruppo:data[j+2]
				});
			}
		}
		arr_jsonToStore[data[0]]=dataToStore;
	});
	return arr_jsonToStore;
};
// export the class 
module.exports = new MaterialCsvParser();