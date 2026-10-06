

// Number Guessing Game
  const { read } = require("fs");
const readLine=require("readline");

  const rl=readLine.createInterface({
      input:process.stdin,
      output:process.stdout
  });

//welcome message function

function welcomeMessage() {

    console.log("Welcome to the Number Guessing Game! I am thinking of a number between 1 and 100. Can you guess what it is?");

}

// Function to generate a random number between 1 and 100

function generateRandomNumber(){
    const number= Math.floor(Math.random() * 100) + 1;
     return number;
}
// difficulty level of game es se kya milegea number of chance milege
function play(numberOfAttempts,targetNumber,currentAttempts=1){

       
      if(currentAttempts>numberOfAttempts){
              console.log(`\nGame Over! You ran out of attempts. The target number was: ${targetNumber}`);
           askPlayAgain();
        return;
      }

      rl.question(`\nAttempt ${currentAttempts}/${numberOfAttempts} - Enter your guess:`,(input)=>{
          const userGuess=parseInt(input);

          if(userGuess===targetNumber){
               console.log(`\nCongratulations! You guessed the correct number in ${currentAttempts} attempts!`);
             askPlayAgain();
          }else if(userGuess<targetNumber){
               console.log("Incorrect! The number is GREATER than "+userGuess);
               play(numberOfAttempts,targetNumber,currentAttempts+1);
          }else if(userGuess>targetNumber){
                console.log("Incorrect The number is LESS than "+userGuess);
                play(numberOfAttempts,targetNumber,currentAttempts+1);
          }
      })

         
}
 
function getDifficultyLevel() {
       welcomeMessage();
    const args = process.argv.slice(2);
    const difficulty = args[0];
     
     let numberOfAttempts=0;

       if(difficulty === 'easy') {
        numberOfAttempts=10;
       }
       else if(difficulty === 'medium') {
        numberOfAttempts=7;
       }
       else if(difficulty === 'hard') {
        numberOfAttempts=5;
       }

       const getNumber=generateRandomNumber();
       play(numberOfAttempts,getNumber,1);


      
}

function askPlayAgain(){
      rl.question('\Do you want to play another round? (yes/no) :',(answer)=>{
           
             const choice=answer.trim().toLocaleLowerCase();

             if(choice==='yes' || choice==='y')
             {
                  console.log("\n=============================================");
            console.log("Starting a new round!");
            console.log("=============================================\n");
             }else{
                 console.log("\nThanks for playing! GoodBye! \n");
                  rl.close();
             }
      });
}


getDifficultyLevel();