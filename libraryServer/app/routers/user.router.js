let express = require('express');
let router = express.Router();


let controller = require('../controllers/user.controller.js');


router.post('/login', controller.login);

router.post('/register', controller.register);

router.get('/profile', controller.profile);

router.post('/sendMail', controller.sendMail);

router.post('/submitProfile', controller.submitProfile)

router.get('/getUsers', controller.getUsers)

router.get('/getUser/:id', controller.getUser)

 
module.exports = router;