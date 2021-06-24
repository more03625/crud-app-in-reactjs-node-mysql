const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_crud'
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM movie_reviews order by id DESC";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});
app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const review = req.body.review;
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_reviews) VALUES (?, ?)";

    db.query(sqlInsert, [movieName, review], (err, result) => {
        res.send({
            response:"success",
            message:"Data has been inserted sucessfully!"
        });
    });
});
app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;
    const sqllDelete = "DELETE FROM movie_reviews where movie_name = ?"
    db.query(sqllDelete, name, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send({
                response:"success",
                message:"Movie has been deleted sucessfully!"
            });
        }
    })
});

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const id = req.body.movieID;

    sqlUpdate = "UPDATE movie_reviews SET movie_name =  ? WHERE id = ?";
    db.query(sqlUpdate, [name, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send({
                response:"success",
                message:"Movie has been updated sucessfully!"
            });
        }
    });
})