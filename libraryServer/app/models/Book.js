const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'book',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        publishingYear: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        numberOfCopies: {
            type: Sequelize.INTEGER,
        },
        content: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)
