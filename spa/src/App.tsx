import React from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Customers from './pages/Customers';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import useReactRouter from 'use-react-router';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import { ReactComponent as Logo } from './logo.svg';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

const { Sider } = Layout;

const Contents = () => {
  const { history, location, match } = useReactRouter();
  console.log({ history, location, match })

  return <div className="App">
  <Layout style={{height: '100%'}}>
    <Sider trigger={null} collapsible collapsed={false}>
      <a href='https://github.com/ascendzor/mechanics-administration' target='_blank'>
        <div className='brand-logo' style={{height: 70, padding: 10}}>
          <Logo style={{
            width: 'auto',
            height: '100%'
          }}/>
        </div>
      </a>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname.split('/')[1] || 'home']}
        style={{textAlign: 'left'}}
      >
        <Menu.Item key="home"><Link to="/">
          <Icon type="home" />
          <span>Home</span>
        </Link></Menu.Item>
        <Menu.Item key="customers"><Link to="/customers">
          <Icon type="user" />
          <span>Customers</span>
        </Link></Menu.Item>
        <Menu.Item key="jobs"><Link to="/jobs">
          <Icon type="unordered-list" />
          <span>Jobs</span>
        </Link></Menu.Item>
      </Menu>
    </Sider>
    <div style={{width: '100%', height: '100%'}}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/customers" component={Customers} />
        <Route path="/jobs" component={Jobs} />
      </Switch>
    </div>
  </Layout>
</div>
}

export default () => {
  return (
    <ApolloProvider client={client}><Router>
      <Contents />
    </Router></ApolloProvider>
  );
}
