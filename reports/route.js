var express = require('express');
var router = express.Router();

var controller = require('./controller');

// const authenticator = require('../helper/auth');
import upload from '../helper/upload';

router.post('/uploadReport',
    upload.saveImage, (req, res, next) => {
        return controller.uploadReport(req).then((result) => {
            return res.status(200).json({ data: result });
        }).catch((err) => next(err));
    });


router.get('/getAllReports', (req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/deleteReport', (req, res, next) => {
    return controller.deleteReport(req.body.id)
        .then((success) => res.status(200).send({ message: 'report deleted' }))
        .catch((err) => next(err));
});




module.exports = router;
