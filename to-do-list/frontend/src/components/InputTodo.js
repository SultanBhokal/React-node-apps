import e from "cors";
import React,{Fragment,useState} from "react";

const InputTodo = ()=>{

    const [description , setDiscription] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description}
            const response = await fetch("/todos",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            
            window.location="/";
            
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <Fragment>
    <h1 className="text-center mt-5">Input Todo</h1>
    <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input type="text" className="form-control" value={description}
        onChange={en=> setDiscription(en.target.value)}/>
        <button className="btn btn-success">Add</button>
    </form>
    </Fragment>
    )
}

export default InputTodo;
