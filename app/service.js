app.factory("jarrupalatService", ["$http",
    function ($http) {
        var svc = {};

        //svc.__SP_APPNAME = "/jarrupalat";

		svc.nodeApp = "https://project-jarrupalat.eu-gb.mybluemix.net";
        svc.pythonApp = "https://project-vala.eu-gb.mybluemix.net";

		// mergeCSV - Funzione per far partire l'elaborazione della rete neurale
        //@param {function} callback - funzione di callback da richiamare al termine dell'interrogazione al server
        svc.mergeCSV = function (callback) {
            $http({
                method: "GET",
                url: svc.nodeApp + "/api/store",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).
              then(function (response)
			  //code e.g. OK		  
			  
				console.log(response);
                  //successo

                  callback(response);
              }, function (response) {
                  //fallimento
                  console.log('Error: ' + response);
              });
        };
		
        // beginTraining - Funzione per far partire l'elaborazione della rete neurale
        //@param {function} callback - funzione di callback da richiamare al termine dell'interrogazione al server
        svc.beginTraining = function (callback) {
            $http({
                method: "GET",
                url: svc.pythonApp + "/api/train/[nome]", //[nome documento json di conve]
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).
              then(function (response)
			  //code e.g. OK
			  //prediction
			  //time			  
			  
				console.log(response);
                  //successo

                  callback(response);
              }, function (response) {
                  //fallimento
                  console.log('Error: ' + response);
              });
        };
		
		// sendTest - Funzione per inviare un test da far eseguire alla rete
		//@param {array} testArray - Array con i dati di test da inviare al server
        //@param {function} callback - funzione di callback da richiamare al termine dell'interrogazione al server
        svc.sendTest = function (testArray, callback) {
			//struttura dei dati da mandare a proch, dentro a un vettore anche se è uno solo
			/*{
   Raggio:Number,
   Durezza:Number,
   List: [{
    Materia_prima: Number,
    Quantità: Number,
    Gruppo: Number
   }]
 }*/
			
            $http({
                method: "POST",
                url: svc.pythonApp + "/api/predict_one",
				data: testArray,
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).
              then(function (response)
				console.log(response);
				//code
				//time
				//prediction (usura)
				//accuracy
				
                  //successo

                  callback(response);
              }, function (response) {
                  //fallimento
                  console.log('Error: ' + response);
              });
        };