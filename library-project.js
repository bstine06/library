

const myLibrary = [];
const newBookButton = document.querySelector("#newBookButton");
const newBookFormDialog = document.querySelector("#newBookFormDialog");

newBookButton.addEventListener("click", e=>{
    newBookFormDialog.showModal();
});

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function() {
        var info = `${title} by ${author}, ${numPages} pages, `;
        info += isRead ? "read" : "not read yet";
        return info;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    const libraryContainer = document.querySelector('#libraryContainer');
    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.textContent = book.title;
        libraryContainer.appendChild(bookElement);
    });
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theBible = new Book("The Bible", "Various Authors", 1200, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theBible);

displayLibrary();