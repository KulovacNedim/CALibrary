let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

let controller = require('../controllers/file.controller.js');


router.post('/api/file/upload', upload.single("file"), controller.uploadFile);
 
router.get('/api/file/:filename', controller.downloadFile);

 
module.exports = router;