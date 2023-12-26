import { Input, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Iusers } from './UsersTable';


interface Iprops{
    token : string;
    getAllUser: any,
    isUpdateModalOpen:boolean,
    setIsUpdateModalOpen:(v:boolean)=>void,
    dataUpdate:null| Iusers,
    setDataUpdate:(v:null|Iusers)=>void,
}
const UpdateUserModal = (props:Iprops) => {
    const {token,getAllUser,isUpdateModalOpen,setIsUpdateModalOpen,dataUpdate ,setDataUpdate } = props;
    const [ name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ age, setAge] = useState("");
    const [ password, setPassWord] = useState("");
    const [ gender, setGender] = useState("");
    const [ address, setAddress] = useState("");
    const [ role, setRole] = useState("");
    console.log('dataUpdate',dataUpdate);
    useEffect(()=>{
        if(dataUpdate){
            setName(dataUpdate.name);
            setAddress(dataUpdate.address);
            setAge(dataUpdate.age);
            setEmail(dataUpdate.email);
            setGender(dataUpdate.gender);
            setPassWord(dataUpdate.password);
            setRole(dataUpdate.role);
        }
       
    },[dataUpdate])
    const handleOk =async () => {
        const data = {_id:dataUpdate?._id,name, email, password,age,gender, role, address}
        console.log('check dataform',data);
    //  call api
        const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "PATCH",
        
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        body:JSON.stringify(data)
    })
    const d = await res.json();
    console.log('data Update user',d.data);
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
        setIsUpdateModalOpen(false);
        setName("");
        setAddress("");
        setAge("");
        setEmail("");
        setGender("");
        setPassWord("");
        setRole("");
        setDataUpdate(null);
   }
    return (
        <>
            <Modal title="Update user" 
                open={isUpdateModalOpen} 
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
                    disabled
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

export default UpdateUserModal;
