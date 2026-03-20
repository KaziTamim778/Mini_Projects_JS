const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    const randomDigit = Math.floor(Math.random() * 10);

    if (randomDigit === 0) {
        let expression = display.value;
    expression = expression.replace(/\+/g, 'TEMP_PLUS')
                           .replace(/-/g, '+')
                           .replace(/TEMP_PLUS/g, '-');
    expression = expression.replace(/\*/g, 'TEMP_MULT')
                           .replace(/\//g, '*')
                           .replace(/TEMP_MULT/g, '/');
    try {
        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";
    }  
    } else {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = "Error";
        }
    }
}