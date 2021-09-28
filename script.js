
let myLibrary = []
let bookCount = 0
let editBookNum = 0
let ogNum = 0;
let undo = []
const bookList = document.querySelector("#book-container")

localStorageCheck();

//******************************************************************************************************************************************************* 
//********test books for future test********************************************************************************************************************* 
// let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 25)
// let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 100)
// let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)
// let theHobbit4 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)
// let theHobbit5 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)
// let theHobbit6 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 40)

// myLibrary.push(theHobbit)
// myLibrary.push(theHobbit2)
// myLibrary.push(theHobbit3)
// myLibrary.push(theHobbit4)
// myLibrary.push(theHobbit5)
// myLibrary.push(theHobbit6)
// displayLibrary();

 //SAVED for console use only
 function deleteLocalData () {
    localStorage.clear();
}
//******************************************************************************************************************************************************* 
//********test books for future test********************************************************************************************************************* 

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
////////// Misc Functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Restore Book Button //////////
function restoreBookBTTN(){
    let test = undo.shift();
    myLibrary.push(test);
    displayLibrary();

    if (undo.length == 0) {
        addHideClass('restore-id');
        console.log("no undo");
        return;
    }
  
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Pop-up Functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////// Add Book Button //////////
function addBookToLibraryBTTN() {
    removeHideClass('add-book-popup');
    clearInput();
    ogNum = 0;
}
////////// Exit Pop-Up Button //////////
function exit(id) {
    document.getElementById(id).classList.add('hide');
}
////////// Form input - New Book add to Array////////////
function addBookSubmit() {
    const title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let page = document.getElementById("page").value;
    let read = document.getElementById("percentRange").value
        
    if (page == "") {page = "Length is Unknown"};

    let book =  new Book(title, author, page, read)
    myLibrary.push(book)
    
    displayLibrary();
    addHideClass('add-book-popup');
}

////////// Clear Pop-up Data//////////
function clearInput() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("page").value = '';
    document.getElementById("percentRange").value = '0';
    document.getElementById("percentRange").max = '100'
    document.getElementById("percentLabel").innerHTML = '0%';
}
////////// Show Pop-Up //////////
function removeHideClass(id) {
    document.getElementById(id).classList.remove('class', 'hide');
}
////////// Hide Pop-Up //////////
function addHideClass(id) {
    document.getElementById(id).classList.add('class', 'hide');
}
//////////////////////////////////////////////////////////////////////
/////////Slider Calc ~Pages and Pages read cal////////////////////////
/////////////////////////////////////////////////////////////////////
////////// onChange(num input) by Page Number Input//////////
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
////////// adjust Read Percent(slider)//////////
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
////////// calc New Read Percent Value(slider)//////////
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
////////// onChange(slider) by Read Percent//////////
function rangeValueButton(value, idPercentLabel, idPage) {
    let pageNumber = document.getElementById(idPage).value
    if (pageNumber <= 2) {
        value = `${value}%`
    } else {
        value = `${value} pages`
    }
    document.getElementById(idPercentLabel).innerHTML = value
}
/////////////////////////////////////////////
////////// Edit Book Pop-UP////////////////////
//////////////////////////////////////////////
///////// Display Book to edit in Pop-up/////
function editBook(num){
    editBookNum = num;
    ogNum = document.getElementById("editPage").value
    document.getElementById("editTitle").value = myLibrary[num].title
    document.getElementById("editAuthor").value = myLibrary[num].author
    
    if (myLibrary[num].page == "Length is Unknown" || myLibrary[num].page == null) {
        ogNum = 0;
        document.getElementById("editPercentRange").value = myLibrary[num].read
        document.getElementById("editPercentLabel").innerHTML = myLibrary[num].read + '%'
        document.getElementById("editPage").value = ''
        document.getElementById("editPercentRange").max = "100"
    } else {
        let userInputPageNum = document.getElementById("editPage").value = myLibrary[num].page;
        ogNum = userInputPageNum;
        document.getElementById("editPercentRange").value = myLibrary[num].read;
        document.getElementById("editPercentRange").max = userInputPageNum;
        document.getElementById("editPercentLabel").innerHTML = myLibrary[num].read + ' pages read.'
    }
    
    removeHideClass('edit-book-popup');    
}
////////// Edit Book Submit //////////
function editBookSubmitBTTN() {
    const title = document.getElementById("editTitle").value;
    let author = document.getElementById("editAuthor").value;
    let page = document.getElementById("editPage").value;
    let read = document.getElementById("editPercentRange").value
    
    if (page == "") {page = "Length is Unknown"};
    
    myLibrary[editBookNum].title = title
    myLibrary[editBookNum].author = author
    myLibrary[editBookNum].page = page
    myLibrary[editBookNum].read = read
    
    displayLibrary();
    addHideClass('edit-book-popup');
}

////////// Remove book Button//////////
function removeBookBTTN(num){
    undo.unshift(myLibrary.splice(num,1)[0]);
    displayLibrary();
    removeHideClass("restore-id");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Display Library/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function displayLibrary(){
    // if (myLibrary.length == 0) {
    //     // const bookList = document.querySelector("#book-container")
    //     console.log('no books');
    //     const noBook = document.createElement('div');
    //     noBook.classList.add('no-book');
    //     noBook.textContent ='Please add a book to start your library.' 
    //     bookList.appendChild(noBook);
    //     return;
    // }
    removeLibrary();
    saveLibrary();
    //add button
    const addBTTN = document.createElement('index')
    addBTTN.setAttribute("type", "button")
    addBTTN.setAttribute("onclick", "addBookToLibraryBTTN()")
    // addBTTN.setAttribute("value", "the dog");
    addBTTN.classList.add('book-list', 'add-botton');
    addBTTN.textContent = "+"


    myLibrary.forEach(function(book) {
        const atrributeID = bookCount;
        bookCount++
        //////////// Book Container Div ////////////
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-list');
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
        editBook.classList.add('book-Button', 'edit-Book-Button');
        //////////// Delete book button ////////////
        const deleteBook = document.createElement('BUTTON');
        deleteBook.setAttribute("type", "button")
        deleteBook.setAttribute("onclick", `removeBookBTTN(${atrributeID})`)
        bookInfo.classList.add(atrributeID);
        deleteBook.textContent = 'Delete';
        deleteBook.classList.add('book-Button', 'delete-Book-Button');
        //////////// Append ////////////
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pageContainer);
        bookInfo.appendChild(editBook);
        bookInfo.appendChild(deleteBook);
        bookList.appendChild(bookInfo);
    });

    bookList.appendChild(addBTTN);
}

////////// Clear Library Dom//////////
function removeLibrary(){
    bookList.innerHTML = ""
    bookCount = 0
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Local Storage /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//savelibrary button
function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}

//retrive Library button
function localStorageCheck() {  
    console.log("localstorage");
    if (checkStorageAvailable('localStorage')) {
        if(!localStorage.getItem('myLibrary')) {
            console.log("no local storage");
            displayLibrary();

        } else {
            retrieveLibrary();
        }
    }
    else {
        console.log("can not save library");
    }
}

function retrieveLibrary() {
    console.log('retriving books');
    let jsonString = localStorage.getItem("myLibrary")
    var retrievedObject = JSON.parse(jsonString);
    myLibrary = retrievedObject;
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