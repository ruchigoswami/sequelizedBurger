//Inside the burgers_controller.js file, import the following:
//Express, burger.js
//Create the router for the app, and export the router at the end of your file.

var express = require('express');
var router = express.Router();
var burger = require("../models/burger.js");

    

    router.get('/', function(req, res){
        burger.all(function(data){
            var hbsObject = {
            burgers: data
    };
            console.log(hbsObject);
            res.render('index', hbsObject);
        });
    });

    router.post('/burgers/create', function(req, res){
        console.log("in create" + req.body.burger);
        burger.create(['burger_name'], [req.body.burger], function(){
            res.redirect('/');
        });
    });

    router.put('/burgers/update/:id', function(req, res){

        burger.update(req.body.devoured, req.params.id, function(){
            res.redirect('/');
        });
    });

    router.delete('/burgers/delete/:id', function (req, res){
        burger.delete(req.params.id, function(){
            res.redirect('/');
        });
    });

module.exports = router;
