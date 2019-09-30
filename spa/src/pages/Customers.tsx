import React, { useState } from 'react';
import { Table, Row, Col, Button } from 'antd';
import { useQuery } from 'react-apollo-hooks';
import CreateCustomer from '../Modals/CreateCustomer';
import DeleteCustomer from '../Modals/DeleteCustomer';
import { GET_CUSTOMERS } from '../queries';
import { Customer } from '../Models';

export default () => {
  const { data, error, loading } = useQuery(GET_CUSTOMERS);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState('');

  return <Row className='Customers' style={{padding: 10}}>
    <Col span={24}>
      <div style={{height: 50, position: 'relative'}}>
        <span style={{lineHeight: '50px'}}>Customers</span>
        <div style={{position: 'absolute', bottom: 10, right: 0}}>
          <Button
            type='primary'
            icon='plus'
            onClick={() => setIsCreatingCustomer(true)}
          >
            Create new
          </Button>
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
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
            render: (customer: Customer) => <Button
              type='danger'
              icon='delete'
              onClick={() => {
                setCustomerToDelete(customer.id)
              }}
            />,
          }
        ]}
        loading={loading}
        dataSource={data && data.customers}
      />
    </Col>
    {isCreatingCustomer && <CreateCustomer
      close={() => setIsCreatingCustomer(false)}
    />}
    {customerToDelete && <DeleteCustomer
      close={() => setCustomerToDelete('')}
      customerId={customerToDelete}
    />}
  </Row>
}