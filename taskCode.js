/*************Variables************/
const VERSION = "1";

const DECIDE_DURATION = 20000; //ms
//settings
let probability_start_left = [.8, .8, .8, .8, .2, .2, .2, .2];
shuffleArray(probability_start_left);
const NUMBER_OF_BLOCKS = 8;
const NUMBER_OF_TRIALS = 40;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
let currentBlockNumber = 1;
let currentTrialNumber = 1;
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

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    stimulus: "<h1>Decide Which Lever to Pull!</h1>" +
        "<div>"+
        "<div class='centerLeft' '><img src='img/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div class='centerRight' '><img src='img/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    }
};
//add this to timeline
timeline.push(decide);

/*********Start Experiment************/
//Display data shows the data displayed at end of trials
jsPsych.init({
    timeline: timeline
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}