const Book = require('../models/Book')

exports.getBooks = (req, res) => {

    Book.findAll()
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

exports.editBook = (req, res) => {

    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;
    let subject = req.body.subject;
    let publishingYear = req.body.publishingYear;
    let type = req.body.type;

    let editBookQuery = "UPDATE `books` SET `name` = '" + name + "', `author` = '" + author
        + "', `subject` = '" + subject + "', `publishingYear` = " + publishingYear + ", `type` = '" + type + "' WHERE `books`.`id` = " + id;

    db.query(editBookQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
}


exports.registerBook = (req, res) => {
    const bookData = {
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        publishingYear: req.body.publishingYear,
        type: req.body.type,
        publisherID: req.body.publisherID,
        numberOfCopies: req.body.numberOfCopies,
        content: req.body.content,
        created_by: req.body.created_by
    }

    Book.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(book => {
            if (!book) {
                Book.create(bookData)
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json('Warning: Book already exists')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}


exports.deleteBook = (req, res) => {
    let bookID = req.params.id;
    let deleteBookQuery = "DELETE  from `books` WHERE `id` = " + bookID;
    console.log(deleteBookQuery);
    db.query(deleteBookQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
}


exports.deleteSelectedBooks = (req, res) => {
    let idsArray = req.body;

    let qry = "DELETE  from `books` WHERE `id` IN(" + idsArray + ")";

    db.query(qry, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send(result);

    });
}