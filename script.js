let myLibray = []
let bookCount = 0

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
    removeBook();
    console.log(myLibray)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Form input create book object///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBookSubmit() {
    let readstatus = "read status unknown"
    const title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    const statusRead = document.getElementById("have-read").checked ;
    const statusNotRead = document.getElementById("have-not-read").checked ;
     
    if (statusRead == true) {readstatus = "read"};
    if (statusNotRead == true) {readstatus = "have not read"};
    
    if (title == "") {return};
    if (author == "") {author = "author unknown"};
    if (page == "") {page = "unknown"};

    let book =  new Book(title, author, page, readstatus)
    myLibray.push(book)
    
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
    removeLibrary();
    myLibray.forEach(function(book) {
        const atrributeID = "book" + bookCount;
        bookCount++
        const content = document.createElement('div');
        content.classList.add('booklist');
        content.setAttribute('id', atrributeID);
        content.textContent = book.info();
        bookList.appendChild(content);
    });
}

//////////remove book list//////////
function removeLibrary(){
    bookList.innerHTML = ""
}

//////////remove book from array//////////
function removeBook(){
    // delete myLibray[1]
    myLibray.splice(1, 1);
    displayLibrary();
}