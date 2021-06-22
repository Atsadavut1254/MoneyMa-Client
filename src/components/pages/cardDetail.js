import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getCardbyId, closeEvent } from '../../redux/actions/card.actions';
import { convertText } from '../../defualt/convert';

import { Typography, Card, Row, Col, Button } from 'antd';

import { Load } from '../pages/Loading/loading';

import isEmpty from '../../defualt/checkEmptyObject';
import moment from 'moment';

export default function CardDetail({ handleshare }) {
    const { Title } = Typography;
    const [loading, setLoading] = useState(true);
    const today = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
    });
    const params = useParams();
    const cardbyId = params.id;

    const dispatch = useDispatch();
    const Cards = useSelector((state) => {
        return state.card.card;
    });

    const [card, setCard] = useState(null);

    useEffect(() => {
        dispatch(getCardbyId(cardbyId));
    }, []);

    useEffect(() => {
        if (Cards) {
            setCard(Cards);
            setLoading(false);
        }
    }, [Cards]);

    return (
        <>
            {!loading ? (
                <div className="container">
                    <Title level={4}>รายละเอียดการ์ด</Title>
                    {card ? (
                        <Row align="center">
                            <Col>
                                <Card
                                    style={{
                                        width: '350px',
                                        borderColor: '#FFBB33',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#FFBB33',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {convertText(card.type)}ของคุณ
                                    </Title>
                                    <Title level={3}>
                                        {card.hostOne}{' '}
                                        {(() => {
                                            if (card.type === 'wedding') {
                                                return ' ♥ ';
                                            } else if (
                                                card.type === 'ordination'
                                            ) {
                                                return ' หรือ ';
                                            } else {
                                                return ' และ ';
                                            }
                                        })()}{' '}
                                        {card.hostTwo}
                                    </Title>
                                    <Title level={5}>
                                        วัน-เวลา : {''}
                                        {moment(card.date).format(
                                            'DD/MM/YY-HH:mm:ss'
                                        )}
                                    </Title>
                                    <Title level={5}>
                                        สถานที่ : {card.locationName}
                                    </Title>
                                    <Title level={5}>
                                        เบอร์ติดต่อ : {card.phone}
                                    </Title>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <p>ไม่มีการ์ด</p>
                    )}
                    <Row align="center" style={{ marginTop: 10 }}>
                        {!isEmpty(card) &&
                            (card.stauts === false ? (
                                <Button
                                    type="text"
                                    href={card.fileURL}
                                    size="large"
                                    shape="round"
                                    style={{
                                        background: '#FFBB33',
                                        color: '#FFFFFF',
                                        width: '300px',
                                        height: '50px',
                                        margin: '10px'
                                    }}
                                >
                                    Download Exel File
                                </Button>
                            ) : (
                                <Row>
                                    <Col span={24}>
                                        <Link to={`/card/greeting/${cardbyId}`}>
                                            <Button
                                                style={{
                                                    width: '100px',
                                                    marginTop: '10px',
                                                    borderColor: '#FFBB33',
                                                    display: 'inline-block',
                                                    margin: '5px'
                                                }}
                                                shape="round"
                                            >
                                                ดูคำอวยพร
                                            </Button>
                                        </Link>
                                        <Link to={`/card/summary/${cardbyId}`}>
                                            <Button
                                                style={{
                                                    width: '100px',
                                                    marginTop: '10px',
                                                    borderColor: '#FFBB33',
                                                    display: 'inline-block',
                                                    margin: '5px'
                                                }}
                                                shape="round"
                                            >
                                                ยอดรวม
                                            </Button>
                                        </Link>
                                        <Link
                                            to={`/card/amountguest/${cardbyId}`}
                                        >
                                            <Button
                                                style={{
                                                    width: '100px',
                                                    marginTop: '10px',
                                                    borderColor: '#FFBB33',
                                                    display: 'inline-block',
                                                    margin: '5px'
                                                }}
                                                shape="round"
                                            >
                                                จำนวนแขก
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col span={24}>
                                        <Link
                                            to={`/card/createMarry?edit=true`}
                                        >
                                            <Button
                                                style={{
                                                    width: '100px',
                                                    marginTop: '10px',
                                                    borderColor: '#FFBB33',
                                                    display: 'inline-block',
                                                    margin: '5px'
                                                }}
                                                shape="round"
                                            >
                                                แก้ไขการ์ด
                                            </Button>
                                        </Link>

                                        <Button
                                            style={{
                                                width: '100px',
                                                marginTop: '10px',
                                                borderColor: '#FFBB33',
                                                display: 'inline-block',
                                                margin: '5px'
                                            }}
                                            shape="round"
                                            onClick={() =>
                                                handleshare(card, cardbyId)
                                            }
                                        >
                                            เชิญแขก
                                        </Button>
                                        <Button
                                            style={{
                                                width: '100px',
                                                marginTop: '10px',
                                                borderColor: '#FFBB33',
                                                display: 'inline-block',
                                                margin: '5px'
                                            }}
                                            shape="round"
                                            onClick={() =>
                                                dispatch(closeEvent(cardbyId))
                                            }
                                            disabled={moment(
                                                card.date
                                            ).isSameOrAfter(moment(today))}
                                            // disabled="true"
                                        >
                                            จบงาน
                                        </Button>
                                        {/* {console.log(
                                            moment(card.date).isSameOrAfter(
                                                moment(today)
                                            )
                                        )} */}
                                    </Col>
                                    <Row
                                        align="center"
                                        style={{
                                            textAlign: 'left',
                                            width: '350px',
                                            marginTop: '20px',
                                            color: '#eb4034',
                                            marginLeft: '20px'
                                        }}
                                    >
                                        <Col span={2}></Col>
                                        <Col span={24}>
                                            <p>
                                                *เมื่อท่านดำเนินการจบงานแล้ว
                                                ท่านจะไม่สามารถตรวจสอบข้อมูลได้
                                                แต่จะสามารถดาวน์โหลดข้อมูลไฟล์
                                                Excel ได้
                                            </p>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                </Row>
                            ))}
                        {/* <Row
                            style={{
                                textAlign: 'left',
                                width: '300px',
                                marginTop: '20px',
                                color: '#eb4034'
                            }}
                        >
                            <Col span={24}>
                                <p>
                                    *เมื่อท่านดำเนินการจบงานแล้ว
                                    ท่านจะไม่สามารถตรวจสอบข้อมูลได้
                                    แต่จะสามารถดาวน์โหลดข้อมูลไฟล์ Excel ได้
                                </p>
                            </Col>
                        </Row> */}
                    </Row>
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
