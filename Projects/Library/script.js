class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info = () => {
    let str = `${this.title} by ${this.author}, ${this.pages} pages,`;
    this.read ? (str += "read") : (str += "not read yet");
    return str;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theHobbit4 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

const myLibrary = [theHobbit, theHobbit1, theHobbit2, theHobbit3, theHobbit4];

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
addCard.addEventListener("click", () => {
  createForm();
});

function addBookToLibrary(title, author, page, done) {
  myLibrary.push(new Book(title, author, page, done));
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
    removeButton.addEventListener("click", (e) => removeCard(e));
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
}

const library = document.createElement("section");
displayBooks();

body.appendChild(container);
body.appendChild(addCard);

function createForm() {
  const containsForm = document.getElementsByTagName('form');
  if(containsForm.length !== 0) {
    return;
  }
  const container = document.createElement("form");
  const title = createInput("title", "text");
  const author = createInput("author", "text");
  const pages = createInput("pages", "number");
  const done = document.createElement("div");
  done.textContent = "READ?";
  
  const submit = document.createElement("div");
  submit.setAttribute("id", "submit");
  submit.textContent = "Submit";
  container.append(title, author, pages, done, submit);
  addListeners(title, author, pages, done, submit);
  
  body.appendChild(container);
}

function addListeners(title, author, pages, done, submit) {
  [title, author].forEach(element => {
    const inputField = element.childNodes[0];
    const errorField = element.childNodes[1];
    inputField.addEventListener('input', () => {
      if (inputField.value.length !== 0) {
        errorField.textContent = '';
      }
      else {
        showError(element);
      }
    })
  })

  pages.addEventListener('input', () => {
    console.log(pages.childNodes[0].value);
    if (pages.childNodes[0].value > 0) {
      pages.childNodes[1].textContent = '';
    }
    else {
      showError(pages);
    }
  })

  done.addEventListener("click", () => {
    done.classList.toggle("checked");
  });

  submit.addEventListener("click", () => {
    if (validInputs(title, author, pages)) {
      addBookToLibrary(
        title.childNodes[0].value,
        author.childNodes[0].value,
        pages.childNodes[0].value,
        done.classList.contains("checked")
      );
      displayBooks();
      const form = document.getElementsByTagName("form")[0];
      form.parentElement.removeChild(form);
    } else {
      showErrors(title, author, pages);
    }
  });
}

function createInput(id, type) {
  const container = document.createElement("div");
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("id", id);
  input.setAttribute("name", id);
  input.setAttribute("placeholder", id);
  const errors = document.createElement("span");
  container.append(input, errors);
  return container;
}

function validInputs(title, author, pages) {
  return !(
    title.childNodes[0].value.length === 0 ||
    author.childNodes[0].value.length === 0 ||
    pages.childNodes[0].value <= 0
  );
}

function showErrors(title, author, pages) {
  const spans = document.querySelectorAll("form > div > span");
  spans.forEach((span) => (span.textContent = ""));

  if (title.childNodes[0].value.length === 0) {
    title.childNodes[0].value = "";
    showError(title);
  }
  if (author.childNodes[0].value.length === 0) {
    author.childNodes[0].value = "";
    showError(author);
  }
  if (pages.childNodes[0].value <= 0) {
    pages.childNodes[0].value = "";
    showError(pages);
  }
}

function showError(field) {
  field.childNodes[1].textContent = `Please enter a valid ${field.childNodes[0].id === "pages" ? "number of" : ""} ${field.childNodes[0].id} ${field.childNodes[0].id === "author" ? "name" : ""}`;
}
