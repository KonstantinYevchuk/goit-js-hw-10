import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");

inputEl.addEventListener("input", inputName);


function inputName(evt) {
    console.log(evt.currentTarget.value);
    fetchCountries(evt.currentTarget.value).then(data => {
        // console.log(data)
        createMurkup(data)
    })
    
}

function createMurkup(arr) {
    const markup = arr.map(({ flags: {svg}, name: {official}, capital, languages, population }) =>
    `<li>
    <h2> <img src="${svg}" alt="flag" width="20px"> ${official}</h2>
    <p>Capital: ${capital}</p>
    <p>Languages: ${languages}</p>
    <p>Population: ${population}</p>
    </li>`).join('')

    listEl.insertAdjacentHTML('beforeend', markup)
}


fetchCountries("Italy").then(data => {console.log(data);})