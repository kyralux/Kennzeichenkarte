document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.querySelector('.btn-primary');
    var kfzInput = document.querySelector('#kfz');
    var outputDiv = document.querySelector('#output');

    searchButton.addEventListener('click', function () {
        var inputValue = kfzInput.value.trim().toUpperCase();
        if (inputValue !== '') {
            var newRow = document.createElement('div');
            newRow.textContent = inputValue;
            outputDiv.appendChild(newRow);
            kfzInput.value = '';
        }
    });
});
