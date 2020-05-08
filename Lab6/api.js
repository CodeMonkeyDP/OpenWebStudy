const express = require("express");
var fs = require("fs");
const router = express.Router();
const Animal = require("./animal");

// Тело запроса
let jsonbody = null;

router.get("", (req, res) => {
    var page = fs.readFileSync("startPage.html");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(page);
    res.end();
})


router.get("/animal", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
    // res.send({method: "GET"});
});

router.post("/animal", (req, res)=>{
    console.log("POST is reached");

    console.log(req.body);
    var species = req.body.species;
    var width = req.body.width
    var height = req.body.height;
    var color = req.body.color;
    var number = req.body.number

    let finderror = null;

    if (width == "") {
        width = 1;
    }
    if (height == ""){
        height = 1;
    }
    if (color == ""){
        color = "white";
    }

    Animal.findOne({species: species, number: number})
    .then(animal => {
        if (animal != null)
        {
            Animal.findOne({width: width, height: height})
            .then(animal => {
                if(animal != null)
                {
                    Animal.findOne({color: color})
                    .then(animal => {
                        if(animal != null)
                        {
                            jsonbody = animal;
                            res.redirect("./animal");
                        }
                        else
                        {
                            finderror = {error: "Color Error", species: species, number: number };
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