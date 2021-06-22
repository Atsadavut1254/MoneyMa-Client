import * as yup from 'yup';
import moment from 'moment';

export const marrySchema = yup.object().shape({
    hostOne: yup.string().required('กรุณากรอกข้อมูล'),
    hostTwo: yup.string().required('กรุณากรอกข้อมูล'),
    phone: yup
        .string()
        .required('กรุณากรอกข้อมูล')
        .min(10, 'กรุณากรอกข้อมูลไม่น้อยกว่า 10 ตัว')
        .max(10, 'กรุณากรอกข้อมูลไม่เกิน 10 ตัว'),
    date: yup
        .date()
        .min(moment(), 'กรุณากรอกเลือกวันจัดงานอีกครั้ง')
        .required('กรุณากรอกเลือกวันจัดงาน')
        .nullable(),
    locationName: yup.string().required('กรุณากรอกข้อมูล')
});
