const DB = require('./DB');
const fs = require('fs');
const path = require('path');

class Messages extends DB{
    constructor() {
        super('messages');
        this._loadDB('messages', 'message');
    }

    async getMessages() {
        return await this.db.allDocs()
            .catch((err) => {
                throw err;
            });
    }

    async getMessage(id) {
        return await this.db.get(id)
            .catch((err) => {
                throw err;
            });
    }

    async postMessage(messageDetails) {
        return await this.db.put(messageDetails)
            .catch((err) => {
                throw err;
            });
    }
}

module.exports = Messages;
