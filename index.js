const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; // the default mongodb server location
const dbname = 'nucampsite';

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client)=>{  // connect to the mongodb server. useUnifiedTopology is for avoid a default error
    assert.strictEqual(err,null); // if err is strict equal to null, then everything is fine and we can continnue to the next console.log.
    //  If is err is not equal to null, then it will quit
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    db.dropCollection('campsites', (err, result) =>{  // this is to drop/delete the campsites collection, so we have a clean data and will recreate it later
        assert.strictEqual(err, null);
        console.log("Dropped Collection", result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
        'campsites', result =>{
            console.log('Insert Documents', result.ops); // this is the defining function, will be called later
                dboper.findDocuments(db, 'campsites', docs =>{
                    console.log('Found Documents:', docs);
                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },  // here name:  is the document needs to be updated, the description here is the updated replaced new version
                    { description: "Updated Test Description" }, 'campsites', result=>{
                        console.log('Updated Document Count:', result.result.nModified);
                        dboper.findDocuments(db, 'campsites', docs=>{
                            console.log('Found Documents:', docs);
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                            'campsites', result =>{
                                console.log('Deleted Document Count:', result.deletedCount);
                                client.close()
                            })
                        })

                    })
                })
        })

      
    })
})