-- Example 1: School Enrollment System
-- You’re tasked with creating a simple School Enrollment System to manage students, courses, and their enrollments in those courses. Using PostgreSQL and pgAdmin, build the system step-by-step.

-- 1. Create the tables to sort all of this data
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    enrollment_date DATE
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name TEXT,
    course_description TEXT
);

CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrollment_date DATE
);

-- 2. Insert the data provided into the tables
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
    ('Alice', 'Johnson', 'alice.johnson@example.com', '2024-09-15'),
    ('Bob', 'Smith', 'bob.smith@example.com', '2024-09-16'),
    ('Charlie', 'Williams', 'charlie.williams@example.com', '2024-09-17');

INSERT INTO courses (course_name, course_description) VALUES
    ('Physics 101', 'Introduction to Physics'),
    ('Literature 201', 'Basics of World Literature'),
    ('History 101', 'A Survey of Historical Events');

INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES
    ((SELECT student_id FROM students WHERE first_name = 'Alice' AND last_name = 'Johnson'), (SELECT course_id FROM courses WHERE course_name = 'Physics 101'), '2024-09-18'),
    ((SELECT student_id FROM students WHERE first_name = 'Alice' AND last_name = 'Johnson'), (SELECT course_id FROM courses WHERE course_name = 'Literature 201'), '2024-09-18'),
    ((SELECT student_id FROM students WHERE first_name = 'Bob' AND last_name = 'Smith'), (SELECT course_id FROM courses WHERE course_name = 'History 101'), '2024-09-19');

-- 3. Write SELECT statements to do the following:
-- a) Retrieve the full names of all students
SELECT first_name || ' ' || last_name AS full_name FROM students;

--- b) Retrieve the course names of all of "Bob Smith"'s courses
SELECT course_name FROM courses
    JOIN enrollments ON courses.course_id = enrollments.course_id
    JOIN students ON students.student_id = enrollments.student_id
    WHERE students.first_name = 'Bob' AND students.last_name = 'Smith';

--- c) Retrieve all students enrolled in "Physics 101"
SELECT first_name || ' ' || last_name AS full_name FROM students
    JOIN enrollments ON students.student_id = enrollments.student_id
    JOIN courses ON courses.course_id = enrollments.course_id
    WHERE courses.course_name = 'Physics 101';

--- 4. Change "Charlie William"'s email to charlie.w.newemail@example.com
UPDATE students
    SET email = 'charlie.w.newemail@example.com'
    WHERE first_name = 'Charlie' AND last_name = 'Williams';

--- 5. Remove "Alice Johnson" from "Literature 201"
DELETE FROM enrollments
    WHERE student_id = (SELECT student_id FROM students WHERE first_name = 'Alice' AND last_name = 'Johnson')
    AND course_id = (SELECT course_id FROM courses WHERE course_name = 'Literature 201');