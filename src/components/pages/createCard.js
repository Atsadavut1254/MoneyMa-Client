import React from 'react';
import { Button, Row, Col, Card, Typography, Image } from 'antd';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { convertText } from '../../defualt/convert';

import { Load } from '../pages/Loading/loading';
import coverImg from '../../image/Components/bg-card-main.png';
import isEmpty from '../../defualt/checkEmptyObject';

export default function Main() {
    const { Title } = Typography;

    const [loading, setLoading] = useState(true);
    const [cardList, setCardlist] = useState();

    const Cards = useSelector((state) => {
        return state.card.cards;
    });

    useEffect(() => {
        if (Cards) {
            setCardlist(Cards);
            setLoading(false);
        }
    }, [Cards]);
    // console.log(JSON.stringify(cardList));
    return (
        <>
            {!loading ? (
                <div className="container">
                    <Link to="/card/type" style={{ textDecoration: 'none' }}>
                        <Row style={{ marginTop: 5 }}>
                            <Col span={2}></Col>
                            <Col span={10}>
                                <Title level={4} style={{ float: 'left' }}>
                                    การ์ดของคุณ
                                </Title>
                            </Col>
                            <Col span={10}>
                                <Button
                                    style={{
                                        width: '100px',
                                        borderColor: '#FFBB33',
                                        float: 'right'
                                    }}
                                    shape="round"
                                >
                                    สร้างการ์ด
                                </Button>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Link>
                    <Row style={{ marginTop: 5 }} type="flex">
                        <Col span={2}></Col>
                        <Col span={20}>
                            {!isEmpty(cardList) ? (
                                cardList.map((item, index) => (
                                    <Link
                                        to={`/card/detail/${item.cardId}`}
                                        style={{ textDecoration: 'none' }}
                                        key={index}
                                    >
                                        <Card
                                            style={{
                                                marginTop: '10px',
                                                borderColor: '#FFBB33',
                                                borderRadius: '10px',
                                                height: '170px'
                                            }}
                                            cover={<Image src={coverImg} />}
                                        >
                                            <Row align="center">
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '30px',
                                                        textAlign: 'center',
                                                        color: 'black',
                                                        fontSize: '30px'
                                                    }}
                                                >
                                                    {convertText(item.type)}
                                                </div>
                                            </Row>
                                            <Row align="center">
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '80px',
                                                        textAlign: 'center',
                                                        color: 'black',
                                                        fontSize: '26px'
                                                    }}
                                                >
                                                    {item.hostOne}
                                                    {(() => {
                                                        if (
                                                            item.type ===
                                                            'wedding'
                                                        ) {
                                                            return ' ♥ ';
                                                        } else if (
                                                            item.type ===
                                                            'ordination'
                                                        ) {
                                                            return ' หรือ ';
                                                        } else {
                                                            return ' และ ';
                                                        }
                                                    })()}
                                                    {item.hostTwo}
                                                </div>
                                            </Row>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <p>ไม่มีการ์ด</p>
                            )}
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
