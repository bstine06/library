

const myLibrary = [];
const newBookButton = document.querySelector("#newBookButton");
const newBookFormDialog = document.querySelector("#newBookFormDialog");
const form = document.querySelector("#newBookForm");

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

form.onsubmit = function() {
    let title = form.title.value;
    let author = form.author.value;
    let numPages = form.numPages.value;
    let isRead = form.isRead.value;
    if (title == '' && author=='' && numPages=='' && isRead=='') return false; // ignore empty submit

    const newBook = new Book(title, author, numPages, isRead);
    console.log('submit');
    console.log(newBook);
    addBookToLibrary(newBook);
    displayLibrary(newBook);
    newBookFormDialog.close();
    return false;
  };

function displayLibrary() {
    const libraryContainer = document.querySelector('#libraryContainer');
    libraryContainer.innerHTML = "";
    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add("book-element");

        const title = document.createElement('h3');
        title.textContent = book.title;
        bookElement.appendChild(title);

        const author = document.createElement('p');
        author.textContent = book.author;
        bookElement.appendChild(author);

        const numPages = document.createElement('p');
        numPages.textContent = 'pages: ' + book.numPages;
        bookElement.appendChild(numPages);

        const isRead = document.createElement("input");
        isRead.type = "checkbox";
        isRead.id =  "isRead" ;
        const isReadLabel = document.createElement("label");
        isReadLabel.htmlFor =  "isRead";
        isReadLabel.textContent = "finished reading? "
        bookElement.appendChild(isReadLabel);
        bookElement.appendChild(isRead);

        libraryContainer.appendChild(bookElement);
    });
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theBible = new Book("The Bible", "Various Authors", 1200, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theBible);

displayLibrary();