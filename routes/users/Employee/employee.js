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

    console.log(userData, "EMPLOYEE DATA")

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
                    console.log("employee created...");
                })
            });
        }else {
            res.send("employee already exist...");
            console.log("employee already exist...");
        }
    });
});

employee.get('/login', (req, res) => {
    let find = `SELECT password, employee_id FROM employee WHERE email = "${req.body.email}"`;
    
    db.query(find, (err, result) => {
        if(err) console.log(err);
        console.log(result);

        if(result[0] != undefined) {
            if(bcrypt.compareSync(req.body.password, result[0].password)) {
                let token = jwt.sign(result[0].employee_id, process.env.SECRET_KEY);
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
    let employee_id = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    
    let employee = `SELECT * FROM employee WHERE employee_id = ${employee_id}`;
    db.query(employee, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

employee.post('/assign_doctor', (req, res) => {
    const data = {
        patient_email: req.body.patient_id,
        doctor_email: req.body.doctor_id
    };

    
    const patient_sql = `SELECT patient_id FROM patient WHERE email = "${data.patient_email}"`;
    const doctor_sql = `SELECT doctor_id FROM doctors WHERE email = "${data.doctor_email}"`;
    
    db.query(patient_sql, (patient_sql_err, patient_sql_row) => {

        if(patient_sql_err) console.log(patient_sql_err);

        if(patient_sql_row[0] != undefined) {
            patient_id = patient_sql_row[0].patient_id;

            db.query(doctor_sql, (doctor_sql_err, doctor_sql_row) => {

                if(doctor_sql_err) console.log(doctor_sql_err);
                
                if(doctor_sql_row[0] != undefined) {
                    doctor_id = doctor_sql_row[0].doctor_id;
    
                    const assign_sql = `SELECT * FROM assign_doctor WHERE patient_id = "${patient_id}"`;
                    
                    db.query(assign_sql, (err1, result1) => {
                        if(err1) console.log(err1);
                
                        if(result1[0] == undefined) {
                            const create = `INSERT INTO assign_doctor (patient_id, doctor_id) 
                                            VALUES ( "${patient_id}","${doctor_id}")`
                            db.query(create, (err2, result2) =>{
                                if(err2) console.log(err2);
                                res.send("Yes   ")
                                console.log("patient assigned...");
                            })
                        }else {
                            res.send("already exist...");
                            console.log("patient already assigned...");
                        }
                    });

                }else {
                    res.send("doctor doesn't exist...");
                    console.log("doctor doesn't exist...");
                }

            });

        }else {
            res.send("patient doesn't exist...");
            console.log("patient doesn't exist...");
        }

    });
    
    

});

employee.post('/bill', (req, res) => {
    const data = {
        patient_email: req.body.patient_email,
        medicine_cost: req.body.medicine_cost,
        room_charge: req.body.room_charge,
        misc_charge: req.body.misc_charge,
        operation_charge: req.body.operation_charge,
    }

    const sql = `SELECT * FROM patient WHERE email = "${data.patient_email}"`;

    db.query(sql, (err1, result1) => {
        if(err1) console.log(err1);

        if(result1[0] !== undefined) {
            
            patient_id = result1[0].patient_id;
            console.log(patient_id);

            const update = `UPDATE bill SET
                            medicine_cost = medicine_cost + ${data.medicine_cost},
                            operation_charge = operation_charge + ${data.operation_charge},
                            room_charge = room_charge + ${data.room_charge},
                            misc_charge = misc_charge + ${data.misc_charge}
                            WHERE patient_id = ${patient_id}`

            db.query(update, (err2, result2) =>{
                if(err2) console.log(err2);
                res.send("Yes");
                console.log("Bill generated...");
            })
        }else {
            res.send("already exist...");
        }
    })
});



module.exports = employee;