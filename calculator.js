const display = document.getElementById("display");

document.getElementById("btn-plus").addEventListener("click", () => { pressedOperator("+") });
document.getElementById("btn-minus").addEventListener("click", () => { pressedOperator("-") });
document.getElementById("btn-multiply").addEventListener("click", () => { pressedOperator("*") });
document.getElementById("btn-divide").addEventListener("click", () => { pressedOperator("/") });

document.getElementById("btn-enter").addEventListener("click", () => { calculate() });
document.getElementById("btn-negative").addEventListener("click", () => {
    currentNumber = currentNumber * -1
    updateDisplay()
});
document.getElementById("btn-clear").addEventListener("click", () => {
    currentNumber = 0;
    firstNumber = null;
    operator = "";
    isDecimal = false;
    decimalPlace = 10;
    shouldResetScreen = true;
    updateDisplay();
});
document.getElementById("btn-decimal").addEventListener("click", () => {
    if (shouldResetScreen === true) { // if press right after operator
        currentNumber = 0;
        shouldResetScreen = false;
    }

    if (isDecimal === false) {
        decimalPlace = 10
        isDecimal = true;
    }
    updateDisplay();
});
document.getElementById("btn-square").addEventListener("click", () => {
    currentNumber = currentNumber * currentNumber
    updateDisplay();
})
document.getElementById("btn-pi").addEventListener("click", () => {
    currentNumber = 3.1416;
    decimalPlace = 100000;
    shouldResetScreen = false;
    updateDisplay();
})

let currentNumber = 0;
let firstNumber = null;
let operator = "";
let isDecimal = false;
let decimalPlace = 10;
let shouldResetScreen = false;

display.innerText = currentNumber;

function updateDisplay() {
    display.innerText = currentNumber;
}

function pressedNumber(digit) {
    if (shouldResetScreen === true) {
        currentNumber = 0
        isDecimal = false
        decimalPlace = 10;
        shouldResetScreen = false;
    }

    if (isDecimal === false) {
        if (currentNumber >= 0) {
            currentNumber = currentNumber * 10 + digit;
        } else {
            currentNumber = currentNumber * 10 - digit;
        }
    } else {
        if (currentNumber >= 0) {
            currentNumber = currentNumber + (digit / decimalPlace);
        } else {
            currentNumber = currentNumber - (digit / decimalPlace);
        }
        decimalPlace = decimalPlace * 10;
    }
    updateDisplay();
}

for (let i = 0; i <= 9; i++) {
    const numbersBtn = document.getElementById("btn-" + i);
    if (numbersBtn != null) {
        numbersBtn.addEventListener("click", () => {
            pressedNumber(i);
        })
    }

    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() == i) {
            pressedNumber(i);
        }
    })
}

function pressedOperator(choosenOperator) {
    if (operator !== "" && shouldResetScreen === false) { //solves previous calculations if multiple are chained (ex. "a+b+c" solves a+b first)
        calculate();
    }
    shouldResetScreen = true;
    operator = choosenOperator
    firstNumber = currentNumber
}

function calculate() {
    if (operator === "" || firstNumber === null) {
        return;
    }

    let result = 0

    if (operator === "+") {
        result = firstNumber + currentNumber;
    } else if (operator === "-") {
        result = firstNumber - currentNumber;
    } else if (operator === "*") {
        result = firstNumber * currentNumber;
    } else if (operator === "/") {
        if (currentNumber === "0") {
            display.innerText = "Invalid";
            currentNumber = 0
            firstNumber = null;
            operator = "";
            isDecimal = false;
            decimalPlace = 10;
            shouldResetScreen = true;
            return
        }
        result = firstNumber / currentNumber;
    }
    currentNumber = result;
    firstNumber = null;
    operator = "";
    isDecimal = false;
    decimalPlace = 10;
    shouldResetScreen = true;
    updateDisplay();
}

const themeButtons = document.querySelectorAll(".theme-btn"); //querySelectorAll collects all matching elements

const savedTheme = localStorage.getItem("theme"); //local storage doesnt reset even after closing webpage
if (savedTheme !== null) {
    document.body.className = savedTheme;
}

for (let i = 0; i < themeButtons.length; i++) {
    themeButtons[i].addEventListener("click", () => {
        const selectedTheme = themeButtons[i].getAttribute("data-theme");
        document.body.className = selectedTheme;
        localStorage.setItem("theme", selectedTheme); //setItem(Name,Value)
    })
}