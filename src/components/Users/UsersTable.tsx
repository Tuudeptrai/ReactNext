import { useEffect, useState } from 'react';
import '../../style/user.scss';
import { Table,Button, notification, Popconfirm, message  } from 'antd';
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
    const token = localStorage.getItem("access_token") as string;
  
    const [listUsers, setListUsers] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<null|Iusers>(null);
    const [meta, setMeta] = useState({
        current:1,
        pageSize: 6,
        page: 0,
        total: 0
    });
   
    const handelOnChange = async(page:number,pageSize:number )=>{
        
        console.log('page , pageSize',page,pageSize);
        const res = await fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
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
        setMeta({
            current:d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            page: d.data.meta.page,
            total: d.data.meta.total
        })
    }
    const getAllUser = async ()=>{
        const res = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
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
        setMeta({
            current:d.data.meta.current,
            pageSize: 6,
            page: d.data.meta.page,
            total: d.data.meta.total
        })
        
    }
    useEffect(()=>{
        getAllUser();
    },[]);
    const confirm =async (user:Iusers) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
            method: "DELETE",
            
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
        }else{
            notification.success({
                message: JSON.stringify(d.message)
            })
            getAllUser()
        }
       
      };
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
                    <Button style={{borderColor:"green", color:"green"}} onClick={()=>{
                        
                        setDataUpdate(record);
                        setIsUpdateModalOpen(true);
                        }}>Edit</Button>
                     <Popconfirm
                        title="Delete the task"
                        description={`Are you sure to delete this user: ${record.name}`}
                        onConfirm={() => confirm(record)}  
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='default' style={{marginLeft:"10px"}} danger onClick={() => {
                            // Handle delete action if needed
                        }}>Delete</Button>
                    </Popconfirm>
                    
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
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange:(page:number,pageSize:number) => handelOnChange(page,pageSize),
                    showSizeChanger: true
                }}
                 
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