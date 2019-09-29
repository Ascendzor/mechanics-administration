import React, { useState } from 'react';
import {
    Input,
    Modal,
    Button
  } from 'antd';
import Form, { Field } from 'rc-field-form';

import useReactRouter from 'use-react-router';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import useForm from 'react-hook-form';

const ADD_CUSTOMER = gql`
    mutation AddCustomer($name: String, $phoneNumber: String!, $email: String!) {
        addCustomer(name: $name, phoneNumber: $phoneNumber, email: $email) {
            name
            phoneNumber
            email
        }
    }
`

export default () => {
    const { history } = useReactRouter();

    const [addCustomer, { loading }] = useMutation(ADD_CUSTOMER);
    const [form] = Form.useForm();

    return <Modal
        title='Create Customer'
        visible={true}
        footer={null}
    >  
        <Form form={form} onFinish={e => {
            addCustomer({
                variables: e
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
                    onClick={history.goBack}
                >
                    Cancel
                </Button>
                <Button
                    type='primary'
                    icon='plus'
                    style={{marginLeft: 10}}
                    onClick={form.submit}
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