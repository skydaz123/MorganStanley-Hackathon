const express = require('express')
const router = express.Router()

router.route('/user')
    .get((req, res) => {
        res.send("user")
    })
    .post((req, res) => {
        res.send("post")
    })
    .put((req, res) => {
        res.send("ye")
    }).
    delete((req, res) => {
        res.send('delete')
    })

module.exports = router