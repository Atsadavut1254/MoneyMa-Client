/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Typography, Row, Col, Image, Divider } from 'antd';
import imgLine from '../../../image/LINE.svg';
import imgFacebook from '../../../image/facebook-square.svg';

import ava_1 from '../../../image/Avatar/User1.svg';
import ava_2 from '../../../image/Avatar/User2.svg';
import ava_3 from '../../../image/Avatar/User3.svg';

export default function Us() {
    const { Title } = Typography;
    return (
        <div className="container" style={{ marginTop: '10px' }}>
            <Title level={4}>ติดต่อพวกเรา</Title>
            <Row>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Image src={imgLine} />
                </Col>
                <Col span={2}></Col>
                <Col span={14} style={{ textAlign: 'left' }}>
                    @MoneyMa
                </Col>
            </Row>
            <Row>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Image src={imgFacebook} />
                </Col>
                <Col span={2}></Col>
                <Col span={14} style={{ textAlign: 'left' }}>
                    MoneyMa (มานี่มา)
                </Col>
            </Row>
            <Divider />
            <Title level={4}>ทีมของพวกเรา</Title>
            <Row>
                <Col span={8}>
                    <Image src={ava_1} />
                </Col>
                <Col span={8}>
                    <Image src={ava_2} />
                </Col>
                <Col span={8}>
                    <Image src={ava_3} />
                </Col>
            </Row>
            <Row>
                <Col span={8}>VUT</Col>
                <Col span={8}>PLOYKAEW</Col>
                <Col span={8}>HOONG</Col>
            </Row>
        </div>
    );
}
