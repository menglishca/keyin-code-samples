-- Example 2: Library Management System  
-- You’re tasked with creating a simple Library Management System to manage books, authors, and the books' availability for checkout. Using PostgreSQL and pgAdmin, build the system step-by-step.

-- 1. Create the tables to store all of this data
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    nationality TEXT
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title TEXT,
    genre TEXT,
    publication_year INT,
    author_id INT REFERENCES authors(author_id)
);

CREATE TABLE book_availability (
    availability_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    available BOOLEAN,
    last_checkout_date DATE
);

-- 2. Insert the data provided into the tables
INSERT INTO authors (first_name, last_name, date_of_birth, nationality) VALUES
    ('George', 'Orwell', '1903-06-25', 'British'),
    ('Jane', 'Austen', '1775-12-16', 'British'),
    ('Mark', 'Twain', '1835-11-30', 'American');

INSERT INTO books (title, genre, publication_year, author_id) VALUES
    ('1984', 'Dystopian', 1949, (SELECT author_id FROM authors WHERE first_name = 'George' AND last_name = 'Orwell')),
    ('Pride and Prejudice', 'Romance', 1813, (SELECT author_id FROM authors WHERE first_name = 'Jane' AND last_name = 'Austen')),
    ('The Adventures of Huckleberry Finn', 'Adventure', 1884, (SELECT author_id FROM authors WHERE first_name = 'Mark' AND last_name = 'Twain'));

INSERT INTO book_availability (book_id, available, last_checkout_date) VALUES
    ((SELECT book_id FROM books WHERE title = '1984'), TRUE, '2024-09-10'),
    ((SELECT book_id FROM books WHERE title = 'Pride and Prejudice'), FALSE, '2024-08-25'),
    ((SELECT book_id FROM books WHERE title = 'The Adventures of Huckleberry Finn'), TRUE, '2024-09-15');

-- 3. Write SELECT statements to do the following:
-- a) Retrieve the full names of all authors
SELECT first_name || ' ' || last_name AS full_name FROM authors;

-- b) Retrieve the titles of all available books
SELECT title FROM books
    JOIN book_availability ON books.book_id = book_availability.book_id
    WHERE available = TRUE;

-- c) Retrieve the titles of all books by "George Orwell"
SELECT title FROM books
    JOIN authors ON books.author_id = authors.author_id
    WHERE authors.first_name = 'George' AND authors.last_name = 'Orwell';

-- 4. Update the availability of "Pride and Prejudice" to "Yes"
UPDATE book_availability
    SET available = TRUE
    WHERE book_id = (SELECT book_id FROM books WHERE title = 'Pride and Prejudice');

-- 5. Remove "The Adventures of Huckleberry Finn" from the available books list
UPDATE book_availability
    SET available = FALSE
    WHERE book_id = (SELECT book_id FROM books WHERE title = 'The Adventures of Huckleberry Finn');