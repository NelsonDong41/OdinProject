function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    let str = `${title} by ${author}, ${pages} pages,`;
    if (read.toString().toLowerCase() == "no") {
      str += "not read yet";
    } else {
      str += "read";
    }
    return str;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit4 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

let myLibrary = [theHobbit, theHobbit1, theHobbit2, theHobbit3, theHobbit4];

const body = document.querySelector("body");
const container = document.createElement("div");
container.className = "container";

const title = document.createElement("section");
title.className = "title";
title.textContent = "Library Using JavaScript";
body.appendChild(title);

const addCard = document.createElement("div");
addCard.textContent = "+";
addCard.className = "card addDiv";
addCard.addEventListener("click", (e) => addBookToLibrary());

function addBookToLibrary() {
  myLibrary.push(
    new Book(
      prompt("What is the title of the book?"),
      prompt("Who is the author?"),
      prompt("How many pages are there?"),
      prompt("Did you finish reading this book?")
    )
  );
  displayBooks();
}

function displayBooks() {
  let list = document.getElementsByClassName("card");
  [...list].forEach((element) => {
    if (!element.classList.contains("addDiv")) {
      element.remove();
    }
  });

  myLibrary.forEach((book) => {
    const currentBook = document.createElement("div");
    const removeButton = document.createElement("div");
    removeButton.textContent = "X";
    removeButton.addEventListener('click', (e) => removeCard(e));
    const text = document.createElement("div");
    currentBook.className = "card";
    currentBook.setAttribute(
      "id",
      book.title.replace(/\s+/g, "").toLowerCase()
    );
    text.textContent = book.info();
    currentBook.appendChild(removeButton);
    currentBook.appendChild(text);
    container.appendChild(currentBook);
  });
}

function removeCard(e) {
    const current = e.target.parentNode;
    const indexOfCard = [current.parentNode.children].indexOf(current);
    e.target.parentNode.remove();
    myLibrary.splice(indexOfCard, 1);
    console.log(myLibrary);
}

const library = document.createElement("section");
displayBooks();

body.appendChild(container);
body.appendChild(addCard);
