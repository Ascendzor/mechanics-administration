import React, { useContext, useEffect } from 'react';
import { Table } from 'antd';
import { Row, Col } from 'antd';
import AppContext from '../AppContext';

export default () => {
  const { state, dispatch } = useContext(AppContext);

  return <div>
    <Row className='Customers'>
      <Col span={12}>
        <div>Customers</div>
        <Table
          style={{width: '100%', height: '100%'}}
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
  </div>
}