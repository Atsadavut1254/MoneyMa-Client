import React from 'react';
import { Image, Typography, Row, Button, Col } from 'antd';
import { Link } from 'react-router-dom';
import avatar from '../../../image/love1.svg';

const ButtonType = [
    {
        id: '1',
        name: 'วิธีใช้งาน',
        url: '/contact/howtouse'
    },
    {
        id: '2',
        name: 'ติดต่อพวกเรา',
        url: '/contact/contactus'
    }
];

export default function Contact() {
    const { Title } = Typography;
    function ButtonRow() {
        return (
            <>
                {ButtonType.map((item, index) => (
                    <Link to={item.url} key={index}>
                        <Button
                            key={index}
                            style={{
                                margin: '10px',
                                width: '100px',
                                borderColor: '#FFBB33'
                            }}
                            shape="round"
                        >
                            {item.name}
                        </Button>
                    </Link>
                ))}
            </>
        );
    }

    return (
        <div className="container">
            <Title level={4}>วิธีใช้งานและติดต่อเรา</Title>
            <Row align="center">
                <Image src={avatar} />
                <Col span={24}>
                    <Title level={5}>
                        เราอยากให้คุณได้รับประสบการณ์การใช้งานที่ดี
                    </Title>
                </Col>
                <Col span={24}>
                    <Title level={5}>คุณสามารถดูวิธีการใช้งาน MoneyMa</Title>
                </Col>
                <Col span={24}>
                    <Title level={5}>หรือติดต่อเราได้ที่ข้อมูลติดต่อ</Title>
                </Col>
                <ButtonRow />
            </Row>
        </div>
    );
}
