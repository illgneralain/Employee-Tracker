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
          "Terminate"
        ]
      })
      .then(function(res) {
        switch (res.runSearch) {
        case "Add Employee":
          addEmployee();
          break;
  
        case "Add role":
          addRole();
          break;
  
        case "Add department":
          addDept();
          break;
  
        case "View all employees":
          employeeView();
          break;
  
        case "Remove employee":
          removeEmployee();
          break;

          case "View all roles":
          viewRoles();
          break;
  
        case "Update Employee Role":
          updateEmployeeRole();
          break;
  
        case "View all departments":
          departmentView();
          break;

          case "Terminate":
          connection.end();
          break;
        }
      });
  }
  
  // function to handle posting new employees
function addEmployee() {
    console.log("inserting a new employee.\n");
    // prompt for info about new employee
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "First Name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "Last Name?"
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the employee's role?",
          choices: [1, 2, 3]
        },
        {
          name: "manager_id",
          type: "input",
          message: "Who is their manager?"
        }
    ])
        //   validate: function(value) {
        //     if (isNaN(value) === false) {
        //       return true;
        //     }
        //     return false;
        //   }
        // }
   //   ])

      .then(function(res) {
        // when finished prompting, insert a new item into the db with that info
        var query = connection.query(
            "INSERT INTO employees SET ?",
            {
              flavor: "Rocky Road",
              price: 3.0,
              quantity: 50
            },
            function(err, res) {
              if (err) throw err;
            console.log("Employee successfully added!\n");
            // re-prompt the user
            runSearch();
          }
        );
      });
  }