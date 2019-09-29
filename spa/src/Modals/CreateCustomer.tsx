import React from 'react';
import { Modal, Button } from 'antd';
import { Route, Link } from "react-router-dom";
import useReactRouter from 'use-react-router';

export default () => {
    const { history } = useReactRouter();

    return <Modal
        title='Create Customer'
        visible={true}
        footer={[
            <Button
                key='cancel'
                type='default'
                onClick={history.goBack}
            >
                Cancel
            </Button>,
            <Button
                key='create'
                type='primary'
                icon='plus'
                onClick={console.log}
            >
                Create
            </Button>
        ]}
    >
        Customer
    </Modal>
}