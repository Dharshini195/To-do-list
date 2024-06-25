const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


let items = ["Buy Food", "Cook Food", "Eat Food"]
let workItems = []

app.set("view engine", "ejs")

app.get("/", function(req,res){

    let day = date.getDate()
    console.log(day)
    res.render("list", {listTitle : day, newListItem : items})
})

app.post("/", function(req,res){
    let item = req.body.newItem
    console.log(req.body.list)

    if(req.body.list === "Work List"){
        workItems.push(item)
        res.redirect("/work")
    }
    
    items.push(item)
    res.redirect("/")
})

app.get("/work", function(req,res){
    res.render("list", {listTitle : "Work List", newListItem : workItems})
})


app.listen(3000, function(){
    console.log("Server running at port 3000")
})