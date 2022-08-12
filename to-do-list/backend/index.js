const app = require('express')()
const express = require('express')
const cors = require('cors')
const pool=require('./db')

//middleware
app.use(cors())
app.use(express.json())


//ROUTES
//INSERT
app.post("/todos", async(req,res)=>{
    try{
        const {description} = req.body;
        
        
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) ",[description])
        res.status(200).json(newTodo.rows[0])
       console.log("Successfully Inserted")
    
    }
    catch(err){
        console.log(err.message);
        res.status(401).send("<h3>Error</h3>")
    }

});

//RETRIVE ALL

app.get("/todos", async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.status(200).json(allTodos.rows)
    } catch (error) {
        res.status(402).send("<h2>Error</h2>")
        console.log(error.message)
    }
})

//get specific

app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0])
    } catch (error) {
        res.status(402).send("<h2>Error</h2>")
        console.log(error.message)
    }
})

//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const description = req.body;
        const update_todo= await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2",[description.description,id]);
        console.log("Successfully Updated")
        res.send()
    } catch (error) {
        console.log(error.message)
        res.send("<h2>Error</h2>")
        
    }
})

//delete todo

app.delete("/todos/:id", async(req,res)=>{
    try{
    const {id} = req.params;
    const deleteTodo =  await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])
    console.log(`Deleted id : ${id}`)
    res.send()
    }
    catch(Error){
        console.log(Error.message)
        res.send("Error")
    }
})




app.listen(5000,()=>{
    console.log("listening port 5000")
});