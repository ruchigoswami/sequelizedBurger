// Inside burger.js, import orm.js into burger.js
//Also inside burger.js, create the code that will call 
//the ORM functions using burger specific input for the ORM.

var orm = require('../config/orm.js');

var burgers = {

  all: function(cb){
    orm.all('burgers', function(res){
      cb(res);
    });
  },

  create: function(cols, vals, cb){
    orm.create('burgers', cols, vals, function(res){
      cb(res);
    });
  },

  update: function(objColVals, condition, cb){
    var condition = 'id = ' + condition;
    var objColValsObject = {devoured: objColVals};
    orm.update('burgers', objColValsObject, condition, function(res){
      cb(res);
    });
  },

  delete: function(condition, cb){
    var condition = 'id = ' + condition;
    orm.delete('burgers', condition, function(res){
      cb(res);
    });
  }
};


module.exports = burgers;
