import React from 'react';
import {
    Modal,
    Button,
    notification
  } from 'antd';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { DELETE_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMER } from '../queries';
import { Customer } from '../Models';

interface IDeleteCustomerProps {
    customerId: String;
    close: () => void;
}

export default (props: IDeleteCustomerProps) => {
    const getCustomerQueryResponse = useQuery(GET_CUSTOMER, {
        variables: {
            customerId: props.customerId
        }
    });

    const [deleteCustomer, { loading }] = useMutation(DELETE_CUSTOMER, {
        update: (cache, response: any) => {
            const customersQueryResponse = cache.readQuery({ query: GET_CUSTOMERS }) as any;
            const customers = customersQueryResponse.customers as Customer[];

            console.log('after the update')
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    customers: customers.filter(c => c.id !== props.customerId)
                }
            })
            console.log('after the write cache')
            notification.info({
                message: 'Customer deleted',
                duration: 7
            })
            console.log('after the notification')
            props.close();
        }
    });
    console.log(getCustomerQueryResponse.data)

    return <Modal
        title='Delete Customer'
        visible={true}
        footer={null}
        onCancel={props.close}
    >
        <div>
            <div style={{marginBottom: 40}}>
                {getCustomerQueryResponse.loading && <div style={{textAlign: 'center'}}>... loading customer ...</div>}
                {!getCustomerQueryResponse.loading && <div>
                    <div>Are you sure you want to delete <span style={{fontWeight: 'bold'}}>{getCustomerQueryResponse.data.customer.name}</span>?</div>
                </div>}
            </div>
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button
                    key='cancel'
                    type='default'
                    onClick={props.close}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type='danger'
                    icon='cross'
                    style={{marginLeft: 10}}
                    onClick={() => {
                        deleteCustomer({
                            variables: {
                                customerId: props.customerId
                            }
                        })
                    }}
                    disabled={getCustomerQueryResponse.loading || loading}
                    loading={loading}
                >
                    Delete
                </Button>
            </div>
        </div>
    </Modal>
}