import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { Row, Col, Typography, Button, Input, Space, DatePicker } from 'antd';

import { makeStyles } from '@material-ui/core/styles';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { houseSchema } from '../../validation/validation';

import { useDispatch, useSelector } from 'react-redux';
import { createCard, updateCard } from '../../redux/actions/card.actions';

import { longdo, map, LongdoMap } from './Map/longdoMap';

import isEmtpy from '../../defualt/checkEmptyObject';
import moment from 'moment';
import { Load } from './Loading/loading';

import { convertText2 } from '../../defualt/convert';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '35ch',
            flexWrap: 'wrap'
        }
    },
    margintop: {
        marginTop: 20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: '300px'
    },
    iconButton: {
        padding: 10
    },
    button: {
        background: '#FFBB33',
        color: '#FFFFFF',
        width: '300px',
        height: '50px'
    }
}));

export default function Merit() {
    const Classes = useStyles();
    const { Title } = Typography;
    const { Search } = Input;
    const dispatch = useDispatch();
    const mapKey = 'd3ec62b57071a522a17ac03e376290c2';
    const params = new URLSearchParams(window.location.search);
    const edit = params.get('edit');
    const [loading, setLoading] = useState(true);

    const [cardData, setcardData] = useState();
    const [location, setLocation] = useState(null);
    const [waring, setWarning] = useState(null);
    const [isLoadMap, setIsLoadMap] = useState(false);

    const { handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(houseSchema)
    });

    const { card } = useSelector((state) => state.card);
    const cardId = useSelector((state) => {
        return state.card.cardId;
    });

    useEffect(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        if (cardId && cardData) {
            Share(cardData, cardId);
        }
    }, [cardId]);

    useEffect(() => {
        if (edit === 'true') {
            reset({
                hostOne: !isEmtpy(card) && card.hostOne,
                hostTwo: !isEmtpy(card) && card.hostTwo,
                phone: !isEmtpy(card) && card.phone,
                date:
                    !isEmtpy(card) && moment(card.date, 'YYYY-MM-DD HH:mm:ss'),
                locationName: !isEmtpy(card) && card.locationName
            });
            setLocation({ lat: card.location.lat, lng: card.location.long });
            setIsLoadMap(true);
        } else {
            setIsLoadMap(true);
        }
    }, [card]);

    const onSubmit = (values) => {
        if (location) {
            try {
                const data = {
                    hostOne: values.hostOne,
                    hostTwo: values.hostTwo,
                    phone: values.phone,
                    date: values.date,
                    type: 'housewarming',
                    locationName: values.locationName,
                    location: {
                        lat: location.lat,
                        long: location.lng
                    }
                };
                if (edit === 'true') {
                    dispatch(updateCard(data, card.cardId));
                } else {
                    setcardData(data);
                    dispatch(createCard(data));
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setWarning('กรุณาค้นหาสถานที่');
        }
    };

    const Share = async (data, cardbyId) => {
        const result = await liff.shareTargetPicker([
            {
                type: 'flex',
                altText: 'this is a card',
                contents: {
                    type: 'bubble',
                    size: 'giga',
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'image',
                                url: 'https://i.imgur.com/lLZfMIi.png',
                                gravity: 'center',
                                size: 'full',
                                aspectMode: 'cover',
                                aspectRatio: '3:4'
                            },
                            {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                    {
                                        type: 'text',
                                        text: 'คุณได้รับบัตรเชิญงานขึ้นบ้านใหม่',
                                        margin: 'xl',
                                        weight: 'bold',
                                        style: 'normal',
                                        position: 'relative',
                                        align: 'center',
                                        gravity: 'center',
                                        size: 'xl',
                                        color: '#ffbb33'
                                    }
                                ],
                                alignItems: 'center',
                                width: '400px',
                                paddingTop: '100px',
                                justifyContent: 'center',
                                position: 'absolute'
                            },
                            {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                    {
                                        type: 'box',
                                        layout: 'vertical',
                                        contents: [
                                            {
                                                type: 'box',
                                                layout: 'vertical',
                                                contents: [
                                                    {
                                                        type: 'text',
                                                        text: data.hostOne,
                                                        size: 'xl',
                                                        align: 'center',
                                                        style: 'italic'
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'box',
                                                layout: 'vertical',
                                                contents: [
                                                    {
                                                        type: 'text',
                                                        text: convertText2(
                                                            data.type
                                                        ),
                                                        style: 'italic'
                                                    }
                                                ],
                                                alignItems: 'center',
                                                paddingTop: '10px'
                                            },
                                            {
                                                type: 'box',
                                                layout: 'vertical',
                                                contents: [
                                                    {
                                                        type: 'text',
                                                        text: data.hostTwo,
                                                        size: 'xl',
                                                        align: 'center',
                                                        style: 'italic'
                                                    }
                                                ],
                                                paddingTop: '10px'
                                            },
                                            {
                                                type: 'box',
                                                layout: 'vertical',
                                                contents: [
                                                    {
                                                        type: 'box',
                                                        layout: 'baseline',
                                                        contents: [
                                                            {
                                                                type: 'text',
                                                                text: 'วัน-เวลา :',
                                                                color: '#666666',
                                                                size: 'md',
                                                                flex: 0,
                                                                align: 'end',
                                                                style: 'italic'
                                                            },
                                                            {
                                                                type: 'text',
                                                                text: moment(
                                                                    data.date
                                                                ).format(
                                                                    'DD/MM/YY-HH:mm'
                                                                ),
                                                                color: '#666666',
                                                                size: 'sm',
                                                                align: 'end',
                                                                style: 'italic'
                                                            }
                                                        ],
                                                        flex: 0,
                                                        spacing: 'lg',
                                                        alignItems: 'center',
                                                        paddingTop: '10px',
                                                        width: '200px'
                                                    },
                                                    {
                                                        type: 'box',
                                                        layout: 'baseline',
                                                        contents: [
                                                            {
                                                                type: 'text',
                                                                text: 'สถานที่ :',
                                                                color: '#666666',
                                                                size: 'md',
                                                                flex: 0,
                                                                align: 'end',
                                                                style: 'italic'
                                                            },
                                                            {
                                                                type: 'text',
                                                                text: data.locationName,
                                                                color: '#666666',
                                                                size: 'sm',
                                                                align: 'end',
                                                                style: 'italic'
                                                            }
                                                        ],
                                                        flex: 0,
                                                        spacing: 'lg',
                                                        alignItems: 'center',
                                                        paddingTop: '10px',
                                                        width: '200px'
                                                    },
                                                    {
                                                        type: 'box',
                                                        layout: 'baseline',
                                                        contents: [
                                                            {
                                                                type: 'text',
                                                                text: 'เบอร์ติดต่อ :',
                                                                color: '#666666',
                                                                size: 'md',
                                                                flex: 0,
                                                                align: 'end',
                                                                style: 'italic'
                                                            },
                                                            {
                                                                type: 'text',
                                                                text: data.phone,
                                                                color: '#666666',
                                                                size: 'sm',
                                                                align: 'end',
                                                                style: 'italic'
                                                            }
                                                        ],
                                                        flex: 0,
                                                        spacing: 'lg',
                                                        alignItems: 'center',
                                                        paddingTop: '10px',
                                                        width: '200px'
                                                    }
                                                ],
                                                alignItems: 'center',
                                                paddingTop: '20px'
                                            }
                                        ],
                                        spacing: 'xs'
                                    }
                                ],
                                offsetBottom: '0px',
                                offsetStart: '0px',
                                offsetEnd: '0px',
                                paddingAll: '10px',
                                height: '350px',
                                position: 'absolute'
                            }
                        ],
                        paddingAll: '0px',
                        position: 'relative',
                        backgroundColor: '#f3f0fc'
                    },
                    footer: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'box',
                                layout: 'vertical',
                                contents: [
                                    {
                                        type: 'button',
                                        action: {
                                            type: 'uri',
                                            label: 'ตอบรับบัตรเชิญ',
                                            uri: `https://liff.line.me/1655373811-zN7yDRlV?id=${cardbyId}`
                                        },
                                        color: '#ffffff'
                                    }
                                ],
                                backgroundColor: '#ffbb33',
                                margin: 'none',
                                spacing: 'none',
                                cornerRadius: 'xxl',
                                borderWidth: 'none'
                            }
                        ]
                    }
                }
            }
        ]);
        if (result) {
            liff.closeWindow();
        } else {
            alert('false');
        }
    };

    const search = () => {
        const local = document.getElementById('location').value;
        map.Search.search(local, {
            area: '',
            tag: '',
            span: '',
            limit: ''
        });
        const result = map.location();
        setLocation({ lat: result.lat, lng: result.lon });
    };

    const initMap = () => {
        map.Layers.setBase(longdo.Layers.GRAY);
        map.Search.placeholder(document.getElementById('result'));
        if (edit === 'true') {
            map.location({ lon: location.lng, lat: location.lat }, true);
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Title level={4}>กรอกรายละเอียด</Title>
                        {waring}
                        <Row>
                            <Col span={24}>
                                <Space direction="vertical">
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                className={Classes.input}
                                                size="large"
                                                placeholder="ชื่อ-นามสกุลเจ้าภาพ(1)"
                                                id="hostOne"
                                                name="hostOne"
                                            />
                                        }
                                        name="hostOne"
                                        defaultValue=""
                                    />

                                    {errors.hostOne && (
                                        <p className="error-input">
                                            {errors.hostOne.message}
                                        </p>
                                    )}
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                className={Classes.input}
                                                size="large"
                                                placeholder="ชื่อ-นามสกุลเจ้าภาพ(2)"
                                                id="hostTwo"
                                                name="hostTwo"
                                            />
                                        }
                                        name="hostTwo"
                                        defaultValue=""
                                    />

                                    {errors.hostTwo && (
                                        <p className="error-input">
                                            {errors.hostTwo.message}
                                        </p>
                                    )}
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                className={Classes.input}
                                                size="large"
                                                placeholder="เบอร์โทรศัพท์"
                                                id="phone"
                                                name="phone"
                                            />
                                        }
                                        name="phone"
                                        defaultValue=""
                                    />

                                    {errors.phone && (
                                        <p className="error-input">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                    <Controller
                                        control={control}
                                        as={
                                            <DatePicker
                                                className={Classes.input}
                                                size="large"
                                                id="date"
                                                name="date"
                                                showTime
                                            />
                                        }
                                        name="date"
                                        defaultValue={null}
                                    />
                                    {errors.date && (
                                        <p className="error-input">
                                            {errors.date.message}
                                        </p>
                                    )}
                                    <Controller
                                        control={control}
                                        as={
                                            <Input
                                                className={Classes.input}
                                                size="large"
                                                placeholder="สถานที่จัดงาน"
                                                id="locationName"
                                                name="locationName"
                                            />
                                        }
                                        name="locationName"
                                        defaultValue=""
                                    />

                                    {errors.locationName && (
                                        <p className="error-input">
                                            {errors.locationName.message}
                                        </p>
                                    )}
                                </Space>
                                <Row
                                    align="center"
                                    style={{ marginTop: '10px' }}
                                >
                                    {isLoadMap && (
                                        <LongdoMap
                                            id="longdo-map"
                                            mapKey={mapKey}
                                            align="center"
                                            callback={initMap}
                                        />
                                    )}
                                    <Search
                                        placeholder="Search Google Maps"
                                        allowClear
                                        id="location"
                                        name="location"
                                        style={{
                                            width: '300px',
                                            marginTop: '5px'
                                        }}
                                        enterButton="Search"
                                        size="large"
                                        onSearch={() => search()}
                                    />

                                    <div
                                        id="result"
                                        style={{
                                            height: 'auto',
                                            width: '300px',
                                            overflowX: 'scroll'
                                        }}
                                    ></div>
                                </Row>
                            </Col>
                        </Row>
                        <Row align="center" style={{ marginTop: '10px' }}>
                            <Col span={24} align="center">
                                <Button
                                    size="large"
                                    shape="round"
                                    htmlType="submit"
                                    className={Classes.button}
                                >
                                    สร้างการ์ด
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
