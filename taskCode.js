/*************Variables************/
const VERSION = "1";
//const
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 1000; //ms
const WIN_LOSE_DURATION = 1000; //ms
const NUMBER_OF_BLOCKS = 8;
const NUMBER_OF_TRIALS = 4;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const CHECKMARK_WINNER = '✓';
const X_LOSER = 'X';
//vars
let currentBlockNumber = 1;
let currentTrialNumber = 1;
let timeline = [];
let levers = [KEYBOARD_PRESS_LEFT, KEYBOARD_PRESS_RIGHT];
let currentLeftProbability = 0;
let currentRightProbability = 0;
let currentCorrectLever = "";
let correctLeverChosen = true;
let userResponseKeyPress = "";
let probability_start_left = [80, 80, 80, 80, 20, 20, 20, 20];
shuffleArray(probability_start_left);
//console.log(probability_start_left);

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
        data.trial_type = "decide";
        currentCorrectLever = weighted_random(levers, [(probability_start_left[currentBlockNumber - 1] + currentLeftProbability), ((100 - (probability_start_left[currentBlockNumber - 1]) + currentRightProbability))])
        console.log((probability_start_left[currentBlockNumber - 1] + currentLeftProbability));
        console.log((100 - (probability_start_left[currentBlockNumber - 1]) + currentRightProbability));
        console.log(currentCorrectLever);
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
        data.trial_type = "action";
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        if(userResponseKeyPress == currentCorrectLever){
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
        data.trial_type = "feedbackWinner";
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
        data.trial_type = "feedbackLoser";
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
        data.trial_type = "prepare";
        data.current_block = currentBlockNumber;
        data.current_trial = currentTrialNumber;
        data.correct_response = currentCorrectLever;
        data.user_response = userResponseKeyPress;
        data.current_block_probability_left = (probability_start_left[currentBlockNumber - 1] + currentLeftProbability);
        data.current_block_probability_right = ((1 - probability_start_left[currentBlockNumber - 1]) + currentRightProbability);
        //console.log("trial: " + currentTrialNumber);
        //console.log("block: " + currentBlockNumber);

        if(currentTrialNumber == NUMBER_OF_TRIALS){
            currentTrialNumber = 0;
            currentBlockNumber++;
        }
        currentTrialNumber++;

        let std = 3;
        do{
            currentLeftProbability = generateGaussian(0, std);
            currentRightProbability = generateGaussian(0, std);
            std = 2;
        }while ((100 - (probability_start_left[currentBlockNumber - 1]) + currentRightProbability) < 0 || (probability_start_left[currentBlockNumber - 1] + currentLeftProbability) < 0);
    }
};

let blockOfTrials = {
    timeline: [decide, action, feedbackWinner, feedbackLoser, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [blockOfTrials],
    randomize_order: false,
    repetitions: NUMBER_OF_BLOCKS
}

jsPsych.init({
    timeline: [trialBlocks],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

/*********Helper Functions************/
//Algorithm found here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Algorithm found here: https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript/55671924
function weighted_random(items, weights) {
    let i;
    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    let random = Math.random() * weights[weights.length - 1];
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    return items[i];
}

//Algorithm found here: https://discourse.psychopy.org/t/javascript-gaussian-function/17724/2
// and here: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function generateGaussian(mean,std){
    let u1 = 0;
    let u2 = 0;

    while(u1 === 0) u1 = Math.random();
    while(u2 === 0) u2 = Math.random();

    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
    return z0 * std + mean;
}