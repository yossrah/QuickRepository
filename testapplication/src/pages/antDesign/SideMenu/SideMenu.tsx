import React from 'react'
import { useState } from 'react';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GoldOutlined ,ContainerOutlined ,FolderOutlined ,NodeIndexOutlined ,AppstoreOutlined,
        SafetyOutlined ,PartitionOutlined,SubnodeOutlined ,TeamOutlined,UserOutlined,
        CodeSandboxOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;
interface AuthState {
  isConnected: boolean;
  isLoading: boolean;
  user: { [key: string]: any };
  errors: any; 
}

// Define the root state interface including all reducers' states
interface RootState {
  auth: AuthState;
}
interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
  role?: MenuItem[]; // Add a 'role' property for filtering
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
  
  // getItem('Dashbord', '', <AppstoreOutlined/>,'Admin'),
  // getItem('WorkSpace', 'workspace', <CodeSandboxOutlined />,'Tester'),
  getItem('forum', 'viewcomments' ,<FolderOutlined />,'Tester',),
  getItem('User', 'sub1', <UserOutlined />,'Admin', [
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
  // console.log('role',user.roleId?.nom)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 const navigate=useNavigate()
 const filteredItems = items.filter(item => !item.role || item.role === user?.roleId?.nom);
 const hasAdminRole = user?.roleId?.nom === 'Admin';
 const hasTesterRole = user?.roleId?.nom === 'Tester';
 const hasTeamleadRole = user?.roleId?.nom === 'Team lead';
  if (hasAdminRole || hasTesterRole) {
    filteredItems.push(getItem('WorkSpace', 'workspace', <CodeSandboxOutlined />, ''));
  }
  if (hasAdminRole || hasTeamleadRole) {
    filteredItems.unshift(getItem('Dashbord', '', <AppstoreOutlined/>,''),);
  }
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
