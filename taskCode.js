/*************Variables************/
const VERSION = "1";

//settings
let leftBlockStartProbabilities = [.8, .8, .8, .8, .2, .2, .2, .2];
let rightBlockStartProbabilities = [.8, .8, .8, .8, .2, .2, .2, .2];
shuffleArray(leftBlockStartProbabilities);
shuffleArray(rightBlockStartProbabilities);
console.log(leftBlockStartProbabilities);
const NUMBER_OF_BLOCKS = 8; //This will run through the entire ESSequence n number of times as specified.
const NUMBER_OF_TRIALS = 40; //This will run through the entire ESSequence n number of times as specified.
//const KEYBOARD_PRESS_TUTORIAL = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(13); //This is the tutorial key code
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
let blockNumber = 1;
let trialNumber = 1;
let timeline = [];

/*
const STIMULUS_DURATION = 2000; //This is the total time the image will be displayed before disapearing.
const TRIAL_DURATION = 3000; //This is the total time before the curent trial moves on to next trial
const POST_TRIAL_GAP = [1000, 1250, 1500, 1750, 2000]; //Sets the time after the trial finishes to wait until the fixation starts (trial hang time).

//Image settings
const STIMULUS_HEIGHT = 550; //Changes the height of the images. Set to null for no changes
const STIMULUS_WIDTH = null; //Changes the width of the images.  Set to null for no changes
const MAINTAIN_IMG_ASPECT_RATIO = true; //must be true or false. Set only the width or height and set to true will keep the aspect ration of the image. Set to false if want to change height/width together.

//Fixation settings
const FIXATION_DURATION = [1000]; //Sets the fixation duration. Can add as many values as you want or subtract values from array.
const FIXATION_KEY = '+';
const FIXATION_SIZE = 60;
 */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}