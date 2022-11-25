import Notiflix from 'notiflix';
const url = 'https://restcountries.com/v2/name/';

export default function fetchCountries(name) {
  return fetch(
    `${url}${name}?fields=name,capital,currencies,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.exception(error);
    });
}
