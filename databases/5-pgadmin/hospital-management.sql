-- Example 5: Hospital Management System
-- You're tasked with creating a Hospital Management System to manage patients, doctors, treatments, and prescriptions. Using PostgreSQL and pgAdmin, build the system step-by-step.

-- 1. Create the tables to store all of this data
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    address TEXT,
    phone_number TEXT
);

CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    specialty TEXT,
    email TEXT
);

CREATE TABLE treatments (
    treatment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES doctors(doctor_id),
    treatment TEXT,
    treatment_date DATE
);

CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES doctors(doctor_id),
    medication TEXT,
    dosage TEXT,
    prescription_date DATE
);

-- 2. Insert the data provided into the tables
INSERT INTO patients (first_name, last_name, date_of_birth, address, phone_number) VALUES
    ('John', 'Miller', '1985-05-15', '789 Pine Street', '555-1234'),
    ('Laura', 'Turner', '1992-02-28', '987 Cedar Lane', '555-5678'),
    ('Daniel', 'Lewis', '1975-07-08', '456 Oak Avenue', '555-8765');

INSERT INTO doctors (first_name, last_name, specialty, email) VALUES
    ('David', 'Adams', 'Cardiologist', 'david.adams@hospital.com'),
    ('Susan', 'Martinez', 'Neurologist', 'susan.martinez@hospital.com'),
    ('Emily', 'Johnson', 'General Practitioner', 'emily.johnson@hospital.com');

INSERT INTO treatments (patient_id, doctor_id, treatment, treatment_date) VALUES
    (1, 1, 'Heart Surgery', '2024-08-15'),
    (2, 3, 'Flu Treatment', '2024-09-10'),
    (3, 2, 'Brain Scan', '2024-09-20');

INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, prescription_date) VALUES
    (1, 1, 'Beta Blockers', '50mg', '2024-08-20'),
    (2, 3, 'Ibuprofen', '200mg', '2024-09-11'),
    (3, 2, 'Antidepressants', '10mg', '2024-09-22');

-- 3. Write SELECT statements to do the following:
-- a) Retrieve the full names of all doctors
SELECT first_name || ' ' || last_name AS full_name FROM doctors;

-- b) Retrieve all patients treated by "Emily Johnson"
SELECT first_name, last_name FROM patients
    JOIN treatments ON patients.patient_id = treatments.patient_id
    JOIN doctors ON treatments.doctor_id = doctors.doctor_id
    WHERE doctors.first_name = 'Emily' AND doctors.last_name = 'Johnson';

-- c) Retrieve all prescriptions for "John Miller"
SELECT medication, dosage, prescription_date FROM prescriptions
    JOIN patients ON prescriptions.patient_id = patients.patient_id
    WHERE patients.first_name = 'John' AND patients.last_name = 'Miller';

-- 4. Update the dosage for Laura Turner’s "Ibuprofen" prescription to 400mg
UPDATE prescriptions
    SET dosage = '400mg'
    WHERE patient_id = (SELECT patient_id FROM patients WHERE first_name = 'Laura' AND last_name = 'Turner')
    AND medication = 'Ibuprofen';

-- 5. Remove Daniel Lewis' Brain Scan treatment from the system
DELETE FROM treatments
    WHERE patient_id = (SELECT patient_id FROM patients WHERE first_name = 'Daniel' AND last_name = 'Lewis')
    AND treatment = 'Brain Scan';
