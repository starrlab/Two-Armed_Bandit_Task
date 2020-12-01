/*************Variables************/
const VERSION = "1";
//settings
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 1000; //ms
const WIN_LOSE_DURATION = 1000; //ms
const NUMBER_OF_BLOCKS = 8;
const NUMBER_OF_TRIALS = 40;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const CHECKMARK_WINNER = '✓';
const X_LOSER = 'X';
let currentBlockNumber = 1;
let currentTrialNumber = 1;
let timeline = [];
let levers = [KEYBOARD_PRESS_LEFT, KEYBOARD_PRESS_RIGHT];
let correctLeverChosen = true;

let probability_start_left = [.8, .8, .8, .8, .2, .2, .2, .2];
shuffleArray(probability_start_left);
//let probs = [.2, .8];

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img></div>" +
        "<div  '><h1>Decide Lever to Pull!</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {

    }
};

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img></div>" +
        "<div  '><h1>Pull a Lever!</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        if(data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(KEYBOARD_PRESS_RIGHT)){
            correctLeverChosen = true;
        }
        else{
            correctLeverChosen = false;
        }
    }
};

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img></div>" +
        "<div  '><h1 id='checkmark_for_winner'>" + CHECKMARK_WINNER + "</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {

    },
    on_load: function (data) {
        if(!correctLeverChosen){
            jsPsych.finishTrial();
        }
    }
};

let feedbackLoser = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img></div>" +
        "<div  '><h1 id='x_for_loser'>" + X_LOSER + "</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {

    },
    on_load: function (data) {
        if(correctLeverChosen){
            jsPsych.finishTrial();
        }
    }
};

let prepare = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: PREPARE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img class='hidden_image' src='img/HandleLeft.png'></img></div>" +
        "<div  '><h1>Prepare for the next trial!</h1></div>" +
        "<div  '><img class='hidden_image' src='img/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        if(currentTrialNumber == 40){
            currentTrialNumber = 1;
            currentBlockNumber++;
        }
    }
};

let blockOfTrials = {
    timeline: [decide, action, feedbackWinner, feedbackLoser, prepare],
    randomize_order: false,
    repetitions: 4
};

let trialBlocks = {
    timeline: [blockOfTrials],
    randomize_order: false,
    repetitions: 8
}

/*********Start Experiment************/
//Display data shows the data displayed at end of trials
jsPsych.init({
    timeline: [trialBlocks],
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function chooseWeighted(items, chances) {
    let sum = chances.reduce((acc, el) => acc + el, 0);
    let acc = 0;
    chances = chances.map(el => (acc = el + acc));
    let rand = Math.random() * sum;
    return items[chances.filter(el => el <= rand).length];
}