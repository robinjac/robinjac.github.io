
trumpOrDumpApp.controller('DisplayCtrl',function($scope, Trump){
	
	$scope.score = Trump.getScore();
	
	$scope.reset = function(){
		Trump.updateScore(0);
	};
});
