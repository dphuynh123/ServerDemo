//import lib
var express = require('express');
var app = express();
var port = 3333;
var cors = require('cors');
var bodyparser = require('body-parser');
var Database = require('./Database/db');
var accountSchema = require('./Model/AccountModel')


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.post("/register", (rep, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    let acc = new accountSchema({
        username: rep.body.Account.username,
        password: rep.body.Account.password,
        email: rep.body.Account.email
    })

    acc.save().then(doc => {
        console.log("Create  user successfully")
        res.json({
            status: "Regis successfully",
        });
    })
        .catch(err => {
            console.error(err)
        })
})

app.post("/api/v1/login", (rep, res) => {
    accountSchema.find({ username: rep.body.username }).then(doc => {
        if (doc.length > 0) {
            if (doc[0].password != rep.body.password) {
                res.json({
                    status: "login failed"
                })
            } else {
                res.json({
                    status: "login successfully",
                    token: doc[0].id
                })
                console.log("Have a Connected : " + rep.body.username + "// id :" + doc[0].id)
            }
        } else {
            res.json({
                status: "login failes"
            })
        }
    })
        .catch(err => {
            console.error(err)
        })
})

app.get("/api/v1/account/:id", (req, res) => {
    console.log("token send "+req.headers.token)
    accountSchema.find({ _id: req.headers.token })
        .then(doc => {
            res.json({
                username: doc[0].username,
                password: doc[0].password,
                email: doc[0].email
            }) 
        })
        .catch(err => {
            res.json({
                message: "failed info"
            })
        })
})

app.put("/api/v1/account/id", (req, res) => {
    accountSchema.findOneAndUpdate(
        {
            _id: req.body.token
        },
        {
            username: req.body.username,
            password : req.body.password,
            email :req.body.email
        },
        {
            new: true,
            runValidators: true
        })
        .then(doc => {
            res.json({
                status :"successfully"
            })
        })
        .catch(err => {
            console.error(err)
        })
})

accountSchema.find()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.log(err)
    })

app.listen(port, () => {
    console.log("start successfully")
})