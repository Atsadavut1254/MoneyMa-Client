import * as yup from 'yup';

export const saisong = yup.object().shape({
    greeting: yup.string().required('กรุณากรอกข้อมูล'),
    amount: yup.string().required('กรุณากรอกข้อมูล')
});
