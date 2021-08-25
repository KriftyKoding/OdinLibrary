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
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let statusRead = document.getElementById("have-read").checked ;
    let statusNotRead = document.getElementById("have-not-read").checked ;

    console.log(title);
    console.log(author);
    console.log(page);
    console.log(statusRead);
    console.log(statusNotRead);


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