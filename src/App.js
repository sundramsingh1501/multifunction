import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import './App.css';
import {
  HomeOutlined,
  CalculatorOutlined,
  OrderedListOutlined,
  ClockCircleOutlined,
  AimOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Calculator, ToDoList, MainClock, Weather } from './Components';
import HomePage from './Components/Home/HomePage';


const { Header, Content } = Layout;

function App() {
  const [menuKey, setMenuKey] = useState('1');
  const [ipcRenderer, setIpcRenderer] = useState(null);

  useEffect(() => {
    // Check if running in Electron environment
    if (window.require) {
      try {
        const electron = window.require('electron');
        setIpcRenderer(electron.ipcRenderer);
      } catch (error) {
        console.error('Error loading ipcRenderer:', error);
      }
    }
  }, []);

  const handleMenuChange = (selectedKey) => {
    setMenuKey(selectedKey);
  };

  const onClickClose = () => {
    ipcRenderer && ipcRenderer.send('close');
  };

  const onClickMin = () => {
    ipcRenderer && ipcRenderer.send('minimize');
  };

  return (
    <>
      
      <Layout style={{ background: 'none' }} id="drag">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={menuKey}
            selectedKeys={menuKey}
            onSelect={(e) => handleMenuChange(e.key)}
          >
            <div className="logo" align="left">
              <img style={{ marginBottom: '-8px', marginLeft: '-18px' }} src="logo.png" height={30} width={35} alt="menu" />
            </div>
            <Menu.Item icon={<HomeOutlined />} style={{ marginLeft: '20px' }} key="1">
              Home
            </Menu.Item>
            <Menu.Item icon={<CalculatorOutlined />} key="2">
              Calculator
            </Menu.Item>
            <Menu.Item icon={<OrderedListOutlined />} key="3">
              Todo List
            </Menu.Item>
            <Menu.Item icon={<ClockCircleOutlined />} key="4">
              Clock
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 80 }}>
          {menuKey === '1' ? (
            <HomePage />
          ) : menuKey === '2' ? (
            <Calculator />
          ) : menuKey === '3' ? (
            <ToDoList />
          ) : menuKey === '4' ? (
            <MainClock />
          ) : null}
        </Content>
      </Layout>
    </>
  );
}

export default App;
