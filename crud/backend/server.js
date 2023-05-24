const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use(cors());

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'crud'
});

db.connect((err) => {  
    if(!err) {  
        console.log("DB Connection Succeed");  
    }  
    else{  
        console.log("DB connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  

app.get('/', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
        if(err) 
        {   
            console.log(error);
            return res.json("error");
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO employee (ID, Name, Email, Age) VALUES(?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.age
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("error");
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {    
    const sql = "UPDATE employee SET Name = ?, Email = ?, Age = ? WHERE ID = ?";    
    const values = [        
        req.body.name,        
        req.body.email,
        req.body.age  
    ]    
    const id = req.params.id;        
    db.query(sql, [...values, id], (err, data) => {        
        if(err) return res.json("error");        
        return res.json(data);    
    });
});

app.delete('/employee/:id', (req, res) => { 
    const id = req.params.id;    
    const sql = "DELETE FROM employee WHERE ID = ?";    
    db.query(sql, [id], (err, data) => {        
        if(err) 
        {
            
            return res.json("error"); 
        }       
        return res.json(data);    
    });
});

app.listen(8081, ()=> {
    console.log("listening");
})