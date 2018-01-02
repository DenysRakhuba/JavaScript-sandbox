const github = new Github;
const ui = new UI;

const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", (e) => {
    const text = e.target.value;
    
    if(text !== "") {
        github.getUser(text)
        .then(data => {
            if(data.profile.message === "Not Found") {
                ui.showAlert(`User not found`, 'alert alert-danger mt-2');
            } else {
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        })
    } else {
        // clear profile
        ui.clearProfile();
    }
})