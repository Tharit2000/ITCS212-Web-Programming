/* Import and use Environmental Variable */
const dotenv = require('dotenv');
dotenv.config();
/* Form Handling */
const express = require('express');
const app = express();
const path = require('path');
/* enable All CORS requests */
const cors = require('cors');
var bodyParser = require('body-parser');
/* Router Module for handling routing */
const route = express.Router();

/* POST requests sending data in the form of some data
object to the server encoded in the body */
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Register the router
app.use('/', route);

/* allow all routes to be Cross-Origin Resource Sharing */
route.use(cors());

// Handle GET: display lightNovel.html
route.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/lightNovel.html')); 
});

/* Connection to MySQL */
const mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: process.env.host,
    user: process.env.DB_user,
    password: process.env.DB_pass,
    database: process.env.DB_name
});

/* Connect to DB */
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Connected DB: " + process.env.DB_name);
});

/* Run Server */
app.listen(process.env.PORT, function () {
    console.log("Server listening at Port " + process.env.PORT);
});


// insert
route.post('/light_novel', cors(), function (req, res) {
    // get the values from the form
    let lightNovel = req.body.lightNovel;
    let LightNovelID = lightNovel.LN_ID;
    let Title = lightNovel.LN_Title;
    let Author = lightNovel.LN_Author;
    let Publish = lightNovel.LN_Publish;
    let Volumes = lightNovel.LN_Volumes;
    console.log(lightNovel);

    // insert to DB
    let sql = `INSERT INTO lightnovel_list VALUES ('${LightNovelID}','${Title}', '${Author}', '${Publish}','${Volumes}')`; // SQL INSERT INTO

    if (!lightNovel){
        return res.status(400).send({ error: true, message: 'Please provide light novel'});
    }

    dbConn.query(sql, function (error, results) {
        if(error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'New light novel has been created successfully'});
    });
});

// update
route.put('/light_novel', function (req, res) {
    // get the values from the form
    let lightNovel = req.body.lightNovel;
    let LightNovelID = lightNovel.LN_ID;
    let Title = lightNovel.LN_Title;
    let Author = lightNovel.LN_Author;
    let Publish = lightNovel.LN_Publish;
    let Volumes = lightNovel.LN_Volumes;
    
    if (!LightNovelID || !lightNovel) {
        return res.status(400).send({ error: lightNovel, message: 'Please provide light novel and light novel id'});
    }
    // update the DB
    dbConn.query(`UPDATE lightnovel_list SET Title = '${Title}', Author = '${Author}', PublishedDate ='${Publish}', Volumes = '${Volumes}' WHERE LNID = ?`, [LightNovelID], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Light Novel has been updated successfully.'});
    });
});

// delete
route.delete('/light_novel', function (req, res) {
    // get the id from the form
    let lightNovel_id = req.body.lightNovel_id;

    if (!lightNovel_id) {
        return res.status(400).send({ error: true, message: 'Please provide lightNovel_id' });
    }

    // delete from DB
    dbConn.query('DELETE FROM lightnovel_list WHERE LNID = ?', [lightNovel_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Light Novel has been deleted successfully.' });
    });
});

// select
route.get('/light_novel/:id', function (req, res) {
    // get the id from the form
    let lightNovel_id = req.params.id;

    if (!lightNovel_id) {
        return res.status(400).send({ error: true, message: 'Please provide light novel id.' });
    }

    // select from DB
    dbConn.query('SELECT * FROM lightnovel_list where LNID=?', lightNovel_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Light Novel retrieved' });
    });
});

// select all
route.get('/light_novels', function (req, res) {
    // select all
    dbConn.query('SELECT * FROM lightnovel_list', function (error, results) {
        if (error) throw error;
        // console.log(results);
        return res.send({ error: false, data: results, message: 'Light Novel list.' });
    });
});