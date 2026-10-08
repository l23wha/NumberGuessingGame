

// Number Guessing Game
//now implemena a hint system so they give clue to the user 
  const { read } = require("fs");
const readLine=require("readline");

  const rl=readLine.createInterface({
      input:process.stdin,
      output:process.stdout
  });

//welcome message function

function welcomeMessage() {

    console.log("Welcome to the Number Guessing Game! I am thinking of a number between 1 and 100. Can you guess what it is?");
    console.log("Tip : Type 'hint' anytime to get a clue (costs 1 attempt)!\n");

}

//fun

// Function to generate a random number between 1 and 100

function generateRandomNumber(){
    const number= Math.floor(Math.random() * 100) + 1;
     return number;
}

//function to generate a dynamic hint
function getHint(targetNumber){
   const isEven=targetNumber%2===0;
   const isMultipleOf5=targetNumber%5===0;
    
   let hintText=`the number is ${isEven ?"EVEN (Sam)":"ODD (Visam)"}`;
   if(isMultipleOf5){
       hintText+="and it is also a multiple of 5!";
   }else{
      hintText+='!';
   }
   return hintText;
}
// difficulty level of game es se kya milegea number of chance milege
function play(numberOfAttempts,targetNumber,currentAttempts,startTime){

       
      if(currentAttempts>numberOfAttempts){
              console.log(`\nGame Over! You ran out of attempts. The target number was: ${targetNumber} `);
           askPlayAgain();
        return;
      }

      rl.question(`\nAttempt ${currentAttempts}/${numberOfAttempts} - Enter your guess (or 'hint'):`,(input)=>{

            const trimmedInput=input.trim().toLowerCase();
             if(trimmedInput==="hint" || trimmedInput==='h'){
                 console.log(`\n HINT: ${getHint(targetNumber)}`);
                 console.log("hint took 1 attempt\n");

                 return play(numberOfAttempts,targetNumber,currentAttempts+1,startTime);
             }
          const userGuess=parseInt(input);

          if(userGuess===targetNumber){
               const endTime=Date.now();
               const timeTaken=Math.floor((endTime-startTime)/1000);
               console.log(`\nCongratulations! You guessed the correct number in ${currentAttempts} attempts! and time taken is ${timeTaken} seconds `);
             askPlayAgain();
          }else if(userGuess<targetNumber){
               console.log("Incorrect! The number is GREATER than "+userGuess);
               play(numberOfAttempts,targetNumber,currentAttempts+1,startTime);
          }else if(userGuess>targetNumber){
                console.log("Incorrect The number is LESS than "+userGuess);
                play(numberOfAttempts,targetNumber,currentAttempts+1,startTime);
          }
      });

         
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
        const startTime=Date.now();
       play(numberOfAttempts,getNumber,1,startTime);


      
}

function askPlayAgain(){
      rl.question('\Do you want to play another round? (yes/no) :',(answer)=>{
           
             const choice=answer.trim().toLocaleLowerCase();

             if(choice==='yes' || choice==='y')
             {
                  console.log("\n=============================================");
            console.log("Starting a new round!");
            console.log("=============================================\n");
            getDifficultyLevel();
             }else{
                 console.log("\nThanks for playing! GoodBye! \n");
                  rl.close();
             }
      });
}


getDifficultyLevel();