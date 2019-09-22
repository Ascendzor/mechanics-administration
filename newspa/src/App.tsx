import React, { useReducer, useEffect } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Customers from './pages/Customers';
import { Provider } from './AppContext';

const { Sider } = Layout;

type User = {
  id: string
}
type IState = {
  users: User[]
}
type IAction = {
  type: string
  data: any
}
const reducer = (state: IState, action: IAction): IState => {
  if(action.type === 'setUsers') return {...state, users: action.data}
  return state
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    users: []
  });

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        dispatch({
          type: 'setUsers',
          data: [{id: 'asdf', name: 'jeff'}, {id: 'fdsa', name: 'alice'}]
        })
      }, 2000)
    })();
  }, []);
  
  return (
    <Provider value={{
      state,
      dispatch
    }}>
      <div className="App">
        <Layout>
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
    </Provider>
  );
}
