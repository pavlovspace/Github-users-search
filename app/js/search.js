export class Search {
    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setUsersCount(count) {
        this.usersCount = count;
    }

    constructor(view, api) {
        this.view = view;
        this.api = api;

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
        if (this.view.searchInput.value) {
            this.clearUsers()
            this.usersRequest(this.view.searchInput.value)
        } else {
            this.clearUsers();
        }
    }

    loadMoreUsers() {
        this.setCurrentPage(this.currentPage + 1);
        this.usersRequest(this.view.searchInput.value);
    }

    async usersRequest(searchValue) {
        let totalCount;

        try {
            await this.api.loadUsers(searchValue, this.currentPage).then((res) => {
                res.json().then((res) => {
                    totalCount = res.total_count;
                    this.setUsersCount(this.usersCount + res.items.length);
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