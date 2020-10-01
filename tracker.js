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
        "Delete Employee",
        "Delete Department",
        "Delete Role",
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
        case "Delete Employee":
          deleteEmployee()
          break;
        case "Delete Department":
          deleteDepartment()
          break;
        case "Delete Role":
          deleteRole()
          break;
        case "END":
          connection.end()
          break;
      }
    });
}

//"Add Employee" / CREATE: INSERT INTO
// Make an employee array && follow the same for departments and roles

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
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.roleId,
          manager_id: answers.managerId
        },
        function (err, res) {
          if (err) throw err;

          start();
        })

    });
}

function addDepartment() {
  console.log("Inserting a department!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of this department?"
      }
    ])
    .then(function (answers) {
      connection.query("INSERT INTO department SET ?",
        {
          name: answers.name
        },
        function (err, res) {
          if (err) throw err;

          start();
        })

    });
}

function addRole() {
  console.log("Inserting a role!");
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role title?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is this role's salary?"
      },
      {
        type: "input",
        name: "depId",
        message: "What is this role's department id?"
      }
    ])
    .then(function (answers) {
      connection.query("INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.depId
        },
        function (err, res) {
          if (err) throw err;

          start();
        })

    });
}


//"View Employee" / READ: SELECT * FROM
// display sql table && follow the same for departments and roles
function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  })
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  })
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  })
}


//Update employee role
//select desired employee , update role info
function updateRole() {
  inquirer.prompt([
    {
      message: "What is the first name of the employee whose role you wish to update?",
      type: "input",
      name: "name"
    }, {
      message: "What is the updated role id number?",
      type: "number",
      name: "role_id"
    }
  ]).then(function (response) {
    connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name],
    function (err, data) {
      // console.table(data);
      console.log("Role ID successfully updated.")
      start();
    })
  })
}


//"Delete Employee" / DELETE FROM >table< WHERE >row< = ?
// delete selected array item && follow the same for departments and roles
function deleteEmployee() {
  inquirer.prompt([
    {
      message: "What is the first name of the employee you wish to delete?",
      type: "input",
      name: "name"
    }
  ]).then(function (response) {
  connection.query("DELETE FROM employee WHERE first_name = ?", [response.name],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee successfully deleted!\n");
      start();
    })
  })
}

function deleteDepartment() {
  inquirer.prompt([
    {
      message: "What is the name of the department you wish to delete?",
      type: "input",
      name: "name"
    }
  ]).then(function (response) {
  connection.query("DELETE FROM department WHERE name = ?", [response.name],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " department successfully deleted!\n");
      start();
    })
  })
}

function deleteRole() {
  inquirer.prompt([
    {
      message: "What is the title of the role you wish to delete?",
      type: "input",
      name: "title"
    }
  ]).then(function (response) {
  connection.query("DELETE FROM role WHERE title = ?", [response.title],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role successfully deleted!\n");
      start();
    })
  })
}
