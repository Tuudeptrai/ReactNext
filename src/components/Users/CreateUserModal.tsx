import { Input, Modal, notification } from 'antd';
import React, { useState } from 'react';


interface Iprops{
    token : string;
    getAllUser: any,
    isCreateModalOpen:boolean,
    setIsCreateModalOpen:(v:boolean)=>void,
}
const CreateUserModal = (props:Iprops) => {
    const {token,getAllUser,isCreateModalOpen,setIsCreateModalOpen  } = props;
    const [ name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ age, setAge] = useState("");
    const [ password, setPassWord] = useState("");
    const [ gender, setGender] = useState("");
    const [ address, setAddress] = useState("");
    const [ role, setRole] = useState("");

    const handleOk =async () => {
        const data = {name, email, password,age,gender, role, address}
        console.log('check dataform',data);
    //  call api
        const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        body:JSON.stringify({...data})
    })
    const d = await res.json();
    console.log('data create user',d.data);
    if(d.data){
        await getAllUser();
        handleCloseModal();
        notification.success({
            message: JSON.stringify(d.message)
        });
    }else{
        notification.error({
            message: JSON.stringify(d.message)
        });
    }
    };
  
   const handleCloseModal =()=>{
        setIsCreateModalOpen(false);
        setName("");
        setAddress("");
        setAge("");
        setEmail("");
        setGender("");
        setPassWord("");
        setRole("");
   }
    return (
        <>
            <Modal title="Add new user" 
                open={isCreateModalOpen} 
                onOk={handleOk} 
                onCancel={()=>handleCloseModal()}
                maskClosable={false}
                >
                   <div>
                    <label>Name:</label>
                    <Input
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Email:</label>
                    <Input
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Password:</label>
                    <Input
                    value={password}
                    onChange={(event)=>setPassWord(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Age:</label>
                    <Input
                    value={age}
                    onChange={(event)=>setAge(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Gender:</label>
                    <Input
                    value={gender}
                    onChange={(event)=>setGender(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Address:</label>
                    <Input
                    value={address}
                    onChange={(event)=>setAddress(event.target.value)}
                    />
                   </div>
                   <div>
                    <label>Role:</label>
                    <Input
                    value={role}
                    onChange={(event)=>setRole(event.target.value)}
                    />
                   </div>
                </Modal>
        </>
    );
};

export default CreateUserModal;