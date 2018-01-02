class Github {
    constructor() {
        this.client_id = "f1dfcb8c46c64a017b6e",
        this.client_secret = "56558a2c65e821eca1edcc2381985992b63406ad"
        this.repos_count = 5;
        this.repos_sort = "created: asc"
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id.id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id.id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}