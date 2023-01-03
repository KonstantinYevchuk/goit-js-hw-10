

const BASE_URL = "https://restcountries.com/v3.1";
const fields = "fields=name,capital,population,flags,languages"

function fetchCountries(name){
    const search = fetch(`${BASE_URL}/name/${name}?${fields}`).then(resp => {
        if(!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json()

    })
    return search
}


export { fetchCountries };
