const User = require('../models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');


process.env.SECRET_KEY = 'secret'


exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}


exports.register = (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role_id: 4,
        created: today
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json('Warning: User already exists')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}


exports.profile = (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}


exports.sendMail = (req, res) => {

    const output = `
        <p> Thank you for registering on our website</p>
        <h3> Contact Details</h3> 
        <ul>
            <li> Your First Name is: ${req.body.first_name}</li>
            <li>Your Last Name is: ${req.body.last_name}</li>
            <li>Your email is: ${req.body.email}</li>
            <li>Your Password is: ${req.body.password}</li>
        </ul>`;

    //create reusable transporter object using the default SMTP transport 
    let transport = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 587,
        secure: false, //true for 465, false for other ports
        auth: {
            user: 'ramicmujo@hotmail.com',
            pass: 'mujo258/'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Nodemailer Contact" ',
        to: req.body.email,
        subject: 'Your login details',
        text: "Your login informations",
        html: output
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', { msg: 'Email has been sent' });
    });
    ;
}


exports.submitProfile = (req, res) => {

    let id = req.body.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let role_id = req.body.role_id;

    let qry = "UPDATE `users` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name
        + "', `email` = '" + email + "', `password` = '" + password + "', `role_id` = '" + role_id + "' WHERE `users`.`id` = " + id;

    db.query(qry, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
}

exports.getUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

exports.getUser = (req, res) => {console.log("BLA")
    let id = req.params.id;

    User.findOne({
        where: {
            id: id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}