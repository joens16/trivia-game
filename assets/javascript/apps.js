var presentQuestion;
var rightAnswer;
var wrongAnswer;
var emptyAnswer; //Created my variables
var seconds;
var time;
var answered;
var userChoice;



//Created my object array with questions, answers, and correct answers
var gameQuestions = [{
    question: "The highest ever attendance at a World Cup match between Brazil and Uruguay in 1950 drew 199,854 spectators. In which famous stadium was this game played?",
    answerChoices: ["Wembley", "Camp Nou", "Maracana", "NRG Stadium"],
    answer: 2
},{
    question: "What is the only country to have appeared in every World Cup?",
    answerChoices: ["Germany", "Brazil", "Mexico", "USA"],
    answer: 1
},{
    question: "Countries from only two continents have won World Cups. South America being one of them and the other continent is?",
    answerChoices: ["Europe", "Asia", "North America", "Antartica"],
    answer: 0
},{
    question: "What is the country that has won most World Cup titles?",
    answerChoices: ["Peru", "Germany", "Russia", "Brazil"],
    answer: 3
},{
    question: "For the 2018 World Cup, the smallest country in terms of population to ever qualify to a world cup is?",
    answerChoices: ["Uruguay", "China", "Iceland", "Liechtenstein"],
    answer: 2
},{
    question: "Where was the first ever World Cup held?",
    answerChoices: ["New Zealand", "Uruguay", "Canada", "Roman Empire"],
    answer: 1
},{
    question: "When was the first World Cup held in the US?",
    answerChoices: ["1980", "1994", "2014", "1776"],
    answer: 1
},{
    question: "Who is the top goal-scorer in World Cup history?",
    answerChoices: ["Pelé", "Maradona", "Messi", "Miroslav Klose"],
    answer: 3    
}];

//Created my array with my 8 gifs
var gifList = ["gif1", "gif2", "gif3", "gif4", "gif5", "gif6", "gif7", "gif8"];

//Button to start game
$("#start-button").on("click", function(){
    $(this).hide();
    beginTrivia();
})

//Function to set timer to 20 secoonds per question
function questionTimer(){
    seconds = 20;
        $("#time").html("<h3> Your Time Left: " + seconds + "</h3>");
        answered = true;
        time = setInterval(timeDisplay, 1000);
}
//Function to show clock inside the container
function timeDisplay(){
    seconds --;
    $("#time").html("<h3>Your Time Left: " + seconds + "</h3>")
    if (seconds < 1){
        clearInterval(time);
        answered = false;
        correctAnswer();
    }
}
//Function to set up next question
function nextQuestion(){
    $("#alert").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered = true;

    $("#present-question").html("Question number "+(presentQuestion+1));
    $("#question").html("<h3>" + gameQuestions[presentQuestion].question + "</h3>");
    for(var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(gameQuestions[presentQuestion].answerChoices[i]);
        choices.attr({"data-index": i});
        choices.addClass("thisChoice");
        $("#answerChoices").append(choices);
    }
    questionTimer();

    $(".thisChoice").on("click", function(){
        userChoice = $(this).data("index");
        clearInterval(time);
        correctAnswer();
    });
}


function beginTrivia(){
    $("#rightAnswers").empty();
    $("#wrongAnswers").empty();
    $("#enmptyAnswer").empty();
    $("#gameResults").empty();
    presentQuestion = 0;
    rightAnswer = 0;
    wrongAnswer = 0;
    emptyAnswer = 0;
    nextQuestion();
}




//Function with if statements to 
function correctAnswer(){
    $("#present-question").empty();
    $(".thisChoice").empty();
    $("#question").empty();

    var correctAnswerDisplay = gameQuestions[presentQuestion].answerChoices[gameQuestions[presentQuestion].answer];
    var correctAnswerList = gameQuestions[presentQuestion].answer;
    $("#gif").html("<img src ='assets/images/"+gifList[presentQuestion]+".gif' width = '500px'>");

    if((userChoice==correctAnswerList)&&(answered==true)){
        rightAnswer++;
        $("#alert").html("Good Job!");
    }else if((userChoice != correctAnswerList)&&(answered==true)){
        wrongAnswer++;
        $("#alert").html("That is incorrect!");
        $("#correctedAnswer").html("the answer was: " +correctAnswerDisplay);
    }else{
        emptyAnswer++;
        $("#alert").html(`You're out of time!`);
        $("#correctedAnswer").html("the answer was: " +correctAnswerDisplay);
        answered=true;
    }
    
    
    if(presentQuestion ==(gameQuestions.length -1)){
        setTimeout(score, 4000)
    }else{
        presentQuestion++;
        setTimeout(nextQuestion, 4000);
    }
}


//function to reset time, alert, corrected answer and gif
function reset(){
    $("#time").empty();
	$("#alert").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
}




//Function to show results
 function score(){
    
    reset();

	$("#gameResults").html("Here are your results...");
	$("#rightAnswers").html("Correct Answers: " + rightAnswer);
	$("#wrongAnswers").html("Incorrect Answers: " + wrongAnswer);
	$("#emptyAnswers").html("Unanswered: " + emptyAnswer);
	$("#playAgainButton").addClass("reset");
	$("#playAgainButton").show();
	$("#playAgainButton").html("Play Again?");
}
//Button to start game all over
$("#playAgainButton").on('click', function(){
	$(this).hide();
	beginTrivia();
});

