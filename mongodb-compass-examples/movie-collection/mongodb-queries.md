# Example 2: Movie Collection

## Create a collection and insert the movie data:

```javascript
db.movies.insertMany([
  { title: "Inception", director: "Christopher Nolan", genre: "Sci-Fi", releaseYear: 2010 },
  { title: "The Dark Knight", director: "Christopher Nolan", genre: "Action", releaseYear: 2008 },
  { title: "Interstellar", director: "Christopher Nolan", genre: "Sci-Fi", releaseYear: 2014 }
]);
```

## Retrieve the titles of all movies:

```javascript
db.movies.find({}, { title: 1, _id: 0 });
```

## Retrieve the directors of all movies released after 2010:

```javascript
db.movies.find({ releaseYear: { $gt: 2010 } }, { director: 1, _id: 0 });
```

## Retrieve all movies of the "Sci-Fi" genre:

```javascript
db.movies.find({ genre: "Sci-Fi" });
```

## Update the release year of "Interstellar" to 2015:

```javascript
db.movies.updateOne(
  { title: "Interstellar" },
  { $set: { releaseYear: 2015 } }
);
```

## Remove "The Dark Knight" from the collection:

```javascript
db.movies.deleteOne({ title: "The Dark Knight" });
```