import { useState } from "react";

interface IProps {
    name: string,
    age: number,
    info: {
        gender: string,
        address: string,
    }
    todoList:string[];
    setTodoList:(todo:string[])=>void;
    handleTest:(name:string)=>void;
}



const Testok = (props:IProps) => {
    const {handleTest,todoList,setTodoList} = props;
    const [fullName, setFullName] = useState("");
  
    const handleclick=()=>{
        handleTest(fullName);
        setTodoList([...todoList,fullName]);
    }
    return (
        <>
           
            <input type="text" 
            onChange={(event)=> setFullName(event.target.value)}
            />
            <div>{fullName}</div>
            <button onClick={()=>handleclick()} >save</button>
            <br/>
           
            
            
        </>
    )
}
export default Testok;