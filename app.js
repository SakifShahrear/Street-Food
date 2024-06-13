const OracleDB = require('oracledb');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const vendor = require('./Routes/vendor');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'ejs'));
app.set('view engine', 'ejs');

const sessionConfig = {
  secret: 'hey buddy',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
};
app.use(session(sessionConfig));
app.use(flash());

OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.complete = req.flash('complete');
  res.locals.sendemail = req.flash('sendemail');
  next();
});

app.use('/vendor', vendor);

app.get('/home/login', (req, res) => {
  res.render('login_signup_ejs/login');
});

app.post('/home/login', async (req, res) => {
  let connection;
  try {
    connection = await OracleDB.getConnection({
      user: 'system',
      password: '12688',
      connectString: 'localhost:1521/orcl',
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
            req.flash('success', 'Hello from home');
            res.redirect('/home');
          } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/home/login');
          }
        } else {
          req.flash('error', 'Invalid email or password');
          res.redirect('/home/login');
        }
      } catch (error) {
        console.error('Error executing query:', error);
        req.flash('error', 'Internal server error');
        res.redirect('/home/login');
      }
    } else {
      req.flash('error', 'Invalid form data');
      res.redirect('/home/login');
    }
  } catch (err) {
    console.error('Error connecting to the database', err);
    req.flash('error', 'Internal server error');
    res.redirect('/home/login');
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed.');
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
});

app.get('/home', (req, res) => {
  res.render('home/home');
});

app.get('/home/signup', (req, res) => {
  res.render('login_signup_ejs/signup');
});

// app.get('*', (req, res) => {
//   req.flash('error', 'The route is not valid');
//   res.redirect('/home');
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
