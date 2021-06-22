import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Row, Col, Image, Empty } from 'antd';

import { Load } from '../pages/Loading/loading';
import isEmpty from '../../defualt/checkEmptyObject';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getStatustrue, getCardList } from '../../redux/actions/card.actions';

export default function Guest() {
    const { Title } = Typography;
    const { TabPane } = Tabs;
    const params = useParams();
    const cardbyId = params.id;
    const dispatch = useDispatch();

    const callback = (key) => {
        console.log(key);
    };

    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState(null);

    const Cards = useSelector((state) => {
        return state.card.card;
    });
    const { acceptGuests, cancelGuests } = useSelector((state) => state.card);

    useEffect(() => {
        dispatch(getCardList(Cards));
        dispatch(getStatustrue(cardbyId, true));
        dispatch(getStatustrue(cardbyId, false));
    }, []);

    useEffect(() => {
        if (Cards) {
            setCard(Cards);
            setLoading(false);
        }
    }, [Cards]);

    // console.log(JSON.stringify(Cards.guests));
    // console.log(JSON.stringify(acceptGuests));

    function Tabsguest() {
        return (
            <>
                <Tabs onChange={callback} type="card" centered>
                    <TabPane tab="สะดวกเข้าร่วมงาน" key="1">
                        {!isEmpty(acceptGuests) ? (
                            acceptGuests.map((item, index) => {
                                return (
                                    <>
                                        <Row key={index}>
                                            <Col span={12} align="left">
                                                <Image
                                                    src={item?.guest?.picture}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        float: 'left',
                                                        borderRadius: '50px'
                                                    }}
                                                />
                                            </Col>
                                            <Col span={12} align="right">
                                                <p>{item?.guest?.name}</p>
                                            </Col>
                                        </Row>
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
                    </TabPane>
                    <TabPane tab="ไม่สะดวกเข้าร่วมงาน" key="2">
                        {!isEmpty(cancelGuests) ? (
                            cancelGuests.map((item, index) => {
                                return (
                                    <>
                                        <Row key={index}>
                                            <Col span={12} align="left">
                                                <Image
                                                    src={item?.guest?.picture}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        float: 'left',
                                                        borderRadius: '50px'
                                                    }}
                                                />
                                            </Col>
                                            <Col span={12} align="right">
                                                <p>{item?.guest?.name}</p>
                                            </Col>
                                        </Row>
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
                    </TabPane>
                </Tabs>
            </>
        );
    }

    return (
        <>
            {!loading ? (
                <div className="container">
                    <Title level={4}>รายชื่อแขกของคุณ</Title>
                    <Tabsguest
                        style={{
                            margin: '10px'
                        }}
                    />
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
