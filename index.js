const current = document.getElementById("current");
const answer = document.getElementById("answer");
const pastys = document.querySelectorAll(".pasty");
const stuff = { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true, "8": true, "9": true, "+": true, "-": true, "*": true, "/": true, "(": true, ")": true, ".": true, "%": true };

let equations = [];
let chars = [""];
let done = false;
let pos = 0;
let enter = false;

const string = () => {
    return chars[chars.length - 1];
};

const pasteq = (box) => {
    return equations.length - 1 - pos - (pastys.length - 1 - box);
};

const fills = (box) => {
    if (pasteq(box) >= 0) {
        pastys[box].innerHTML = equations[pasteq(box)].text;
    } else {
        pastys[box].innerHTML = "Past EQ";
    }
};

const show = () => {
    if (string() === "") {
        current.innerHTML = "Current EQ";
    } else {
        current.innerHTML = string();
    }

    fills(0);
    fills(1);
    fills(2);
    fills(3);

    sessionStorage.setItem("equations", JSON.stringify(equations));
    sessionStorage.setItem("steps", JSON.stringify(chars));
    sessionStorage.setItem("finished", JSON.stringify(done));
    sessionStorage.setItem("answer", answer.innerHTML);
};

const add = (key) => {
    if (enter) {
        return;
    }
    if (done) {
        chars = [""];
        done = false;
    }
    chars.push(string() + key);
    show();
};

const calculate = () => {
    if (enter || string() === "") {
        return;
    }
    const answey = eval(string());
    answer.innerHTML = answey;
    equations.push({ steps: JSON.parse(JSON.stringify(chars)), text: string() + " = " + answey });
    pos = 0;
    done = true;
    show();
};

const erase = () => {
    if (chars.length > 1) {
        chars.pop();
    }
    done = false;
    show();
};

const up = () => {
    if (!enter && pos + pastys.length < equations.length) {
        pos++;
        show();
    }
};

const down = () => {
    if (!enter && pos > 0) {
        pos--;
        show();
    }
};

const before = (box) => {
    if (pasteq(box) >= 0) {
        chars = JSON.parse(JSON.stringify(equations[pasteq(box)].steps));
        done = false;
        show();
    }
};

document.addEventListener("keydown", (event) => {
    if (stuff[event.key]) {
        add(event.key);
    }
    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }
    if (event.key === "Enter") {
        enter = true;
    }
    if (event.key === "Backspace") {
        erase();
    }
    if (event.key === "ArrowUp") {
        up();
    }
    if (event.key === "ArrowDown") {
        down();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        enter = false;
    }
});

window.addEventListener("load", (event) => {
    const stored = sessionStorage.getItem("equations");
    if (stored) {
        equations = JSON.parse(stored);
    } else {
        equations = [];
        sessionStorage.setItem("equations", equations);
    }

    const rn = sessionStorage.getItem("steps");
    if (rn) {
        chars = JSON.parse(rn);
    }

    const fins = sessionStorage.getItem("finished");
    if (fins) {
        done = JSON.parse(fins);
    }

    const ans = sessionStorage.getItem("answer");
    if (ans) {
        answer.innerHTML = ans;
    }

    show();
});


