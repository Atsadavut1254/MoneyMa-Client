import liff from '@line/liff';
import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Card, Radio, Input } from 'antd';
import moment from 'moment';
import { convertText } from '../../../defualt/convert';

import { useDispatch, useSelector } from 'react-redux';
import { getCardbyId } from '../../../redux/actions/card.actions';

import { createSong, getSongbyId } from '../../../redux/actions/song.actions';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saisong } from '../../../validation/saisong';

import isEmpty from '../../../defualt/checkEmptyObject';

import { login } from '../../../redux/actions/auth.actions';

export default function Invite() {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // const edit = params.get('edit');

    const [card, setCard] = useState();
    const [Profile, setProfile] = useState();
    const [songData, setSongData] = useState();
    const [isApprove, setIsApprove] = useState(true);

    const [warning, setWarning] = useState({
        status: false,
        message: 'กรุณาระบุสถานะ'
    });

    const Cards = useSelector((state) => {
        return state.card.card;
    });

    const Songs = useSelector((state) => {
        return state.song.song;
    });

    const token = useSelector((state) => {
        return state.auth.token;
    });
    const deeplink = useSelector((state) => {
        return state.song.deeplink;
    });

    useEffect(() => {
        liff.init({ liffId: '1655373811-zN7yDRlV' });
        liff.ready.then(() => {
            if (liff.isInClient()) {
                getProfile(true);
            } else {
                if (liff.isLoggedIn()) {
                    getProfile();
                } else {
                    liff.login();
                }
            }
        });
    }, []);

    const signup = async (data) => {
        try {
            dispatch(login(data));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (
            deeplink !== null &&
            deeplink !== undefined &&
            deeplink.trim().length !== 0
        ) {
            liff.ready.then(() => {
                if (liff.isInClient()) {
                    console.log('open deeplink');
                    liff.openWindow({
                        url: deeplink,
                        external: true
                    });
                }
            });
        }
    }, [deeplink]);

    const getProfile = async () => {
        const Profile = await liff.getProfile();
        const email = liff.getDecodedIDToken()?.email;
        const data = {
            userId: Profile.userId,
            name: Profile.displayName,
            picture: Profile.pictureUrl,
            email: email
        };
        await signup(data);
        setProfile(data);
        // console.log(Profile);
    };

    useEffect(() => {
        if (token) {
            dispatch(getCardbyId(id));
        }
    }, [token]);

    useEffect(() => {
        if (!isEmpty(Profile)) {
            dispatch(getSongbyId(id, Profile.userId));
        }
    }, [Profile]);

    useEffect(() => {
        setCard(Cards);
        setSongData(Songs);
    }, [Cards]);

    const { handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(saisong)
    });

    useEffect(() => {
        if (!isEmpty(Songs)) {
            reset({
                greeting: Songs.greeting,
                amount: Songs.amount
            });
        }
    }, [Songs]);

    const onSubmit = (values) => {
        try {
            const info_song = {
                approve: isApprove,
                greeting: values.greeting,
                amount: values.amount
            };
            const data = {
                userId: Profile.userId,
                name: Profile.name,
                picture: Profile.picture,
                email: Profile.email,
                info_song: info_song
            };

            dispatch(createSong(data, id));
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const optionsWithDisabled = [
        { label: 'เข้าร่วมงาน', value: true },
        { label: 'ไม่สะดวกร่วมงาน', value: false }
    ];

    const onHandleChange = (value) => {
        setIsApprove(value.target.value);
    };

    return (
        <>
            <div className="container">
                {card ? (
                    <>
                        <Row align="center">
                            <Col>
                                <Card
                                    style={{
                                        width: '300px',
                                        borderColor: '#FFBB33',
                                        borderRadius: '10px',
                                        marginTop: '10px'
                                    }}
                                >
                                    <Title
                                        level={4}
                                        style={{ color: '#FFBB33' }}
                                    >
                                        {convertText(card.type)}
                                        ของคุณ
                                    </Title>
                                    <Title level={3}>
                                        {card.hostOne}
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
                                        })()}
                                        {card.hostTwo}
                                    </Title>
                                    <Title level={5}>
                                        สถานที่ : {card.locationName}
                                    </Title>
                                    <Title level={5}>
                                        วัน-เวลา :{' '}
                                        {moment(card.date).format(
                                            'DD/MM/YY-HH:mm'
                                        )}
                                    </Title>
                                    <Title level={5}>
                                        เบอร์ติดต่อ : {card.phone}
                                    </Title>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${card?.location?.lat},${card?.location?.long}`}
                                    >
                                        Google Map
                                    </a>
                                </Card>
                            </Col>
                        </Row>
                        <div style={{ marginTop: '10px' }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Title level={5}>สถานะการตอบรับของคุณ</Title>
                                <Row align="center" style={{ margin: '10px' }}>
                                    <Radio.Group
                                        name="approve"
                                        optionType="button"
                                        buttonStyle="solid"
                                        defaultValue={
                                            !isEmpty(Songs)
                                                ? Songs.status
                                                : true
                                        }
                                        size="large"
                                        // value={!isEmpty(Songs) && Songs.status}
                                        onChange={(value) =>
                                            onHandleChange(value)
                                        }
                                        disabled={
                                            !isEmpty(Songs) ? true : false
                                        }
                                    >
                                        {optionsWithDisabled.map((item) => (
                                            <Radio.Button
                                                value={item.value}
                                                style={{
                                                    width: '150px'
                                                }}
                                            >
                                                {item.label}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                    <p>
                                        {(warning.status || !isEmpty(errors)) &&
                                            isEmpty(isApprove) &&
                                            warning.message}
                                    </p>
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                style={{
                                                    width: '300px',
                                                    marginTop: '10px'
                                                }}
                                                size="middle"
                                                placeholder="คำอวยพร"
                                                id="greeting"
                                                size="large"
                                                disabled={
                                                    !isEmpty(Songs)
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        name="greeting"
                                        defaultValue=""
                                    />

                                    {errors.greeting && (
                                        <p className="error-input">
                                            {errors.greeting.message}
                                        </p>
                                    )}
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                style={{
                                                    width: '300px',
                                                    margin: '10px'
                                                }}
                                                size="middle"
                                                placeholder="จำนวนเงินที่ใส่ซอง"
                                                id="amount"
                                                size="large"
                                                disabled={
                                                    !isEmpty(Songs)
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        name="amount"
                                        defaultValue=""
                                    />

                                    {errors.amount && (
                                        <p className="error-input">
                                            {errors.amount.message}
                                        </p>
                                    )}
                                    <Row
                                        style={{
                                            width: '350px',
                                            textAlign: 'left',
                                            color: '#eb4034'
                                        }}
                                    >
                                        <Col span={24}>
                                            <p>
                                                - ท่านสามารถใส่ซองได้ผ่านทาง
                                                Application ECB Easy เท่านั้น
                                            </p>
                                        </Col>
                                        <Col
                                            span={24}
                                            style={{
                                                marginTop: '-15px',
                                                float: 'left'
                                            }}
                                        >
                                            <p>
                                                -
                                                ในกรณีที่ท่านสะดวกให้ซองหน้างาน
                                                ท่านสามารถปิดลิงค์นี้ได้เลย
                                            </p>
                                        </Col>
                                        <Col
                                            span={24}
                                            style={{
                                                marginTop: '-15px',
                                                float: 'left'
                                            }}
                                        >
                                            <p>
                                                - หากใส่ซองผ่าน SCB Easy
                                                แล้วจะไม่สามารถแก้ไขข้อมูลได้
                                                กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนชำระ
                                            </p>
                                        </Col>
                                    </Row>
                                    {isEmpty(Songs) && (
                                        <Button
                                            size="large"
                                            shape="round"
                                            htmlType="submit"
                                            style={{
                                                background: '#FFBB33',
                                                color: '#FFFFFF',
                                                width: '300px',
                                                height: '50px',
                                                margin: '10px'
                                            }}
                                        >
                                            ใส่ซฮงผ่าน SCB Easy App
                                        </Button>
                                    )}
                                </Row>
                            </form>
                        </div>
                    </>
                ) : (
                    <p></p>
                )}
            </div>
        </>
    );
}
