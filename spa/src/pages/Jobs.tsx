import React, { useState } from 'react';
import { Table, Row, Col, Button, Icon } from 'antd';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const query = gql`
  {
    jobs {
      id
    }
  }
`;

export default () => {
  const { data, error, loading } = useQuery(query);
  console.log({data, error, loading})

  return <Row className='Jobs' style={{padding: 10}}>
    <Col span={24}>
      <div style={{height: 50, position: 'relative'}}>
        <span style={{lineHeight: '50px'}}>Jobs</span>
        <div style={{position: 'absolute', bottom: 10, right: 0}}>
          <Button
            type='primary'
            icon='plus'
            onClick={() => console.log('start creation of new customer')}
          >
            Create new
          </Button>
        </div>
      </div>
      <Table
        style={{width: '100%'}}
        columns={[
          {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
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
        dataSource={data && data.jobs}
      />
    </Col>
  </Row>
}