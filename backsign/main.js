const express = require('express');
const session = require('express-session');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Student"
});
var http = require('http');
var path = require("path");
const bodyParser = require('body-parser');
const e = require('express');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.get('/',(req,res) => {
    res.sendFile('loginpage.html',{root:'public'});
});
app.post('/',(req,res) => {
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        var sql = "INSERT INTO Student VALUES ?";
        var values = [
            [req.body.name, req.body.reg_no, req.body.email, req.body.password, req.body.profession]
        ]
        con.query(sql,[values], function(err,result){
            if (err) throw err;
            console.log("Records Inserted");
        });
    });
});
app.get('/Login',(req,res) => {
    res.sendFile('log.html',{root:'public'});
});
app.post('/Login',(req,res)=>{
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        con.query("SELECT * FROM student WHERE email=? AND password = ? AND profession=?",[req.body.email, req.body.password, req.body.profession],function(err2,result){
            if (err2) throw err2;
            if (result.length > 0){
                if (res.session = {}){
                res.session.loggedin = true;
                res.session.username = req.body.email;
                }
                if (req.body.profession='student')res.redirect('/Profile');
                else res.redirect('/Teacher');
            }
            else {
                res.send("Incorrect Email or Password");
            }
        });
    });
});
app.get('/Profile',(req,res)=>{
    res.sendFile('Student Profile.html',{root:'public'});
});
app.post('/Profile',(req,res)=>{
    if (res.session.loggedin){
    con.query("SELECT 1 FROM student WHERE email='user@user.com'",function(err2,result){
        if (err2) throw err2;
        console.log("Getting data");
        console.log(result);
    });
}
});
app.get('/Teacher',(req,res)=>{
    res.sendFile('Teacher Profile.html',{root:'public'});
});
app.listen(8081,function(){
    console.log('running');
});