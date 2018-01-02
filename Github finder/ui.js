class UI {
    constructor() {
        this.profile = document.getElementById("profile")
    }

    showProfile(user){
        this.profile.innerHTML = `
            <div class="card border-primary mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="img-fluid" alt="avatar" src="${user.avatar_url}">
                            <a href="${user.html_url}" target="_blank" class="btn-primary btn btn-block mt-2 mb-2">View Profile</a>
                            
                        </div>
                        <div class="col-md-9">
                                <span class="badge badge-pill badge-dark">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-pill badge-warning">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-pill badge-info">Followers: ${user.followers}</span>
                                <span class="badge badge-pill badge-light">Following: ${user.following}</span>
                                <ul class="list-group mt-3"> 
                                <li class="list-group-item">
                                    Company: ${user.company}
                                </li>
                                <li class="list-group-item">
                                    Website/Blog: ${user.blog}
                                </li>
                                <li class="list-group-item">
                                    Location: ${user.location}
                                    </li>
                                <li class="list-group-item">
                                    Member since: ${user.created_at}
                                </li>
                            </ul>
                        </div>                        
                    </div>
                </div>
            </div>
        <h3>Latest Repos</h3>
        <div id="repos"></div>
        `
    }
    
    showRepos(repos) {
        let output = "";
        repos.forEach(function(repo) {
            output += `
            <div class="card border-primary mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                                <span class="badge badge-pill badge-dark">Stars: ${repo.stargazers_count}</span>
                                <span class="badge badge-pill badge-warning">Watchers: ${repo.watchers_count}</span>
                                <span class="badge badge-pill badge-info">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
        document.getElementById("repos").innerHTML = output;
    }

    clearProfile() {
        this.profile.innerHTML = "";
    }

    showAlert(message, className) {
        this.clearAlert();

        const div = document.createElement("div");

        div.className = className;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".search");
        const search = document.querySelector(".search-result");

        container.insertBefore(div, search)
        setTimeout(() => {
            this.clearAlert()
        }, 2000)
    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert");
        if (currentAlert) {
            currentAlert.remove();
        }
    }
}