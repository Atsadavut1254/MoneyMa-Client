import React from 'react';

import { Carousel, Image } from 'antd';

import How_1 from '../../../image/Howto/EX1.png';
import How_2 from '../../../image/Howto/EX2.png';
import How_3 from '../../../image/Howto/EX3.png';
import How_4 from '../../../image/Howto/EX3-1.png';

const ImgData = [
    {
        id: '1',
        name: 'image_1',
        img: How_1
    },
    {
        id: '2',
        name: 'image_2',
        img: How_2
    },
    {
        id: '3',
        name: 'image_2',
        img: How_3
    },
    {
        id: '4',
        name: 'image_2',
        img: How_4
    }
];

export default function Howto() {
    return (
        <div className="container">
            <h3>วิธีใช้งาน MoneyMa (มานี่มา)</h3>
            <Carousel autoplay>
                {ImgData.map((item, id) => (
                    <Image key={item.id} src={item.img} />
                ))}
            </Carousel>
        </div>
    );
}
