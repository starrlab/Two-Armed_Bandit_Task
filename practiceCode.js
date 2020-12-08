let decide = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Decide Lever to Pull!</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    }
};
//add this to timeline
timeline.push(decide);

let action = {
    type: "html-keyboard-response",
    choices: [KEYBOARD_PRESS_RIGHT, KEYBOARD_PRESS_LEFT],
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1>Pull a Lever!</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    }
};
//add this to timeline
timeline.push(action);

let feedbackWinner = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1 id='checkmark_for_winner'>✓</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    }
};
//add this to timeline
timeline.push(feedbackWinner);

let feedbackLoser = {
    type: "html-keyboard-response",
    choices: jsPsych.NO_KEYS,
    trial_duration: DECIDE_DURATION,
    stimulus: "<div class='container'>"+
        "<div  '><img src='img/HandleLeft.png'></img>" +
        "<p class='small'><strong>Press the ← key</strong></p></div>" +
        "<div  '><h1 id='x_for_loser'>X</h1></div>" +
        "<div  '><img src='img/HandleRight.png'></img>" +
        "<p class='small'><strong>Press the → key</strong></p></div>" +
        "</div>",
    on_finish: function (data) {
    }
};