const mysql=require('mysql');
const config=require('./config');
const connection =mysql.createConnection({
    host: config.HOST,
    user:config.USERNAME,
    password:config.PASSWORD,
    database:config.DATABASE_NAME
});
connection.connect();
module.exports={
    getcurrentExchange:(ex_id)=>{
        var data = new Promise((resolve,reject)=>{  
        connection.query("select * from cur_exchange_rate where ex_id=?",ex_id,(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    return data
    },
    getAll:(ex_date)=>{
        if(ex_date!=undefined){
            sql="select ex_id, cur_name, cur_buy,cur_sell,ex_date from currinces join cur_exchange_rate using(cur_id) where ex_date=?"
        }
        else{
            sql="select ex_id, cur_name, cur_buy,cur_sell ,ex_date from currinces join cur_exchange_rate using(cur_id) "

        }
        var data = new Promise((resolve,reject)=>{  
        connection.query(sql,ex_date,(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    // getAll:(ex_date)=>{
    //     var data = new Promise((resolve,reject)=>{  
    //     connection.query("select cur_name, cur_buy,cur_sell from currinces join cur_exchange_rate using(cur_id) where ex_date=?",ex_date,(err,result)=>{
    //         if(err)
    //         reject(err)
    //         else
    //         resolve(result)
    //     })
    // })
    return data
    },
    getAllCurrinces:()=>{
        var data = new Promise((resolve,reject)=>{  
        connection.query("SELECT * FROM `currinces`",(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    return data
    },
    addnewExchange:(data)=>{
        var data = new Promise((resolve,reject)=>{  
        connection.query("INSERT INTO cur_exchange_rate ( cur_id, cur_buy, cur_sell, ex_date) VALUES ( ?, ?, ?, ?)",[data.currinceid,data.buy,data.sell,data.date],(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    return data
    },
    updateExchange:(data,ex_id)=>{
        console.log(data)
        console.log(ex_id)
        var data = new Promise((resolve,reject)=>{  
        connection.query("UPDATE cur_exchange_rate SET cur_id=?,cur_buy=?,cur_sell=?,ex_date=? WHERE ex_id=?",[data.currinceid,data.buy,data.sell,data.date,ex_id],(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    return data
    },
    deleteExchange:(ex_id)=>{
        console.log(ex_id,'here')
        var data = new Promise((resolve,reject)=>{  
        connection.query("DELETE FROM cur_exchange_rate WHERE ex_id=",ex_id,(err,result)=>{
            if(err)
            reject(err)
            else
            resolve(result)
        })
    })
    return data
    },
    getExchange:(cur_name,date)=>{
        var data = new Promise((resolve,reject)=>{  
            connection.query("select cur_name, cur_buy,cur_sell from currinces join cur_exchange_rate using(cur_id) where cur_name=? and ex_date=?",[cur_name,date],(err,result)=>{
                if(err)
                reject(err)
                else
                resolve(result)
            })
        })
        return data
    }
}