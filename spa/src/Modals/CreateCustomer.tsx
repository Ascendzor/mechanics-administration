import React from 'react';
import {
    Input,
    Modal,
    Button,
    notification
  } from 'antd';
import Form, { Field } from 'rc-field-form';
import { useMutation } from 'react-apollo-hooks';
import {ADD_CUSTOMER, GET_CUSTOMERS} from '../queries';

interface ICreateCustomerProps {
    close: () => void;
}
export default (props: ICreateCustomerProps) => {
    const {close} = props;

    const [addCustomer, { loading }] = useMutation(ADD_CUSTOMER, {
        update: (cache, response: any) => {
            const { customers } = cache.readQuery({ query: GET_CUSTOMERS }) as any;
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    customers: [...customers, response.data.addCustomer]
                }
            })
            const name = response.data.addCustomer.names.length === 1 ? response.data.addCustomer.names[0] : 'unnamed';

            notification.success({
                message: 'Customer created',
                description: `Successfully created ${name}`,
                duration: 7
            });
            close()
        }
    });
    const [form] = Form.useForm();

    return <Modal
        title='Create Customer'
        visible={true}
        footer={null}
        onCancel={close}
    >  
        <Form form={form} onFinish={e => {
            addCustomer({
                variables: {
                    names: [e.name],
                    emails: [e.email],
                    phoneNumbers: [e.phoneNumber]
                }
            })
        }}>
            <div style={{marginBottom: 20}}>
                <label>name</label>
                <Field name='name'>
                    <Input placeholder='Alice Ackerman' />
                </Field>
            </div>
            <div style={{marginBottom: 20}}>
                <label>email</label>
                <Field name='email'>
                    <Input placeholder='alice@gmail.com' />
                </Field>
            </div>
            <div style={{marginBottom: 20}}>
                <label>phone number</label>
                <Field name='phoneNumber'>
                    <Input placeholder='021 025 06194' />
                </Field>
            </div>

            <div style={{width: '100%', textAlign: 'right'}}>
                <Button
                    key='cancel'
                    type='default'
                    onClick={close}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type='primary'
                    icon='plus'
                    style={{marginLeft: 10}}
                    onClick={form.submit}
                    disabled={loading}
                    loading={loading}
                >
                    Create
                </Button>
            </div>
        </Form>
        {/* <form id='createCustomer' onSubmit={e => {
            console.log('inside the on submit')
            console.log(e)
            handleSubmit(onSubmit)
        }}>
            <label>name</label>
            <input className={errors['name'] ? 'error' : ''} type="text" placeholder="Alice Ackerman" name="name" ref={register({required: true, maxLength: 100})} />
            <label>email</label>
            <input className={errors['email'] ? 'error' : ''} type="text" placeholder="alice@gmail.com" name="email" ref={register({required: false})} />
            <label>phone number</label>
            <input className={errors['phoneNumber'] ? 'error' : ''} type="tel" placeholder="021 025 06194" name="phoneNumber" ref={register({required: false})} />
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button
                    key='cancel'
                    type='default'
                    onClick={history.goBack}
                >
                    Cancel
                </Button>
                <Button
                    type='primary'
                    icon='plus'
                    style={{marginLeft: 10}}
                    form='createCustomer'
                    key='submit'
                >
                    Create
                </Button>
            </div>
        </form> */}
    </Modal>
}