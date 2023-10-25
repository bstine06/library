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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);