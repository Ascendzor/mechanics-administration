import React, { useReducer, useEffect } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Customers from './pages/Customers';
import { Provider } from './AppContext';
import reducer from './reducer';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

const { Sider } = Layout;

export default () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout style={{height: '100%'}}>
          <Sider trigger={null} collapsible collapsed={false}>
            <div style={{height: 70}} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Customers</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>Jobs</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>Done jobs</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <div style={{width: '100%', height: '100%'}}>
            <Customers />
          </div>
        </Layout>
      </div>
    </ApolloProvider>
  );
}
