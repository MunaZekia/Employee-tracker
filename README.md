# 12 SQL: Employee Tracker

## Description 

This Employee tracker helps to create interfaces that allow users to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. This is command-line application assist with managing a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Mock-Up

The following video shows an example of the application being used from the command line:


[Untitled_ Feb 27 2023 10_11 PM.webm](https://user-images.githubusercontent.com/117357827/221752260-adbc2c86-559a-45a1-8108-ac4adac25713.webm)

## Usage

MySQL, Inquirer, and Node.js

## Getting started

first the user need to install npm and followed by  npm start. Then the user need to type in node employee.js in the command line, which they will be presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role



## Author

Muna Zeki






