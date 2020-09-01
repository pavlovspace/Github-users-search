const url = 'https://api.github.com/'
const userPerPage = 20;

export class Api {
    async loadUsers(value, page) {
        return await fetch(
            `${url}search/users?q=${value}&per_page=${userPerPage}&page=${page}`
        )
    }
}