// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v2/all?fields=name,capital,currencies

const BASE_URL = "https://restcountries.com/v3.1";
const fields = "fields=name,capital,population,flags,languages"

function fetchCountries(name){
    const search = fetch(`${BASE_URL}/name/${name}?${fields}`).then(resp => {
        if(!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json()

    }).catch(err => console.error(err))
    return search
}


export { fetchCountries };
