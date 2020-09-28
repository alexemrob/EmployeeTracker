var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "#PayRent22",
  database: "tracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "toDo",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "Add Employee",
        "Add Department",
        "Add Role",
        "View Employees",
        "View Departments",
        "View Roles",
        "Update Employee Role",
        "END"
      ],
      name: "choice"
    })
    .then(function (answers) {
      switch (answers.choice) {
        // based on their answer, either call the propper functions
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "END":
          connection.end()
          break;
      }
    });
}

//"Add Employee" / CREATE: INSERT INTO
// Make an employee array

function addEmployee() {
  console.log("Inserting an employee!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role id?"
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's id?"
      }
    ])
    .then(function (answers) {
      console.log(answers)
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.roleId,
          manager_id: answers.managerId
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows);


          start();
        })

    });
}

function addDepartment() {

}

function addRole() {
  // console.log("Inserting an role!");
  // inquirer
  //   .prompt([
  //     {
  //       type: "input",
  //       name: "first_name",
  //       message: "What is the employee's first name?"
  //     },
  //     {
  //       type: "input",
  //       name: "last_name",
  //       message: "What is the employee's last name?"
  //     },
  //     {
  //       type: "input",
  //       name: "roleId",
  //       message: "What is the employee's role id?"
  //     },
  //     {
  //       type: "input",
  //       name: "managerId",
  //       message: "What is the manager's id?"
  //     }
  //   ])
  //   .then(function (answers) {
  //     console.log(answers)
  //     connection.query("INSERT INTO employee SET ?",
  //     {
  //       first_name: answers.first_name,
  //       last_name: answers.last_name,
  //       role_id: answers.roleId,
  //       manager_id: answers.managerId
  //     },
  //     function(err, res) {
  //       if (err) throw err;
  //       console.log(res.affectedRows);


  //       start();
  //     })

  //   });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  })

}

function viewDepartments() {

}

function viewRoles() {

}

function updateRole() {

  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.log(res)
    var roles = [];
    for (var i = 0; i < res.length; i++) {
      roles.push(res[i].title)
    }
    inquirer
      .prompt([
        {
          name: "roleChange",
          type: "list",
          message: "What role would you like to update?",
          choices: roles
        },
        {
          name: "updatedRoleName",
          type: "input",
          message: "What would you like this role to be called?"
        },
        {
          name: "updatedRoleSalary",
          type: "input",
          message: "What would you like the salary to be?"
        }
      ])
      .then(function (answers) {
        console.log(answers)
        connection.query("UPDATE role SET ? WHERE ?",
          {
            title: answers.updatedRoleName,
            salary: answers.updatedRoleSalary,
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows);


            start();
          })
      })

  })
}