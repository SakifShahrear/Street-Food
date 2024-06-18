const express = require('express');
const router = express.Router();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
const { Console } = require('console');
const https = require('https');
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const requirelogin = require('./requirelogin_middleware');
const OracleDB = require('oracledb');

const dbConfig = require('./dbConfig');
const { constrainedMemory } = require('process');

let foodData = [
  {
    F_id: '1',
    name: 'Fushka',
    price: '12.00 Tk',
    imageUrl: '../img/food Item/b01fa4c9920d42df9ef472fd4f8e6fda.jpg',
  },
  {
    F_id: '2',
    name: 'Jhalmuri',
    price: '10.00 TK',
    imageUrl: '../img/food Item/Rectangle-1-42-1.webp',
  },
  {
    F_id: '3',
    name: 'Sushi Platter',
    price: '25.00 Tk',
    imageUrl: '../img/food Item/Bhelpuri.webp',
  },
  {
    F_id: '4',
    name: 'Caesar Salad',
    price: '8.00 Tk',
    imageUrl: '../img/food Item/cabrar_faiyaz_niloy12_0.jpg',
  },
  {
    F_id: '5',
    name: 'Pasta Carbonara',
    price: '8.00 Tk',
    imageUrl: '../img/food Item/Bhelpuri.webp',
  },
  {
    F_id: '6',
    name: 'Taco Fiesta',
    price: '9.00 Tk',
    imageUrl: '../img/food Item/b01fa4c9920d42df9ef472fd4f8e6fda.jpg',
  },
  {
    F_id: '7',
    name: 'hemal',
    price: '10',
    imageUrl: '../img/signup.jpeg',
  },
];
/////////////////////////////////dark_mode////////////////////////
router.post('/navbar', (req, res) => {
  req.session.mode = req.body.mode;
  console.log(req.body.mode);
  res.redirect('/vendor');
});

/////////////////////for vendors home page//////////////////////////
router.get('/', requirelogin, (req, res) => {
  const currentPage = req.query.page || 1; // Get current page from query parameter
  console.log(currentPage);
  const itemsPerPage = 6; // Number of items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = foodData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(foodData.length / itemsPerPage);

  // Pass the data to the template
  res.render('vendor_ejs/vendor.ejs', {
    foodData,
    displayedItems,
    totalPages,
    currentPage,
  });
});
/////////////////////for vendor add food //////////////////////////

router.get('/add_food', requirelogin, (req, res) => {
  console.log('it working');
  res.render('vendor_ejs/add_food');
});

router.post(
  '/add_food',
  requirelogin,
  upload.single('image'),
  async (req, res) => {
    // console.log('it working');
    console.log(req.body, req.file);
    const { name, price, rating = 0, ingredient, availability } = req.body;
    console.log(req.body);
    const { path } = req.file;
    let connection;
    try {
      connection = await OracleDB.getConnection(dbConfig);
      const result = await connection.execute(
        'INSERT INTO Food (food_name,price ,rating,ingredient,availability,Food_pic) values(:name,:price,:rating,:ingredient,:availability,:path)',
        { name, price, rating, ingredient, availability, path },
        { autoCommit: true }
      );
      console.log(result);
    } catch (err) {
      console.error(err);
      res.send('datbase is not connected');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }

    // foodData.push({ F_id: uuid(), price, imageUrl: path, originalname });
    req.flash('complete', 'New item is added');
    // console.log(foodData);
    res.redirect('/vendor');
  }
);

/////////////////////for vendor udate food //////////////////////////

router.get('/update/:id', requirelogin, (req, res) => {
  // Handle GET request for /vendor/update/:id
  const id = req.params.id;
  // You might render a form here for editing the vendor information
  const findfoodData = foodData.find((c) => c.F_id === id);

  res.render('vendor_ejs/update_food', { findfoodData });
});

router.patch(
  '/update/:id',
  requirelogin,
  upload.single('image'),
  (req, res) => {
    const { id } = req.params;

    let findfoodData = foodData.findIndex((c) => c.F_id === id);

    const { F_id, name, price } = req.body;
    console.log(req.body);
    const { path, originalname } = req.file;
    const newfoodData = { F_id, name, price, imageUrl: path, originalname };
    console.log(newfoodData);
    foodData[findfoodData] = newfoodData;
    req.flash('foodupdated', 'Food item updated successfully!');

    res.redirect('/vendor');
  }
);

/////////////////////for vendor email//////////////////////////
router.get('/email', requirelogin, (req, res) => {
  res.render('vendor_ejs/email');
});

router.post('/email', async (req, res) => {
  const nodemailer = require('nodemailer');
  console.log(req.body);
  const { email_id, email_text } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.Email_host,
    port: process.env.Email_host,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.Email_username,
      pass: process.env.Email_password,
    },
  });
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.Email_username, // sender address (must match the authenticated user)
      to: email_id, // list of receivers
      subject: 'Forgot Password', // Subject line
      text: `Your forget code is: ${uuid()} ${email_text}`, // plain text body
      // html: undefined, // Set HTML body if needed
    });

    console.log('Message sent: %s', info.messageId);
    req.flash('sendemail', 'Thank you, your email has been submitted to Admin');
    return res.redirect('/vendor');
  } catch (error) {
    console.error(error);
    req.flash(
      'sendemail',
      'There was an error sending your email. Please try again.'
    );
    return res.redirect('/vendor');
  }
});
//////////////////////////////////////add food//////////////////////
router.get('/add_food', requirelogin, (req, res) => {
  console.log('it working');
  res.render('vendor_ejs/add_food');
});

router.post('/add_food', requirelogin, upload.single('image'), (req, res) => {
  console.log('POST /add_food');
  console.log(req.body, req.file);

  if (!req.file) {
    req.flash('error', 'File not uploaded');
    return res.redirect('/vendor/add_food');
  }

  // The URL of the uploaded image
  const imageUrl = req.file.path; // or req.file.path (depending on multer-storage-cloudinary version)
  console.log(`Image URL: ${imageUrl}`);

  const { name, price } = req.body;
  foodData.push({ F_id: uuid(), name, price, imageUrl });

  req.flash('complete', 'New item is added');
  res.redirect('/vendor');
});

//////////////////////////////////vendor profile////////////////////////////
router.get('/profile', requirelogin, (req, res) => {
  res.render('vendor_ejs/vendor_profile');
});
//////////////////////////////////vendor logout/////////////////////////////
router.post('/logout', requirelogin, (req, res) => {
  req.session.user_id = null;
  req.flash('logout', 'successfully logout');
  res.redirect('/home');
});
/////////////////////////////////export Router/////////////////////////////
module.exports = router;
