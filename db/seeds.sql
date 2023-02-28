INSERT INTO department (name)
VALUES("Finance"),
      ("Engineering"),
      ("Sales"),
      ("Legal");

INSERT INTO role (title,salary,department_id)
VALUES('Account Manager',90000, 01),
      ('Lead Engineer', 120000, 02),
      ('Sales Lead',80000, 03),
      ('Lawyer',85000, 04);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Darius','Lovehall',05,01),
      ('Nina','Mosley',06,02),
      ('Joise','Nichols',07,03),
      ('Savon','Garrison',08,04);

    

