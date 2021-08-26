let myLibray = []

//////////book object constructor//////
function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${page} pages, ${read}.`
    }
}

//////////add book button//////////
function addBookToLibrary() {
    console.log("add book");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Form input create book object///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBookSubmit() {
    let readstatus = "read status unknown"
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const page = document.getElementById("page").value;
    const statusRead = document.getElementById("have-read").checked ;
    const statusNotRead = document.getElementById("have-not-read").checked ;
     
    if (statusRead == true) {readstatus = "read"};
    if (statusNotRead == true) {readstatus = "have not read"};
    console.log(statusNotRead)

    let book =  new Book(title, author, page, readstatus)
    myLibray.push(book)
    
    removeLibrary()
    displayLibrary();
}

//////////test book object//////////
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not yet read')
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 'not yet read')
let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 'not yet read')
myLibray.push(theHobbit)
myLibray.push(theHobbit2)
myLibray.push(theHobbit3)


//////////create book list//////////
const bookList = document.querySelector("#book-list")
displayLibrary();
function displayLibrary(){
    myLibray.forEach(function(book) {
        const content = document.createElement('div');
        content.classList.add('booklist');
        content.textContent = book.info();
        bookList.appendChild(content);
    });
}

//////////remove book list//////////
function removeLibrary(){
    bookList.innerHTML = ""
}