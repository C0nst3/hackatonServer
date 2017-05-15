var app = angular.module("Jarrupalat", []);


app.controller("inputController", ["$scope", "JarrupalatService", 
	function($scope, JarrupalatService) {

		$scope.txtResults = "";
		$scope.showResults = false;
		var strings = ["Training in progress", "Training in progress.", "Training in progress..", "Training in progress..."];
		var index = 0;

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

			JarrupalatService.mergeCSV(function(res) {
				
			});
			

		}

		function changeText() {

			/*$scope.showResults = true;

			while(1) {

				index++;

				if(index >= strings.length) {
					index = 0;
				}

				$scope.txtResults = strings[index];
			}

			console.log(res);*/
		}

	}]);