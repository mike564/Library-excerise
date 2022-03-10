function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    if(this.read){
            return `"${this.title}" by ${this.author}, ${this.pages} pages, already read`;
        }
        return `"${this.title}" by ${this.author}, ${this.pages} pages, not read yet`;
}

function changeReadStatus(){
    if(lib[this.dataset.key].read == "Already read"){
        lib[this.dataset.key].read = "Not yet read";
    }
    else{
       lib[this.dataset.key].read = "Already read"; 
    }
    showBooks();
    //return;
}

function addBookToLib(){
    if(checkFields()){
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let read = document.getElementById('read').value;
        lib.push(new Book(title,author,pages,read));
        toggleInputVisiblity();
        flashMsg();    
    } 
}

function checkFields(){
    if(document.getElementById('title').value == "" || document.getElementById('author').value == "" || document.getElementById('pages').value == ""){
        alert('Must fill out all fields');
        return;
    }

    if(!(/^[A-Za-z\s]+$/.test(document.getElementById('author').value))){
        alert('Invalid author name!');
        return;
    }

    if(!(/^[0-9]+$/.test(document.getElementById('pages').value))){
        alert('Invalid pages input!');
        return;
    }

    if(document.getElementById('read').value=="none"){
        alert('Please indicate whether you have read the book or not.');
        return;
    }
    return true;
}

function makeTableHeaders(){
    let topRow=document.createElement('tr');
    bookTable.append(topRow);
    let topRowTitle = document.createElement("th")
    topRowTitle.textContent="Title";
    let topRowAuthor = document.createElement("th")
    topRowAuthor.textContent="Author";
    let topRowPages = document.createElement("th")
    topRowPages.textContent="Number of Pages";
    let topRowRead = document.createElement("th")
    topRowRead.textContent="Read Status";
    let topRowBlank1 = document.createElement("th");
    topRowBlank1.textContent="Modify read status";
    let topRowBlank2 = document.createElement("th");
    topRowBlank2.textContent="Delete";
    topRow.append(topRowTitle,topRowAuthor,topRowPages,topRowRead,topRowBlank1,topRowBlank2);
}

function showBooks(){

    while(bookTable.firstChild){ 
        bookTable.removeChild(bookTable.firstChild);
    }
    
    makeTableHeaders()

    let i = 0;
    let j = 0;
    lib.forEach(function(thisObj){
        bookTable.append(document.createElement('tr'));
        bookTable.lastChild.setAttribute('data-key',i);

        j=0;
        for(j=0;j<Object.keys(thisObj).length;j++){
            bookTable.lastChild.append(document.createElement('td'));
            bookTable.lastChild.lastChild.textContent=Object.values(thisObj)[j];
        }

        bookTable.lastChild.append(document.createElement('td'));
        bookTable.lastChild.lastChild.append(changeReadStatusBtn.cloneNode(true));
        bookTable.lastChild.lastChild.lastChild.addEventListener('click',changeReadStatus);
        bookTable.lastChild.lastChild.lastChild.setAttribute('data-key',i);
        if(thisObj.read == "Already read"){
            bookTable.lastChild.lastChild.lastChild.textContent="change to unread";
        }
        else{
            bookTable.lastChild.lastChild.lastChild.textContent="change to read";
        }

        bookTable.lastChild.append(document.createElement('td'));
        bookTable.lastChild.lastChild.append(deleteBtn.cloneNode(true));
        bookTable.lastChild.lastChild.lastChild.addEventListener('click',deleteBook);
        bookTable.lastChild.lastChild.lastChild.setAttribute('data-key',i);
        i++;
    });
}

function deleteBook(){
    lib.splice(this.dataset.key,1);
    showBooks();
}

function toggleInputVisiblity(){
    // document.getElementById('title').value="";
    // document.getElementById('author').value="";
    // document.getElementById('pages').value="";
    // document.getElementById('read').value="none";
    inputSection.classList.toggle('input-visible1')
    window.setTimeout(function(){inputSection.classList.toggle('input-visible2');},10);
}

function flashMsg(){
    //Clears message for repeated consecutive inputs
    successMsg.classList.remove('msg-visible1');
    successMsg.classList.remove('msg-visible2');
    window.clearTimeout(timeout1);
    window.clearTimeout(timeout2);
    window.clearTimeout(timeout3);

    successMsg.classList.add('msg-visible1');
    timeout1=window.setTimeout(function(){successMsg.classList.add('msg-visible2');},10);
    timeout2=window.setTimeout(function(){
        successMsg.classList.remove('msg-visible2');
        timeout3=window.setTimeout(function(){successMsg.classList.remove('msg-visible1')},1500);},1300);
}

let lib=[];
let timeout1;
let timeout2;
let timeout3;

const newBookBtn = document.getElementById('new-book-btn');
const showBooksBtn = document.getElementById('show-books-btn');
const addBookBtn = document.getElementById('add-book-btn');
const cancelBtn = document.getElementById('cancel-btn');

const deleteBtn = document.createElement('button');
const changeReadStatusBtn = document.createElement('button');

const inputSection = document.querySelector('.input-section');
const bookTable =  document.getElementById('book-table');
const successMsg = document.querySelector('.success-msg');

deleteBtn.classList.add('delete-btn');
deleteBtn.textContent="x";
changeReadStatusBtn.classList.add('change-status-btn');


newBookBtn.addEventListener('click',toggleInputVisiblity);
showBooksBtn.addEventListener('click',showBooks);
addBookBtn.addEventListener('click',addBookToLib);
cancelBtn.addEventListener('click',toggleInputVisiblity);


