import React,{Fragment,useEffect,useState} from "react";
import EditTodo from './EditTodo';

const ListTodo = ()=>{

    const [todos,setTodos] = useState([])


    //get all todos
    const getTodos = async ()=>{
        try {
        const response = await fetch("/todos")
        const jsonData = await response.json()
        // console.log(jsonData)
        setTodos(jsonData);
        } catch (err) {
            console.error(err)
        }
        
    }

    useEffect(()=>{
        getTodos();
    },[])



    //delete todo

    const DeleteTodo = async (id)=>{
        try {
            const DeleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err)
            
        }
    }

    return(
        <Fragment>
            <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      {todos.map(todo=>(
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td><button className="btn btn-danger" onClick={()=>DeleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </thead>
    <tbody>
      
    </tbody>
  </table>

        </Fragment>
        
        
    )
}

export default ListTodo;