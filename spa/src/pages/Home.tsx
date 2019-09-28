import React, { useState } from 'react';
import { Table, Row, Col, Button, Icon } from 'antd';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

export default () => {
  return <Row className='Customers' style={{padding: 10}}>
    <Col span={24}>
        Home
    </Col>
  </Row>
}