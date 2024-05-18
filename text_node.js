import OracleDB from "oracledb";
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
// Serve static files from the "public" directory
app.use(express.urlencoded({ extended: true }));


OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

async function connectAndQuery() {
    let connection;
    try {
        // Establishing a connection
        connection = await OracleDB.getConnection({
            user: "system",
            password: "12688",
            connectString: "localhost:1521/orcl"
        });

        // Query execution
        const result = await connection.execute(
            ` SELECT password FROM user_credentials WHERE username = 'example_user'`
        );

        console.log("Query Result:", result.rows);
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        // Close the connection
        if (connection) {
            try {
                await connection.close();
                console.log("Connection closed.");
            } catch (error) {
                console.error("Error closing connection:", error);
            }
        }
    }
}

// Use fileURLToPath to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname,'project')));

// Path to the login2.html file
// Construct the path to the login2.html file
const loginFilePath = path.join(__dirname, 'project','html', 'login2.html');

// Output the loginFilePath to verify
console.log('Login File Path:', loginFilePath);

// Serve the login2.html file when the /login route is accessed
app.get('/login', (req, res) => {
    res.sendFile(loginFilePath);
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Process the form data here (e.g., authentication, saving to database, etc.)
    console.log('Form Data:', req.body);

    // Redirect to success page or serve a success HTML file
  
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Call the function to connect and execute the query
connectAndQuery();
