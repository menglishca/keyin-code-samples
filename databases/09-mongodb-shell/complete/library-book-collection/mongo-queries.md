# Example 1: Library Book Collection

## Create a collection and insert the book data:

```javascript
db.books.insertMany([
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publishedYear: 1925 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publishedYear: 1960 },
  { title: "1984", author: "George Orwell", genre: "Dystopian", publishedYear: 1949 }
]);
```

## Retrieve the titles of all books:

```javascript
db.books.find({}, { title: 1, _id: 0 });
```

## Retrieve the authors of all books published after 1950:

```javascript
db.books.find({ publishedYear: { $gt: 1950 } }, { author: 1, _id: 0 });
```

## Retrieve all books of the "Fiction" genre:

```javascript
db.books.find({ genre: "Fiction" });
```

## Update the published year of "1984" to 1950:

```javascript
db.books.updateOne(
  { title: "1984" },
  { $set: { publishedYear: 1950 } }
);
```

## Remove "To Kill a Mockingbird" from the collection:

```javascript
db.books.deleteOne({ title: "To Kill a Mockingbird" });
```
