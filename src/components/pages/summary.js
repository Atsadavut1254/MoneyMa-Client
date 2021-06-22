import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Input,
    Row,
    Col,
    Divider,
    Button,
    Image,
    Empty
} from 'antd';
import { Link } from 'react-router-dom';
import { Load } from '../pages/Loading/loading';
import isEmpty from '../../defualt/checkEmptyObject';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getGreeting } from '../../redux/actions/card.actions';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '40px',
        borderColor: '#FFBB33'
    }
}));

export default function Greetng() {
    const Classes = useStyles();
    const { Title } = Typography;
    const params = useParams();
    const cardbyId = params.id;
    const dispatch = useDispatch();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    <Title level={4}>จำนวนเงินในซองของคุณ</Title>
                    <Row style={{ margin: '10px' }}>
                        <Col span={14}>
                            {Cards.card ? (
                                <Input
                                    prefix={Cards.card.totalamount}
                                    suffix="THB"
                                    style={{ color: '#000000' }}
                                    disabled
                                />
                            ) : (
                                <p>
                                    <Input prefix="" suffix="THB" disabled />
                                </p>
                            )}
                        </Col>
                        <Col span={10} align="right">
                            <Link to={`/card/cost/${cardbyId}`}>
                                <Button
                                    shape="round"
                                    className={Classes.button}
                                >
                                    คำนวนค่าใช้จ่าย
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '10px' }}>
                        <Col span={12} align="left">
                            <Title level={5}>รายชื่อแขก</Title>
                        </Col>
                        <Col span={12} align="right">
                            <Title level={5}>จำนวนเงินที่ใส่</Title>
                        </Col>
                    </Row>
                    <Divider style={{ marginTop: '-5px' }} />
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
                                        <Col span={10} align="left">
                                            <Title level={5}>
                                                {item?.guest?.name}
                                            </Title>
                                        </Col>
                                        <Col span={8} align="right">
                                            <Title level={5}>
                                                {item.amount} THB
                                            </Title>
                                        </Col>
                                    </Row>
                                    <Divider style={{ marginTop: '5px' }} />
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
