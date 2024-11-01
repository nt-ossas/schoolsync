function convert(letter) {
    var input = document.getElementById(letter).value;
    let decimalValue;

    if (letter === 'h' && isHexadecimal(input)) {
        decimalValue = parseInt(input, 16);
    } else if (letter === 'd' && isDecimal(input)) {
        decimalValue = parseInt(input, 10);
    } else if (letter === 'o' && isOctal(input)) {
        decimalValue = parseInt(input, 8);
    } else if (letter === 'b' && isBinary(input)) {
        decimalValue = parseInt(input, 2);
    } else {
        alert('Inserisci il numero nella base giusta!');
        return;
    }

    document.getElementById('h').value = decimalValue.toString(16).toUpperCase();
    document.getElementById('d').value = decimalValue.toString(10);
    document.getElementById('o').value = decimalValue.toString(8);
    document.getElementById('b').value = decimalValue.toString(2);
}

function isDecimal(value) {
    return /^-?\d+$/.test(value);
}

function isHexadecimal(value) {
    return /^[0-9A-Fa-f]+$/.test(value.toUpperCase());
}

function isBinary(value) {
    return /^[01]+$/.test(value);
}

function isOctal(value) {
    return /^[0-7]+$/.test(value);
}