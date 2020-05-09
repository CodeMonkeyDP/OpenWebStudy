const express = require("express");
var fs = require("fs");
const router = express.Router();
const Animal = require("./animal");

// Тело запроса
let jsonbody = null;

// router.get("", (req, res) => {
//     var page = fs.readFileSync("startPage.html");
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write(page);
//     res.end();
// })


router.get("/animal", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
    // res.send({method: "GET"});
});

router.post("/find", (req, res)=>{
    console.log("POST is reached");
    console.log(req.body);
    var species = req.body.species;
    var value = req.body.value;

    if (value === '')
    {
        value = Math.floor(Math.random() * 9);
    }

    Animal.findOne({species: species, value: value})
        .then(animal => {      
            if (animal != null)
            {
                res.send({species: animal.species, value: animal.value, width: animal.width, height: animal.height, ID: animal.ID});
            }
            else
            {
                imgerror = {error: "Image not found"};
                res.send(imgerror);
            }
        })
});

router.post("/animal", (req, res)=>{
    console.log("POST is reached");

    console.log(req.body);
    var species = req.body.species;
    var width = req.body.width
    var height = req.body.height;
    var ID = req.body.ID;
    var number = req.body.number

    let finderror = null;

    if (width == "") {
        width = 1;
    }
    if (height == ""){
        height = 1;
    }
    if (ID == ""){
        finderror = {error: "ID Error", species: species, number: number };
        res.send(finderror);
    }

    Animal.findOne({species: species, number: number})
    .then(animal => {
        if (animal != null)
        {
            Animal.findOne({width: width, height: height})
            .then(animal => {
                if(animal != null)
                {
                    Animal.findOne({ID: ID})
                    .then(animal => {
                        if(animal != null)
                        {
                            jsonbody = animal;
                            res.redirect("./animal");
                        }
                        else
                        {
                            finderror = {error: "ID Error", species: species, number: number };
                            res.send(finderror);
                        }
                    });
                }
                else
                {
                    finderror = {error: "Size Error", species: species, number: number };
                    res.send(finderror);
                }
            });
        }
        else
        {
            finderror = {error: "Species Error", species: species, number: number };
            res.send(finderror);
        }
    });

});

// Технический метод для заполнения БД
// router.post("/animals", (req, res)=>{
//     animal.create(req.body)
//     .then(animal =>{
//         res.send(animal);
//     })
// });


module.exports = router;