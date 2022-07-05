var express = require('express');
var router = express.Router();

import controller from './controller';

// import authenticator from '../helper/auth';


router.post('/add', (req, res, next) => {
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});


router.post('/pitchIdea', (req, res, next) => {
    return controller.update(req)
        .then((success) => (res.status(200).json({ message: 'idea submitted.' })))
        .catch((err) => next(err));
});

router.get('/getComments', (req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/updateStatus', (req, res, next) => {
    return controller.updateStatus(req).then((response) => {
        return res.status(200).json({ message: 'status updated.' });
    }).catch((err) => {
        next(err);
    });
});


module.exports = router;