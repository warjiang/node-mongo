/**
 * Created by Dell on 2015/9/11.
 */
var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('../config');


var router = express.Router();
var url = 'mongodb://'+config['mongoIP']+':'+config['mongoPort']+'/'+config['dbName'];


//find
var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('schedules');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log(docs);
        callback(docs);
    });
};




router
    .get('/',function(req,res){
        res.send('root directory');
    })
    .get('/schedules/SID/:SID',function(req,res){
        var SID = req.params.SID;
        MongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            console.log('connect correctly to server');
            var collection = db.collection('schedules');
            collection.find({SID:SID}).toArray(function(err,docs){
                assert.equal(err,null);
               /* console.log(docs);
                db.close();
                res.json(docs);*/
                if(docs.length == 0){
                    res.json("数据库中不能存在对应学号课表");
                    db.close();
                }else{
                    //console.log(docs);
                    db.close();
                    res.json(docs);
                }
            });
        });

        //res.json({name:"warjiang",password:"123"});
    })
    .get('/grades/SID/:SID',function(req,res){
        var SID = req.params.SID;
        MongoClient.connect(url,function(err,db){
            assert.equal(null,err);
            console.log('connect correctly to server');
            var collection = db.collection('grades');
            collection.find({SID:SID}).toArray(function(err,docs){
                assert.equal(err,null);
                if(docs.length == 0){
                    res.json("数据库中不能存在对应学号成绩");
                    db.close();
                }else{
                    //console.log(docs);
                    db.close();
                    res.json(docs);
                }
            });
        });

        //res.json({name:"warjiang",password:"123"});
    });


module.exports = router;