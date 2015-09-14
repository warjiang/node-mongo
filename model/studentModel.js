/**
 * Created by Dell on 2015/9/11.
 */

    //TODO not finished
//这里我突然发现一个问题,原来我觉得mongo最好的地方在数据库库每个document都可以自己随意添加字段,类似于JSON那样方便快捷,但是用Mongoose
//是不是会造成mongo在使用上退步到mysql那样.我觉得我宁愿写一堆}}}}}}也不愿意放弃mongo在任意添加字段的优越性,可能这里我需要重新考虑mongoose
//作为ORM的合理性.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var scheduleSchema = new Schema({

});