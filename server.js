var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password123",
  database: "employee-tracker"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add employee",
          "Add role",
          "Add department",
          "View all employees",
          "Remove employee",
          "View all roles",
          "Update Employee Role",
          "View all departments",
          "Exit"
        ]
      })
      .then(function(res) {
        switch (res.runSearch) {
        case "Add Employee":
          artistSearch();
          break;
  
        case "Find all artists who appear more than once":
          multiSearch();
          break;
  
        case "Find data within a specific range":
          rangeSearch();
          break;
  
        case "Search for a specific song":
          songSearch();
          break;
  
        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
        }
      });
  }
  