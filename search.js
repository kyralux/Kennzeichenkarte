let dictionary;
var errorDiv = document.querySelector('#error');
var outputDiv = document.querySelector('#output');

document.addEventListener('DOMContentLoaded', function () {
    loadJson()
    var searchButton = document.querySelector('.btn-primary');
    var searchTerm = document.querySelector('#searchTerm');

    outputDiv.appendChild(document.createElement('div'))
    errorDiv.appendChild(document.createElement('div'))

    searchButton.addEventListener('click', function () {
        var inputValue = searchTerm.value.trim().toUpperCase();
        if (isInputValid(inputValue)) {

            if (dictionary.hasOwnProperty(inputValue)) {
                writeOutput(`${inputValue} - ${dictionary[inputValue]}`)
                clearErrorDiv();
            } else {
                writeError(`Kein gültiges KFZ-Kennzeichen: ${inputValue}`)
            }
        } else {
            writeError("Falsches Format, nur gültige KFZ-Kennzeichen werden akzeptiert") 
        }
        searchTerm.value = '';
    });
});

function clearErrorDiv(){
    var newRow = document.createElement('div');
    newRow.textContent = ``;
    errorDiv.replaceChild(newRow, errorDiv.children[0]);
}

function writeOutput(text){
    var newRow = document.createElement('div');
    newRow.textContent = text;
    outputDiv.replaceChild(newRow, outputDiv.children[0]);
}

function writeError(text){
    var newRow = document.createElement('div');
    newRow.textContent = text;
    errorDiv.replaceChild(newRow, errorDiv.children[0]);
}

function isInputValid(inputValue) {
    if(inputValue != '' && isKFZPattern(inputValue)){
        return true;
    } else {
        console.log("Input invalid")
        return false
    }
}

function isKFZPattern(inputValue){
    var regexPattern = /[a-zA-ZÄÜÖäöü]{1,3}/;
    var regex = new RegExp(regexPattern);
    return regex.test(inputValue);
}

function loadJson(){
    return fetch('kfzDict.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dictionary = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

