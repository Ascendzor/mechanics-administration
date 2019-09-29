import React from 'react';
import { Table, Row, Col, Button } from 'antd';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Route, Link } from "react-router-dom";
import useReactRouter from 'use-react-router';
import CreateCustomer from '../Modals/CreateCustomer';

const query = gql`
  {
    customers {
      name
      id
      phoneNumber
    }
  }
`;

export default () => {
  const { data, error, loading } = useQuery(query);
  const { match } = useReactRouter();

  return <Row className='Customers' style={{padding: 10}}>
    <Col span={24}>
      <div style={{height: 50, position: 'relative'}}>
        <span style={{lineHeight: '50px'}}>Customers</span>
        <div style={{position: 'absolute', bottom: 10, right: 0}}>
          <Link to='/customers/create'>
            <Button
              type='primary'
              icon='plus'
              onClick={() => console.log('start creation of new customer')}
            >
              Create new
            </Button>
          </Link>
        </div>
      </div>
      <Table
        style={{width: '100%'}}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
          },
          {
            title: 'Edit',
            dataIndex: '',
            width: 100,
            key: 'edit',
            render: () => <Button type='dashed' icon='edit' />,
          },
          {
            title: 'Delete',
            dataIndex: '',
            width: 100,
            key: 'delete',
            render: () => <Button type='danger' icon='delete' />,
          }
        ]}
        loading={loading}
        dataSource={data && data.customers}
      />
    </Col>
    <Route path={`${match.path}/create`} component={CreateCustomer} />
  </Row>
}