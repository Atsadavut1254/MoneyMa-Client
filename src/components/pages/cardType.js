import React from 'react';
import { Card, Row, Col, Typography, Image } from 'antd';
import { Link } from 'react-router-dom';

import cover_wed from '../../image/LIFF/Type.png';
import cover_merit from '../../image/LIFF/Type-2.png';
import cover_ordian from '../../image/LIFF/Type-1.png';

const cardType = [
    {
        id: '1',
        name: 'งานแต่งงาน',
        url: '/card/createMarry/create',
        img: cover_wed
    },
    {
        id: '2',
        name: 'งานอุปสมบท',
        url: '/card/createOrdian',
        img: cover_ordian
    },
    {
        id: '3',
        name: 'งานขึ้นบ้านใหม่',
        url: '/card/createHouse',
        img: cover_merit
    }
];

export default function CardType() {
    const { Title } = Typography;
    function FormRow() {
        return (
            <>
                {cardType.map((item, index) => (
                    <Link to={item.url} key={index}>
                        <Card
                            key={index}
                            style={{
                                marginTop: '10px',
                                borderColor: '#FFBB33',
                                borderRadius: '12px',
                                height: '147px',
                                width: '302px'
                            }}
                            cover={<Image src={item.img} />}
                        ></Card>
                    </Link>
                ))}
            </>
        );
    }

    return (
        <div className="container" align="center">
            <Title level={4}>เลือกประเภทงาน</Title>
            <Row>
                <Col span={20} offset={2}>
                    <FormRow style={{ marginTop: 5 }} />
                </Col>
            </Row>
        </div>
    );
}
