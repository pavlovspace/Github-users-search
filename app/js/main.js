class View {
    constructor() {
        this.app = document.querySelector('#app');

        this.title = this.createElement('h1', 'title')
        this.title.textContent = 'Github Search Users'

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        this.searchCounter = this.createElement('span', 'counter')
        this.searchLine.append(this.searchInput)
        this.searchLine.append(this.searchCounter)


        this.usersWrapper = this.createElement('div', 'users-wrapper')
        this.userList = this.createElement('div', 'users')
        this.usersWrapper.append(this.userList)

        this.main = this.createElement('div', 'main')
        this.main.append(this.usersWrapper)

        this.app.append(this.title)
        this.app.append(this.searchLine)
        this.app.append(this.main)
    }
    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass)
        }
        return element
    }
}

class Search {
    constructor(view) {
        this.view = view

        this.view.searchInput.addEventListener('keyup', this.searchUsers.bind(this))
    }
    searchUsers() {

    }
}

new Search(new View());