
const newBookButton = document.querySelector("#newBookButton");
const newBookFormDialog = document.querySelector("#newBookFormDialog");
const form = document.querySelector("#newBookForm");
const libraryContainer = document.querySelector('#libraryContainer');

class Library {

    constructor() {
        this.library = [];
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }
    
    deleteBookFromLibrary(i) {
        this.library.splice(i,1);
    }

    get books() {
        return this.library;
    }

}

class LibraryDisplayController {

    constructor(library, libraryContainer, newBookButton, newBookFormDialog, form) {
        this.library = library
        this.newBookButton = newBookButton;
        this.newBookFormDialog = newBookFormDialog;
        this.form = form;
        this.libraryContainer = libraryContainer;

        this.newBookButton.addEventListener("click", e=>{
            newBookFormDialog.showModal();
        });

        this.title = document.getElementById("title");
        title.addEventListener('input', function() {
            this.setCustomValidity("");  // Clear any previous custom validity message
            if (!this.checkValidity()) {
                this.setCustomValidity("You must enter a valid title.");
            }
        });

        this.author = document.getElementById("author");
        author.addEventListener('input', function() {
            this.setCustomValidity("");  // Clear any previous custom validity message
            if (!this.checkValidity()) {
                this.setCustomValidity("You must enter a valid author.");
            }
        });

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = event.target.elements.title.value;
            const author = event.target.elements.author.value;
            const numPages = event.target.elements.numPages.value;
            const isRead = event.target.elements.isRead.value;
            if (title == '' && author=='' && numPages=='' && isRead=='') {
                return false; // ignore empty submit
            }
            const newBook = new Book(title, author, numPages, isRead);
            this.addBook(newBook);
            this.form.reset();
            return false;
        });
    }

    addBook(newBook) {
        this.library.addBookToLibrary(newBook);
        this.displayLibrary();
        newBookFormDialog.close();
    }

    deleteBook(i) {
        this.library.deleteBookFromLibrary(i);
        this.displayLibrary();
    }

    displayLibrary() {
        this.libraryContainer.innerHTML = "";
        this.library.books.forEach((book, i) => {
            book.i = i;
            const bookElement = document.createElement('div');
            bookElement.classList.add("book-element");
            bookElement.setAttribute('id', `book${i}`);

            const title = document.createElement('h3');
            title.textContent = book.title;
            bookElement.appendChild(title);

            const author = document.createElement('p');
            author.textContent = book.author;
            bookElement.appendChild(author);

            const numPages = document.createElement('p');
            numPages.textContent = 'pages: ' + book.numPages;
            bookElement.appendChild(numPages);

            const isReadWrapper = document.createElement('div');
            const isRead = document.createElement("input");
            isRead.type = "checkbox";
            isRead.id = "isRead";
            isRead.checked = book.isRead;
            isRead.addEventListener("change", function () {
                if (this.checked) {
                    book.isRead = true;
                } else {
                    book.isRead = false;
                }
            });
            const isReadLabel = document.createElement("label");
            isReadLabel.htmlFor = "isRead";
            isReadLabel.textContent = "finished reading? "
            isReadWrapper.appendChild(isReadLabel);
            isReadWrapper.appendChild(isRead);
            bookElement.appendChild(isReadWrapper);

            const deleteBookBtn = document.createElement("button");
            deleteBookBtn.textContent = "delete";
            deleteBookBtn.classList.add("deleteBtn");
            deleteBookBtn.addEventListener("click", e => {
                this.deleteBook(i);
            })
            bookElement.appendChild(deleteBookBtn)

            this.libraryContainer.appendChild(bookElement);
        });
    }

}

class Book {

    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }

    info() {
        let info = `${title} by ${author}, ${numPages} pages, `;
        info += isRead ? "read" : "not read yet";
        return info;
    }

}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theBible = new Book("The Bible", "Various Authors", 1200, true);

const myLibrary = new Library();
const myLibraryDisplayController = new LibraryDisplayController(myLibrary, libraryContainer, newBookButton, newBookFormDialog, form);

myLibrary.addBookToLibrary(theHobbit);
myLibrary.addBookToLibrary(theBible);

myLibraryDisplayController.displayLibrary();