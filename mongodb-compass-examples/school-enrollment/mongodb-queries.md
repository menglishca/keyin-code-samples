# **Example 3: School Enrollment System**

## Create the collections to store all of this data:

**Students Collection:**

```javascript
db.students.insertMany([
  { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", enrollmentDate: new Date("2024-09-15") },
  { firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com", enrollmentDate: new Date("2024-09-16") },
  { firstName: "Charlie", lastName: "Williams", email: "charlie.williams@example.com", enrollmentDate: new Date("2024-09-17") }
]);
```

**Courses Collection:**

```javascript
db.courses.insertMany([
  { courseName: "Physics 101", description: "Introduction to Physics" },
  { courseName: "Literature 201", description: "Basics of World Literature" },
  { courseName: "History 101", description: "A Survey of Historical Events" }
]);
```

**Enrollments Collection:**

```javascript
db.enrollments.insertMany([
  { studentName: "Alice Johnson", courseName: "Physics 101", enrollmentDate: new Date("2024-09-18") },
  { studentName: "Alice Johnson", courseName: "Literature 201", enrollmentDate: new Date("2024-09-18") },
  { studentName: "Bob Smith", courseName: "History 101", enrollmentDate: new Date("2024-09-19") }
]);
```

## Retrieve the full names of all students:

```javascript
db.students.find({}, { firstName: 1, lastName: 1, _id: 0 });
```

## Retrieve the course names of all of "Bob Smith"'s courses:

```javascript
db.enrollments.find(
  { studentName: "Bob Smith" },
  { courseName: 1, _id: 0 }
);
```

## Retrieve all students enrolled in "Physics 101":

```javascript
db.enrollments.find(
  { courseName: "Physics 101" },
  { studentName: 1, _id: 0 }
);
```

## Change "Charlie William"'s email to `charlie.w.newemail@example.com`:

```javascript
db.students.updateOne(
  { firstName: "Charlie", lastName: "Williams" },
  { $set: { email: "charlie.w.newemail@example.com" } }
);
```

## Remove "Alice Johnson" from "Literature 201":

```javascript
db.enrollments.deleteOne(
  { studentName: "Alice Johnson", courseName: "Literature 201" }
);
```