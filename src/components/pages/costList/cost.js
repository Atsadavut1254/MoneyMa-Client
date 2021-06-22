import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Input, Divider, Button, Empty } from 'antd';
import isEmpty from '../../../defualt/checkEmptyObject';

import Itemcost from './costItem';

import { useParams } from 'react-router-dom';
import { Load } from '../Loading/loading';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { costSchema } from '../../../validation/costSchema';

import { useDispatch, useSelector } from 'react-redux';
import {
    getCost,
    deleteCost,
    createCost
} from '../../../redux/actions/card.actions';

export default function Cost() {
    const { Title } = Typography;

    const params = useParams();
    const cardbyId = params.id;
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const Costs = useSelector((state) => {
        return state.card.cost;
    });

    const [costs, setCost] = useState([]);

    const allPrice =
        !isEmpty(Costs?.budgets) &&
        Costs?.budgets.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0);

    useEffect(() => {
        dispatch(getCost(cardbyId));
    }, []);

    useEffect(() => {
        if (!isEmpty(Costs)) {
            // console.log(JSON.stringify(Costs));
            setCost(Costs.budgets);
            setLoading(false);
        }
    }, [Costs]);

    const onHandleDelete = (id) => {
        dispatch(deleteCost(cardbyId, id));
    };

    const { handleSubmit, errors, control } = useForm({
        resolver: yupResolver(costSchema)
    });

    const onSubmit = (costData) => {
        try {
            const data = {
                costName: costData.costName,
                price: Number(costData.price)
            };

            dispatch(createCost(data, cardbyId));
            dispatch(getCost(cardbyId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container">
                    <Title level={4}>จำนวนเงินในซองของคุณ</Title>
                    <Row style={{ margin: '10px' }}>
                        <Input
                            id="totalamount"
                            prefix=""
                            suffix="THB"
                            size="large"
                            disabled
                            value={allPrice ? allPrice : 0}
                            style={{ color: '#000000' }}
                        />
                        <Col
                            span={24}
                            align="left"
                            style={{ marginTop: '10px' }}
                        >
                            <Title level={5}>
                                เพิ่มค่าใช้จ่ายของคุณเพื่อให้เราคำนวณให้
                            </Title>
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={10}>
                                        <Controller
                                            control={control}
                                            as={
                                                <Input
                                                    name="costName"
                                                    id="costName"
                                                    placeholder="ชื่อรายการ"
                                                />
                                            }
                                            name="costName"
                                            defaultValue=""
                                        />

                                        {errors.costName && (
                                            <p className="error-input">
                                                {errors.costName.message}
                                            </p>
                                        )}
                                    </Col>
                                    <Col span={10}>
                                        <Controller
                                            control={control}
                                            as={
                                                <Input
                                                    name="price"
                                                    id="price"
                                                    placeholder="จำนวนเงิน"
                                                />
                                            }
                                            name="price"
                                            defaultValue=""
                                        />
                                        {errors.price && (
                                            <p className="error-input">
                                                {errors.price.message}
                                            </p>
                                        )}
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            shape="circle"
                                            htmlType="submit"
                                            style={{
                                                background: '#0ead56',
                                                color: '#FFFFFF',
                                                textAlign: 'center'
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                            </Input.Group>
                        </form>
                        <Divider />
                    </Row>
                    <Row style={{ marginTop: '-10px' }}>
                        {!isEmpty(costs) ? (
                            costs.map((item, index) => (
                                <Col span={24} key={index}>
                                    <Itemcost
                                        data={item}
                                        index={index}
                                        onHandleDelete={onHandleDelete}
                                    />
                                </Col>
                            ))
                        ) : (
                            <Empty
                                align="center"
                                style={{
                                    padding: '100px 80px'
                                }}
                            />
                        )}
                    </Row>
                </div>
            ) : (
                <Load />
            )}
        </>
    );
}
