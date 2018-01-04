const button = document.getElementById("button");
const output = document.getElementById("output");

button.addEventListener("click", getJokes);

function getJokes(e) {
    const number = document.getElementById("number").value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);
    xhr.onload = function() {
        if(this.status === 200) {
            const response = JSON.parse(xhr.responseText);
            let result = '';
            response.value.forEach(function(joke) {
                result += `<li>${joke.joke}</li>`
            });
            output.innerHTML = result;
        }
    }
    xhr.send();

    e.preventDefault();

}