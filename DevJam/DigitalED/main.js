const express = require('express');
const session = require('express-session');
var router = express.Router();
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
app.set('view engine', 'ejs');
const multer = require("multer");
app.use(express.static(path.join(__dirname,'public/studentpages')));
app.use(express.static(path.join(__dirname,'public/PAGES')));
app.use(express.static(path.join(__dirname,'public/js')))
app.get('/',(req,res) => {
    res.sendFile('loginpage.html',{root:'public'});
});
app.post('/',(req,res) => {
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        var sql = "INSERT INTO Student(name,reg_no,email,password,profession,dob,gender,branch,sem) VALUES ?";
        var values = [
            [req.body.name, req.body.reg_no, req.body.email, req.body.password, req.body.profession, req.body.date, req.body.gender, req.body.branch, req.body.sem]
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
    let b = req.body.email;
        con.query("SELECT * FROM student WHERE email=? AND password = ? AND profession=?",[b, req.body.password, req.body.profession],function(err2,result){
            if (err2) throw err2;
            if (result.length > 0){
                req.session.loggedin = true;
                req.session.email = b;
                if (req.body.profession=='student')res.redirect('/Profile');
                else res.redirect('/Teacher')
            }
            else {
                res.send("Incorrect Email or Password");
            }
        });
    });
app.get('/Profile',(req,res)=>{
    con.query("SELECT * FROM student WHERE email=?",[req.session.email],function(err,result){
        if (err) throw err;
        console.log("Getting data");
        res.render('k',{userData:result});
    })
});
app.get('/Teacher',(req,res)=>{
    con.query("SELECT * FROM student WHERE email=?",[req.session.email],function(err,result){
        if (err) throw err;
        console.log("Getting data");
        res.render('j',{userData:result});
    })
});
app.get('/Result',(req,res)=>{
    con.query("SELECT * FROM result WHERE email=?",[req.session.email],function(err,result){
        if (err) throw err;
        console.log("Getting data");
        res.render('l',{userData:result});
    })
});
app.get('/Upload_Result',(req,res) => {
    con.query("SELECT * FROM result",function(err,result){
        if (err) throw err;
        console.log("Getting data");
        result.forEach(function(data){
            req.session.a = data.reg_no;
            })
        res.render('result',{userData:result});
    })
});
app.post('/Upload_Result',(req,res)=>{
    con.query("UPDATE result SET mo = ? WHERE reg_no=?",[req.body.mo,req.session.a],function(){
        console.log('Updated');
    })
})
app.get('/Mark',(req,res) => {
    res.sendFile('MARK_ATTENDENCE.html',{root:'public'});
})
app.get('/Diss',(req,res)=>{
    res.sendFile('discussion.html',{root:'public/studentpages'});
})
app.get('/Diss2',(req,res)=>{
    res.sendFile('discussion2.html',{root:'public/studentpages'});
})
app.get('/DISS3',(req,res)=>{
    res.sendFile('DISCUSSION.html',{root:'public/PAGES'});
})
app.get('/DISS4',(req,res)=>{
    res.sendFile('discussion2.html',{root:'public/PAGES'});
})
app.get('/Quiz',(req,res)=>{
    res.sendFile('QUIZ.html',{root:'public/studentpages'});
})
app.get('/Quiz2',(req,res)=>{
    res.sendFile('QUIZ2.html',{root:'public/studentpages'});
})
app.get('/QUIZ3',(req,res)=>{
    res.sendFile('QUIZ3.html',{root:'public/PAGES'});
})
app.get('/QUIZ4',(req,res)=>{
    res.sendFile('QUIZ4.html',{root:'public/PAGES'});
})
app.get('/att',(req,res)=>{
    res.sendFile('attendance.html',{root:'public'});
})
app.get('/cal',(req,res)=>{
    res.sendFile('calender.html',{root:'public'});
})
app.get('/Assignment',(req,res)=>{
    res.sendFile('assignment.html',{root:'public/studentpages'});
})
app.listen(8081,function(){
    console.log('running');
});