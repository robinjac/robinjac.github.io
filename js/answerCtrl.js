
trumpOrDumpApp.controller('AnswerCtrl',function($scope, $routeParams, Trump){
	
	
	$scope.showAnswer = "";
	
	if($routeParams.ans == "trump"){
			
			if(Trump.getAnswer() == true){
				
				Trump.updateScore(Trump.getScore() + 1);
				$scope.showAnswer = "Tremendous!";
			}else{
			
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Wrong!";
			};
			
		}else{
			
			if(Trump.getAnswer() == false){
				
				Trump.updateScore(Trump.getScore() + 1);
				$scope.showAnswer = "Tremendous!";
			}else{
			
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Wrong!";
			};
	
		};
	
	
});