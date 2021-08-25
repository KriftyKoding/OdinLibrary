let myLibray = []

function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${page} pages, ${read}.`
    }
}

function addBookToLibrary() {
    
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not yet read')

console.log(theHobbit.info())