import { useEffect, useState } from 'react';
import '../../style/user.scss';
import { Table,Button, notification  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './CreateUserModal';
import UpdateUserModal from './UpdateUserModal';

export interface Iusers{
    _id:string;
    address:string;
    age:string;
    createdAt:Date;
    email:string;
    gender:string;
    isVerify:boolean;
    name:string;
    role:string;
    updatedAt:string;
    password:string;
}
const UsersTable = () => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU4NjdmNDMzMDcwZDMzNTRhODc0NjFmIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDM0OTQ4MTQsImV4cCI6MTc4OTg5NDgxNH0.GkRblu6E-kPld_LxGF7UMYo5ZdqCkq5xoMPX2J2Evm0";
  
    const [listUsers, setListUsers] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<null|Iusers>(null);
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
        if(!d.data){
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data.result);
        
    }
    useEffect(()=>{
        getData();
        getAllUser();
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
        },
        {
            title: 'Action',
            render :(value,record)=>{
                return(
                   <div>
                    <Button type='primary' onClick={()=>{
                        
                        setDataUpdate(record);
                        setIsUpdateModalOpen(true);
                        }}>Edit</Button>
                    </div>
                )
            }
        }
    ]
   
    return (
        <div >
            <div className='headerTable'>
            <h2>Users Table</h2>
            <div><Button icon={<PlusOutlined />} onClick={()=>setIsCreateModalOpen(true)} >Add new user</Button></div>
                
            </div>
            

                <Table
                columns={conlums}
                dataSource={listUsers}
                rowKey={"_id"}
                />
               <CreateUserModal 
               getAllUser={getAllUser}
               isCreateModalOpen={isCreateModalOpen}
               setIsCreateModalOpen={setIsCreateModalOpen}
               token={token}
               />
                <UpdateUserModal
               getAllUser={getAllUser}
               isUpdateModalOpen={isUpdateModalOpen}
               setIsUpdateModalOpen={setIsUpdateModalOpen}
               token={token}
               dataUpdate={dataUpdate}
               setDataUpdate={setDataUpdate}
               />
        </div>
    )
}
export default UsersTable;