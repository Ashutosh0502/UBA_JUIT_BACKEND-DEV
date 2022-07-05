var express = require('express');
var router = express.Router();

import controller from './controller';

// import authenticator from '../helper/auth';
import upload from '../helper/upload';

router.post('/add',
    upload.saveImage, (req, res, next) => {
        return controller.add(req).then((result) => {
            return res.status(200).json({ data: result });
        }).catch((err) => next(err));
    });

router.post('/delete', (req, res, next) => {
    return controller.delete(req.body.id)
        .then((success) => res.status(200).send({ message: 'gallery deleted' }))
        .catch((err) => next(err));
});

router.get('/getAll', (req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});


module.exports = router;