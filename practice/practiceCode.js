const NUMBER_OF_TRIALS = 20;
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 1000; //ms
const WIN_LOSE_DURATION = 1000; //ms
const INSTRUCTIONS = "Instructions go here";
const PRACTICE_COMPLETE = "Practice Complete!";
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const CHECKMARK_WINNER = '✓';
const X_LOSER = 'X';
let rewardCount = 0;
let levers = [KEYBOARD_PRESS_LEFT, KEYBOARD_PRESS_RIGHT];
let currentCorrectLever = "";
let correctLeverChosen = true;
let currentBlockNumber = 0;
let currentTrialNumber = 0;
let timeline = [];
let probability_start_left = [80, 80, 20, 20];
shuffleArray(probability_start_left);

let instructions = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div >"+
        "<div  '><h1>" + INSTRUCTIONS + "</h1> <h3>Press any key to continue</h3></div>" +
        "</div>",
}

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Decide a Lever to Pull!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
        currentCorrectLever = weighted_random(levers, [(probability_start_left[currentBlockNumber]), (100 - probability_start_left[currentBlockNumber])]);
    }
};
//add this to timeline
timeline.push(decide);

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Pull a Lever!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        if(userResponseKeyPress == currentCorrectLever){
            correctLeverChosen = true;
            rewardCount++;
        }
        else{
            correctLeverChosen = false;
        }
    }
};
//add this to timeline
timeline.push(action);

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1 id='checkmark_for_winner'>" + CHECKMARK_WINNER + "</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    },
    on_load: function (data) {
        if(!correctLeverChosen){
            jsPsych.finishTrial();
        }
    }
};
//add this to timeline
timeline.push(feedbackWinner);

let feedbackLoser = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1 id='x_for_loser'>" + X_LOSER + "</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
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
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Prepare for the next trial!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
        if((currentTrialNumber % (NUMBER_OF_TRIALS / 4)) == 4){

            currentTrialNumber = 0;
            currentBlockNumber++;
        }
        else{
            currentTrialNumber++;
        }
    }
};

let practiceComplete = {
    type: "html-keyboard-response",
    choices: jsPsych.ALL_KEYS,
    stimulus: "<div>"+
        "<div  '><h1>" + PRACTICE_COMPLETE + "</h1><h3>Press any key to go back</h3></div>" +
        "</div>",
    on_finish: function () {
        window.history.back();
    }
}

let blockOfTrials = {
    timeline: [decide, action, feedbackLoser, feedbackWinner, prepare],
    randomize_order: false,
    repetitions: NUMBER_OF_TRIALS
};

let trialBlocks = {
    timeline: [instructions, blockOfTrials, practiceComplete]
}

jsPsych.init({
    timeline: [trialBlocks]
});
