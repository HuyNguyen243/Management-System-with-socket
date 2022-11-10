export class getCountries {
    get() {
        return fetch('data/countries.min.json').then(res => res.json()).then(data =>{ return data });
    }
}