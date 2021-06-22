export const convertTime = () => {
    const date = new Date();
    return date.toUTCString();
};

export const convertText = (type) => {
    let Text = '';
    if (type === 'wedding') {
        Text = 'การ์ดแต่งงาน';
    } else if (type === 'ordination') {
        Text = 'การ์ดงานบวช';
    } else if (type === 'housewarming') {
        Text = 'การ์ดขึ้นบ้านใหม่';
    }

    return Text;
};

export const convertText2 = (type) => {
    let Text = '';
    if (type === 'wedding') {
        Text = 'กับ';
    } else if (type === 'ordination') {
        Text = 'หรือ';
    } else if (type === 'housewarming') {
        Text = 'กับ';
    }

    return Text;
};
