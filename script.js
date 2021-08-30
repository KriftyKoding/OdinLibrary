let myLibray = []
let bookCount = 0
let editbooknum = 0
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
    removeHideClass('add-book');
    clearAddBookToLibrary();

}

function clearAddBookToLibrary() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("page").value = '';
    document.getElementById("readPercentValue").value = '0';
    document.getElementById("readPercent").innerHTML = '0%';
}

function removeHideClass(id) {
    document.getElementById(id).removeAttribute('class', 'hide');
}

function addHideClass(id) {
    document.getElementById(id).setAttribute('class', 'hide');
}

////////// Activate by Page Number //////////
function pageNumberChange(num, id) {
    document.getElementById(id).max = num;
    document.getElementById(id).value = 0;   
    if (id == "readPercentValue") {
        rangeValue(0, 'page', 'readPercent');
    }else {
        rangeValue(0, 'editPage', 'editReadPercent');
    }
}

////////// Activate by Read Status Change//////////
function rangeValue(val, id, id2) {
    if (document.getElementById(id).value === '' || document.getElementById(id).value === '0') {
        document.getElementById(id2).innerHTML = val + "%";
    } else {
        document.getElementById(id2).innerHTML = val + " pages";
    }
}

//////////remove book list//////////
function removeLibrary(){
    bookList.innerHTML = ""
    bookCount = 0
}

////////// Remove book from array//////////
function removeBook(num){
    myLibray.splice(num, 1);
    displayLibrary();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Edit Book /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function editBook(num){
    editbooknum = num;
    ////////// Display Edit Book //////////
    document.getElementById("editTitle").value = myLibray[num].title
    document.getElementById("editAuthor").value = myLibray[num].author
    
    if (myLibray[num].page == "null") {
        document.getElementById("eReadPercentValue").value = myLibray[num].read
        document.getElementById("editReadPercent").innerHTML = myLibray[num].read + '%'
    }
    else {
        document.getElementById("editPage").value = myLibray[num].page
        document.getElementById("editReadPercentValue").value = myLibray[num].read + "blah"
        document.getElementById("editReadPercent").innerHTML = myLibray[num].read + ' pages read.'
    }

    
}

function editBookSubmit() {
    ////////// Edit Book //////////
    const title = document.getElementById("editTitle").value;
    let author = document.getElementById("editAuthor").value;
    let page = document.getElementById("editPage").value;
    let read = document.getElementById("editReadPercentValue").value
    
    if (title == "") {return};
    if (author == "") {author = "author unknown"};
    if (page == "") {page = "Legth unknown"};

    console.log(editbooknum);
    
    myLibray[editbooknum].title = title
    myLibray[editbooknum].author = author
    myLibray[editbooknum].page = page
    myLibray[editbooknum].read = read
    
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
    if (author == "") {author = "author unknown"};
    if (page == "") {page = "Legth unknown"};

    let book =  new Book(title, author, page, read)
    myLibray.push(book)
    
    displayLibrary();
    addHideClass('add-book');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Creat Libray List Display ????????????????/////////////////////////////////////////////////////////////////////////////////////////////////
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

        //////////// Edit book button ////////////
         const editBook = document.createElement('BUTTON');
         editBook.setAttribute("type", "button")
         editBook.setAttribute("onclick", `editBook(${atrributeID})`)
         bookInfo.classList.add(atrributeID);
         editBook.textContent = 'Edit Book';
         editBook.classList.add('editBook');

        
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
        bookInfo.appendChild(editBook);
        bookList.appendChild(bookInfo);
    });
}
