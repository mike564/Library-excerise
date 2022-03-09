function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    if(this.read){
            return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
        }
        return `"${this.title}" by ${this.author}, ${this.pages} pages, not read yet`;
}

function changeReadStatus(){
    if(lib[this.dataset.key].read){
        lib[this.dataset.key].read = false;
    }
    else{
       lib[this.dataset.key].read = true; 
    }
    showBooks();
    return;
}

function addBookToLib(){
    if(document.getElementById('read').value=="none"){
        alert('Please indicate whether you have read the book or not.');
        return;
    }
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value==="true";

    if(title == "" || author == "" || pages == ""){
        alert('Must fill out all fields');
        return;
    }

    if(!(/[A-Za-z]+/.test(author))){
        alert('Invalid author name!');
        return;
    }

    if(!(/[0-9]+/.test(pages))){
        alert('Invalid pages input!');
        return;
    }

    lib.push(new Book(title,author,pages,read));
    //console.log(lib[1].info());
}

function showBooks(){

    while(bookTable.firstChild){ 
        bookTable.removeChild(bookTable.firstChild);
    }
    
    let i = 0;
    lib.forEach(function(thisObj){
        bookTable.append(document.createElement('p'));
        bookTable.lastChild.textContent=thisObj.info();
        bookTable.lastChild.setAttribute('data-key',i);

        bookTable.lastChild.append(changeReadStatusBtn.cloneNode(true));
        bookTable.lastChild.lastChild.addEventListener('click',changeReadStatus);
        bookTable.lastChild.lastChild.setAttribute('data-key',i);
        if(thisObj.read){
            bookTable.lastChild.lastChild.textContent="change to unread";
        }
        else{
            bookTable.lastChild.lastChild.textContent="change to read";
        }

        bookTable.lastChild.append(deleteBtn.cloneNode(true));
        bookTable.lastChild.lastChild.addEventListener('click',deleteBook);
        bookTable.lastChild.lastChild.setAttribute('data-key',i);

        i++;
    });
}

function deleteBook(){
    let selectedbook = document.querySelector('p[data-key="' + this.dataset.key +'"]');
    bookTable.removeChild(selectedbook);
    lib.splice(this.dataset.key,1);
    showBooks();
}

let lib=[];
const newBookBtn = document.getElementById('add-book-btn');
const showBooksBtn = document.getElementById('show-books-btn');
const bookTable =  document.getElementById('book-table');
const deleteBtn = document.createElement('button');
const changeReadStatusBtn = document.createElement('button');
deleteBtn.classList.add('delete-btn');
deleteBtn.textContent="x";


newBookBtn.addEventListener('click',addBookToLib);
showBooksBtn.addEventListener('click',showBooks);
//deleteBtn.addEventListener('click',deleteBook)
