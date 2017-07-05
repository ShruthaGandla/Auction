let express = require("express");
let app = express();
const path = require("path");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Define the Static Folder:

app.use(express.static(__dirname + '/public/dist'));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product');
mongoose.Promise = global.Promise;

var ProductSchema = new mongoose.Schema({
  productName: {type: String, required: true, minlength: 4},
  sellerName: {type: String, required: true, minlength: 2},
  topBid:{type:Number},
  description:{type: String, required: true, minlength: 11},
  time_remaining: {type: String, required: true},
  endDate:{type:Date},
  bidBy:{type:String},
}, {timestamps: true});

mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');


app.get('/products', function(req, res){
  Product.find({}, function (err, products){
    if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",products:products});
    }
    
  });//find ends
});//get ends


//process route
app.post('/createProduct', function(req, res){
    
  Product.create(req.body,function(err,output){
   if(err){
       
      res.json({message:"error",error:err});
    }
    else{
        
      res.json({message:"success",product:output});
    }
  
  });//create ends
});//post ends

app.post('/editProduct/:id', function(req, res){
  Product.update({_id: req.params.id}, req.body, function(err,output){
    if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",product:output});
    }

   });//update ends
 });//post ends


app.get('/delete/:id', function(req, res){ 
   Product.remove({_id:req.params.id}, function (err) {
      if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success"});
      
    }

   });
 });

 app.get('/showProduct/:id', function(req, res){

    Product.findOne({_id: req.params.id} , function(err, product){
      if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",product:product});
    }

    });//findOne ends
  });//get ends



app.get('*', function(req, res){
    res.sendFile(path.resolve('public/dist/index.html'));
})

app.listen(8000);
