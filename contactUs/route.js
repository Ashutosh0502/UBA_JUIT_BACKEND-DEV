var express = require('express');
const authenticator = require('../helper/auth');
var router = express.Router();

var controller = require('./controller');


router.post('/add', (req, res, next) => {
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: "saved" });
    }).catch((err) => next(err));
});


router.get('/getAll', (req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});



module.exports = router;