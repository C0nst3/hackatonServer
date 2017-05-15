var app = angular.module("Jarrupalat", []);


app.controller("inputController", ["$scope", "JarrupalatService", 
	function($scope, JarrupalatService) {
		$scope.uploading1 = false;
		$scope.uploading2 = false;
		$scope.txtResults = "";
		$scope.showResults = false;
		$scope.learningtime = 0;
		$scope.predictDemo = true;

		$scope.inputFunction = function() {
			$scope.uploading2 = true;
				
				var arrToParse = $scope.txtFormula.split(',');
				var dataToStore=new Object();
				dataToStore["Raggio"] = $scope.txtImpianto.split(',')[0];
				dataToStore["Durezza"] = $scope.txtImpianto.split(',')[1];
				dataToStore["Formula"]=arrToParse[0];
				dataToStore["List"]=[];
				for(var j=1; j<arrToParse.length; j=j+3) {
					dataToStore["List"].push({
						Materia_prima:arrToParse[j],
						Quantita:arrToParse[j+1],
						Gruppo:arrToParse[j+2]
					});
				}

				JarrupalatService.sendTest(dataToStore, function(res){
					
					$scope.txtResults = " Usura stimata: "+res.prediction + " Accuratezza: "+ res.accuracy ;
					$scope.showResults = true;
					$scope.uploading2 = false;						
				});
		}

		$scope.loadParameters = function() {
			$scope.txtFormula = "8951,1745,1.74,65,6439,6.43,65,6511,6.51,65,13709,13.7,65,15015,15.01,65,15027,15.02,65,16781,16.78,65,16837,16.83,65,32322,32.32,65,32329,32.32,65,32336,32.33,66,32350,32.35,66";
			$scope.txtImpianto = "308, 196"; //raggio, durezza
			$scope.predictDemo = false;
			/*$scope.txtResults = "Parameters loaded."
			$scope.showResults = true;*/

		}

		$scope.startTraining = function() {
			$scope.uploading1 = true;
			JarrupalatService.mergeCSV(function(res) {				
				JarrupalatService.beginTraining(res, function(res2){
					$scope.learningtime = res2;
					$scope.uploading1 = false;
				});
			});
			

		}
	}]);