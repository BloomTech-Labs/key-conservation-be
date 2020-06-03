const express = require('express');
const log = require('../../logger');

const router = express.Router();

// const Users = require('../../database/models/usersModel');
// const Reports = require('../../database/models/reportModel');
// const Connections = require('../../database/models/connectionsModel');
// const ApplicationSubmission = require('../../database/models/applicationSubmissionsModel');

const Notifications = require('../../database/models/notificationsModel'); // This is out notifications model. We use this to interact with the DB.

const S3Upload = require('../../middleware/s3Upload');
const restricted = require('../../middleware/authJwt.js');
const { checkConnection, checkUniqueIds } = require('../../middleware/connections');

/* ENDPOINTS

    '/:UID' - This is a GET endpoint. It fetches ALL of the users notifications.
    '/:UID/:NID' - This is a GET endpoint. It fetches a specific notification.
    '/:ID' - This is a PUT endpoint. It sets the provided notifications as READ.
    '/:ID' - This is a DELETE endpoint. It deletes the provided notification.
    '/all/' - This is a PUT endpoint. It marks ALL of the users notifications as READ.
    '/all/' - This is a DELETE endpoint. It deletes ALL of the users notifications.
    '/' - This is a POST endpoint. It creates a new notification.

*/

router.get('/:UID', async (req, res) => {

    let notifications = await Notifications.get(req.params.UID);

    if (notifications)
        res.status(200).json({ notifications, message: notifications.length + ' notifications were found' });
    else
        res.status(400).json({ message: 'No notifications were found in the database' });

});

// router.get('/', restricted, async (req, res) => {

//     try {

//         let notifications = await Notifications.get(req.body.user_ID);

//         if (notifications) 
//             res.status(200).json({ notifications, message: notifications.length + ' notifications were found' });
//         else
//             res.status(400).json({ message: 'No notifications were found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }

// });

router.get('/:UID/:NID', async (req, res) => {

    try {

        let notification = await Notifications.getByID(req.params.UID, req.params.NID);

        if (notification) 
            res.status(200).json({ notification, message: 'Notification found' });
        else
            res.status(400).json({ message: 'No notification found in the database' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    }

});

// router.get('/:UID/:NID', restricted, async (req, res) => {

//     try {

//         let notification = await Notifications.getByID(req.params.UID, req.params.NID);

//         if (notification) 
//             res.status(200).json({ notification, message: 'Notification found' });
//         else
//             res.status(400).json({ message: 'No notification found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }

// });

router.put('/', async (req, res) => {

    try {

        let notification = await Notifications.mark(req.body.userID, req.body.notifID);

        if (notification) 
            res.status(200).json({ notification, message: 'Notification updated' });
        else
            res.status(400).json({ message: 'No notification found in the database' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    }   

});

// router.put('/', restricted, async (req, res) => {

//     try {

//         let notification = await Notifications.mark(req.body.user_ID, req.body.notifID);

//         if (notification) 
//             res.status(200).json({ notification, message: 'Notification updated' });
//         else
//             res.status(400).json({ message: 'No notification found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }   

// });

router.delete('/', async (req, res) => {

    try {

        let success = await Notifications.deleteByID(req.body.userID, req.body.notifID);

        if (success === 1) 
            res.status(200).json({ message: 'Notification deleted' });
        else
            res.status(400).json({ message: 'No notification found in the database' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    }  

});

// router.delete('/', restricted, async (req, res) => {

//     try {

//         let success = await Notifications.deleteByID(req.body.user_ID, req.body.notifID);

//         if (success === 1) 
//             res.status(200).json({ notification, message: 'Notification deleted' });
//         else
//             res.status(400).json({ message: 'No notification found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }  

// });

router.put('/all', async (req, res) => {

    try {

        let notifications = await Notifications.markAll(req.body.userID);

        if (notifications) 
            res.status(200).json({ message: 'Notifications updated' });
        else
            res.status(400).json({ message: 'No notifications found in the database' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    } 

});

// router.put('/all', restricted, async (req, res) => {

//     try {

//         let notifications = await Notifications.markAll(req.body.userID);

//         if (notifications) 
//             res.status(200).json({ message: 'Notifications updated' });
//         else
//             res.status(400).json({ message: 'No notifications found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     } 

// });

router.delete('/all', async (req, res) => {

    try {

        let success = await Notifications.deleteAll(req.body.userID);

        if (success >= 1) 
            res.status(200).json({ message: success + ' notifications deleted' });
        else
            res.status(400).json({ message: 'No notifications found in the database' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    }  

});

// router.delete('/all', restricted, async (req, res) => {

//     try {

//         let success = await Notifications.deleteAll(req.body.user_ID, req.params.ID);

//         if (success === 1) 
//             res.status(200).json({ notification, message: 'Notifications deleted' });
//         else
//             res.status(400).json({ message: 'No notifications found in the database' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }  

// });

router.post('/', async (req, res) => {

    try {

        let notification = await Notifications.create(req.body);

        if (notification) 
            res.status(200).json({ message: 'Notification created succesfully' });
        else
            res.status(400).json({ message: 'There was a problem creating the notification' });

    } catch (err) {

        log.error(err);
        res.status(500).json({ err, message: 'Unable to make request to server' });

    }

});

// router.post('/', restricted, async (req, res) => {

//     try {

//         let notification = await Notifications.create(req.body);

//         if (notification) 
//             res.status(200).json({ message: 'Notification created succesfully' });
//         else
//             res.status(400).json({ message: 'There was a problem creating the notification' });

//     } catch (err) {

//         log.error(err);
//         res.status(500).json({ err, message: 'Unable to make request to server' });

//     }

// });

module.exports = router;