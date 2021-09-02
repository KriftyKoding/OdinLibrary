let myLibray = []
let bookCount = 0
let editbooknum = 0
const bookList = document.querySelector("#book-container")
let ogNum = 0;


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
    removeHideClass('add-book-popup');
    clearInput();
    ogNum = 0
}

function clearInput() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("page").value = '';
    document.getElementById("percentRange").value = '0';
    document.getElementById("percentRange").max = '100'
    document.getElementById("percentLabel").innerHTML = '0%';
}

function removeHideClass(id) {
    document.getElementById(id).setAttribute('class', 'popup');
}

function addHideClass(id) {
    document.getElementById(id).setAttribute('class', 'hide');
}

////////// onChange by Page Number //////////
function pageNumberChange(num, id) {
    if (id == "percentRange") {
        let percent = calPercentRead(document.getElementById('percentRange').value, num);
        rangeValue(percent, 'page', 'percentLabel');
    }else {
        let percent = calPercentRead(document.getElementById('editPercentRange').value, num, ogNum);
        rangeValue(percent, 'editPage', 'editPercentLabel');
    }
    ogNum = num;
}

function calPercentRead(percent, pageMax){
    if (percent == 0){
        return 0;
    } else {
        if (pageMax == 0){
            return (Math.round((percent / ogNum)*100))
        } else if (ogNum == 0) {
            return (Math.round((percent * pageMax)/100))
        } else {
            let answer = Math.round((percent / ogNum) * pageMax);
            document.getElementById('percentRange').max = pageMax;
            document.getElementById('percentRange').value = answer;
            return answer
        }
    }
}

////////// onChange by Read Status Change//////////
function rangeValue(val, idEditPage, idPercentLabel) {
    if (document.getElementById(idEditPage).value === '' || document.getElementById(idEditPage).value === '0') {
        document.getElementById(idPercentLabel).innerHTML = val + "%";
    } else {
        document.getElementById(idPercentLabel).innerHTML = val + " pages";
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
    
    if (myLibray[num].page == "Length is Unknown" || myLibray[num].page == null) {
        ogNum = 0;
        document.getElementById("editPercentRange").value = myLibray[num].read
        document.getElementById("editPercentLabel").innerHTML = myLibray[num].read + '%'
        document.getElementById("editPage").value = ''
        document.getElementById("editPercentRange").max = "100"
    } else {
        let pageMax = document.getElementById("editPage").value = myLibray[num].page;
        ogNum = pageMax;
        document.getElementById("editPercentRange").value = myLibray[num].read;
        document.getElementById("editPercentRange").max = pageMax;
        document.getElementById("editPercentLabel").innerHTML = myLibray[num].read + ' pages read.'
        }

    removeHideClass('edit-book-popup');    
}

function editBookSubmit() {
    ////////// Edit Book //////////
    const title = document.getElementById("editTitle").value;
    let author = document.getElementById("editAuthor").value;
    let page = document.getElementById("editPage").value;
    let read = document.getElementById("editPercentRange").value
    
    if (title == "") {return};
    if (page == "") {page = "Length is Unknown"};

    myLibray[editbooknum].title = title
    myLibray[editbooknum].author = author
    myLibray[editbooknum].page = page
    myLibray[editbooknum].read = read
    
    displayLibrary();
    addHideClass('edit-book-popup');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Form input - New Book add to Array/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBookSubmit() {
    const title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let read = document.getElementById("percentRange").value
        
    if (title == "") {return};
    if (page == "") {page = "Length is Unknown"};

    let book =  new Book(title, author, page, read)
    myLibray.push(book)
    
    displayLibrary();
    addHideClass('add-book-popup');
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
        const title = document.createElement('h3');
        title.textContent = book.title;
        title.classList.add('title');
        
        const author = document.createElement('h5');
        author.textContent = book.author;
        author.classList.add('author');
        
        
        //////////// Page and Status ////////////
        const pageContainer = document.createElement('p');
        pageContainer.classList.add('page');
        console.log(book.page);
        if (book.read != 0 && book.page == 'Length is Unknown' || book.page == '0'){
            pageContainer.textContent = book.read + '%'
        } else if (book.page != 'Length is Unknown' && book.read == 0) {
            pageContainer.textContent = book.page + ' Pages'
        } else if (book.page != 'Length is Unknown' && book.read != 0) {
            pageContainer.textContent =  `${book.read} / ${book.page} pages`
        }
        
        
        //////////// Edit book button ////////////
        const editBook = document.createElement('BUTTON');
        editBook.setAttribute("type", "button")
        editBook.setAttribute("onclick", `editBook(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        editBook.textContent = 'Edit';
        editBook.classList.add('bookButton', 'editBookButton');
        
        
        //////////// Delete book button ////////////
        const deleteBook = document.createElement('BUTTON');
        deleteBook.setAttribute("type", "button")
        deleteBook.setAttribute("onclick", `removeBook(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        deleteBook.textContent = 'Delete';
        deleteBook.classList.add('bookButton', 'deleteBookButton');
        
        //////////// Append ////////////
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pageContainer);
        bookInfo.appendChild(editBook);
        bookInfo.appendChild(deleteBook);
        bookList.appendChild(bookInfo);
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Local Storage /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//savelibrary button
function saveLibrary() {
    localStorage.setItem("myLibray", JSON.stringify(myLibray))
}

//retrive Library button
function localStorageCheck() {  
    if (checkStorageAvailable('localStorage')) {
        if(!localStorage.getItem('myLibray')) {
            console.log("data not there");
        } else {
            retriveLibrary();
        }
    }
    else {
        console.log("Local Storage Not available");
    }
}

function retriveLibrary() {
    let jsonString = localStorage.getItem("myLibray")
    var retrievedObject = JSON.parse(jsonString);
    myLibray = retrievedObject;
    displayLibrary();    
}
//check if storage is avaiable 
// copied from https://developer.mozilla.org/
function checkStorageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
        }
    }
    
    
    //SAVED for console use only
    function deleteLocalData () {
        localStorage.clear();
    }