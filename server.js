var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
const db = require(".");


const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "!llgnerAlain15",
    database: "employee_DB"
});

connection.connect(function (err) {
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
        .then(function (res) {
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
        
        //   validate: function(value) {
        //     if (isNaN(value) === false) {
        //       return true;
        //     }
        //     return false;
        //   }
        // }
          ])

        .then(function (res) {
            // when finished prompting, insert a new item into the db with that info
            var query = connection.query(
                "INSERT INTO employees SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee successfully added!\n");
                    // re-prompt the user
                    runSearch();
                }
            );
        });
}

function employeeView() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        runSearch();
    });
}
function removeEmployee() {
   var employeeList = [];
    connection.query(
      "SELECT employees.first_name, employees.last_name FROM employees", (err, res) => {
          for (var i = 0; i < res.length; i++)
      {
        employeeList.push(res[i].first_name + "" + res[i].last_name);
      }
inquirer
.prompt ([
    {
        name: "employee",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: employeeList
    },
])
    .then(function(res){
        var query = connection.query(
            `DELETE FROM employees WHERE concat(first_name, ' ',last_name) = '${res.employee}'`,
            function (err, res) {
                if (err) throw err;
                console.log("Employee removed!\n");
                // re-prompt the user
                runSearch();
    });
    });
    }
);
};

function addDept(){
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What Department would you like to add?"
            },
        ])
        .then(function (res) {
            console.log(res)
            // when finished prompting, insert a new item into the db with that info
            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: res.deptName
                },
                function (err, res) {
                   connection.query("SELECT * FROM departments", function(err, res){
                       console.table(res);
                       runSearch();
                   })
                }
            )
        })
    }

function departmentView(){
    connection.query ("SELECT * FROM departments", function(err, res){
        console.table(res);
        runSearch();
    })
}

function addRole() {
    var departments = [];
     connection.query(
       "SELECT * FROM departments", function(err, res){
       if(err) throw err;
        for (var i = 0; i < res.length; i++)
       {
           res[i].first_name + " " + res[i].last_name
         departments.push({name: res[i].name, value: res[i].id});
       }
 inquirer
 .prompt ([
     {
         name: "title",
         type: "input",
        message: "What role would you like to add?",
     },
     {
        name: "salary",
        type: "input",
       message: "What is the salary for this role?",
    },
    {
        name: "department",
        type: "list",
       message: "Which department?",
       choices: departments
    }
 ])
     .then(function(res){
         var query = connection.query(
             "INSERT INTO roles SET ?", 
             {
                 title: res.title,
                 salary: res.salary,
                 department_id: res.department
             },
             function (err, res) {
                 if (err) throw err;
                 // re-prompt the user
                 runSearch();
     }
     )
    })
})
}

function viewRoles(){
    connection.query("SELECT roles.*, departments.name FROM roles LEFT JOIN departments ON departments.id = roles.department_id", function(err, res){
        console.table(res);
        runSearch();
    })
}

function updateEmployeeRole(){
    connection.query("SELECT first_name, last_name, id FROM employees",
    function(err, res){
        var employees = res.map(employee => ({name: employee.first_name + "" + employee.last_name, value: employee.id}))
        
inquirer
 .prompt ([
     {
         name: "employeeName",
         type: "list",
        message: "Which employee's role would you like to update??",
        choices: employees
     },
     {
        name: "role",
        type: "input",
       message: "What is your new role?",
    }

 ])
 .then(function(res){
     connection.query(`UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employeeName} `,
     function (err, res){
         console.log(res);
         runSearch()
     }
     );
})
    }
    )
}