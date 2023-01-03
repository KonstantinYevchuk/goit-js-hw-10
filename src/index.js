import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
// import { debounce } from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;

const inputEl = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");

inputEl.addEventListener("input", debounce(inputName, DEBOUNCE_DELAY));
inputEl.addEventListener("keydown", evt => {
    if(evt.key === "Backspace") {
        clearInput()
    }
})

function inputName(evt) {
    clearInput()
    const inputValue = evt.target.value.trim();
    if(!inputValue) {
        return
    } else {
        fetchCountries(evt.target.value.trim()).then(data => {
            // console.log(data)
            if(data.length === 1) {
                createMurkup(data)
            } else if(data.length <= 10) {
                createMurkupShort(data)
            } 
            else {
                Notiflix.Report.info("Too many matches found. Please enter a more specific name.");
            } 
                 
        }).catch(err => {
            Notiflix.Report.failure(new Error("Oops, there is no country with that name"));
            console.log(err);
        })
    }
    
    
}

function createMurkup(arr) {
    const markup = arr.map(({ flags: {svg}, name: {official}, capital, languages, population }) => 
     `<li>
        <h2> <img src="${svg}" alt="flag"> ${official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
        <p><b>Population:</b> ${population}</p>
        </li>`).join('')
    
    listEl.insertAdjacentHTML('beforeend', markup)
}

function createMurkupShort(arr) {
    const markup = arr.map(({flags: {svg}, name: {official}}) => 
    `<li>
    <h2> <img src="${svg}" alt="flag"> ${official}</h2>
    </li>`).join('');
    listEl.insertAdjacentHTML('beforeend', markup);
}

function clearInput() {
    listEl.innerHTML = "";
}
