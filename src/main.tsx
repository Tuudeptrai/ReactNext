import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";
import UsersPage from './screens/UsersPage.tsx';
import { UserOutlined, HomeOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Home</Link>,
    key: 'homes',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/users'>Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },
];
const Headers: React.FC = () => {
  const [current, setCurrent] = useState('homes');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (<Menu
     onClick={onClick}
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} />
      );
};
const LayoutAdmin =()=>{
  const [access_token, setaccess_token] = useState("");
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
    const d = await res.json();
    // console.log('data abc',d.data.access_token);
    localStorage.setItem("access_token", d.data.access_token)
}
  useEffect(()=>{
    getData();
    
  },[])
  return (
    <>
    <Headers/>
    <div><Outlet/></div>
    </>
    
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin/>,
    children:[
      { index:true, element:<App/>},
      {
        path: "users",
        element: <UsersPage/>,
      },
    ]
  },
 
  {
    path: "/tracks",
    element: <div>manage tracks</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
