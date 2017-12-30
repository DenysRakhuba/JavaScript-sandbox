// Elements
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const container = document.querySelector(".container");

// Book
class Book {
    constructor(title, author, page) {
        this.title = title;
        this.author = author;
        this.page = page;
    }
}

class View {
    addBook(book) {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td class="page-number"><input type="number" class="new-page" value="${book.page}"></td>
            <td><a href="#" class="delete">X</a></td>
        `;
        bookList.appendChild(tableRow);
    }
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value= "";
        document.getElementById("page").value= "";
    }
    showMessage(msg, type) {
        const msgField = document.createElement("p");
        msgField.textContent = msg;
        msgField.className = `message ${type}`;
        container.insertBefore(msgField, bookForm);
        setTimeout(function() {
            msgField.remove();
        }, 2000)
    }
    deleteBook(target) {
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
            this.showMessage("Book was successfully removed", " success");
        };
    }
}
// Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const view = new View()
            view.addBook(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static updatePage(page, title) {
        const books = Store.getBooks();
        for(let i = 0; i < books.length; i++) {
            if(books[i].title === title) {
                books[i].page = page;
                
            }
            localStorage.setItem('books', JSON.stringify(books));
        }
    }

    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if (book.title === title) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks)

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

        // add to storage
        Store.addBook(book);

        view.showMessage("Book was successfully added", " success");
        view.clearFields();
    }

    e.preventDefault();
})

bookList.addEventListener("click", function(e) {
    const book = new Book(title, author, page);
    const view = new View();
    newPage = e.target.value;
    bookTitle = e.target.parentElement.parentElement.firstElementChild.textContent;

    // Update book page
    Store.updatePage(newPage,bookTitle);

    // Remove from storage
    if (e.target.classList.contains("delete")) {
        Store.removeBook(bookTitle);
    };

    view.deleteBook(e.target);

    e.preventDefault();

});

