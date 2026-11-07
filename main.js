const algstext = document.getElementById("algs");
const timertext = document.getElementById("timertext");
const ao5text = document.getElementById("ao5text");
const ao12text = document.getElementById("ao12text");
const eventSelect = document.getElementById("events");

const algs = [" L", " L'", " R", " R'", " U", " U'", " F", " F'", " D", " D'", " B", " B'", " L2", " R2", " F2", " D2", " U2", " B2"];
const algs4x4 = [" L", " L'", " R", " R'", " U", " U'", " F", " F'", " D", " D'", " B", " B'", " L2", " R2", " F2", " D2", " U2", " B2", " Rw", " Lw", " Uw", " Dw", " Fw", " Bw", " Rw'", " Lw'", " Uw'", " Dw'", " Fw'", " Bw'", " Rw2", " Lw2", " Uw2", " Dw2", " Fw2", " Bw2"];
const algspyra = [" L", " L'", " R", " R'", " U", " U'", " B", " B'", " r", " r'", " l", " l'", " u", " u'", " b", " b'"];

let time = 14;
let timerInterval = null;
let spacetrigger = 0;

let solve1, solve2, solve3, solve4, solve5, solve6, solve7, solve8, solve9, solve10, solve11, solve12;
let solvetracker = 0;
let ao5 = 0;
let ao12 = 0;

function generateScramble() {
    const selectedEvent = eventSelect.value;
    if (selectedEvent === "2x2") {
        refreshAlgs2x2();
    } else if (selectedEvent === "3x3") {
        refreshAlgs();
    } else if (selectedEvent === "4x4") {
        refreshAlgs4x4();
    } else if (selectedEvent === "pyraminx") {
        refreshAlgsPyra();
    }
}

generateScramble();

function refreshAlgs() {
    let algsval = 0;
    algstext.innerHTML = "";
    while (algsval <= 20) {
        const algsturn = Math.floor(Math.random() * algs.length);
        algstext.append(algs[algsturn]);
        algsval++;
    }
}

function refreshAlgs2x2() {
    let algsval = 0;
    algstext.innerHTML = "";
    while (algsval <= 12) {
        const algsturn = Math.floor(Math.random() * algs.length);
        algstext.append(algs[algsturn]);
        algsval++;
    }
}

function refreshAlgs4x4() {
    let algsval = 0;
    algstext.innerHTML = "";
    while (algsval <= 36) {
        const algsturn = Math.floor(Math.random() * algs4x4.length);
        algstext.append(algs4x4[algsturn]);
        algsval++;
    }
}

function refreshAlgsPyra() {
    let algsval = 0;
    algstext.innerHTML = "";
    while (algsval <= 20) {
        const algsturn = Math.floor(Math.random() * algspyra.length);
        algstext.append(algspyra[algsturn]);
        algsval++;
    }
}

function about() {
    window.open('moresection/index.html'); 
}

function inspection() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    time = 14;
    timertext.style.color = "green";
    timertext.innerHTML = time;

    timerInterval = setInterval(() => {
        time--;
        timertext.innerHTML = time;

        if (time <= 0) {
            clearInterval(timerInterval);
            timertext.style.color = "red";
            timertext.innerHTML = "0";
        }
    }, 1000);
}

function starttimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    time = 0;
    timertext.style.color = "white";
    timertext.innerHTML = time.toFixed(2);

    timerInterval = setInterval(() => {
        time += 0.01;
        timertext.innerHTML = time.toFixed(2);
    }, 10);
}

function stoptimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    solvetracker++;

    switch (solvetracker) {
        case 1: solve1 = time; break;
        case 2: solve2 = time; break;
        case 3: solve3 = time; break;
        case 4: solve4 = time; break;
        case 5: 
            solve5 = time;
            ao5 = (solve1 + solve2 + solve3 + solve4 + solve5) / 5;
            ao5text.innerHTML = "ao5: " + ao5.toFixed(2);
            break;
        case 6: solve6 = time; break;
        case 7: solve7 = time; break;
        case 8: solve8 = time; break;
        case 9: solve9 = time; break;
        case 10: solve10 = time; break;
        case 11: solve11 = time; break;
        case 12: 
            solve12 = time;
            ao12 = (solve1 + solve2 + solve3 + solve4 + solve5 + solve6 + solve7 + solve8 + solve9 + solve10 + solve11 + solve12) / 12;
            ao12text.innerHTML = "ao12: " + ao12.toFixed(2);
            solvetracker = 0;
            break;
    }

    generateScramble(); 
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        spacetrigger++;
        
        if (spacetrigger === 1) {
            inspection();
        } else if (spacetrigger === 2) {
            starttimer();
        } else if (spacetrigger === 3) {
            stoptimer();
            spacetrigger = 0;
        }
    }
});

eventSelect.addEventListener("change", (event) => {
    generateScramble();
});