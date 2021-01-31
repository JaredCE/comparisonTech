const PouchDB = require('pouchdb')
    .plugin(require('pouchdb-adapter-memory'))
    .plugin(require('pouchdb-find'));

const fs = require('fs');
const path = require('path');

class DB {
    constructor(name) {
        this.db = new PouchDB(name, {adapter: 'memory'});
    }

    _loadDB(name, index) {
        const fileDate = fs.readFileSync(path.resolve(`./data/${name}.json`));
        let data = JSON.parse(fileDate);
        this.db.bulkDocs(data)
            .catch((err) => {
                throw err;
            });
        this.db.createIndex({
            index: {fields: [`${index}`]}
        });
    }
}

module.exports = DB;
