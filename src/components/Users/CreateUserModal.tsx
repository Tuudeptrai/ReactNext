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
    // const [ name, setName] = useState("");
    // const [ email, setEmail] = useState("");
    // const [ age, setAge] = useState("");
    // const [ password, setPassWord] = useState("");
    // const [ gender, setGender] = useState("");
    // const [ address, setAddress] = useState("");
    // const [ role, setRole] = useState("");
    const { Option } = Select;
    const [form] = Form.useForm();
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
    form.resetFields();
        setIsCreateModalOpen(false);
        // setName("");
        // setAddress("");
        // setAge("");
        // setEmail("");
        // setGender("");
        // setPassWord("");
        // setRole("");
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
                   {/* <div>
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
                   </div> */}
                </Modal>
        </>
    );
};

export default CreateUserModal;