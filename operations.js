// this version is to use module to organize the operations.
const assert = require('assert').strict;

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); // this is to save campsites the collection name to the coll
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);  // this callback is written in index.js
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};