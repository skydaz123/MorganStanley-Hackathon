const express = require('express')
const router = express.Router()

router.route('/map')
    .get((req, res) => {
        res.send("map")
    })
    .post((req, res) => {
        res.send("post")
    })
    .put((req, res) => {
        res.send("ye")
    })

module.exports = router