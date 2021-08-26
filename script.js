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
}



function pageNumberChange(num) {
    document.getElementById('readPercentValue').max = num
    document.getElementById('readPercentValue').value = 0
    rangeValue(0);
}


function rangeValue(val) {
    if (document.getElementById('page').value == '') {
        document.getElementById("readPercent").innerHTML = val + "%";
    } else {
        document.getElementById("readPercent").innerHTML = val + " pages";
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////Form input create book object///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBookSubmit() {
    // let readstatus = "read status unknown"
    const title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let percentRead = document.getElementById("readPercentValue").value
        
    if (title == "") {return};
    if (author == "") {author = "author unknown"};
    if (page == "") {page = "unknown"};

    let book =  new Book(title, author, page, percentRead)
    console.log(percentRead) + `ercent`;
    myLibray.push(book)
    
    displayLibrary();
}



//////////test book object//////////
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 25)
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 100)
let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)
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
        
        const author = document.createElement('div');
        author.textContent = book.author;
        author.classList.add('author');
        
        const page = document.createElement('div');
        page.textContent = book.page;
        page.classList.add('page');
        
        
        
        ///////// READ STATUS Range and Label /////////////////
        const readStatus = document.createElement('div');
        readStatus.classList.add('readStatus');
        if (book.page == "unknown") {
            readStatus.innerHTML = book.read + '%'
        }
        else {
            readStatus.innerHTML = book.read + ' pages read.'
        }
                
        const deleteBook = document.createElement('BUTTON');
        deleteBook.setAttribute("type", "button")
        deleteBook.setAttribute("onclick", `removeBook(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        // console.log(atrributeID);
        deleteBook.textContent = 'Delete Book';
        deleteBook.classList.add('deleteBook');
        
        
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(page);
        bookInfo.appendChild(readStatus);
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

//////// Change Number of Pages ////////
function pageChange(num) {
    
}