const express = require('express');
const router = express.Router();
const Messages = require('../Service/Messages');
const messages = new Messages();
const {v4: uuid} = require('uuid');

router.get('/messages/', async (req, res) => {
    const messageData = await messages.getMessages()
        .catch((err) => {
            res.status(500);
        });
    const allMessages = await Promise.all(messageData.rows.map(async (row) => {
        const message = await messages.getMessage(row.id)
            .catch((err) => {
                throw err;
            });

        return {
            id: row.id,
            message: message.message,
            topic: message.topic
        }
    }))
        .catch((err) => {
            res.status(500);
        });
    
    res.status(200).send(allMessages);
});

router.put('/message/', async (req, res) => {
    const newMessage = {
        '_id': uuid(),
        topic: req.body.title,
        message: req.body.message,
    };

    const newBoardMessage = await messages.postMessage(newMessage)
        .catch((err) => {
            res.status(500);
        });
    res.status(201).send(newBoardMessage);
});

module.exports = router;
