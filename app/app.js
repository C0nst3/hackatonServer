var app = angular.module('app', []);

app.controller("inputController", ["$scope", "jarrupalatService", function($scope, jarrupalatService) {

	$scope.txtResults = "";
	$scope.showResults = false;

	$scope.inputFunction = function() {
		
		if(!(typeof $scope.txtFormula === undefined)) {
			var arrToParse = $scope.txtFormula.split(',');

			var dataToStore=new Object();
			dataToStore["Formula"]=arrToParse[0];
			dataToStore["List"]=[];
			for(var j=1; j<arrToParse.length; j=j+3) {
				dataToStore["List"].push({
					Materia_prima:arrToParse[j],
					Quantita:arrToParse[j+1],
					Gruppo:arrToParse[j+2]
				});
			}

			console.log(dataToStore);
			$scope.txtResults = dataToStore;
			$scope.showResults = true;

		}
	}

	$scope.loadParameters = function() {

		$scope.txtResults = "Parameters loaded."
		$scope.showResults = true;

	}

	$scope.startTraining = function() {
		jarrupalatService.mergeCSV(function(res) {

			$scope.txtResults = "Training complete."
			$scope.showResults = true;
			console.log(res);

		});
	}

}]);