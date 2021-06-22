import React, { useEffect, useState } from 'react';
import { Typography, Divider, Col, Row, Image, Empty } from 'antd';
import { Load } from '../pages/Loading/loading';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getGreeting } from '../../redux/actions/card.actions';

import isEmpty from '../../defualt/checkEmptyObject';

export default function Greetng() {
    const { Title } = Typography;
    const params = useParams();
    const cardbyId = params.id;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState(null);

    const Cards = useSelector((state) => {
        return state.card.card;
    });

    useEffect(() => {
        dispatch(getGreeting(cardbyId));
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
                    <Title level={4}>สมุดบันทึกคำอวยพร</Title>
                    <Divider />
                    {!isEmpty(Cards.guests) ? (
                        Cards.guests.map((item) => {
                            return (
                                <>
                                    <Row>
                                        <Col span={6}>
                                            <Image
                                                src={item?.guest?.picture}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50px'
                                                }}
                                            />
                                        </Col>
                                        <Col span={18}>
                                            <Row>
                                                <Title level={5}>
                                                    {item?.guest?.name}
                                                </Title>
                                            </Row>
                                            <Row>
                                                <Title
                                                    level={5}
                                                    style={{
                                                        float: 'left'
                                                    }}
                                                >
                                                    {item.greeting}
                                                </Title>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Divider style={{ marginTop: '-5px' }} />
                                </>
                            );
                        })
                    ) : (
                        <Empty
                            style={{
                                alignContent: 'center',
                                padding: '150px 0'
                            }}
                        />
                    )}
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
