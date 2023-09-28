let dictionary;
let map;
let markersLayer;
var errorDiv = document.querySelector('#error');
var outputDiv = document.querySelector('#output');


document.addEventListener('DOMContentLoaded', function () {
    loadJson();
    initMap();
    var searchButton = document.querySelector('.btn-primary');
    var searchTerm = document.querySelector('#searchTerm');

    outputDiv.appendChild(document.createElement('div'))
    errorDiv.appendChild(document.createElement('div'))

    searchButton.addEventListener('click', function () {
        var inputValue = searchTerm.value.trim().toUpperCase();
        if (isInputValid(inputValue)) {

            if (dictionary.hasOwnProperty(inputValue)) {
                var city = dictionary[inputValue];
                writeOutput(`${inputValue} - ${city}`)
                clearErrorDiv();
                searchCity(city)

            } else {
                writeError(`Kein gültiges KFZ-Kennzeichen: ${inputValue}`)
            }
        } else {
            writeError("Falsches Format, nur gültige KFZ-Kennzeichen werden akzeptiert") 
        }
        searchTerm.value = '';
    });
});


function searchCity(city) {
    // Use the Nominatim geocoding service to get coordinates for the city
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}&countrycodes=de`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var latitude = parseFloat(data[0].lat);
                var longitude = parseFloat(data[0].lon);
                markersLayer.clearLayers();
                map.setView([latitude, longitude], 10);
                curMarker = L.marker([latitude, longitude]).addTo(markersLayer);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


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

async function loadJson(){
    try {
        const response = await fetch('kfzDict.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dictionary = data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function initMap(){
    map = L.map('map').setView([51.1657, 10.4515], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
}

