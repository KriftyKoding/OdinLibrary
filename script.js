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
        const atrributeID = bookCount;
        bookCount++
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('booklist');
        bookInfo.setAttribute('id', atrributeID);
        // bookInfo.textContent = book.info();

        const title = document.createElement('div');
        title.textContent = book.title;
        title.classList.add('title');
        bookInfo.appendChild(title);

        const author = document.createElement('div');
        author.textContent = book.author;
        author.classList.add('author');
        bookInfo.appendChild(author);
        
        const page = document.createElement('div');
        page.textContent = book.page;
        page.classList.add('page');
        bookInfo.appendChild(page);

        const readStatus = document.createElement('INPUT');
        readStatus.setAttribute("type", "range")
        readStatus.setAttribute("min", "0")
        readStatus.setAttribute("max", "100")
        // add inut type
        readStatus.classList.add('readStatus');
        bookInfo.appendChild(readStatus);
        
        const readStatusLabel = document.createElement('Label');
        readStatusLabel.textContent = "Amount Read";
        readStatusLabel.classList.add('readStatus');
        bookInfo.appendChild(readStatusLabel);

        
        const deleteBook = document.createElement('BUTTON');
        deleteBook.setAttribute("type", "button")
        deleteBook.setAttribute("onclick", `removeBook(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        // console.log(atrributeID);
        deleteBook.textContent = 'Delete Book';
        deleteBook.classList.add('deleteBook');
        bookInfo.appendChild(deleteBook);

            
        bookList.appendChild(bookInfo);
    });
}

//////////remove book list//////////
function removeLibrary(){
    bookList.innerHTML = ""
    bookCount = 0
}

//////////remove book from array//////////
function removeBook(num){
    myLibray.splice(num, 1);
    displayLibrary();
}