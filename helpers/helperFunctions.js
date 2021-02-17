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

let saveData = (function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        let json = data,
            blob = new Blob([json], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

