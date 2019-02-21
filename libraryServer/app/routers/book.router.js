let express = require('express');
let router = express.Router();


let controller = require('../controllers/book.controller.js');


router.get('/getBooks', controller.getBooks);

router.post('/editBook', controller.editBook);

router.post('/registerBook', controller.registerBook);

router.get('/deleteBook/:id', controller.deleteBook);

router.post('/deleteSelectedBooks', controller.deleteSelectedBooks);

 
module.exports = router;