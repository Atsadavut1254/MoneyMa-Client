import * as yup from 'yup';

export const costSchema = yup.object().shape({
    costName: yup.string().required('กรุณากรอกข้อมูล'),
    price: yup.string().required('กรุณากรอกข้อมูล')
});
