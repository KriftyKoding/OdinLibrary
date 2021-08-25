let myLibray = []
let bookNum = 0


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
    let readstatus = "blank"
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const page = document.getElementById("page").value;
    const statusRead = document.getElementById("have-read").checked ;
    const statusNotRead = document.getElementById("have-not-read").checked ;
     
    if (statusRead == true) {readstatus = "read"}
    if (statusNotRead == true) {readstaus = "Not read"}

    let book =  new Book(title, author, page, readstatus)
    myLibray.push(book)
}