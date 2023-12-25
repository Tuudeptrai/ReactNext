import { useEffect, useState } from 'react';
import '../../style/user.scss';
import { Table,Button,Modal ,Input ,notification  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

interface Iusers{
    id:string;
    address:string;
    age:number;
    createdAt:Date;
    email:string;
    gender:string;
    isVerify:boolean;
    name:string;
    role:string;
    updatedAt:string;
}
const UsersTable = () => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU4NjdmNDMzMDcwZDMzNTRhODc0NjFmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDM0OTQ4MTQsImV4cCI6MTc4OTg5NDgxNH0.GkRblu6E-kPld_LxGF7UMYo5ZdqCkq5xoMPX2J2Evm0";
    const [ name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ age, setAge] = useState("");
    const [ password, setPassWord] = useState("");
    const [ gender, setGender] = useState("");
    const [ address, setAddress] = useState("");
    const [ role, setRole] = useState("");
    const [listUsers, setListUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getData = async ()=>{
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: "admin@gmail.com",
                password:"123456"
            }),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
        const data = await res.json();
        console.log('data',data);
    }
    
    const getAllUser = async ()=>{
        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            method: "GET",
            
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
              },
        })
        const d = await res.json();
        console.log('data user',d.data.result);
        setListUsers(d.data.result);
        
    }
    useEffect(()=>{
       
        getData();
        getAllUser();
        console.log('list',listUsers);
    },[])
    const conlums: ColumnsType<Iusers> = [
        { 
        title: 'Email',
        dataIndex: 'email',
        render :(value,record)=>{
            return(
                <a>{record.email}</a>
            )
        }
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        }
    ]
  

   
  
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
        setIsModalOpen(false);
        setName("");
        setAddress("");
        setAge("");
        setEmail("");
        setGender("");
        setPassWord("");
        setRole("");
   }
      
  
  
   
    return (
        <div >
            <div className='headerTable'>
            <h2>Users Table</h2>
            <div><Button icon={<PlusOutlined />} onClick={()=>setIsModalOpen(true)} >Add new user</Button></div>
                
            </div>
            

                <Table
                columns={conlums}
                dataSource={listUsers}
                rowKey={"_id"}
                />
               
                <Modal title="Add new user" 
                open={isModalOpen} 
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
        </div>
    )
}
export default UsersTable;