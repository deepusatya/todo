const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app= express();
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://deepthi1904k7:vpzfW4We6D5FCYQn@cluster0.maeawfs.mongodb.net/todolistdb", { useNewUrlParser: true });

const itemsSchema = new mongoose.Schema({
    name:{
        type:String,
        
        
    },
    status:{
        type:String,
      
    }
})

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item ({
    name: "buy food"
})
const item2 = new Item ({
    name: "cook food"
})
const item3 = new Item ({
    name: "eat food"
})

// const defaultItems =[item1,item2,item3];

// Item.insertMany(defaultItems,function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("sucessfully installed default items");
//     }
// })

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get("/",function(req,res){
    

    var dayOptions = {weekday:'long'};
    var dateOptions={year: 'numeric',month:'long',day:'numeric'};
    var today= new Date();
    
    var date=today.toLocaleDateString("en-US",dateOptions);
    var day=today.toLocaleDateString("en-US",dayOptions);

    

    Item.find({},function(err,items){
                res.render("list",{kindOfDay:day, todaysDate:date, newListItem:items});
            
        })

    
    
   
});

app.post("/",function(req,res){
     const itemName = req.body.newTodo;
     if(itemName===null){
        res.redirect("/");
     }
     else{

     const item = new Item({
        name: itemName
        
     })
     
     item.save();
     
    res.redirect("/");
     }
    
})

app.post("/delete",function(req,res){

   
    const delItem = req.body.delete;
   
    
    Item.findByIdAndRemove(delItem,function(err){
        if(!err){
            console.log("Successfully deleted the selected todo");
        }
    })

    
})

const PORT = process.env.PORT || 3000;


app.listen(PORT,function(){
    console.log(`server is running on port successfully ${PORT}`);
})