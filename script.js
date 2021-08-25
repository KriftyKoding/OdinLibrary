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
    console.log("add book");
}

function addBookSubmit() {
    console.log("add book submit");
}

//test array
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not yet read')
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 'not yet read')
let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 'not yet read')

console.log(myLibray)
myLibray.push(theHobbit)
myLibray.push(theHobbit3)
myLibray.push(theHobbit2)


console.log(myLibray)