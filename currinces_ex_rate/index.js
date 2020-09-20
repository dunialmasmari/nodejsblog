const express = require('express');
const bodyparser= require('body-parser');
const dbObject =require('./app_modules/db_works')
const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extends:true}));

app.get("/api/exchange",async (req,res)=>{
    console.log(req.query.ex_date)
        res.json(await dbObject.getAll(req.query.ex_date));
  
});
app.get("/api/:cur_name/:ex_date",async (req,res)=>{
    res.json(await dbObject.getExchange(req.params.cur_name, req.params.ex_date));
});
app.get("/api/exchange/current_ex/:ex_id",async (req,res)=>{
    res.json(await dbObject.getcurrentExchange(req.params.ex_id));

});
app.get("/api/",async (req,res)=>{
    console.log('hi')
    res.json(await dbObject.getAllCurrinces());

});
app.post("/api/addExchange/",async (req,res)=>{
    console.log(req.body)
    res.json(await dbObject.addnewExchange(req.body));

});
app.put("/api/updateExchange/:ex_id",async (req,res)=>{
    console.log('ss',req.body)
    res.json(await dbObject.updateExchange(req.body,req.params.ex_id));

});
app.delete("/api/deleteExchange/:ex_id",async (req,res)=>{
    console.log(req.params.ex_id)
    res.json(await dbObject.deleteExchange(req.params.ex_id));

});
app.listen(5320,()=>{
    console.log("server Started Successfully...")
})