import React from 'react';
import { Route, Switch } from 'react-router-dom';
import liff from '@line/liff';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import home from '../pages/createCard';
import cardType from '../pages/cardType';
import CardDetail from '../pages/cardDetail';
import marry from '../pages/marRy';
import housewarming from '../pages/Housewarming';
import ordian from '../pages/Ordian';
import greeting from '../pages/greeTing';
import sumMary from '../pages/summary';
import guest from '../pages/amountGuest';
import cost from '../pages/costList/cost';
//import redux
import { login } from '../../redux/actions/auth.actions';
import { getCardList } from '../../redux/actions/card.actions';
import moment from 'moment';
import { convertText2 } from '../../defualt/convert';

function CardLayout() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.token);

    const getProfile = async () => {
        const Profile = await liff.getProfile();
        const email = liff.getDecodedIDToken()?.email;

        await signup(Profile, email);
    };

    useEffect(() => {
        liff.init({ liffId: '1655373811-KQg1xjV8' });
        liff.ready.then(async () => {
            if (liff.isInClient()) {
                await getProfile();
            } else {
                if (liff.isLoggedIn()) {
                    await getProfile();
                } else {
                    liff.login();
                }
            }
        });
    }, []);

    const signup = async (profile, email) => {
        try {
            const data = {
                userId: profile.userId,
                name: profile.displayName,
                picture: profile.pictureUrl,
                email: email
            };

            dispatch(login(data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (auth) {
            dispatch(getCardList());
        }
    }, [auth]);

    const Share = async (card, cardbyId) => {
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([
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
                                            text: 'คุณได้รับบัตรเชิญงานแต่ง',
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
                                                            text: card.hostOne,
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
                                                                card.type
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
                                                            text: card.hostTwo,
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
                                                                        card.date
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
                                                            alignItems:
                                                                'center',
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
                                                                    text: card.locationName,
                                                                    color: '#666666',
                                                                    size: 'sm',
                                                                    align: 'end',
                                                                    style: 'italic'
                                                                }
                                                            ],
                                                            flex: 0,
                                                            spacing: 'lg',
                                                            alignItems:
                                                                'center',
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
                                                                    text: card.phone,
                                                                    color: '#666666',
                                                                    size: 'sm',
                                                                    align: 'end',
                                                                    style: 'italic'
                                                                }
                                                            ],
                                                            flex: 0,
                                                            spacing: 'lg',
                                                            alignItems:
                                                                'center',
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
                                    type: 'button',
                                    action: {
                                        type: 'uri',
                                        uri: `https://liff.line.me/1655373811-zN7yDRlV?id=${cardbyId}`,
                                        label: 'ตอบรับบัตรเชิญ'
                                    },
                                    color: '#ffbb33',
                                    style: 'primary',
                                    height: 'sm'
                                }
                            ]
                        },
                        styles: {
                            footer: {
                                separator: true
                            }
                        }
                    }
                }
            ])
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Switch>
                <Route exact path="/card" component={home} />
                <Route path="/card/type" component={cardType} />
                <Route path="/card/detail/:id">
                    <CardDetail handleshare={Share} />
                </Route>
                <Route path="/card/createMarry" component={marry} />
                <Route path="/card/createHouse" component={housewarming} />
                <Route path="/card/createOrdian" component={ordian} />
                <Route path="/card/greeting/:id" component={greeting} />
                <Route path="/card/summary/:id" component={sumMary} />
                <Route path="/card/amountguest/:id" component={guest} />
                <Route path="/card/cost/:id" component={cost} />
            </Switch>
        </div>
    );
}
export default CardLayout;
