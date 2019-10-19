class Book {
    constructor(title, author, pages, read) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get pages() {
        return this._pages;
    }

    set pages(value) {
        this._pages = value;
    }

    get read() {
        return this._read;
    }

    set read(value) {
        this._read = value;
    }
}

let library = JSON.parse(localStorage.getItem("library")) || [];

function updateLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
}

function makeBook(i, shelfDiv) {
    let book = library[i];
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.addEventListener("click", () => {
        book._read = (book._read === "t") ? "f" : "t";
        if (book._read === "t") {
            bookDiv.classList.add("read-book");
        } else {
            bookDiv.classList.remove("read-book");
        }
        updateLibrary();
    });
    if (book._read === "t") {
        bookDiv.classList.add("read-book");
    }

    let titleDiv = document.createElement("div");
    titleDiv.textContent = book.title || "Default";
    titleDiv.classList.add("book-title");

    let horizontalRule = document.createElement("hr");
    horizontalRule.classList.add("horizontal-rule");
    let authorDiv = document.createElement("div");
    authorDiv.textContent = book.author || "unknown";
    let pagesDiv = document.createElement("div");
    pagesDiv.textContent = book.pages || 0;
    let removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.classList.add("book-button", "pink-background");
    removeButton.addEventListener("click", () => {
        library.splice(i, 1);
        shelfDiv.removeChild(bookDiv);
        updateLibrary();
    });

    bookDiv.append(titleDiv, horizontalRule, authorDiv, pagesDiv, removeButton);
    return bookDiv;
}

function render() {
    let shelfDiv = document.querySelector("#shelf");
    for (let i = 0; i < library.length; i++) {
        shelfDiv.appendChild(makeBook(i, shelfDiv));
    }
}

let newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", () => {
    let shelfDiv = document.querySelector("#shelf");

    let newBookDiv = document.createElement("div");
    newBookDiv.classList.add("book-card");

    let newBookTitle = document.createElement("input");
    newBookTitle.type = "text";
    newBookTitle.placeholder = "title";
    newBookTitle.classList.add("field");
    let newBookAuthor = document.createElement("input");
    newBookAuthor.type = "text";
    newBookAuthor.placeholder = "author";
    newBookAuthor.classList.add("field");
    let newBookPages = document.createElement("input");
    newBookPages.type = "number";
    newBookPages.placeholder = "pages";
    newBookPages.classList.add("field");
    let readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    let readLabel = document.createElement("p");
    readLabel.textContent = "read";
    readLabel.classList.add("read-label");

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel";
    cancelButton.classList.add("book-button", "pink-background");
    cancelButton.addEventListener("click", () => {
        shelfDiv.removeChild(newBookDiv);
    });

    let submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.classList.add("book-button", "cyan-background");
    submitButton.addEventListener("click", () => {
        library.push(new Book(newBookTitle.value,
            newBookAuthor.value,
            newBookPages.valueAsNumber,
            readCheckbox.checked ? "t" : "f"));
        shelfDiv.appendChild(makeBook(library.length - 1, shelfDiv));
        shelfDiv.removeChild(newBookDiv);
        updateLibrary();
    });

    newBookDiv.append(newBookTitle, newBookAuthor, newBookPages,
        readCheckbox, readLabel,
        cancelButton, submitButton);
    shelfDiv.appendChild(newBookDiv);
    newBookDiv.scrollIntoView(true);
});

render();