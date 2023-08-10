import React from 'react'
import { useState } from 'react';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  GoldOutlined ,
  ContainerOutlined ,
  FolderOutlined ,
  NodeIndexOutlined ,
 AppstoreOutlined,
  SafetyOutlined ,
  PartitionOutlined,
  SubnodeOutlined ,
    TeamOutlined,
    UserOutlined,
    CodeSandboxOutlined 
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;
interface AuthState {
  isConnected: boolean;
  isLoading: boolean;
  user: { [key: string]: any }; // Use a more specific type for the 'user' data if possible
  errors: any; // Use a more specific type for the 'errors' data if possible
}

// Define the root state interface including all reducers' states
interface RootState {
  auth: AuthState;
  // Add other state properties from other reducers if needed
}
interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
  role?: string; // Add a 'role' property for filtering
}
// type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  role?: React.ReactNode,
  children?: MenuItem[],
  
): MenuItem {
  return {
    key,
    icon,
    role,
    children,
    label,
    
  } as MenuItem;
}
const items: MenuItem[] = [
  
  getItem('Dashbord', '', <AppstoreOutlined/>,'Admin'),
  getItem('WorkSpace', 'workspace', <CodeSandboxOutlined />),
  getItem('forum', 'viewcomments' ,<FolderOutlined />,'Admin'||'Developer'),
  getItem('User', 'sub1', <UserOutlined />,'Admin'||'Team leader', [
    getItem('User List', 'userlist',<TeamOutlined />),
    getItem('Roles', 'roles',<SafetyOutlined />),
  ],),
  getItem('Features', 'sub2', <ContainerOutlined />,'Admin',
   [getItem('Categories', 'categories',<GoldOutlined />),
    getItem('Actions', 'components',<SubnodeOutlined />),
    getItem('Params', 'paramslist',<NodeIndexOutlined />)]),
  getItem('Workflows', 'flows', <PartitionOutlined />),
];


const SideMenu: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('role',user.roleId?.nom)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 const navigate=useNavigate()
 const filteredItems = items.filter(item => !item.role || item.role === user?.roleId?.nom);

  return (
    <Layout  style={{ minHeight: '100vh' }}>
    <Sider collapsible  collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div  className="SideMenu"  >
    <Menu  style={{ minHeight: '100vh' }}
    theme="dark" defaultSelectedKeys={['']} mode="inline" items={filteredItems}
    onClick={(item)=>{navigate(item.key)}} />
    </div>
    </Sider>
    </Layout>
  )
}

export default SideMenu
