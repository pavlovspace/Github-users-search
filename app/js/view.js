export class View {
    constructor(api) {
        this.app = document.querySelector("#app");

        this.api = api;

        // Title
        this.title = this.createElement("h1", "title");
        this.title.textContent = "Github Search Users";

        // Pole wyszukiwania
        this.searchLine = this.createElement("div", "search-line");
        this.searchInput = this.createElement("input", "search-input");
        this.searchCounter = this.createElement("span", "counter");
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        this.usersWrapper = this.createElement("div", "users-wrapper");
        this.userList = this.createElement("div", "users");
        this.userWrapper = this.createElement("div", "user-info");
        this.usersWrapper.append(this.userList);

        this.main = this.createElement("div", "main");
        this.main.append(this.usersWrapper);
        this.main.append(this.userWrapper);

        // btn „Załaduj więcej”
        this.loadMore = this.createElement("button", "btn");
        this.loadMore.textContent = "Załaduj więcej";
        this.loadMore.style.display = "none";
        this.usersWrapper.append(this.loadMore);

        // Dodaj wszystkie bloki do aplikacji
        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);
    }

    // Funkcja do tworzenia elementu
    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    // Tworzemy każdego znalezionego użytkownika

    createUser(userData) {
        const userElement = this.createElement('li', 'user-prev');
        userElement.addEventListener('click', () => this.showUserData(userData));
        userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}">
                                 <span class="user-prev-name">${userData.login}</span>`;
        this.userList.append(userElement);
    }

    showUserData(userData) {
        this.userWrapper.querySelector('click', () => {
            usersWrapper.style = 'display: none'
        })
        const userEl = this.createElement('div', 'user-prev');
        this.userWrapper.innerHTML = ''
        this.api.loadUserData(userData.login)
            .then(res => {
                const [following, followers, repos] = res;
                const followingList = this.createDatList(following, 'Obserwowani');
                const followersList = this.createDatList(followers, 'Obserwujący');
                const reposList = this.createDatList(repos, 'Repozytorium');

                userEl.innerHTML = `<img src="${userData.avatar_url}" alt="${userData.login}">
                                <h2>imię: ${userData.login}</h2>
                                ${followingList}
                                ${followersList}
                                ${reposList}`;

            });

        this.userWrapper.append(userEl);
    }



    createDatList(list, title) {
        const block = this.createElement('div', 'user-block');
        const titleTag = this.createElement('h3', 'user-block-title');
        const listTag = this.createElement('ul', 'user-list');
        titleTag.textContent = title;

        list.forEach(item => {
            const el = this.createElement('li', 'user-list-item');
            el.innerHTML = `<a href="${item.html_url}">${item.login ? item.login : item.name}</a>`;

            listTag.append(el);
        });

        block.append(titleTag);
        block.append(listTag);

        return block.innerHTML;
    }

    // Pokaż lub ukryj przycisk „Wczytaj więcej”
    toggleLoadBtn(show) {
        this.loadMore.style.display = show ? "block" : 'none';
    }

    // wiadomość o liczbie znalezionych użytkowników
    setCounterMessage(message) {
        this.searchCounter.textContent = message;
    }
}