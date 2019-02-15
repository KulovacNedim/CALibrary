let express = require('express');
let router = express.Router();


let controller = require('../controllers/user.controller.js');


router.post('/login', controller.login);

router.post('/register', controller.register)

router.get('/profile', controller.profile)

 
module.exports = router;