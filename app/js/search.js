const userPerPage = 20;

export class Search {
    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    setUsersCount(count) {
        this.usersCount = count;
    }

    constructor(view) {
        this.view = view;

        this.view.searchInput.addEventListener("keyup", this.debounce(this.loadUsers.bind(this), 500));
        this.view.loadMore.addEventListener("click", this.loadUsers.bind(this));
        this.currentPage = 1;
        this.usersCount = 0;
    }

    async loadUsers() {
        const searchValue = this.view.searchInput.value
        let totalCount;
        if (searchValue) {
            return await fetch(
                `https://api.github.com/search/users?q=${searchValue}&per_page=${userPerPage}&page=${this.currentPage}`
            ).then((res) => {
                if (res.ok) {
                    this.setCurrentPage(this.currentPage + 1);
                    res.json().then((res) => {
                        totalCount = res.total_count
                        this.setUsersCount(this.usersCount + res.items.length);
                        this.view.toggleLoadBtn(totalCount > userPerPage && this.usersCount !== totalCount);
                        res.items.forEach((user) => this.view.createUser(user));
                    });
                } else {}
            })
        } else {
            this.clearUsers()
        }
    }

    clearUsers() {
        this.view.userList.innerHTML = '';
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
    };
}