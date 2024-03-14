// Функция-конструктор для создания книг
function Book(title, author, year) {//Обязательно с большой буквы
    this.id = generateUniqueId();

    this.title = title;
    this.author = author;
    this.year = year;

    this.available = true;//статус, есть или нет

    this.ratings = [];//хранение рейтингов

    // Добавление рейтинга книги
    this.addRating = function(rating) {
        // Проверяем доступность книги
        if (this.available) {//Если true(есть)
            // Добавляем рейтинг в массив
            this.ratings.push(rating);
        } else {
            console.log("Книгу необходимо вернуть перед добавлением оценки.");
        }
    };

    // Вычисление среднего рейтинга
    this.getAverageRating = function() {
        // Если нет рейтингов, то просто 0
        if (this.ratings.length === 0) {
            return 0;
        } else {
            // Вычисляем средний рейтинг
            const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
            return sum / this.ratings.length;//Сумма рейтинга на количество
        }
    };
}

// Создание библиотеки
function Library() {

    const books = [];//Хранение книг

    // Добавление книги
    this.addBook = function(book) {
        books.push(book);
    };

    // Поиск книг по автору
    this.findBooksByAuthor = function(author) {
        return books.filter(book => book.author === author);//Ищем по ключу автор
    };

    // Отображение доступных книг
    this.listAvailableBooks = function() {
        return books.filter(book => book.available);//Ищем по ключу доступности
    };

    // Изменение статуса доступности книги
    this.toggleAvailability = function(bookId) {
        const book = books.find(book => book.id === bookId);
        if (book) {
            book.available = !book.available;//Меняем true на false
        }
    };

    // Получение книги по идентификатору
    this.getBookById = function(bookId) {
        return books.find(book => book.id === bookId);
    };
}

// Пользователь
function User(name, surname) {
    // Уникальый id
    this.id = generateUniqueId();

    this.name = name;
    this.surname = surname;
    //Хранение
    this.borrowedBooks = [];

    // Аренда книги пользователем
    this.borrowBook = function(library, bookId) {
        const book = library.getBookById(bookId);
        if (book) {//Сначала проверяем, на начилие самой книги
            if (book.available) {//Проверяем на доступность, если она есть то значение true
                library.toggleAvailability(bookId);
                this.borrowedBooks.push(book);
            } else {//Если будет false
                console.log("Эту книгу нельзя взять напрокат.");
            }
        } else {
            console.log("Этой книги нет в библиотеке.");
        }
    };

    // Возврат книги
    this.returnBook = function(library, bookId) {
        const index = this.borrowedBooks.findIndex(book => book.id === bookId);//Ищем книгу в массиве(в котором храняться книги которые пользователь взял)
        if (index !== -1) {
            library.toggleAvailability(bookId);
            this.borrowedBooks.splice(index, 1);//Методом splice убираем один элемент массива
        } else {
            console.log("Вы не брали эту книгу.");
        }
    };
}

// Функция для генерации уникальных идентификаторов, stackoverflow)
function generateUniqueId() {
    return Math.random().toString(36).slice(2, 11);
}





const library = new Library();//библиотека
const user = new User("Misha", "Reshetnyak");//пользователь



const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);// Создание книги
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);// Создание книги
const book3 = new Book("Книга", "Тильт", 2000);// Создание книги
const book4 = new Book("Книга", "Тильт", 1989);// Создание книги
const book5 = new Book("Книга", "Тильт", 2011);// Создание книги

library.addBook(book1);//Добавляем книги
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);

console.log("Доступные книги:", library.listAvailableBooks());//доступные книги
console.log("Тильт:", library.findBooksByAuthor("Тильт"));//поиск по автору, чисто пример



// Взял книги
user.borrowBook(library, book1.id);
user.borrowBook(library, book3.id);
user.borrowBook(library, book4.id);
user.borrowBook(library, book5.id);

// Вернул книги
user.returnBook(library, book1.id);
user.returnBook(library, book4.id);
user.returnBook(library, book3.id);

book1.addRating(4.5);//Даём книгам рейтинг
book1.addRating(1);
book1.addRating(2);
book2.addRating(4.2);
book3.addRating(3);

console.log("Средний рейтинг",book1.getAverageRating());//Выводим средний рейтинг

console.log("Желаемая книга:",library.getBookById(book3.id));//Ищем книгу ТИПА по id