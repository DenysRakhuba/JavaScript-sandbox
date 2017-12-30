// Elements
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const container = document.querySelector(".container");

// Book
function Book(title, author, page) {
    this.title = title;
    this.author = author;
    this.page = page;
}

// View 
function View() {}
View.prototype.addBook = function(book) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.page}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    bookList.appendChild(tableRow);
}
View.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value= "";
    document.getElementById("page").value= "";
}

View.prototype.showMessage = function(msg, type) {
    const msgField = document.createElement("p");
    msgField.textContent = msg;
    msgField.className = `message ${type}`;
    container.insertBefore(msgField, bookForm);
    setTimeout(function() {
        msgField.remove();
    }, 2000)
}

View.prototype.deleteBook = function(target) {
    if (target.classList.contains("delete") === true) {
        target.parentElement.parentElement.remove();
        const view = new View();
        view.showMessage("Book was successfully removed", " success");
    };
}

bookForm.addEventListener("submit", function(e) {
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value;
    let page = document.getElementById("page").value

    const book = new Book(title, author, page);
    
    const view = new View();

    if(title === "" || author === "" || page === "") {
        view.showMessage("Please fill in all fields", " error");
        view.clearFields();
    } else {
        view.addBook(book);
        view.showMessage("Book was successfully added", " success");
        view.clearFields();
    }

    e.preventDefault();
})

bookList.addEventListener("click", function(e) {
    const view = new View();
    view.deleteBook(e.target);
    e.preventDefault();
})  