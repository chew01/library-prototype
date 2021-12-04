const table = document.querySelector("table");
const newBookButton = document.querySelector(".createButton");
const form = document.querySelector(".form");
const titleInput = form.querySelector("#title");
const authorInput = form.querySelector("#author");
const pagesInput = form.querySelector("#pages");
const readInput = form.querySelector("#read");
const submitButton = form.querySelector("button");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () =>
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  addRow(book.title, book.author, book.pages, book.read);
}

function addRow(title, author, pages, read) {
  const newRow = document.createElement("tr");
  const newTitle = document.createElement("td");
  const newAuthor = document.createElement("td");
  const newPages = document.createElement("td");
  const newRead = document.createElement("td");
  const newTools = document.createElement("td");

  newTitle.textContent = title;
  newAuthor.textContent = author;
  newPages.textContent = pages;
  if (read === true) {
    newRead.textContent = "read";
  } else {
    newRead.textContent = "not yet read";
  }

  function toggleRead() {
    if (newRead.textContent === "read") {
      newRead.textContent = "not yet read";
    } else {
      newRead.textContent = "read";
    }
  }

  function deleteRow() {
    newRow.remove();
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  const readButton = document.createElement("button");
  readButton.textContent = "Toggle read";
  newTools.appendChild(deleteButton);
  newTools.appendChild(readButton);

  deleteButton.addEventListener("click", deleteRow);
  readButton.addEventListener("click", toggleRead);

  newRow.appendChild(newTitle);
  newRow.appendChild(newAuthor);
  newRow.appendChild(newPages);
  newRow.appendChild(newRead);
  newRow.appendChild(newTools);

  table.appendChild(newRow);
}

function openForm() {
  form.setAttribute("style", "display: block");
  submitButton.addEventListener("click", addBook);
}

function addBook() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = readInput.checked;

  if (title === "" || author === "" || pages === "") {
    alert("Not all blanks are filled!");
    return;
  }

  let book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  form.setAttribute("style", "display: none");
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

newBookButton.addEventListener("click", openForm);
