import { Form, Input, InputNumber, Modal, Select, notification } from 'antd';
import React, { useState } from 'react';


interface Iprops{
    token : string;
    getAllUser: any,
    isCreateModalOpen:boolean,
    setIsCreateModalOpen:(v:boolean)=>void,
}
const CreateUserModal = (props:Iprops) => {
    const {token,getAllUser,isCreateModalOpen,setIsCreateModalOpen  } = props;
    const { Option } = Select;
    const [form] = Form.useForm();
    
  
   const handleCloseModal =()=>{
    form.resetFields();
        setIsCreateModalOpen(false);
   }
   const onFinish = async(values: any) => {
    console.log('Success:', values);
    const {name, email, password,age,gender, role, address} = values;
    const data = {name, email, password,age,gender, role, address}
    //  call api
    const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        body:JSON.stringify(data)
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
  
    return (
        <>
            <Modal title="Add new user" 
                open={isCreateModalOpen} 
                onOk={()=>form.submit()} 
                onCancel={()=>handleCloseModal()}
                maskClosable={false}
                >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        layout='vertical'
                        form={form}
                    >
                        <Form.Item
                        style={{marginBottom:5}}
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item 
                         style={{marginBottom:5}}
                        name='email'label="Email" rules={[{ required: true,type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                         style={{marginBottom:5}}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password />
                        </Form.Item>
                        <Form.Item 
                         style={{marginBottom:5}}
                        name='age' label="Age" rules={[{ required: true,type: 'number', min: 0, max: 99 }]}>
                            <InputNumber style={{width:"100%"}}/>
                            </Form.Item>
                         <Form.Item 
                          style={{marginBottom:5}}
                         name="gender" label="Gender" rules={[{ required: true }]}>

                            <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                            >
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                            </Select>
                        </Form.Item>
                          <Form.Item 
                           style={{marginBottom:5}}
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item 
                         style={{marginBottom:5}}
                        name="role" label="Role" rules={[{ required: true }]}>
                            <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                            >
                            <Option value="USER">USER</Option>
                            <Option value="ADMIN">ADMIN</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                  
                </Modal>
        </>
    );
};

export default CreateUserModal;