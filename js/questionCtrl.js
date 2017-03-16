
trumpOrDumpApp.controller('QuestionCtrl',function($scope, Trump){
	
	var tweets = Trump.getTweets(5); //training data for the markov chain
	
	var q = Math.round(Math.random()) //q = 1 real tweet, q = 0 false tweet
	
	var question = "I have to tell you...";
	var markov = false;
	
	//---------------------------------------------------------------------------------------------------------------
	//markov chain code, taken from http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains
	//---------------------------------------------------------------------------------------------------------------
	
	var terminals = {}; //words that end a sentence
	var startwords = []; //words that start a sentence 
	var wordstats = {}; //will hold array of wordarrays, containing follow-up words. Higher probability words are more frequent 
	
	//picks the next word in the chain
	var choice = function (a) {
		
			var i = Math.floor(a.length * Math.random());
			return a[i];
	};

	//makes a random walk through the markov chain
	var generateFakeTweet = function (min_length) {

		var word = choice(startwords);
		var tweet = [word];
		
		while (wordstats.hasOwnProperty(word)) {
			var next_words = wordstats[word];
			word = choice(next_words);
			tweet.push(word);
			if (tweet.length > min_length && terminals.hasOwnProperty(word)) 
				break;
			
			//if(tweet.length > 30) //maximum tweet length of 30 words
			//	break;
		}
		if (tweet.length < min_length) 
			return generateFakeTweet(min_length);
		
		return tweet.join(' ');
	};
	
	$scope.getQuestion = function(){
	
		if(!markov && tweets.length > 4){ //makes sure we load all the 7 tweets
			
			var t = [];
			var exists = false;
			
			//makes sure there is no duplicate tweets
			for(i = 0; i < tweets.length; i++){
				for(j = 0; j < t.length; j++){
					if(tweets[i] == t[j]){
						exists = true;
						break;
					};
				};
				if(exists == false)
					t.push(tweets[i]);

				exists = false;
			};
			
			tweets = t;
			
			markov = true; //makes sure this loop is run only once
			
			//this for-loop builds the markov chain
			for (var i = 0; i < tweets.length; i++) {
				var words = tweets[i].split(' ');
				
				terminals[words[words.length-1]] = true;
				startwords.push(words[0]);
				
				if(words.length > 10){
					for (var j = 0; j < words.length - 1; j++) {
						if (wordstats.hasOwnProperty(words[j]) && wordstats.hasOwnProperty(words[j+1])) {
							wordstats[words[j]].push(words[j+1]);
							wordstats[words[j+1]].push(words[j+2]);
						} else {
							wordstats[words[j]] = [words[j+1]];
							wordstats[words[j+1]] = [words[j+2]];
						}
					}
				}else{
					for (var j = 0; j < words.length - 1; j++) {
						if (wordstats.hasOwnProperty(words[j])) {
							wordstats[words[j]].push(words[j+1]);
						} else {
							wordstats[words[j]] = [words[j+1]];
						}
					}
				};
			}
			
			if(q > 0){
				Trump.setAnswer(true);
				question = tweets[Math.floor(tweets.length * Math.random())];
			}else{
				Trump.setAnswer(false);
				question = generateFakeTweet(2); //generates a new tweet with min length of 2 words
			};

			return question; 
		}
			
		return question;
		
	};
	
	//----------------------
	//Markov chain code ends here
	//----------------------
	
});