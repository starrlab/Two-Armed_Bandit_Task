/*************Variables************/
const VERSION = "1";
//const
const DECIDE_DURATION = 2000; //ms
const PREPARE_DURATION = 1000; //ms
const WIN_LOSE_DURATION = 1000; //ms
const NUMBER_OF_BLOCKS = 1;
const NUMBER_OF_TRIALS = 4;
const KEYBOARD_PRESS_RIGHT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(39); //This is the arrow key code
const KEYBOARD_PRESS_LEFT = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(37); //This is the arrow key code
const CHECKMARK_WINNER = '✓';
const X_LOSER = 'X';
const MEAN = 0;
const STD_DEV = 3;

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
let rewardCount = 0;
let RTtime = 0;
let csvData = "";
//metadata
csvData = "version," + VERSION + "\n";
csvData += "DECIDE_DURATION," + DECIDE_DURATION + "\n";
csvData += "PREPARE_DURATION," + PREPARE_DURATION + "\n";
csvData += "WIN_LOSE_DURATION," + WIN_LOSE_DURATION + "\n";
csvData += "NUMBER_OF_BLOCKS," + NUMBER_OF_BLOCKS + "\n";
csvData += "NUMBER_OF_TRIALS," + NUMBER_OF_TRIALS + "\n";
csvData += "KEYBOARD_PRESS_RIGHT," + KEYBOARD_PRESS_RIGHT + "\n";
csvData += "KEYBOARD_PRESS_LEFT," + KEYBOARD_PRESS_LEFT + "\n";
csvData += "probability_ordering_left," + probability_start_left + "\n";
//title
csvData += "Linux Time (on finish), Task Index, Total Time Elapsed, Test Type, Block, Trial, Action RT Time, Probability_Left, Probability_Right, User Response, Correct Response, Reward\n"

let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
        prompt: function() {
            return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
        },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Decide a Lever to Pull!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "decide";
        currentCorrectLever = weighted_random(levers, [(probability_start_left[currentBlockNumber - 1] + currentLeftProbability), ((100 - (probability_start_left[currentBlockNumber - 1]) + currentRightProbability))])
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "decide," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "\n";
    }
};

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Pull a Lever!</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "action";
        userResponseKeyPress = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
        RTtime = data.rt;
        if(userResponseKeyPress == currentCorrectLever){
            correctLeverChosen = true;
            rewardCount++;
        }
        else{
            correctLeverChosen = false;
        }
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "action," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "\n";
    }
};

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: WIN_LOSE_DURATION,
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1 id='checkmark_for_winner'>" + CHECKMARK_WINNER + "</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "feedbackWinner";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "feedback_win," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "\n";
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
    prompt: function() {
        return "<div><h1>$" + String(rewardCount.toString()).padStart(2, '0') + ".00</h1></div>"
    },
    stimulus: "<div class='container'>"+
        "<div  '><img src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1 id='x_for_loser'>" + X_LOSER + "</h1></div>" +
        "<div  '><img src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "feedbackLoss";
        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "feedback_loss," + currentBlockNumber + "," + currentTrialNumber + "," +  "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "," + "n/a" + "\n";
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
        "<div  '><img class='hidden_image' src='../images/HandleLeft.png'></img></div>" +
        "<div  '><h1>Prepare for the next trial!</h1></div>" +
        "<div  '><img class='hidden_image' src='../images/HandleRight.png'></img></div>" +
        "</div>",
    on_finish: function (data) {
        data.trial_type = "prepare";
        data.current_block = currentBlockNumber;
        data.current_trial = currentTrialNumber;
        data.correct_response = currentCorrectLever;
        data.user_response = userResponseKeyPress;
        data.current_block_probability_left = (probability_start_left[currentBlockNumber - 1] + currentLeftProbability)/100;
        data.current_block_probability_right = ((100 - probability_start_left[currentBlockNumber - 1]) + currentRightProbability)/100;
        data.correct = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(currentCorrectLever) == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(userResponseKeyPress)

        csvData += Date.now().toString() + "," + (data.trial_index+1) + "," +  data.time_elapsed + "," + "prepare," + currentBlockNumber + "," + currentTrialNumber + "," +  RTtime + "," + data.current_block_probability_left + "," + data.current_block_probability_right + "," + userResponseKeyPress + "," + currentCorrectLever + "," + data.correct + "\n";
        //Check if block is finished, if so reset trials and increment blocks. Right after increment trial so we start at 1
        if(currentTrialNumber == NUMBER_OF_TRIALS){
            currentTrialNumber = 0;
            currentBlockNumber++;
        }
        currentTrialNumber++;

        //This sets the probabilities to be added onto the initial probability set. We want it to be 0 if its the first trial
        //Try twice with current std dev and if it fails decrement and keep trying
        if(currentTrialNumber > 1){
            let count = 2;
            do{
                currentLeftProbability = generateGaussian(MEAN, STD_DEV);
                currentRightProbability = generateGaussian(MEAN, STD_DEV);
                count --;
                if(count < 1){
                    currentLeftProbability = generateGaussian(MEAN, (STD_DEV-1));
                    currentRightProbability = generateGaussian(MEAN, (STD_DEV-1));
                }
            }while ((100 - (probability_start_left[currentBlockNumber - 1]) + currentRightProbability) < 0 || (probability_start_left[currentBlockNumber - 1] + currentLeftProbability) < 0);
        }
        else if(currentTrialNumber == 1){
            currentLeftProbability = 0;
            currentRightProbability = 0;
        }
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
        //jsPsych.data.displayData();
        let filename = "task_" + Date.now().toString() + "_ver" + VERSION + ".csv";
        saveData(csvData, filename);
    }
});