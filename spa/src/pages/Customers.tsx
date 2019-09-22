import React, { useContext, useEffect } from 'react';
import { Table } from 'antd';
import { Row, Col } from 'antd';
import AppContext from '../AppContext';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const GET_DOGS = gql`
  {
    customers {
      name
    }
  }
`;

export default () => {
  const { state, dispatch } = useContext(AppContext);
  const { data, error, loading } = useQuery(GET_DOGS);

  console.log({data, error, loading})

  return <Row className='Customers'>
    <Col span={12}>
      <div>Customers</div>
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
            title: 'Jobs',
            dataIndex: 'jobs',
            key: 'jobs'
          }
        ]}
        dataSource={state.users}
      />
    </Col>
    <Col span={12}>
      Selected Customer
      <div>
        Create customer
      </div>
    </Col>
  </Row>
}