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
    password: "",
    database: "tracker_db"
  });
  
  // connect to the mysql server and sql database
connection.connect(function(err) {
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
            "Add department.", 
            "Add role.", 
            "Add employee.", 
            "View department.", 
            "View role.", 
            "View employee.", 
            "Update department.", 
            "Update role.", 
            "Update employee."
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the propper functions
        if (answer.toDo === "") {
          addDepartment();
        }
        else if(answer.toDo === "") {
          addRole();
        } else{
          connection.end();
        }
      });
  }