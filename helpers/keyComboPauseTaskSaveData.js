/*************Key Combo for pausing, ending task early and saving data************/
const KEYCOMBOCHAR1 = 'q';
const KEYCOMBOCHAR2 = 'w';
const KEYCOMBOCHAR3 = 'e';
keys = [];
document.onkeydown = function (e) {
    if (e.key === KEYCOMBOCHAR1) {
        keys.push(e.key);
    }
    if (e.key === KEYCOMBOCHAR2) {
        keys.push(e.key);
    }
    if (e.key === KEYCOMBOCHAR3) {
        keys.push(e.key);
    }

    if (keys.includes(KEYCOMBOCHAR1) && keys.includes(KEYCOMBOCHAR2) && keys.includes(KEYCOMBOCHAR3)) {
        jsPsych.pauseExperiment();
        keys.length = 0;
        let exitTask = confirm("Task Paused...\nClick OK to save data and quit OR Cancel to resume Task.");
        if (exitTask) {
            let filename = "task_" + Date.now().toString() + "_ver" + VERSION + ".csv";
            saveData(csvData, filename);
            let resume = confirm("Resume Experiment?");
            if (resume) {
                jsPsych.resumeExperiment();
            }
        }
        else{
            jsPsych.resumeExperiment();
        }
    }
}