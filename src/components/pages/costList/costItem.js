import React from 'react';
import { Typography, Button, Row, Col, Divider } from 'antd';

export default function costItem({ data, index, onHandleDelete }) {
    const { Title } = Typography;
    return (
        <div className="container">
            <Row gutter={8} style={{ marginTop: '-10px' }}>
                <Col span={10}>
                    <Title level={5}>{data.costName}</Title>
                </Col>
                <Col span={10}>
                    <Title level={5}>{data.price}</Title>
                </Col>
                <Col span={4}>
                    <Button
                        shape="circle"
                        style={{
                            background: '#f54242',
                            color: '#FFFFFF',
                            marginLeft: '10px'
                        }}
                        onClick={() => onHandleDelete(data.budgetId)}
                    >
                        -
                    </Button>
                </Col>
            </Row>
            <Divider style={{ marginTop: '5px' }} />
        </div>
    );
}
