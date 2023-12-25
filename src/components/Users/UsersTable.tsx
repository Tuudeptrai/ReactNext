import { useEffect, useState } from 'react';
// import '../../style/user.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
   
    const [listUsers, setListUsers] = useState([])
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
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU4NjdmNDMzMDcwZDMzNTRhODc0NjFmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDM0NzQ0MDEsImV4cCI6MTc4OTg3NDQwMX0.68AqqRyk7bcDb53RLe_rZ_KjYk8BqqIThfujI1Pu39s";
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

   
    return (
        <div >
            <h2>Users Table</h2>

                <Table
                columns={conlums}
                dataSource={listUsers}
                />
               
               
        </div>
    )
}
export default UsersTable;