const wrapper = document.getElementById("popUpWrapper");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const readOrNot = document.getElementById("readOrNot");
const grid = document.getElementsByClassName("grid");
const readToggle = document.getElementsByClassName("read");

//functions like closing and opening elements
function openWrapper() {
  wrapper.style.display = "flex";
}
function closeWrapper() {
  wrapper.style.display = "none";
}

// book handling part
let myLibrary = [];

function book(title, author, pages, isRead) {
  // the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const Hobbit = new book("Hobbit", "J.R.R. Tolkien", "295", "not read yet");

function addBookToLibrary() {
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;
  let isRead = getReadValue();
  let newBook = new book(title, author, pages, isRead);
  myLibrary.unshift(newBook);
  createBookCard();
}

function getReadValue() {
  if (readOrNot.checked) return true;
  else return false;
}

function createBookCard() {
  let div1 = document.createElement("div");

  let h2 = document.createElement("h2");
  let t = document.createTextNode(myLibrary[0].title);
  let p1 = document.createElement("p");
  let t2 = document.createTextNode(myLibrary[0].author);
  let p2 = document.createElement("p");
  let t3 = document.createTextNode(myLibrary[0].pages);
  let button1 = document.createElement("button");
  let t4 = document.createTextNode("read");
  let t6 = document.createTextNode("not read");
  let button2 = document.createElement("button");
  let t5 = document.createTextNode("remove");

  h2.classList.add("title");
  h2.appendChild(t);
  div1.appendChild(h2);

  p1.classList.add("author");
  p1.appendChild(t2);
  div1.appendChild(p1);

  p2.classList.add("pages");
  p2.appendChild(t3);
  div1.appendChild(p2);

  if (readOrNot.checked) {
    button1.classList.add("read");
    button1.appendChild(t4);
  } else {
    button1.classList.add("not-read");
    button1.appendChild(t6);
  }
  div1.appendChild(button1);

  button2.classList.add("remove");
  button2.appendChild(t5);
  div1.appendChild(button2);

  grid[0].appendChild(div1).className = "book";
}

// function toggleColor() {
//   if (readOrNot.checked) {
//     readToggle.style.backgroundColor = "red";
//     readToggle.innerHTML = "not read";
//   } else {
//     readToggle.style.backgroundColor = "green";
//     readToggle.innerHTML = "read";
//   }
// }

/**
 * ! got stuck on removing a book card and changing the color of the read button because the remove func gets called prematurely
 */
