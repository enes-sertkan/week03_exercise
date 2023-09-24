// index.js

// Import the employees array from the employee module
const employees = require('./Employee'); // Make sure the path is correct

// Now, you can use the employees array in this file
console.log(employees);

// Import the 'http' module
var http = require("http");

// Print a message to the console
console.log("Lab 03 - NodeJs");

// Define the server's port number
const port = process.env.PORT || 8081;

// Create a web server using the 'http' module
const server = http.createServer((req, res) => {
    // Check if the request method is not GET
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            // Respond with a welcome message in HTML format
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        }

        if (req.url === '/employee') {
            // Respond with the list of employees in JSON format
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            // Extract first names and last names, sort them, and respond in JSON format
            const employeeNames = employees.map((employee) => {
                return `${employee.firstName} ${employee.lastName}`;
            });

            employeeNames.sort();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employeeNames));
        }

        if (req.url === '/employee/totalsalary') {
            // Calculate the total salary of all employees and respond in JSON format
            const totalSalary = employees.reduce((acc, employee) => {
                return acc + employee.salary;
            }, 0);

            const response = { total_salary: totalSalary };

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
        }
    }

    // If the response hasn't been sent by this point, respond with a 404 error
    if (!res.finished) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
    }
});

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});