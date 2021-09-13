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
    ogNum = 0;
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
function pageNumberChange(userInputPageNum, id) {
    let idPercentRange;
    let idPage;
    let idPercentLabel;
    
    if (id == "percentRange") {
        idPercentRange = "percentRange";
        idPage = "page";
        idPercentLabel = "percentLabel";
    }else if (id == "editPercentRange"){
        idPercentRange = "editPercentRange";
        idPage = "editPage";
        idPercentLabel = "editPercentLabel";
    } else {
        console.error('Not proper ID in pageNumberChange()');
        return;
    }

    let percentRangeValue = document.getElementById(idPercentRange).value
    let readCalcNum = calPercentRead(percentRangeValue, userInputPageNum);
    rangeAdjust(readCalcNum, userInputPageNum, idPercentRange, idPercentLabel, idPage)
}

function rangeAdjust(readCalcNum, userInputPageNum, idPercentRange, idPercentLabel, idPage) {
    let max 
    let value
    let label
    
    if (readCalcNum == "Fuck Matt") {
        document.getElementById(idPage).value = ogNum
        console.log(`Fuck Beard`);
    } else {
        if (userInputPageNum == 0 || userInputPageNum == '') {
            max = 100
            value = readCalcNum;
            label = `${Math.round(readCalcNum)} %`
        } else {
            max = userInputPageNum
            value = readCalcNum;
            label = `${Math.round(readCalcNum)} pages`
        }
        ogNum = userInputPageNum
        document.getElementById(idPercentRange).max = max
        document.getElementById(idPercentRange).value = value
        document.getElementById(idPercentLabel).innerHTML = label
    }    
}

function calPercentRead(percentRangeValue, userInputPageNum){
   if (userInputPageNum != '' && (userInputPageNum == 1 || userInputPageNum <= 0)){
        alert("Page Numbers can not be set to 0 or 1");
        return "Fuck Matt";
    } 
    if (percentRangeValue == 0) {
    return 0;
    } else if (ogNum == 0) {
            return (percentRangeValue/100) * userInputPageNum;
     } else if (ogNum != 0) {
        if (userInputPageNum == ''){
            return ((percentRangeValue/ogNum) * 100);
        }else if (userInputPageNum != 0){
            return((percentRangeValue/ogNum)*userInputPageNum);
        }else {
            return;
        }
    } else {
        console.error("OG unkown and percentRange error")
        return;
    }
}

////////// onChange by Read Status Change//////////
function rangeValueButton(value, idPercentLabel, idPage) {
    let pageNumber = document.getElementById(idPage).value
    if (pageNumber <= 2) {
        value = `${value}%`
    } else {
        value = `${value} pages`
    }
    document.getElementById(idPercentLabel).innerHTML = value
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
        let userInputPageNum = document.getElementById("editPage").value = myLibray[num].page;
        ogNum = userInputPageNum;
        document.getElementById("editPercentRange").value = myLibray[num].read;
        document.getElementById("editPercentRange").max = userInputPageNum;
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