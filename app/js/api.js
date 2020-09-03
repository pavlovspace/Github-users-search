const url = 'https://api.github.com/'
const userPerPage = 20;

export class Api {

    // Ładowanie użytkowników
    async loadUsers(value, page) {
        return await fetch(
            `${url}search/users?q=${value}&per_page=${userPerPage}&page=${page}`
        )
    }

    // Pobieramy dane wybranego użytkownika
    loadUserData(login) {
        const urls = [
            `${url}users/${login}/following`,
            `${url}users/${login}/followers`,
            `${url}users/${login}/repos`,
        ];
        const requests = urls.map(url => fetch(url));
        return Promise.all(requests)
            .then(responses => Promise.all((responses.map(r => r.json()))));
    }
}