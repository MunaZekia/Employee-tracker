const inquirer = require("inquirer");
const connector = require("./connector");
const mysql = require("mysql2");

connector.connect((err) => {
  if (err) throw err;
  console.log("connected");
  promptForemployee();
});

function promptForemployee() {
  //while (true) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.choice == "view all departments") {
        promptForViewAllDepartments();
      } else if (answer.choice == "view all roles") {
        promptForViewAllroles();
      } else if (answer.choice == "view all employees") {
        promptForViewAllEmployees();
      } else if (answer.choice == "add a department") {
        promptForAddADepartment();
      } else if (answer.choice == "add a role") {
        promptForaddARole();
      } else if (answer.choice == "add an employee") {
        promptForaddAnEmployee();
      } else if (answer.choice == "update an employee role") {
        promptForUpdateAnEmployeeRole();
      } else {
        return;
      }
    });

  //}
}
function promptForViewAllDepartments() {
  let sql = "SELECT * FROM department";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    promptForemployee();
  });
}
function promptForViewAllroles() {
  const sql =
    "SELECT role.ID, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    promptForemployee();
  });
}
function promptForViewAllEmployees() {
  const sql =
    "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name,' ', m.last_name) AS manager FROM employee e JOIN role r On e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    promptForemployee();
  });
}
function promptForAddADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "what is the name of the department?",
      },
    ])
    .then(function (answer) {
      let sql = "INSERT INTO department (name) VALUES (?)";
      connector.query(sql, answer.departmentName, function (err, res) {
        if (err) throw err;
        console.log("added " + answer.departmentName + " to the datab`as`e");
        promptForemployee();
      });
    });
}

function promptForaddARole() {
  sql = "SELECT * FROM department";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    const departmentchoices = res.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "RoleName",
          message: "what is the name of the role?",
        },
        {
          type: "input",
          name: "RoleSalary",
          message: "what is the salary of the role?",
        },
        {
          type: "list",
          name: "departmentID",
          message: "which department does the role belong to",
          choices: departmentchoices,
        },
      ])
      .then(function (answer) {
        let sql =
          "INSERT INTO role (title, salary, department_id)  VALUES (?,?,?)";
        connector.query(
          sql,
          [answer.RoleName, answer.RoleSalary, answer.departmentID],
          function (err, res) {
            if (err) throw err;
            console.log("added " + answer.RoleName + " to the database");
            promptForemployee();
          }
        );
      });
  });
}
function promptForUpdateAnEmployeeRole() {
  sql = "SELECT id, concat(first_name,' ', last_name) AS name FROM employee";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    const employeechoices = res.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    sql = "SELECT id, title FROM role";
    connector.query(sql, function (err, res) {
      if (err) throw err;
      const rolechoices = res.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeID",
            message: "which employee do you want to update?",
            choices: employeechoices,
          },
          {
            type: "list",
            name: "roleID",
            message: "which role do you want to assign the selected employee?",
            choices: rolechoices,
          },
        ])
        .then(function (answer) {
          let sql = "UPDATE employee SET role_id = ? WHERE id = ?";
          connector.query(
            sql,
            [answer.roleID, answer.employeeID],
            function (err, res) {
              if (err) throw err;
              console.log("Updated employee role ");
              promptForemployee();
            }
          );
        });
    });
  });
}

function promptForaddAnEmployee() {
  sql = "select null as id, 'none' as name union SELECT id, concat(first_name,' ', last_name) AS name FROM employee";
  connector.query(sql, function (err, res) {
    if (err) throw err;
    const employeechoices = res.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    sql = "SELECT id, title FROM role";
    connector.query(sql, function (err, res) {
      if (err) throw err;
      const rolechoices = res.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "what is the first name of the employee?",
          },
          {
            type: "input",
            name: "lastName",
            message: "what is the last name of the employee?",
          },

          {
            type: "list",
            name: "roleID",
            message: "what is the employee's role?",
            choices: rolechoices,
          },
          {
            type: "list",
            name: "employeeID",
            message: "who is the employee's manager?",
            choices: employeechoices,
          },
        ])
        .then(function (answer) {
          const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
          connector.query(
            sql,
            [answer.firstName,answer.lastName, answer.roleID, answer.employeeID],
            function (err, res) {
              if (err) throw err;
              console.log("added " + answer.firstName + " "+ answer.lastName + " to the employee tracker database ");
              promptForemployee();
            }
          );
        });
    });
  });
}
