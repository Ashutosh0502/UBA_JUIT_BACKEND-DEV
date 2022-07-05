var express = require('express');
var router = express.Router();
import { ROLES } from './const';

var controller = require('./controller');

// const authenticator = require('../helper/auth');
import upload from '../helper/upload';


router.post('/sign-up', (req, res, next) => {
    if (req.body.role && req.body.role.toLowerCase() === ROLES[0].toLowerCase()) return res.status(401).json({ data: 'can not create admin' });
    next();
},
    upload.saveImage, (req, res, next) => {
        return controller.add(req).then((result) => {
            return res.status(200).json({ data: result });
        }).catch((err) => next(err));
    });

router.post('/login', (req, res, next) => {
    return controller.validate(req.body).then((response) => {
        return res.status(200).json({ data: response });
    }).catch((err) => {
        next(err);
    });
});

router.post('/sign-out', (req, res, next) => {
    return controller.logOut(req.body.id).then((response) => {
        return res.status(200).json({ message: 'logout succesfully' });
    }).catch((err) => {
        next(err);
    });
});

router.post('/sendForgetEmail', (req, res, next) => {
    return controller.sendForgetEmail(req.body).then((response) => {
        return res.status(200).json({ data: response });
    }).catch((err) => {
        next(err);
    });
});

router.post('/changePassword', (req, res, next) => {
    return controller.changePassword(req.body).then((response) => {
        return res.status(200).json({ message: 'password changed' });
    }).catch((err) => {
        next(err);
    });
});

router.post('/update', upload.saveImage, (req, res, next) => {
    return controller.update(req)
        .then((success) => (res.status(200).json({ message: 'profile is successfully updated' })))
        .catch((err) => next(err));
});

router.post('/delete', (req, res, next) => {
    return controller.delete(req.body.id)
        .then((success) => res.status(200).send({ message: 'member deleted' }))
        .catch((err) => next(err));
});

router.get('/getUbaMembers', (req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});



module.exports = router;