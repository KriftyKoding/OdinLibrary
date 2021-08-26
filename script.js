let myLibray = []
let bookCount = 0
const bookList = document.querySelector("#book-list")


////////// test books //////////
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 25)
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 100)
let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)
myLibray.push(theHobbit)
myLibray.push(theHobbit2)
myLibray.push(theHobbit3)
displayLibrary();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Book object constructor /////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Mics Functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////// Add Book Button //////////
function addBookToLibrary() {
    console.log("add book");
}


////////// Activate by Page Number //////////
function pageNumberChange(num) {
    document.getElementById('readPercentValue').max = num
    document.getElementById('readPercentValue').value = 0
    readStatusChange(0);
}

////////// Activate by Read Status Change//////////
function rangeValue(val) {
    if (document.getElementById('page').value == '') {
        document.getElementById("readPercent").innerHTML = val + "%";
    } else {
        document.getElementById("readPercent").innerHTML = val + " pages";
    }
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Form input - New Book add to Array/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBookSubmit() {
    const title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let read = document.getElementById("readPercentValue").value
        
    if (title == "") {return};
    if (author == "") {"author unknown"};
    if (page == "") {"Legth unknown"};

    let book =  new Book(title, author, page, read)
    myLibray.push(book)
    
    displayLibrary();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Book List Display ????????????????/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayLibrary(){
    removeLibrary();
    myLibray.forEach(function(book) {
        const atrributeID = bookCount;
        bookCount++
        //////////// Book Container Div ////////////
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('booklist');
        bookInfo.setAttribute('id', atrributeID);
        
        //////////// Book Elements ////////////
        const title = document.createElement('div');
        title.textContent = book.title;
        title.classList.add('title');
        
        const author = document.createElement('div');
        author.textContent = book.author;
        author.classList.add('author');
        
        const page = document.createElement('div');
        page.textContent = book.page;
        page.classList.add('page');
        
        //////////// READ STATUS ////////////
        const read = document.createElement('div');
        read.classList.add('readStatus');
        if (book.page == "unknown") {
            read.innerHTML = book.read + '%'
        }
        else {
            read.innerHTML = book.read + ' pages read.'
        }
        
        //////////// Delete book button ////////////
        const deleteBook = document.createElement('BUTTON');
        deleteBook.setAttribute("type", "button")
        deleteBook.setAttribute("onclick", `removeBook(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        deleteBook.textContent = 'Delete Book';
        deleteBook.classList.add('deleteBook');
        
        //////////// Append ////////////
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(page);
        bookInfo.appendChild(read);
        bookInfo.appendChild(deleteBook);
        bookList.appendChild(bookInfo);
    });
}
