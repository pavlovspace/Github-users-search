export class Search {
    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setUsersCount(count) {
        this.usersCount = count;
    }

    constructor(view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;

        this.view.searchInput.addEventListener(
            "keyup",
            this.debounce(this.loadUsers.bind(this), 500)
        );
        this.view.loadMore.addEventListener("click", this.loadMoreUsers.bind(this));
        this.currentPage = 1;
        this.usersCount = 0;
    }

    loadUsers() {
        this.setCurrentPage(1);
        this.view.setCounterMessage('');
        if (this.view.searchInput.value) {
            this.clearUsers()
            this.usersRequest(this.view.searchInput.value)
        } else {
            this.clearUsers();
            this.view.toggleLoadBtn(false)
        }
    }

    loadMoreUsers() {
        this.setCurrentPage(this.currentPage + 1);
        this.usersRequest(this.view.searchInput.value);
    }

    async usersRequest(searchValue) {
        let totalCount;
        let message;

        try {
            await this.api.loadUsers(searchValue, this.currentPage).then((res) => {
                res.json().then((res) => {
                    totalCount = res.total_count;
                    message = this.log.counterMessage(totalCount)
                    this.setUsersCount(this.usersCount + res.items.length);
                    this.view.setCounterMessage(message);
                    this.view.toggleLoadBtn(
                        totalCount > 20 && this.usersCount !== totalCount
                    );
                    res.items.forEach((user) => this.view.createUser(user));
                });
            });
        } catch (e) {
            console.log('error:' + e);
        }
    }

    clearUsers() {
        this.view.userList.innerHTML = "";
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}