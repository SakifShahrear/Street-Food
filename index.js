import OracleDB from "oracledb";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import forgetRoute from './project/Routes/forget.js';

OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "project")));

const loginFilePath = path.join(__dirname, "project", "html", "login2.html");

console.log("Login File Path:", loginFilePath);
app.use('/forget', forgetRoute);

app.get("/login", (req, res) => {
  res.sendFile(loginFilePath);
});

app.post("/login", async (req, res) => {
  let connection;
  try {
    connection = await OracleDB.getConnection({
      user: "system",
      password: "12688",
      connectString: "localhost:1521/orcl",
    });

    const { email, password } = req.body;

    if (email && password) {
      try {
        const result = await connection.execute(
          `SELECT PASSWORD FROM MEMBERS WHERE USER_ID = :email`,
          [email]
        );

        if (result.rows.length > 0) {
          const storedPassword = result.rows[0].PASSWORD;

          if (storedPassword === password) {
            res.status(200).send("Login successful");
          } else {
            res.status(401).send("Invalid email or password");
          }
        } else {
          res.status(401).send("Invalid email or password");
        }
      } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal server error");
      }
    } else {
      res.status(400).send("Invalid form data");
    }
  } catch (err) {
    console.error("Error connecting to the database", err);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Connection closed.");
      } catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
