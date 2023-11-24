const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employee = express.Router();

const db = require('../../../utils/db');

process.env.SECRET_KEY = 'Arijit';

employee.post('/register', (req, res) => {

    const userData = {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email,
        designation : req.body.designation,
        address     : req.body.address,
        salary      : req.body.salary,
        password    : req.body.password
    }

    let find = `SELECT * FROM employee WHERE email = "${userData.email}"`;

    db.query(find, (err1, result1) => {
        if(err1) console.log(err1);
        console.log(result1[0]);

        if(result1[0] == undefined) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                
                let create = `INSERT INTO employee (first_name, last_name, email, designation, address, salary, password)
                              VALUES ( "${userData.first_name}", 
                                       "${userData.last_name}", 
                                       "${userData.email}",
                                       "${userData.designation}", 
                                       "${userData.address}", 
                                       "${userData.salary}", 
                                       "${userData.password}")`;

                db.query(create, (err2, result2) => {
                    if(err2) console.log(err2);
                    res.send("Created Database ooooooooooooohhhhhh");
                })
            });
        }else {
            res.send("user already exist...");
        }
    });
});

employee.get('/login', (req, res) => {
    let find = `SELECT password, user_id FROM employee WHERE email = "${req.body.email}"`;
    
    db.query(find, (err, result) => {
        if(err) console.log(err);
        console.log(result);

        if(result[0] != undefined) {
            if(bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign(result[0].user_id, process.env.SECRET_KEY);
                res.send(token);
            } else {
                res.send('Password incorrect');
            }
        } else {
            res.send("Email not found");
        }
    });
});

employee.get('/profile', (req, res) => {
    let user_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
    let user = `SELECT * FROM employee WHERE user_id = ${user_id}`;
    db.query(user, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});


module.exports = employee;