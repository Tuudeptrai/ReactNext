import { Button, Popconfirm, Table, notification } from 'antd';
import { ColumnsType } from 'antd/es/table/InternalTable';
import React, { useEffect, useState } from 'react';
export interface ITracks{
    "_id": string,
    "title": string,
    "description": string,
    "category": string,
    "imgUrl": string,
    "trackUrl": string,
    "countLike": number,
    "countPlay": number,
    "uploader": {
        "_id": string,
        "email": string,
        "name": string,
        "role": string,
        "type": string
    },
    "isDeleted": boolean,
    "createdAt": string,
    "updatedAt": string
}
const TrackManage = () => {
    const token = localStorage.getItem("access_token") as string;
  
    const [listTracks, setListTracks] = useState([]);
    const [meta, setMeta] = useState({
        current:1,
        pageSize: 6,
        page: 0,
        total: 0
    });
   
    const handelOnChange = async(page:number,pageSize:number )=>{
        
        console.log('page , pageSize',page,pageSize);
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`, {
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
        setListTracks(d.data.result);
        setMeta({
            current:d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            page: d.data.meta.page,
            total: d.data.meta.total
        })
    }
    const getAllTrack = async ()=>{
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`, {
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
        setListTracks(d.data.result);
        setMeta({
            current:d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            page: d.data.meta.page,
            total: d.data.meta.total
        })
        
    }
    useEffect(()=>{
        getAllTrack();
    },[]);
    const confirm =async (track:ITracks) => {
        const res = await fetch(`http://localhost:8000/api/v1/tracks/${track._id}`, {
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
            getAllTrack()
        }
       
      };
    const conlums: ColumnsType<ITracks> = [
        { 
        title: 'STT',
        dataIndex: '-id',
        render: (value, record, index) => { 
             return(
            <>{((meta.current -1) *meta.pageSize) + index + 1}</>
             )
            }

        },
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Track url',
            dataIndex: 'trackUrl'
        },
        {
            title: 'Uploader',
            dataIndex: ["uploader", "name"]
        },
        
        {
            title: 'Action',
            render :(value,record)=>{
                return(
                   <div>
                     <Popconfirm
                        title="Delete the task"
                        description={`Are you sure to delete this user: ${record.description}`}
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
            <h2>Track Table</h2>
                
            </div>
            

                <Table
                columns={conlums}
                dataSource={listTracks}
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
               {/* <CreateUserModal 
               getAllUser={getAllUser}
               isCreateModalOpen={isCreateModalOpen}
               setIsCreateModalOpen={setIsCreateModalOpen}
               token={token}
               /> */}
               
        </div>
    )
}

  

export default TrackManage;