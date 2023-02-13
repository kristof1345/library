// main div that contains the books
const books = document.getElementById("grid");
//add book
const addBook = document.getElementById("addBookButton");
//popup
const modal = document.getElementById("popUp");
const wrapper = document.getElementById("wrapper");
//close modal
const span = document.getElementById("back");

let myLibrary = [];

addBook.addEventListener("click", () => {
  wrapper.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target == wrapper) {
    wrapper.style.display = "none";
  }
});

span.addEventListener("click", () => {
  wrapper.style.display = "none";
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = Math.floor(Math.random() * 1000000);
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
}

const addBookForm = document.getElementById("add-book");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  let newBook = {};
  for (let [name, value] of data) {
    if (name === "book-read") {
      newBook["book-read"] = true;
    } else {
      newBook[name] = value || "";
    }
  }

  if (!newBook["book-read"]) {
    newBook["book-read"] = false;
  }

  addBookToLibrary(
    newBook["book-title"],
    newBook["book-author"],
    newBook["book-pages"],
    newBook["book-read"]
  );

  addBookForm.reset();
  wrapper.style.display = "none";
});

function addLocalStorage() {
  // localStorage => save things in key value pairs - key = library : myLibrary
  myLibrary = JSON.parse(localStorage.getItem("library")) || [];
  saveAndRenderBooks();
}

//helper function to create html elements with textcontent and classes
function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
}

function createReadElement(bookItem, book) {
  let read = document.createElement("button");
  read.textContent = "Read?";
  read.setAttribute("class", "read");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("class", "toggle");
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.setAttribute("class", "red");
      book.read = true;
      saveAndRenderBooks();
    } else {
      console.log("pff");
      bookItem.setAttribute("class", "red");
      book.read = false;
      saveAndRenderBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute("class", "book");
  }
  if (!book.read) {
    // solution
    input.checked = false;
    bookItem.setAttribute("class", "red");
  }
  read.appendChild(input);
  return read;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}

function createBookItem(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "book");
  bookItem.appendChild(createBookElement("p", `${book.title}`, "title"));
  bookItem.appendChild(createBookElement("p", `${book.author}`, "author"));
  bookItem.appendChild(createBookElement("p", `${book.pages}`, "pages"));
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "Remove", "delete"));

  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });

  books.insertAdjacentElement("afterbegin", bookItem);
}

//function to render all the books
function renderBooks() {
  books.textContent = ""; //??
  myLibrary.map((book, index) => {
    // using localstorage to render
    createBookItem(book, index);
  });
}

function saveAndRenderBooks() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  renderBooks();
}

//render on page load
addLocalStorage();
