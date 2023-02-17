# KeepNote MySQL Queries

## Context

Keep Note is a website that helps users capture their minds and allows them to add notes and lists. It also allows adding a reminder to make sure that the user never misses a thing. It is possible to add labels to notes to quickly organize and get on with it.  ​

Keep Note application allows only the registered users to add notes and access them. To persist user details and notes information, it must be stored in a database that should be highly secure and reliable. ​

Due to its growing popularity, the number of users accessing the application has increased multifold. For a seamless user experience, choosing the right database which performs well and provides data faster is the need of the hour. ​

MySQL database server is open-source database software that is faster, secured,  reliable and cheaper because of its unique storage engine architecture. ​

The backend development team is now responsible for persisting the application data in the MySQL database which ensures durability. 

## Problem Statement

Keep Note application is used to​

- Take notes​
- Add notes to labels/categories​
- Set reminders for a note.​

As the first step in creating the application, create the necessary DB schema in MySQL database including tables, relationships and add sample data to each table using SQL queries. ​

### Task: Write SQL queries 

- Create the tables for Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory.
- User table fields: user_id, user_name, user_added_date, user_password, user_mobile
- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
- Category table fields : category_id, category_name, category_descr, category_creation_date, category_creator
- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator
- NoteCategory table fields : notecategory_id, note_id, category_id
- Notereminder table fields : notereminder_id, note_id, reminder_id
- Usernote table fields : usernote_id, user_id, note_id
- Insert the rows into the created tables (Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory).
- Fetch the row from User table based on Id and Password.
- Fetch all the rows from Note table based on the field note_creation_date.
- Fetch all the Categories created after the particular Date.
- Fetch all the Note ID from UserNote table for a given User.
- Write Update query to modify particular Note for the given note Id.
- Fetch all the Notes from the Note table by a particular User.
- Fetch all the Notes from the Note table for a particular Category.
- Fetch all the reminder details for a given note id.
- Fetch the reminder details for a given reminder id.
- Write a query to create a new Note from particular User (Use Note and UserNote tables - insert statement).
- Write a query to create a new Note from particular User to particular Category(Use Note and NoteCategory tables - insert statement)
- Write a query to set a reminder for a particular note (Use Reminder and NoteReminder tables - insert statement)
- Write a query to delete particular Note added by a User(Note and UserNote tables - delete statement)
- Write a query to delete particular Note from particular Category(Note and NoteCategory tables - delete statement)

### Instructions

1. Download and unzip the boilerplate code.  
2. Run the command `npm install` to install the dependencies. 
3. Open the boilerplate code in VSCode to develop the assignment solution.
4. Read the given set of questions and solve them by writing queries using MySQL.
5. Add the queries using MySQL commands inside notesdb.sql 
6. Execute the queries in MySQL workbench to view the expected results.
7. Zip the solution code with the same name as the assignment name.  
8. Upload the zipped solution for submission. 

### Test Code

1. Run the test scripts available under `test` by giving the `npm run test` command in the terminal to test locally.
# keepnotes
