// alert("helloo!!");
// $("h1");

var buttonColours = ["red","blue","green","yellow"];
var gamePattern= [];
var userClickedPattern=[];

var started = false; //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress

var level=0; //Create a new variable called level and start at level 0

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level "  + level);  //. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    nextSequence();
    started=true;
  }
});


$(".btn").click(function() {
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
                                                            // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1); //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {  //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

    console.log("success");

    if(userClickedPattern.length=== gamePattern.length){  //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

      setTimeout(function(){
        nextSequence();
      },1000);
      }
    }
     else{
      console.log("wrong");

      playSound("wrong");  // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong

      $("body").addClass("game-over");  // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

      $("#level-title").text("Game Over, Press any Key to Restart");

        startOver();  //Call startOver() if the user gets the sequence wrong.

    }
  }

function nextSequence(){

    userClickedPattern = [];  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level

level++;  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.

$("#level-title").text("Level " + level);   //Inside nextSequence(), update the h1 with this change in the value of level.



 var randomNumber = Math.floor(Math.random() * 4);                /*Generates random num betwn 0 to 3 both including*/
 var randomChosenColour= buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(150).fadeIn(100); /* jQuery to select the button with the same id as the randomChosenColour
                                                                            use jQuery to animate a flash to the button selected in step 1.*/
playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");  //javascript to play the sound for the button colour selected in step 1.
  audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed"); //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().

    setTimeout(function() {
      $("#"+ currentColor).removeClass("pressed");
    },100);

}

function startOver(over){
  level=0;      //Inside this function, you'll need to reset the values of level, gamePattern and started variables.

  gamePattern=[];
  started= false;
}
