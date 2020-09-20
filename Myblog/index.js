const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static("assets"))
app.set("views","./views");
app.set('view engine','ejs')
app.get("/",(req,res)=>{
    res.render("index",{title:"Myblog",greeting:"hello"});
})

app.get("/currinces_ex_rate",(req,res)=>{
    var data;
    //var date= new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    //console.log(date)
    axios.get('http://localhost:5320/api/exchange')
    .then(response => {
      console.log('asdasd',response.data);
     data=response.data
     res.render("currinces_ex_rate",{title:"Myblog",greeting:"hello",data:data});
    })
    .catch(error => {
      console.log(error);
    });

    console.log(data)
    
})

app.get("/currinces_ex_rate/add_ex_rate",(req,res)=>{
    var data;
    axios.get('http://localhost:5320/api/')
    .then(response => {
      console.log('asdasd',response.data);
     data=response.data
     res.render("add_ex_rate",{title:"Myblog",greeting:"hello",data:data});
    })
    .catch(error => {
      console.log(error);
    });

    console.log(data)
    
})
app.get("/currinces_ex_rate/update_ex_rate/:ex_id",async(req,res)=>{
    var crdata;
    var data;
   await axios.get('http://localhost:5320/api/')
    .then(response => {
      console.log('asdasd',response.data);
     crdata=response.data
    })
    .catch(error => {
      console.log(error);
    });

   await axios.get('http://localhost:5320/api/exchange/current_ex/'+req.params.ex_id)
    .then(response => {
      console.log('asdasd',response.data);
     data=response.data
     
    })
    .catch(error => {
      console.log(error);
    });
    res.render("update_ex_rate",{title:"Myblog",greeting:"hello",crdata:crdata,data:data});
    console.log(data)
    
})
app.post('/addexchange',urlencodedParser,(req,res)=>{
    response = {  
        currinceid:req.body.currinceid ,
        buy: req.body.buy,
        sell: req.body.sell,
        date : req.body.date
        //artical_img:  req.file
    };
    axios.post('http://localhost:5320/api/addExchange',response)
    .then(response => {
      console.log('asdasd');
     
    })
    .catch(error => {
      console.log(error);
    });
})
app.post('/update_exchange',urlencodedParser, async(req,res)=>{
    response = {  
        currinceid:req.body.currinceid ,
        buy: req.body.buy,
        sell: req.body.sell,
        date : req.body.date
        //artical_img:  req.file
    };
  await  axios.put('http://localhost:5320/api/updateExchange/'+req.body.ex_id,response)
    .then(response => {
      console.log('asdasd');
     console.log(response)
    })
    .catch(error => {
      console.log(error);
    });
})
app.listen(4200)