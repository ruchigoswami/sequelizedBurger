// Import (require) connection.js into orm.js
//In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. 
//These are the methods you will need to use in order to retrieve and store data in your database.

var connection = require("../config/connection.js");

  function printQuestionMarks(num){
    var arr =[];
      for (var i =0; i < num; i++){
        arr.push('?');
      };
      return arr.toString();
  };

  function objToSql(ob){
    var arr=[];
    for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }
    return arr.toString();
  };

var orm = {

  all: function(tableInput, cb){

      var queryString = 'SELECT * FROM ' + tableInput + ';';
      connection.query(queryString, function(err, result) {
        if (err) throw err; 
        cb(result);
      });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb){
      var queryString = 'INSERT INTO ' + table ;
      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES (';
      queryString = queryString + printQuestionMarks(vals.length);
      queryString = queryString + ') ';
      console.log(queryString);

      connection.query(queryString, vals, function(err, result){
        if (err) throw err;
        cb(result);
      });
  },

  // objColVals would be the columns and values that you want to update
  update: function(table, objColVals, condition, cb){
      var queryString = 'UPDATE ' + table;
      queryString = queryString + ' SET ';
      queryString = queryString + objToSql(objColVals);
      queryString = queryString + ' WHERE ' ;
      queryString = queryString + condition;
      console.log(queryString);

      connection.query(queryString, function(err, result){
        if (err) throw err;
        cb(result);
      });
  },

  delete: function(table, condition, cb){
    var queryString= 'DELETE FROM ' + table;
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;

    connection.query(queryString, function(err, result){
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;

