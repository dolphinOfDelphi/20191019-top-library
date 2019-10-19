export class Book {
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