import { useState } from 'react';
import './App.css';
import Testok from './Test/Testok';

function App() {
  const name = "tuudeptrai";
  const age = 22;
  const info = {
    gender : "male",
    address : "abc",
  }
  const handleTest=(name:string)=>{
  
  }
  const [todoList, setTodoList] = useState(["a","ba"]);

  return (
    <>
      <div>
        <Testok
        name={name}
        age={age}
        info={info}
        handleTest={handleTest}
        todoList={todoList}
        setTodoList={setTodoList}
        />
        {todoList.map((item, index)=>{
                return(
                    
                    <div key={`${index}-abc`} >{item}</div>
                    
                    
                )
            })}
      </div>
     
    </>
  )
}

export default App
