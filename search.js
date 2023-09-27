document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.querySelector('.btn-primary');
    var searchTerm = document.querySelector('#searchTerm');
    var outputDiv = document.querySelector('#output');
    var errorDiv = document.querySelector('#error');

    outputDiv.appendChild(document.createElement('div'))
    errorDiv.appendChild(document.createElement('div'))

    searchButton.addEventListener('click', function () {
        var inputValue = searchTerm.value.trim().toUpperCase();
        if (isInputValid(inputValue)) {
            var newRow = document.createElement('div');
            newRow.textContent = inputValue;
            outputDiv.replaceChild(newRow, outputDiv.children[0]);
        } else {
            var newRow = document.createElement('div');
            newRow.textContent = "Falsches Format, nur gültige KFZ-Kennzeichen werden akzeptiert";
            errorDiv.replaceChild(newRow, errorDiv.children[0]);    
        }
        searchTerm.value = '';
    });
});

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

