import { FileOutlined, PieChartOutlined, UserOutlined,DesktopOutlined,TeamOutlined  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Test from '../test/test';
import LayoutBreadcrumb from './Breadcrumb/Breadcrumb'

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('标签管理', '1', <PieChartOutlined />),
  getItem('登录', '2', <UserOutlined />),
  getItem('题库列表', '3', <TeamOutlined />),
  getItem('测试','4', <TeamOutlined />)
];

const MYLayout = () => {
  
  const navgitar=useNavigate()
  const handleNavgator=({key})=>{
    switch(key){
      case '1':{
        return void navgitar('/tags')
      }
      case '2':{
        return void navgitar('/login')
      }
      case '3':{
        return void navgitar('/QuestionList')
      }
      case '4':{
        return void navgitar('/test')
      }
    }
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleNavgator} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems:'center'
          }}
        >
                  <img src="src/assets/loginlogo.png" alt="" style={{ width: '60px',height:'80%',marginLeft:'20px'}}/>
            <h2>黑马面面</h2>      
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          
            <LayoutBreadcrumb ></LayoutBreadcrumb>
        
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          by Wayyt
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MYLayout;