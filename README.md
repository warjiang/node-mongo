# node-mongo
node  mongo student schedule

```
//cnblog
//var server = new mongodb.Server('192.168.234.128',27017,{auto_reconnect:true});
//var db = new mongodb.Db('student',server,{safe:true});
//db.open(function(err,db){
//    if(!err){
//        console.log('connect database success');
//        db.collection('studentKB',{safe:true},function(err,collection){
//            if(!err){
//                console.log('connect collection success');
//                var findRes = collection.find();
//                //console.log(typeof findRes);
//                //console.dir(findRes);
//               findRes.toArray(function(err,docs){
//                    if(!err){
//                        console.log(docs);
//                    }
//                });
//            }
//        });
//    }
//});

//npmjs.com mongodb get started
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//connect to mongo server
var url = 'mongodb://192.168.234.128:27017/student';
MongoClient.connect(url,function(err,db){
    //assert.equal(null,err);
    console.log('connect correctly to server');
    db.close();
});
MongoClient.connect(url, function (err, db) {
    //assert.equal(null,err);
    console.log('connect correctly to server');
    //document CRUD


    //Inserting a Document
    var insertDocuments = function (db, callback) {
        // Get the documents collection
        var collection = db.collection('studentKB');
        // Insert some documents
        collection.insert([
            {a: 1},
            {a: 2},
            {a: 3}
        ], function (err, result) {
            assert.equal(err, null);
            //assert.equal(3, result.result.n);
            //assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the document collection");
            callback(result);
        });
    };

    //Updating a Document
    var updateDocument = function (db, callback) {
        // Get the documents collection
        var collection = db.collection('studentKB');
        // Update document where a is 2, set b equal to 1
        collection.update(
            {a: 2},
            {$set: {b: 1}},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to 2");
                callback(result);
            });
    };

    //Remove a Document
    var removeDocument = function (db, callback) {
        // Get the documents collection
        var collection = db.collection('studentKB');
        // Insert some documents
        collection.remove({a: 3}, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the document with the field a equal to 3");
            callback(result);
        });
    };

    //find
    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('studentKB');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            assert.equal(2, docs.length);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    };


    //invoke
    //insert
    /*insertDocuments(db, function (result) {
     db.close();
     console.log(JSON.stringify(result,null,2));
     });
     //update
     updateDocument(db, function (result) {
     console.log(JSON.stringify(result, null, 2));
     db.close();
     })
     //delete
     removeDocument(db,function(result){
     console.log(JSON.toString(result,null,2));
     db.close();
     });
     findDocuments(db,function(result){
     console.log(JSON.toString(result,null,2));
     db.close();
     });
     */


});
```

### mongoose是什么梗
mongoose之前测试的时候一直有问题,大体步骤就是先根据你的mongo db的ip地址,端口号,database的名称生成形如```mongodb://192.168.234.128:27017/student```这样的url.```mongodb://dbIP:dbPort/dbName```这样就可以连接到你的mongo了.然后就要构造一个Schema,Schema就是说明了db下面的某个collection的结构,就按照key：keyType的形式描述就可以了。下面根据 mongoose.model('collectionName', SchamaName);这样就可以生成一个model的类.这里就有梗了.
1. collectionName必须要小写,任何大写字母都不行.
2. 假如你的collectionName是a.注意这样的a是不行的,你得写成as表示a的复数形式.
基于这两点,基本可以判断mongoose是一个很NB的ORM,其设计的过程简直吓人.不过有一点很好的时候,调用mongoose.disconnect();的时候数据才写入感觉基本上也变成了一个sync的过程.感觉比mongodb实现要elegant很多.stackoverflow上的解释https://stackoverflow.com/questions/14183611/mongoose-always-returning-an-empty-array-nodejs/14183834#14183834, pluralized、lower-cased model name. 

```
//npmjs.com mongodb get started
var MongoClient = require('mongodb').MongoClient,
    mongoose = require('mongoose'),
    assert = require('assert');


var mongoIP = "192.168.234.128",
    mongoPort = 27017;
//connect to mongo server

var url = 'mongodb://192.168.234.128:27017/student';
Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://192.168.234.128:27017/student');

var studentKB = new Schema({
    name : String,
    age  : Number
});

var UserModel = mongoose.model('tests', studentKB);
var userRecord = new UserModel();
UserModel.find({},function(err,users){
    console.log(users);
    mongoose.disconnect();
    UserModel.find({},function(err,users){
        console.log(users);
    })
});
```