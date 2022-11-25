import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputElement = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputElement.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(element) {
  const searchValue = element.target.value.trim();
  if (!searchValue) {
    return;
  }
  fetchCountries(searchValue).then(data => {
    if (data.length > 10) {
      manyCountriesFound(data);
    } else if (data.length >= 2 && data.length <= 10) {
      createMarkupListCountry(data);
    } else if (data.length == 1) {
      countryList.innerHTML = '';
      createMarkupCountryInfo(data);
    }
  });
  if (!element.textContent) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
}

function createMarkupListCountry(array) {
  const markup = array
    .map(
      ({ name, flags }) =>
        `<li class="country-list__item">
    <img src="${flags.svg}" alt="${name}"  width = "45px"/>
      <h2 class="country-list__name">${name}</h2></li>`
    )
    .join('');
  countryList.innerHTML = markup;
}

function createMarkupCountryInfo(array) {
  const markup = array
    .map(
      ({ name, flags, capital, population, languages }) =>
        `<div class="country-info__title">
    <img src="${flags.svg}" alt="${name}" width = "30px" />
      <h2 class="country-info__name">${name}</h2></div> 
      <p><b>Capital:&nbsp;</b> ${capital}</p>
      <p><b>Population:&nbsp;</b> ${population}</p>
      <p><b>Languages:&nbsp;</b> ${languages
        .map(({ name }) => `${name}`)
        .join(', ')}</p>
      `
    )
    .join('');
  countryInfo.innerHTML = markup;
}

function manyCountriesFound() {
  Notiflix.Notify.failure(
    'Too many matches found. Please enter a more specific name.'
  );
}
